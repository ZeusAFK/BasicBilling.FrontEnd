import React, { useEffect, useState } from "react";
import IPage from "../interfaces/page";
import logging from "../config/logging";
// @ts-ignore
import { Card, Content, Title, Table, Icon } from "reactbulma";
import { FaUsers, FaPlus } from "react-icons/fa";
import { getClients, createClient, updateClient } from "../api/clients";
import CreateClient from "../components/clients/CreateClient";
import ClientItem from "../components/clients/ClientItem";
import { store } from "react-notifications-component";
import "react-notifications-component/dist/theme.css";
import "animate.css";

const ClientsPage: React.FunctionComponent<IPage> = (props) => {
  useEffect(() => {
    logging.info(`Loading ${props.name} page.`);
  }, [props.name]);

  const [clients, setClients] = useState<IClient[]>([]);

  useEffect(() => {
    fetchClients();
  }, []);

  const fetchClients = (): void => {
    getClients()
      .then(({ data }: IClient[] | any) => setClients(data))
      .catch((err: Error) => logging.error(err));
  };

  const handleSaveClient = (e: React.FormEvent, formData: IClient): void => {
    e.preventDefault();
    createClient(formData)
      .then(({ status, data }) => {
        if (status !== 201) {
          logging.error("Client not saved");
        } else {
          store.addNotification({
            title: "Client created",
            message: "Your request has been processed",
            type: "success",
            container: "top-right",
            animationIn: ["animated", "fadeIn"],
            animationOut: ["animated", "fadeOut"],
            dismiss: {
              duration: 3000,
            },
          });
          fetchClients();
        }
      })
      .catch((err) => logging.error(err));
  };

  const handleUpdateClient = (client: IClient): void => {
    updateClient(client)
      .then(({ status }) => {
        if (status !== 204) {
          logging.error("Client not updated");
        } else {
          store.addNotification({
            title: "Client updated",
            message: "Your request has been processed",
            type: "success",
            container: "top-right",
            animationIn: ["animated", "fadeIn"],
            animationOut: ["animated", "fadeOut"],
            dismiss: {
              duration: 3000,
            },
          });
          fetchClients();
        }
      })
      .catch((err) => logging.error(err));
  };

  return (
    <div>
      <Title is="2">
        <Icon medium>
          <FaUsers />
        </Icon>{" "}
        <span>Clients</span>
      </Title>
      <Card>
        <Card.Header>
          <Card.Header.Title>
            <Icon>
              <FaPlus />
            </Icon>{" "}
            Create new client
          </Card.Header.Title>
          <Card.Header.Icon>
            <FaUsers />
          </Card.Header.Icon>
        </Card.Header>
        <Card.Content>
          <Content>
            <CreateClient saveClient={handleSaveClient} />
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
                  <Table.Th>Firstname</Table.Th>
                  <Table.Th>Lastname</Table.Th>
                  <Table.Th>Middlename</Table.Th>
                  <Table.Th>Document</Table.Th>
                  <Table.Th></Table.Th>
                </Table.Tr>
              </Table.Head>
              <Table.Body>
                {clients.map((client: IClient) => (
                  <ClientItem
                    key={client.id}
                    updateClient={handleUpdateClient}
                    client={client}
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

export default ClientsPage;
