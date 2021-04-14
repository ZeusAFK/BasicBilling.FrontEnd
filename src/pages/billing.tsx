import React, { useEffect, useState } from "react";
import IPage from "../interfaces/page";
import logging from "../config/logging";
// @ts-ignore
import { Card, Content, Title, Table, Icon } from "reactbulma";
import { FaMoneyCheckAlt } from "react-icons/fa";
import { getClients } from "../api/clients";
import ClientItem from "../components/billing/ClientItem";
import "react-notifications-component/dist/theme.css";
import "animate.css";

const BillingPage: React.FunctionComponent<IPage> = (props) => {
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

  return (
    <div>
      <Title is="2">
        <Icon medium>
          <FaMoneyCheckAlt />
        </Icon>{" "}
        <span>Billing</span>
      </Title>
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
                  <ClientItem key={client.id} client={client} />
                ))}
              </Table.Body>
            </Table>
          </Content>
        </Card.Content>
      </Card>
    </div>
  );
};

export default BillingPage;
