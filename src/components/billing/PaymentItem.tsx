import React from "react";
// @ts-ignore
import { Table } from "reactbulma";

const Payment: React.FC<PaymentProps> = ({ payment }) => {
  return (
    <Table.Tr>
      <Table.Th>{payment.id}</Table.Th>
      <Table.Td>{payment.bill.client.firstname + ' ' + payment.bill.client.lastname || ""}</Table.Td>
      <Table.Td>{payment.bill.service.name || ""}</Table.Td>
      <Table.Td>{payment.bill.period || ""}</Table.Td>
      <Table.Td>{payment.bill.amount || ""}</Table.Td>
      <Table.Td>{payment.createdOn || ""}</Table.Td>
    </Table.Tr>
  );
};

export default Payment;
