/* eslint consistent-return: 0, no-else-return: 0*/
import * as types from 'constants/index';
import axios from 'axios';

// Fetch bill
export function fetchBills() {
  return {
    type: types.GET_BILLS,
    promise: (request) => request.get('/bill')
  };
}

// Add bill
export function addBill(data) {
  return {
    type: types.ADD_BILL,
    promise: (request) => request.post('/bill/new', data)
  };
}

// Remove bill
export function destroyBill(index) {
  return {
    type: types.DESTROY_BILL,
    index,
  };
}

export function removeBillRequest(id, index) {
  return dispatch => {
    return axios.delete(`/bill/${id}`).then(() => {
      dispatch(destroyBill(index));
    });
  };
}
