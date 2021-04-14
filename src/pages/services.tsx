import React, { useEffect, useState } from "react";
import IPage from "../interfaces/page";
import logging from "../config/logging";
// @ts-ignore
import { Card, Content, Title, Table, Icon } from "reactbulma";
import { FaPlus, FaLightbulb } from "react-icons/fa";
import { getServices, createService, updateService } from "../api/services";
import CreateService from "../components/services/CreateService";
import ServiceItem from "../components/services/ServiceItem";
import { store } from "react-notifications-component";
import "react-notifications-component/dist/theme.css";
import "animate.css";

const ServicesPage: React.FunctionComponent<IPage> = (props) => {
  useEffect(() => {
    logging.info(`Loading ${props.name} page.`);
  }, [props.name]);

  const [services, setServices] = useState<IService[]>([]);

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = (): void => {
    getServices()
      .then(({ data }: IService[] | any) => setServices(data))
      .catch((err: Error) => logging.error(err));
  };

  const handleSaveService = (e: React.FormEvent, formData: IService): void => {
    e.preventDefault();
    createService(formData)
      .then(({ status, data }) => {
        if (status !== 201) {
          logging.error("Service not saved");
        } else {
          store.addNotification({
            title: "Service created",
            message: "Your request has been processed",
            type: "success",
            container: "top-right",
            animationIn: ["animated", "fadeIn"],
            animationOut: ["animated", "fadeOut"],
            dismiss: {
              duration: 3000,
            },
          });
          fetchServices();
        }
      })
      .catch((err) => logging.error(err));
  };

  const handleUpdateService = (service: IService): void => {
    updateService(service)
      .then(({ status }) => {
        if (status !== 204) {
          logging.error("Service not updated");
        } else {
          store.addNotification({
            title: "Service updated",
            message: "Your request has been processed",
            type: "success",
            container: "top-right",
            animationIn: ["animated", "fadeIn"],
            animationOut: ["animated", "fadeOut"],
            dismiss: {
              duration: 3000,
            },
          });
          fetchServices();
        }
      })
      .catch((err) => logging.error(err));
  };

  return (
    <div>
      <Title is="2">
        <Icon medium>
          <FaLightbulb />
        </Icon>{" "}
        <span>Services</span>
      </Title>
      <Card>
        <Card.Header>
          <Card.Header.Title>
            <Icon>
              <FaPlus />
            </Icon>{" "}
            Create new service
          </Card.Header.Title>
          <Card.Header.Icon>
            <FaLightbulb />
          </Card.Header.Icon>
        </Card.Header>
        <Card.Content>
          <Content>
            <CreateService saveService={handleSaveService} />
          </Content>
        </Card.Content>
      </Card>
      <br />
      <Card>
        <Card.Content>
          <Content>
            <Table bordered striped>
              <Table.Head>
                <Table.Tr>
                  <Table.Th>Id</Table.Th>
                  <Table.Th>Name</Table.Th>
                  <Table.Th>Shortname</Table.Th>
                  <Table.Th>Description</Table.Th>
                  <Table.Th></Table.Th>
                </Table.Tr>
              </Table.Head>
              <Table.Body>
                {services.map((service: IService) => (
                  <ServiceItem
                    key={service.id}
                    updateService={handleUpdateService}
                    service={service}
                  />
                ))}
              </Table.Body>
            </Table>
          </Content>
        </Card.Content>
      </Card>
    </div>
  );
};

export default ServicesPage;
