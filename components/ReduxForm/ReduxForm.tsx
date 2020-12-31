import {
  getCitiesByState,
  IDisplayData,
  IFormData,
  initialValues,
  states,
} from "../../code/constants";
import { formatMobileNumber } from "../../code/formatters";
import { validateMobileNumber } from "../../code/validators";
import React, { useState } from "react";
import { useSelector } from "react-redux";

import { maskAccountNumber } from "../../code/formatters";
import validate from "./validate";
import Select from "../common/Select";
import useRenderCount from "../../hooks/useRenderCount";
import RenderCount from "../common/RenderCount";
import {
  Field,
  formValueSelector,
  InjectedFormProps,
  reduxForm,
} from "redux-form";

const TEST_FORM = "TestForm";

const ErrorMessage = (meta: any) => (
  <>
    {meta.error && meta.touched && (
      <div className="text-danger">{meta.error}</div>
    )}
  </>
);

const renderField = ({ input, meta, ...props }) => {
  return (
    <>
      <label htmlFor={input.name}>{props.placeholder}</label>
      <input {...input} {...props} />
      <ErrorMessage {...meta} />
    </>
  );
};

interface IReduxForm extends InjectedFormProps {}

export function ReduxForm(props: IReduxForm) {
  const [submittedData, setSubmittedData] = useState<IFormData | null>(null);
  const [shouldMaskAccountNumber, setShouldMaskAccountNumber] = useState(false);
  const selector = formValueSelector(TEST_FORM);
  const reduxState = useSelector((state) => state);
  const mobile = selector(reduxState, "mobile");
  const state = selector(reduxState, "state");

  const onSubmit = (formValues) => {
    setSubmittedData({
      ...formValues,
    });
  };

  return (
    <>
      <h1 className="text-center pb-5">
        <a
          href="https://redux-form.com/8.3.0/"
          target="_blank"
          rel="noreferrer"
        >
          Redux Form
        </a>
      </h1>
      <div className="d-flex p-5">
        <div className="col">
          <form onSubmit={props.handleSubmit(onSubmit)}>
            <RenderCount />
            <div className="mb-3">
              <div className="form-group">
                <Field
                  component={renderField}
                  name="username"
                  type="text"
                  className="form-control"
                  placeholder="Username"
                  autoComplete="new-password"
                />
              </div>
            </div>

            <div className="mb-3">
              <div className="form-group">
                <Field
                  component={renderField}
                  type="text"
                  name="accountNumber"
                  className="form-control"
                  placeholder="Account Number"
                  format={(value: string) =>
                    validateMobileNumber(mobile) && shouldMaskAccountNumber
                      ? maskAccountNumber(value)
                      : value
                  }
                  onFocus={() => {
                    setShouldMaskAccountNumber(false);
                  }}
                  onBlur={() => {
                    setShouldMaskAccountNumber(true);
                  }}
                />
              </div>
            </div>

            <div className="mb-3">
              <div className="d-flex">
                <div className="form-check mr-5">
                  <Field
                    component={renderField}
                    name="gender"
                    type="radio"
                    className="form-check-input"
                    id="male"
                    value="male"
                  />
                  <label className="form-check-label" htmlFor="male">
                    Male
                  </label>
                </div>

                <div className="form-check mr-5">
                  <Field
                    component={renderField}
                    name="gender"
                    type="radio"
                    className="form-check-input"
                    id="female"
                    value="female"
                  />

                  <label className="form-check-label" htmlFor="female">
                    Female
                  </label>
                </div>

                <div className="form-check">
                  <Field
                    component={renderField}
                    name="gender"
                    type="radio"
                    className="form-check-input"
                    id="other"
                    value="other"
                  />
                  <label className="form-check-label" htmlFor="other">
                    Other
                  </label>
                </div>
              </div>
            </div>

            <div className="mb-3">
              <div className="form-group">
                <Field
                  component={renderField}
                  name="mobile"
                  placeholder="Mobile Number"
                  className="form-control"
                  maxLength={10}
                  format={(value) => value && formatMobileNumber(value)}
                />
              </div>
            </div>

            <div className="mb-3">
              <div className="form-group">
                <label htmlFor="state">State</label>
                <Field
                  name="state"
                  component={({ input, meta }) => {
                    return (
                      <>
                        <Select
                          options={states}
                          defaultLabel="Select State"
                          onChange={input.onChange}
                          defaultValue={input.value}
                        />
                        <ErrorMessage {...meta} />
                      </>
                    );
                  }}
                />
              </div>
            </div>

            <div className="mb-3">
              <div className="form-group">
                <label htmlFor="city">City</label>
                <Field
                  name="city"
                  component={({ input, meta }) => (
                    <>
                      <Select
                        options={getCitiesByState(state)}
                        defaultLabel="Select City"
                        id="city"
                        onChange={input.onChange}
                        defaultValue={input.value}
                        disabled={state === "default"}
                      />
                      <ErrorMessage {...meta} />
                    </>
                  )}
                />
              </div>
            </div>

            <div className="mb-3">
              <div className="form-group">
                <Field
                  component={renderField}
                  name="password"
                  type="password"
                  className="form-control"
                  placeholder="Password"
                />
              </div>
            </div>

            <div className="mb-3">
              <div className="form-group">
                <Field
                  component={renderField}
                  name="confirmPassword"
                  className="form-control"
                  placeholder="Confirm Password"
                  type="password"
                  autoComplete="new-password"
                />
              </div>
            </div>

            <div className="d-flex">
              <button
                className="btn btn-primary order-2"
                disabled={props.submitting || props.invalid}
                type="submit"
              >
                Submit
              </button>

              <button
                className="btn btn-outline-secondary mr-3 order-1"
                type="reset"
                onClick={() => {
                  props.reset();
                }}
              >
                Clear Form
              </button>
            </div>
          </form>
        </div>

        {submittedData && (
          <div className="col">
            <h4>Submiited Data</h4>
            <ul>
              {Object.entries(submittedData).map((data) => (
                <li key={data[0]}>{`${data[0]} : ${data[1]}`}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </>
  );
}

export default reduxForm({
  form: TEST_FORM,
  asyncValidate: validate,
  asyncBlurFields: ["username"],
  initialValues,
})(ReduxForm);
