import {
  GET_BILLS_REQUEST,
  GET_BILLS_SUCCESS,
  GET_BILLS_FAILURE,
  ADD_BILL_REQUEST,
  ADD_BILL_SUCCESS,
  ADD_BILL_FAILURE,
  DESTROY_BILL } from 'constants/index';

export default function bill(state = {
  allBills: [],
}, action) {
  switch (action.type) {
    case GET_BILLS_REQUEST:
      return { ...state, isFetching: true };
    case GET_BILLS_SUCCESS: {
      const { allBills } = action.result.data;
      return { ...state, allBills, isFetching: false };
    }
    case GET_BILLS_FAILURE:
      return { ...state, isFetching: false };
    case ADD_BILL_REQUEST:
      return { ...state, isSubmitting: true };
    case ADD_BILL_SUCCESS:
      return { ...state, isSubmitting: false };
    case ADD_BILL_FAILURE:
      return { ...state, isSubmitting: false };
    case DESTROY_BILL:
      return {
        ...state,
        allBills: [...state.allBills.filter((v, i) => i !== action.index)]
      };
    default:
      return state;
  }
}
