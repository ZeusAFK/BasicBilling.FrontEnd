import axios, { AxiosResponse } from "axios";
import config from "../config/config";

const baseUrl: string = config.defaults.apiUrl;

export const getPendingBillsByClient = async (
  client: IClient
): Promise<AxiosResponse<IBill[]>> => {
  try {
    const bills: AxiosResponse<IBill[]> = await axios.get(
      `${baseUrl}/billing/pending?ClientId=${client.id}`
    );
    return bills;
  } catch (error) {
    throw new Error(error);
  }
};

export const createBill = async (
  formData: IBillCreate
): Promise<AxiosResponse<IBill>> => {
  try {
    const bill: IBillCreate = {
      clientId: formData.clientId,
      period: Number(formData.period),
      category: formData.category,
      amount: Number(formData.amount),
    };
    const saveBill: AxiosResponse<IBill> = await axios.post(
      baseUrl + "/billing/bills",
      bill
    );
    return saveBill;
  } catch (error) {
    throw new Error(error);
  }
};

export const getPaymentsHistoryByService = async (
  category: string
): Promise<AxiosResponse<IPayment[]>> => {
  try {
    const payments: AxiosResponse<IPayment[]> = await axios.get(
      `${baseUrl}/billing/search?category=${category}`
    );
    return payments;
  } catch (error) {
    throw new Error(error);
  }
};

export const createPayment = async (
  formData: IPaymentCreate
): Promise<AxiosResponse<IPayment>> => {
  try {
    const payment: IPaymentCreate = {
      clientId: formData.clientId,
      period: Number(formData.period),
      category: formData.category,
    };
    const savePayment: AxiosResponse<IPayment> = await axios.post(
      baseUrl + "/billing/pay",
      payment
    );
    return savePayment;
  } catch (error) {
    throw new Error(error);
  }
};
