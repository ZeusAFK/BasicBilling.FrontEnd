import React, { useState } from "react";
// @ts-ignore
import { Table, Button, Icon, Input } from "reactbulma";
import { FaEdit } from "react-icons/fa";

type Props = ServiceProps & {
  updateService: (service: IService | any) => void;
};

const Service: React.FC<Props> = ({ service, updateService }) => {
  const [formData, setFormData] = useState<IService | {}>();

  const handleForm = (e: React.FormEvent<HTMLInputElement>): void => {
    service[e.currentTarget.id.split("_")[0]] = e.currentTarget.value;
    setFormData({
      ...formData,
      [e.currentTarget.id.split("_")[0]]: e.currentTarget.value,
    });
  };

  return (
    <Table.Tr>
      <Table.Th>{service.id}</Table.Th>
      <Table.Td>
        <Input
          onChange={handleForm}
          id={`name_${service.id}`}
          value={service.name}
        />
      </Table.Td>
      <Table.Td>
        <Input
          onChange={handleForm}
          id={`shortname_${service.id}`}
          value={service.shortname}
        />
      </Table.Td>
      <Table.Td>
        <Input
          onChange={handleForm}
          id={`description_${service.id}`}
          value={service.description || ""}
        />
      </Table.Td>
      <Table.Td>
        <Button primary onClick={() => updateService(service)}>
          <Icon>
            <FaEdit />
          </Icon>
          <span>Save service</span>
        </Button>
      </Table.Td>
    </Table.Tr>
  );
};

export default Service;
