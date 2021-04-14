import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import IPage from "../interfaces/page";
import logging from "../config/logging";
import { getServices } from "../api/services";
// @ts-ignore
import { Card, Content, Title, Table, Icon } from "reactbulma";
import { FaRegCalendarAlt } from "react-icons/fa";
import { getPaymentsHistoryByService } from "../api/billing";
import PaymentItem from "../components/billing/PaymentItem";
import "react-notifications-component/dist/theme.css";
import "animate.css";

const BillingPage: React.FunctionComponent<IPage> = (props) => {
  const { register, handleSubmit } = useForm();
  const onSubmit = (data: any): void => {
    fetchPayments(data.category);
  };

  useEffect(() => {
    logging.info(`Loading ${props.name} page.`);
  }, [props.name]);

  useEffect(() => {
    fetchServices();
  }, []);

  const [payments, setPayments] = useState<IPayment[]>([]);

  const [services, setServices] = useState<IService[]>([]);

  const fetchServices = (): void => {
    getServices()
      .then(({ data }: IService[] | any) => setServices(data))
      .catch((err: Error) => logging.error(err));
  };

  const fetchPayments = (category: string): void => {
    getPaymentsHistoryByService(category)
      .then(({ data }: IPayment[] | any) => setPayments(data))
      .catch((err: Error) => logging.error(err));
  };

  return (
    <div>
      <Title is="2">
        <Icon medium>
          <FaRegCalendarAlt />
        </Icon>{" "}
        <span>Payments history</span>
      </Title>
      <Card>
        <Card.Content>
          <Content>
            <form onSubmit={handleSubmit(onSubmit)}>
              <label className="label">Service</label>
              <div className="field has-addons">
                <div className="select">
                  <select {...register("category", { required: true })}>
                    {services.map((service: IService) => (
                      <option key={service.id} value={service.shortname}>
                        {service.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="control">
                  <button type="submit" className="button is-info">
                    Search payments
                  </button>
                </div>
              </div>
            </form>
            <hr />
            <Table bordered striped>
              <Table.Head>
                <Table.Tr>
                  <Table.Th>Id</Table.Th>
                  <Table.Th>Client</Table.Th>
                  <Table.Th>Service</Table.Th>
                  <Table.Th>Period</Table.Th>
                  <Table.Th>Amount</Table.Th>
                  <Table.Th>Created On</Table.Th>
                </Table.Tr>
              </Table.Head>
              <Table.Body>
                {payments.map((payment: IPayment) => (
                  <PaymentItem key={payment.id} payment={payment} />
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
