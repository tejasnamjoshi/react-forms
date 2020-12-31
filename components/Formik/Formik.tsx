import {
  getCitiesByState,
  IDisplayData,
  IFormData,
  initialValues,
  states,
} from "../../code/constants";
import {
  formatMobileNumber,
  maskAccountNumber,
  stripSpecialChars,
} from "../../code/formatters";
import { getFormSchema, validateMobileNumber } from "../../code/validators";
import { ErrorMessage, Field, Formik as FormikForm } from "formik";
import React, { useRef, useState } from "react";
import Select from "../common/Select";
import RenderCount from "../common/RenderCount";

export function Formik() {
  const [submittedData, setSubmittedData] = useState<IFormData | null>(null);
  const accountNumber = useRef("");

  const handleResetForm = () => {
    accountNumber.current = initialValues.accountNumber;
  };

  return (
    <>
      <h1 className="text-center pb-5">
        <a href="https://formik.org/" target="_blank" rel="noreferrer">
          Formik Form
        </a>
      </h1>
      <div className="d-flex p-5">
        <div className="col-6">
          <FormikForm<IFormData>
            validationSchema={getFormSchema()}
            initialValues={initialValues}
            onSubmit={(formValues, formHelpers) => {
              setSubmittedData({
                ...formValues,
                accountNumber: accountNumber.current,
                mobile: stripSpecialChars(formValues.mobile),
              });
              formHelpers.setSubmitting(false);
              handleResetForm();
              formHelpers.resetForm();
            }}
          >
            {({
              handleSubmit,
              isSubmitting,
              isValid,
              values,
              setFieldValue,
              handleReset,
            }) => (
              <form onSubmit={handleSubmit} onReset={handleReset}>
                <RenderCount />
                <div className="mb-3">
                  <div className="form-group">
                    <label htmlFor="username">Username</label>
                    <Field
                      name="username"
                      type="text"
                      className="form-control"
                      placeholder="Username"
                      autoComplete="new-password"
                    />
                    <ErrorMessage
                      component="div"
                      name="username"
                      className="text-danger"
                    />
                  </div>
                </div>

                <div className="mb-3">
                  <div className="form-group">
                    <label htmlFor="accountNumber">Account Number</label>
                    <Field
                      name="accountNumber"
                      className="form-control"
                      placeholder="Account Number"
                      onFocus={() =>
                        setFieldValue("accountNumber", accountNumber.current)
                      }
                      onBlur={() => {
                        if (
                          values.mobile &&
                          validateMobileNumber(values.mobile)
                        ) {
                          setFieldValue(
                            "accountNumber",
                            maskAccountNumber(accountNumber.current)
                          );
                        }
                      }}
                      onChange={(e) => {
                        setFieldValue("accountNumber", e.target.value);
                        accountNumber.current = e.target.value;
                      }}
                    />
                  </div>
                  <ErrorMessage
                    name="accountNumber"
                    component="div"
                    className="text-danger"
                  />
                </div>

                <div className="mb-3">
                  <div className="d-flex">
                    <div className="form-check mr-5">
                      <Field
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
                    <label htmlFor="mobile">Mobile Number</label>
                    <Field
                      name="mobile"
                      placeholder="Mobile Number"
                      className="form-control"
                      maxLength={10}
                      onChange={(e) => {
                        const value = formatMobileNumber(e.target.value);
                        setFieldValue("mobile", value);
                        if (value && validateMobileNumber(value)) {
                          setFieldValue(
                            "accountNumber",
                            maskAccountNumber(accountNumber.current)
                          );
                        }
                      }}
                    />
                    <ErrorMessage
                      component="div"
                      name="mobile"
                      className="text-danger"
                    />
                  </div>
                </div>

                <div className="mb-3">
                  <div className="form-group">
                    <label htmlFor="state">State</label>
                    <Field
                      as={Select}
                      options={states}
                      defaultLabel="Select State"
                      id="state"
                      name="state"
                    />
                    <ErrorMessage
                      component="div"
                      name="state"
                      className="text-danger"
                    />
                  </div>
                </div>

                <div className="mb-3">
                  <div className="form-group">
                    <label htmlFor="city">City</label>
                    <Field
                      as={Select}
                      options={getCitiesByState(values.state)}
                      defaultLabel="Select City"
                      id="city"
                      name="city"
                      disabled={values.state === "default"}
                    />
                    <ErrorMessage
                      component="div"
                      name="city"
                      className="text-danger"
                    />
                  </div>
                </div>

                <div className="mb-3">
                  <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <Field
                      name="password"
                      type="password"
                      className="form-control"
                      placeholder="Password"
                      autoComplete="new-password"
                    />
                    <ErrorMessage
                      component="div"
                      name="password"
                      className="text-danger"
                    />
                  </div>
                </div>

                <div className="mb-3">
                  <div className="form-group">
                    <label htmlFor="confirmPassword">Confirm Password</label>
                    <Field
                      name="confirmPassword"
                      className="form-control"
                      placeholder="Confirm Password"
                      type="password"
                    />
                    <ErrorMessage
                      component="div"
                      name="confirmPassword"
                      className="text-danger"
                    />
                  </div>
                </div>

                <div className="d-flex">
                  <button
                    className="btn btn-primary order-2"
                    disabled={!isValid && !isSubmitting}
                    type="submit"
                  >
                    Submit
                  </button>

                  <button
                    className="btn btn-outline-secondary mr-3 order-1"
                    type="button"
                    onClick={(e) => {
                      handleResetForm();
                      handleReset(e);
                    }}
                  >
                    Clear Form
                  </button>
                </div>
              </form>
            )}
          </FormikForm>
        </div>

        {submittedData && (
          <div className="col-6">
            <h4>Submitted Data</h4>
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

export default Formik;
