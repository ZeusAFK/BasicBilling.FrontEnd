import React, { useState } from "react";
import { store } from "react-notifications-component";
import { getPendingBillsByClient, createPayment } from "../../api/billing";
// @ts-ignore
import { Table, Button, Icon } from "reactbulma";
import { FaFileAlt, FaCheck } from "react-icons/fa";
import logging from "../../config/logging";

const ClientPendingModalButton: React.FC<ClientProps> = ({ client }) => {
  const [isModal, setModalState] = useState<boolean>(false);

  const active = isModal ? "is-active" : "";

  const switchModalState = (
    e: React.MouseEvent<HTMLDivElement> | React.MouseEvent<HTMLButtonElement>
  ): void => {
    if (!isModal) {
      fetchBills();
    }
    setModalState(!isModal);
  };

  const [bills, setBills] = useState<IBill[]>([]);

  const fetchBills = (): void => {
    getPendingBillsByClient(client)
      .then(({ data }: IClient[] | any) => setBills(data))
      .catch((err: Error) => logging.error(err));
  };

  const payBill = (bill: IBill): void => {
    let payment: IPaymentCreate = {
      clientId: bill.client.id,
      category: bill.service.shortname,
      period: bill.period,
    };
    createPayment(payment).then(({ status, data }) => {
      if (status !== 201) {
        logging.error("Payment not saved");
      } else {
        store.addNotification({
          title: "Payment created",
          message: "Your request has been processed",
          type: "success",
          container: "top-right",
          animationIn: ["animated", "fadeIn"],
          animationOut: ["animated", "fadeOut"],
          dismiss: {
            duration: 3000,
          },
        });
        fetchBills();
      }
    });
  };

  return (
    <div className="App">
      <div className={`modal ${active}`}>
        <div className="modal-background" onClick={switchModalState} />
        <div className="modal-card">
          <header className="modal-card-head">
            <p className="modal-card-title">
              <b>
                Pending bills: {client.firstname} {client.lastname}
              </b>
            </p>
            <button
              onClick={switchModalState}
              className="delete"
              aria-label="close"
            />
          </header>
          <section className="modal-card-body">
            <Table bordered striped>
              <Table.Head>
                <Table.Tr>
                  <Table.Th>Id</Table.Th>
                  <Table.Th>Period</Table.Th>
                  <Table.Th>Service</Table.Th>
                  <Table.Th>Amount</Table.Th>
                  <Table.Th></Table.Th>
                </Table.Tr>
              </Table.Head>
              <Table.Body>
                {bills.map((bill: IBill) => (
                  <Table.Tr key={bill.id}>
                    <Table.Th>{bill.id}</Table.Th>
                    <Table.Td>{bill.period}</Table.Td>
                    <Table.Td>{bill.service.name}</Table.Td>
                    <Table.Td>{bill.amount}</Table.Td>
                    <Table.Td>
                      <Button primary onClick={() => payBill(bill)}>
                        <Icon>
                          <FaCheck />
                        </Icon>
                        <span>Pay</span>
                      </Button>
                    </Table.Td>
                  </Table.Tr>
                ))}
              </Table.Body>
            </Table>
          </section>
        </div>
      </div>
      <Button info onClick={switchModalState}>
        <Icon>
          <FaFileAlt />
        </Icon>
        <span>Pending bills</span>
      </Button>
    </div>
  );
};

export default ClientPendingModalButton;
