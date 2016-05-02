import Models from '../models';
const Bill = Models.Bill;
const User = Models.User;

/**
 * List
 */
export function all(req, res) {
  return User.findOne({
    where: { id: req.user.id },
    include: [
      {
        model: Bill,
        as: 'debts',
        attributes: { exclude: ['creditorId', 'debtorId'] },
        include: { model: User, as: 'creditor', attributes: ['email'] }
      },
      {
        model: Bill,
        as: 'credits',
        attributes: { exclude: ['creditorId', 'debtorId'] },
        include: { model: User, as: 'debtor', attributes: ['email'] }
      }
    ]
  }).then(({ credits, debts }) => {
    const allBills = [...credits, ...debts].sort((a, b) => {
      return new Date(b.createdAt) - new Date(a.createdAt);
    });
    return res.json({ allBills });
  }).catch((err) => {
    console.log(err);
    return res.status(500).send('Error in first query');
  });
}

/**
 * Add a Bill
 * will create a non-operative user if user does not exist
 */
function createBill(req, res, existingUserId) {
  return Bill.create({
    description: req.body.description,
    amount: req.body.amount,
    creditorId: req.body.isPayer === 'true' ? req.user.id : existingUserId,
    debtorId: req.body.isPayer === 'true' ? existingUserId : req.user.id
  }).then(() => {
    return res.status(200).send('OK');
  }).catch((err) => {
    console.log(err);
    return res.status(400).send(err);
  });
}

export function add(req, res) {
  return User.findOne({ where: { email: req.body.participant } }).then((existingUser) => {
    if (existingUser) {
      return createBill(req, res, existingUser.id);
    }
    const newUser = User.build({
      email: req.body.participant,
      operative: false
    });

    return newUser.save().then(() => {
      return createBill(req, res, newUser.id);
    }).catch((err) => {
      console.log(err);
      return res.status(500).send('We have failed to save your bill');
    });
  }).catch((err) => {
    console.log(err);
    return res.status(500).send('Error in first query');
  });
}


/**
 * Update a Bill
 */
export function update(req, res) {
  const query = { id: req.params.id };
  const params = {
    description: req.body.description,
    amount: req.body.amount
  };

  return Bill.update(params, { where: query }).then(() => {
    return res.status(200).send('Updated successfully');
  }).catch((err) => {
    console.log(err);
    return res.status(500).send('We failed to save for some reason');
  });
}

/**
 * Remove a Bill
 */
export function remove(req, res) {
  const query = {
    id: req.params.id,
    $or: [{ debtorId: req.user.id }, { creditorId: req.user.id }]
  };
  return Bill.destroy({ where: query }).then(() => {
    return res.status(200).send('Removed Successfully');
  }).catch((err) => {
    console.log(err);
    return res.status(500).send('We failed to delete for some reason');
  });
}

export default {
  all,
  add,
  update,
  remove
};
