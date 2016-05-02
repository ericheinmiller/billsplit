import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchBills, removeBillRequest } from 'actions/bills';

class BillShow extends Component {

  static need = [  // eslint-disable-line
    fetchBills
  ]

  renderTable() {
    const { allBills } = this.props.bill;
    const row = allBills.map((value, index) => {
      const isCreditor = value.creditor === undefined;
      return (
<<<<<<< HEAD
        <tr className={value.creditor == undefined? "green" : "red"} key={value.id}>
          <td>{value.description}</td>
          <td>{value.amount}</td>
          <td>{value.creditor == undefined ? value.debtor.email : value.creditor.email}</td>
=======
        <tr
          key={value.id}
          className={isCreditor ? 'table-success' : 'table-danger'} >
          <td>{value.description}</td>
          <td>{value.amount}</td>
          <td>{isCreditor ? value.debtor.email : value.creditor.email}</td>
>>>>>>> d2c341b66b0205da90a20780a640a43936cd13c0
          <td>
            <input
              className="btn btn-danger"
              type="button"
<<<<<<< HEAD
              onClick={() => this.props.removeBillRequest(value.id, index, title)}
=======
              onClick={() => this.props.removeBillRequest(value.id, index)}
>>>>>>> d2c341b66b0205da90a20780a640a43936cd13c0
              value="Marked Paid"
            />
          </td>
        </tr>
      )
    });

    return (
      <div>
        <h3>Bills</h3>
        <table className="table">
          <thead className="thead-inverse">
            <tr>
              <th>Description</th>
              <th>Amount</th>
              <th>User</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {row}
          </tbody>
        </table>
      </div>
    );
  }

  renderBills() {
<<<<<<< HEAD
    let bills = []; 
    let debtsPointer = 0;
    let creditsPointer = 0;
    console.log(this.props.bill);
    let length = this.props.bill.debts.length + this.props.bill.credits.length;
    while (length > 0){
      if(this.props.bill.credits[creditsPointer] == undefined){
        bills.push(this.props.bill.debts[debtsPointer]);
        debtsPointer ++;
      }
      else if(this.props.bill.debts[debtsPointer] == undefined){
        bills.push(this.props.bill.credits[creditsPointer]);
        creditsPointer ++;
      }
      else if(this.props.bill.debts[debtsPointer].createdAt > this.props.bill.credits[creditsPointer].createdAt){
        bills.push(this.props.bill.debts[debtsPointer]);
        debtsPointer  ++;
      }else{
        bills.push(this.props.bill.credits[creditsPointer]);
        creditsPointer ++;
      }
      length --;
    }


    return <div>
             { bills.length ? this.renderTable('Bills', bills) : '' }
             { bills.length === 0 && bills.length === 0 ?
=======
    const { allBills } = this.props.bill;

    return <div>
             { allBills.length ? this.renderTable() : '' }
             { allBills.length === 0 ?
>>>>>>> d2c341b66b0205da90a20780a640a43936cd13c0
               'You currently have no bills. Go ahead and add one!' : '' }
           </div>;
  }

  renderLoading() {
    return <p className="text-xs-center">Loading...</p>
  }

  render() {
    return (
      <div>
        {this.props.bill.isFetching ? this.renderLoading() : this.renderBills()}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { bill: state.bill };
}

export default connect(mapStateToProps, { removeBillRequest })(BillShow);
