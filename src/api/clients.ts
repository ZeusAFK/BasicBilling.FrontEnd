import axios, { AxiosResponse } from "axios";
import config from "../config/config";

const baseUrl: string = config.defaults.apiUrl;

export const getClients = async (): Promise<AxiosResponse<IClient[]>> => {
  try {
    const clients: AxiosResponse<IClient[]> = await axios.get(
      baseUrl + "/clients"
    );
    return clients;
  } catch (error) {
    throw new Error(error);
  }
};

export const createClient = async (
  formData: IClient
): Promise<AxiosResponse<IClient>> => {
  try {
    const client: Omit<IClient, "id" | "createdOn" | "updatedOn"> = {
      firstname: formData.firstname,
      lastname: formData.lastname,
      document: formData.document,
      middlename: formData.middlename,
    };
    const saveClient: AxiosResponse<IClient> = await axios.post(
      baseUrl + "/clients",
      client
    );
    return saveClient;
  } catch (error) {
    throw new Error(error);
  }
};

export const updateClient = async (
  client: IClient
): Promise<AxiosResponse<IClient>> => {
  try {
    const clientUpdate: Pick<
      IClient,
      "firstname" | "lastname" | "middlename" | "document"
    > = {
      firstname: client.firstname,
      lastname: client.lastname,
      document: client.document,
      middlename: client.middlename,
    };
    const updateClient: AxiosResponse = await axios.put(
      `${baseUrl}/clients/${client.id}`,
      clientUpdate
    );
    return updateClient;
  } catch (error) {
    throw new Error(error);
  }
};
