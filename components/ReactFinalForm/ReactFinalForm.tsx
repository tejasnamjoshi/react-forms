import {
  getCitiesByState,
  IDisplayData,
  IFormData,
  initialValues,
  states,
} from "../../code/constants";
import { formatMobileNumber } from "../../code/formatters";
import { validateMobileNumber } from "../../code/validators";
import React, { useRef, useState } from "react";
import { Field, Form as FinalForm, FormSpy } from "react-final-form";

import { maskAccountNumber } from "../../code/formatters";
import validate from "./validate";
import Select from "../common/Select";
import useRenderCount from "../../hooks/useRenderCount";
import RenderCount from "../common/RenderCount";

const ErrorMessage = (meta: any) => (
  <>
    {meta.error && meta.touched && (
      <div className="text-danger">{meta.error}</div>
    )}
  </>
);

export function ReactFinalForm() {
  const [submittedData, setSubmittedData] = useState<IFormData | null>(null);
  const accountNumber = useRef("");

  const onSubmit = (formValues: IFormData) => {
    setSubmittedData({
      ...formValues,
    });
  };

  return (
    <>
      <h1 className="text-center pb-5">
        <a href="https://final-form.org/react" target="_blank" rel="noreferrer">
          React Final Form
        </a>
      </h1>
      <div className="d-flex p-5">
        <div className="col">
          <FinalForm
            onSubmit={onSubmit}
            validate={validate}
            initialValues={initialValues}
            validateOnBlur={true}
            subscription={{ submitting: true, invalid: true }}
            render={({ handleSubmit, form, submitting, invalid }) => (
              <form
                onSubmit={(event) => {
                  handleSubmit(event);
                  form.reset();
                }}
              >
                <RenderCount />
                <div className="mb-3">
                  <div className="form-group">
                    <Field name="username">
                      {({ input, meta }) => (
                        <>
                          <label htmlFor="username">Username</label>
                          <input
                            {...input}
                            type="text"
                            className="form-control"
                            placeholder="Username"
                            autoComplete="new-password"
                          />
                          <ErrorMessage {...meta} />
                        </>
                      )}
                    </Field>
                  </div>
                </div>

                <div className="mb-3">
                  <div className="form-group">
                    <FormSpy
                      subscription={{ values: true }}
                      render={({ values }) => {
                        return (
                          <Field name="accountNumber">
                            {({ input, meta }) => (
                              <>
                                <label htmlFor="accountNumber">
                                  Account Number
                                </label>
                                <input
                                  {...input}
                                  onChange={(e) => {
                                    input.onChange(e);
                                    accountNumber.current = e.target.value;
                                  }}
                                  onFocus={() => {
                                    form.change(
                                      "accountNumber",
                                      accountNumber.current
                                    );
                                  }}
                                  onBlur={() => {
                                    if (validateMobileNumber(values.mobile))
                                      form.change(
                                        "accountNumber",
                                        maskAccountNumber(accountNumber.current)
                                      );
                                  }}
                                  className="form-control"
                                  placeholder="Account Number"
                                />
                                <ErrorMessage {...meta} />
                              </>
                            )}
                          </Field>
                        );
                      }}
                    />
                  </div>
                </div>

                <div className="mb-3">
                  <div className="d-flex">
                    <div className="form-check mr-5">
                      <Field
                        component={"input"}
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
                        component={"input"}
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
                        component={"input"}
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
                  <ErrorMessage
                    component="div"
                    name="gender"
                    className="text-danger"
                  />
                </div>

                <div className="mb-3">
                  <div className="form-group">
                    <Field
                      name="mobile"
                      format={(value) => formatMobileNumber(value)}
                    >
                      {({ input, meta }) => (
                        <>
                          <label htmlFor="mobile">Mobile Number</label>
                          <input
                            {...input}
                            type="text"
                            placeholder="Mobile Number"
                            className="form-control"
                            maxLength={10}
                            onChange={(e) => {
                              input.onChange(e);
                              form.change(
                                "accountNumber",
                                validateMobileNumber(e.target.value)
                                  ? maskAccountNumber(accountNumber.current)
                                  : accountNumber.current
                              );
                            }}
                          />
                          <ErrorMessage {...meta} />
                        </>
                      )}
                    </Field>
                  </div>
                </div>

                <div className="mb-3">
                  <div className="form-group">
                    <label htmlFor="state">State</label>
                    <Field
                      name="state"
                      render={({ input, meta }) => (
                        <>
                          <Select
                            options={states}
                            defaultLabel="Select State"
                            onChange={input.onChange}
                          />
                          <ErrorMessage {...meta} />
                        </>
                      )}
                    ></Field>
                  </div>
                </div>

                <div className="mb-3">
                  <div className="form-group">
                    <label htmlFor="city">City</label>
                    <FormSpy
                      subscription={{ values: true }}
                      render={({ values }) => {
                        return (
                          <Field
                            name="city"
                            render={({ input, meta }) => (
                              <>
                                <Select
                                  options={getCitiesByState(values.state)}
                                  defaultLabel="Select City"
                                  id="city"
                                  onChange={input.onChange}
                                  disabled={values.state === "default"}
                                />
                                <ErrorMessage {...meta} />
                              </>
                            )}
                          />
                        );
                      }}
                    />
                  </div>
                </div>

                <div className="mb-3">
                  <div className="form-group">
                    <Field name="password">
                      {({ input, meta }) => (
                        <>
                          <label htmlFor="password">Password</label>
                          <input
                            type="password"
                            className="form-control"
                            placeholder="Password"
                            autoComplete="new-password"
                            {...input}
                          />
                          <ErrorMessage {...meta} />
                        </>
                      )}
                    </Field>
                  </div>
                </div>

                <div className="mb-3">
                  <div className="form-group">
                    <Field name="confirmPassword">
                      {({ input, meta }) => (
                        <>
                          <label htmlFor="confirmPassword">Password</label>
                          <input
                            type="password"
                            className="form-control"
                            placeholder="Confirm Password"
                            {...input}
                          />
                          <ErrorMessage {...meta} />
                        </>
                      )}
                    </Field>
                  </div>
                </div>

                <div className="d-flex">
                  <button
                    className="btn btn-primary order-2"
                    disabled={submitting || invalid}
                    type="submit"
                  >
                    Submit
                  </button>

                  <button
                    className="btn btn-outline-secondary mr-3 order-1"
                    type="reset"
                    onClick={() => {
                      form.reset();
                    }}
                  >
                    Clear Form
                  </button>
                </div>
              </form>
            )}
          ></FinalForm>
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

export default ReactFinalForm;
