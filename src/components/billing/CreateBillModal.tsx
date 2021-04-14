import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { getServices } from "../../api/services";
import { createBill } from "../../api/billing";
import { store } from "react-notifications-component";
// @ts-ignore
import { Button, Icon } from "reactbulma";
import { FaFileAlt } from "react-icons/fa";
import logging from "../../config/logging";

const CreateBillModal: React.FC<ClientProps> = ({ client }) => {
  const { register, handleSubmit } = useForm();
  const onSubmit = (data: any): void => {
    data["clientId"] = client.id;
    createBill(data)
      .then(({ status, data }) => {
        if (status !== 201) {
          logging.error("Bill not saved");
        } else {
          store.addNotification({
            title: "Bill created",
            message: "Your request has been processed",
            type: "success",
            container: "top-right",
            animationIn: ["animated", "fadeIn"],
            animationOut: ["animated", "fadeOut"],
            dismiss: {
              duration: 3000,
            },
          });
          setModalState(!isModal);
        }
      })
      .catch((err) => {
        logging.error(err);
        store.addNotification({
          title: "Request rejected",
          message: "Please check your request data",
          type: "danger",
          container: "top-right",
          animationIn: ["animated", "fadeIn"],
          animationOut: ["animated", "fadeOut"],
          dismiss: {
            duration: 3000,
          },
        });
      });
  };
  const [isModal, setModalState] = useState<boolean>(false);

  const active = isModal ? "is-active" : "";

  const switchModalState = (
    e: React.MouseEvent<HTMLDivElement> | React.MouseEvent<HTMLButtonElement>
  ): void => {
    if (!isModal) {
      fetchServices();
    }
    setModalState(!isModal);
  };

  const [services, setServices] = useState<IService[]>([]);

  const fetchServices = (): void => {
    getServices()
      .then(({ data }: IService[] | any) => setServices(data))
      .catch((err: Error) => logging.error(err));
  };

  return (
    <div className="App">
      <div className={`modal ${active}`}>
        <div className="modal-background" onClick={switchModalState} />
        <div className="modal-card">
          <header className="modal-card-head">
            <p className="modal-card-title">
              <b>
                Create bill for: {client.firstname} {client.lastname}
              </b>
            </p>
            <button
              onClick={switchModalState}
              className="delete"
              aria-label="close"
            />
          </header>
          <section className="modal-card-body">
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="field is-grouped is-grouped-multiline">
                <div className="control">
                  <label className="label">Period</label>
                  <input
                    className="input"
                    type="number"
                    placeholder="Period"
                    {...register("period", {
                      required: true,
                      pattern: /^\d{4}(0[1-9]|1[0-2])$/i,
                    })}
                  />
                  <div className="help">Format: YYYYMM</div>
                </div>
                <div className="control">
                  <label className="label">Service</label>
                  <div className="select">
                    <select {...register("category", { required: true })}>
                      {services.map((service: IService) => (
                        <option key={service.id} value={service.shortname}>
                          {service.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                <div className="control">
                  <label className="label">Amount</label>
                  <div className="field is-grouped">
                    <div className="control is-expanded">
                      <input
                        className="input"
                        type="number"
                        placeholder="$USD"
                        {...register("amount", { required: true, min: 0 })}
                      />
                    </div>
                    <div className="control">
                      <button type="submit" className="button is-success">
                        CREATE
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </form>
          </section>
        </div>
      </div>
      <Button primary onClick={switchModalState}>
        <Icon>
          <FaFileAlt />
        </Icon>
        <span>Create bill</span>
      </Button>
    </div>
  );
};

export default CreateBillModal;
