import { CREATE_BILL_SET_CLIENT, SET_BILL_MODAL_STATE } from "./billingActionTypes";

export const setClient = (client: IClient) => {
  return {
    type: CREATE_BILL_SET_CLIENT,
    payload: client,
  };
};

export const setModalState = (state: boolean) => {
  return {
    type: SET_BILL_MODAL_STATE,
    payload: state
  }
}