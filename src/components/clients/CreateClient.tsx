import React, { useState } from "react";
// @ts-ignore
import { Field, Control, Input, Button, Icon } from "reactbulma";
import { FaPlus } from "react-icons/fa";

type Props = {
  saveClient: (e: React.FormEvent, formData: IClient | any) => void;
};

const CreateClient: React.FC<Props> = ({ saveClient }) => {
  const [formData, setFormData] = useState<IClient | {}>();

  const handleForm = (e: React.FormEvent<HTMLInputElement>): void => {
    setFormData({
      ...formData,
      [e.currentTarget.id]: e.currentTarget.value,
    });
  };

  return (
    <form className="Form" onSubmit={(e) => saveClient(e, formData)}>
      <div>
        <div className="columns">
          <div className="column is-2">
            <Field>
              <label className="label">Firstname</label>
              <Control>
                <Input onChange={handleForm} id="firstname" />
              </Control>
            </Field>
          </div>
          <div className="column is-2">
            <Field>
              <label className="label">Lastname</label>
              <Control>
                <Input onChange={handleForm} id="lastname" />
              </Control>
            </Field>
          </div>
          <div className="column is-2">
            <Field>
              <label className="label">
                Middlename <em>(optional)</em>
              </label>
              <Control>
                <Input onChange={handleForm} id="middlename" />
              </Control>
            </Field>
          </div>
          <div className="column is-2">
            <Field>
              <label className="label">Document</label>
              <Control>
                <Input onChange={handleForm} id="document" />
              </Control>
            </Field>
          </div>
          <div className="column is-2">
            <br/>
            <Button medium primary disabled={formData === undefined ? true : false}>
              <Icon>
                <FaPlus />
              </Icon>
              <span>Create client</span>
            </Button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default CreateClient;
