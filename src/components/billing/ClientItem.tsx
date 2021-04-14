import React from "react";
// @ts-ignore
import { Table, Field, Control } from "reactbulma";
import ClientPendingBillsModal from "./ClientPendingBillsModal";
import CreateBillModal from "./CreateBillModal";

const Client: React.FC<ClientProps> = ({ client }) => {
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
            <ClientPendingBillsModal client={client} />
          </Control>
          <Control>
            <CreateBillModal client={client} />
          </Control>
        </Field>
      </Table.Td>
    </Table.Tr>
  );
};

export default Client;
