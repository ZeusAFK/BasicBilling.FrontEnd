import React, { useState } from "react";
// @ts-ignore
import { Field, Control, Input, Button, Icon } from "reactbulma";
import { FaPlus } from "react-icons/fa";

type Props = {
  saveService: (e: React.FormEvent, formData: IService | any) => void;
};

const CreateService: React.FC<Props> = ({ saveService }) => {
  const [formData, setFormData] = useState<IService | {}>();

  const handleForm = (e: React.FormEvent<HTMLInputElement>): void => {
    setFormData({
      ...formData,
      [e.currentTarget.id]: e.currentTarget.value,
    });
  };

  return (
    <form className="Form" onSubmit={(e) => saveService(e, formData)}>
      <div>
        <div className="columns">
          <div className="column is-2">
            <Field>
              <label className="label">Name</label>
              <Control>
                <Input onChange={handleForm} id="name" />
              </Control>
            </Field>
          </div>
          <div className="column is-2">
            <Field>
              <label className="label">Shortname</label>
              <Control>
                <Input onChange={handleForm} id="shortname" />
              </Control>
            </Field>
          </div>
          <div className="column is-2">
            <Field>
              <label className="label">Description <em>(optional)</em></label>
              <Control>
                <Input onChange={handleForm} id="description" />
              </Control>
            </Field>
          </div>
          <div className="column is-2">
            <br />
            <Button
              medium
              primary
              disabled={formData === undefined ? true : false}
            >
              <Icon>
                <FaPlus />
              </Icon>
              <span>Create service</span>
            </Button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default CreateService;
