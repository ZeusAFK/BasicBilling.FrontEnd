import React, { useState } from "react";
// @ts-ignore
import { Table, Button, Icon, Field, Control, Input } from "reactbulma";
import { FaEdit } from "react-icons/fa";

type Props = ClientProps & {
  updateClient: (client: IClient | any) => void;
};

const Client: React.FC<Props> = ({ client, updateClient }) => {
  const [formData, setFormData] = useState<IClient | {}>();

  const handleForm = (e: React.FormEvent<HTMLInputElement>): void => {
    client[e.currentTarget.id.split("_")[0]] = e.currentTarget.value;
    setFormData({
      ...formData,
      [e.currentTarget.id.split("_")[0]]: e.currentTarget.value,
    });
  };

  return (
    <Table.Tr>
      <Table.Th>{client.id}</Table.Th>
      <Table.Td>
        <Input
          onChange={handleForm}
          id={`firstname_clients_${client.id}`}
          value={client.firstname}
        />
      </Table.Td>
      <Table.Td>
        <Input
          onChange={handleForm}
          id={`lastname_${client.id}`}
          value={client.lastname}
        />
      </Table.Td>
      <Table.Td>
        <Input
          onChange={handleForm}
          id={`middlename_${client.id}`}
          value={client.middlename || ""}
        />
      </Table.Td>
      <Table.Td>
        <Input
          onChange={handleForm}
          id={`document_${client.id}`}
          value={client.document}
        />
      </Table.Td>
      <Table.Td>
        <Field grouped>
          <Control>
            <Button primary onClick={() => updateClient(client)}>
              <Icon>
                <FaEdit />
              </Icon>
              <span>Save</span>
            </Button>
          </Control>
        </Field>
      </Table.Td>
    </Table.Tr>
  );
};

export default Client;
