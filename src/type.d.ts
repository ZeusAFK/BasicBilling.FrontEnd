type ClientProps = {
  client: ITClient;
};

type ServiceProps = {
  service: ITService;
};

type PaymentProps = {
  payment: ITPayment;
};

type IEntity = {
  id: number;
  createdOn: Date;
  updatedOn: Date;
};

type IClient = IEntity & {
  firstname: string;
  lastname: string;
  middlename?: string;
  document: string;
};

type IService = IEntity & {
  shortname: string;
  name: string;
  description?: string;
};

type IBill = IEntity & {
  period: number;
  client: IClient;
  service: IService;
  amount: number;
};

type IBillCreate = {
  clientId: number;
  period: number;
  category: string;
  amount: number;
};

type IPaymentCreate = {
  clientId: number;
  period: number;
  category: string;
};

type IPayment = IEntity & {
  bill: IBill;
};

type BillReducerAction = {
  type: string
  payload: any
}

type CreateBillClientState = {
  client: IClient,
  modalState: boolean
}