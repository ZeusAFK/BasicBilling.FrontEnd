import axios, { AxiosResponse } from "axios";
import config from "../config/config";

const baseUrl: string = config.defaults.apiUrl;

export const getServices = async (): Promise<AxiosResponse<IService[]>> => {
  try {
    const services: AxiosResponse<IService[]> = await axios.get(
      baseUrl + "/services"
    );
    return services;
  } catch (error) {
    throw new Error(error);
  }
};

export const createService = async (
  formData: IService
): Promise<AxiosResponse<IService>> => {
  try {
    const service: Omit<IService, "id" | "createdOn" | "updatedOn"> = {
      shortname: formData.shortname,
      name: formData.name,
      description: formData.description,
    };
    const saveService: AxiosResponse<IService> = await axios.post(
      baseUrl + "/services",
      service
    );
    return saveService;
  } catch (error) {
    throw new Error(error);
  }
};

export const updateService = async (
  service: IService
): Promise<AxiosResponse<IService>> => {
  try {
    const serviceUpdate: Pick<
      IService,
      "shortname" | "name" | "description"
    > = {
      shortname: service.shortname,
      name: service.name,
      description: service.description,
    };
    const updateService: AxiosResponse = await axios.put(
      `${baseUrl}/services/${service.id}`,
      serviceUpdate
    );
    return updateService;
  } catch (error) {
    throw new Error(error);
  }
};
