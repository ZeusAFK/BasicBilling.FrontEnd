import React from "react";
import { useDispatch } from "react-redux";
// @ts-ignore
import { Table, Field, Control, Button, Icon } from "reactbulma";
import { FaFileAlt } from "react-icons/fa";
import { setClient } from "../../store/actions/billing/billing";
import ClientPendingBillsModal from "./ClientPendingBillsModal";

const Client: React.FC<ClientProps> = ({ client }) => {
  const dispatch = useDispatch();

  const showCreateBillModal = (client: IClient) => {
    dispatch(setClient(client));
  };

  return (
    <Table.Tr>
      <Table.Th>{client.id}</Table.Th>
      <Table.Td>{client.firstname || ""}</Table.Td>
      <Table.Td>{client.lastname || ""}</Table.Td>
      <Table.Td>{client.middlename || ""}</Table.Td>
      <Table.Td>{client.document || ""}</Table.Td>
      <Table.Td>
        <Field grouped>
          <Control>
            <Button
              primary
              onClick={() => {
                showCreateBillModal(client);
              }}
            >
              <Icon>
                <FaFileAlt />
              </Icon>
              <span>Create bill</span>
            </Button>
          </Control>
          <Control>
            <ClientPendingBillsModal client={client} />
          </Control>
        </Field>
      </Table.Td>
    </Table.Tr>
  );
};

export default Client;
