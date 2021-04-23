import { Action, Reducer } from "redux";
import {
  CREATE_BILL_SET_CLIENT,
  SET_BILL_MODAL_STATE,
} from "../actions/billing/billingActionTypes";

export interface InitialState {
  createBillClient: IClient | any;
  modalState: boolean;
}

const initialState: InitialState = {
  createBillClient: null,
  modalState: false,
};

export interface DispatchAction extends Action {
  payload: Partial<InitialState>;
}

const billingReducer: Reducer<InitialState, DispatchAction> = (
  state = initialState,
  action: BillReducerAction
) => {
  switch (action.type) {
    case CREATE_BILL_SET_CLIENT:
      return {
        ...state,
        createBillClient: action.payload,
        modalState: true,
      };
    case SET_BILL_MODAL_STATE: {
      return {
        ...state,
        modalState: action.payload,
      };
    }
    default:
      return state;
  }
};

export default billingReducer;
