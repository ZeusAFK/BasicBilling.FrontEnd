import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { getServices } from "../../api/services";
import { createBill } from "../../api/billing";
import { store } from "react-notifications-component";
import { setModalState } from "../../store/actions/billing/billing";
// @ts-ignore
import logging from "../../config/logging";
import { Store } from "../../store/configureStore";

const CreateBillModal: React.FC = () => {
  const dispatch = useDispatch();

  interface StateProps {
    client: IClient;
    isModal: boolean;
  }

  const { client, isModal } = useSelector<Store, StateProps>((state: Store) => {
    return {
      client: state.billing.createBillClient,
      isModal: state.billing.modalState,
    };
  });

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
          setPeriod("");
          setAmount("");
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

  const active = isModal ? "is-active" : "";

  const switchModalState = (
    e: React.MouseEvent<HTMLDivElement> | React.MouseEvent<HTMLButtonElement>
  ): void => {
    dispatch(setModalState(!isModal));
  };

  const [services, setServices] = useState<IService[]>([]);
  const [servicesLoaded, setServicesLoaded] = useState<boolean>(false);

  const fetchServices = (): void => {
    getServices()
      .then(({ data }: IService[] | any) => setServices(data))
      .catch((err: Error) => logging.error(err));
  };

  if (isModal && !servicesLoaded) {
    setServicesLoaded(true);
    fetchServices();
  }

  const [period, setPeriod] = useState<string>("");
  const [amount, setAmount] = useState<number | string>("");

  const handlePeriodChange = (e: {
    target: { value: React.SetStateAction<string> };
  }) => setPeriod(e.target.value);

  const handleAmountChange = (e: {
    target: { value: React.SetStateAction<string | number> };
  }) => setAmount(e.target.value);

  return (
    <div className="App">
      <div className={`modal ${active}`}>
        <div className="modal-background" onClick={switchModalState} />
        <div className="modal-card">
          <header className="modal-card-head">
            <p className="modal-card-title">
              <b>
                Create bill for: {client?.firstname} {client?.lastname}
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
                    value={period}
                    onChange={handlePeriodChange}
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
                        value={amount}
                        onChange={handleAmountChange}
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
    </div>
  );
};

export default CreateBillModal;
