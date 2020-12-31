import { DevTool } from "@hookform/devtools";
import { yupResolver } from "@hookform/resolvers/yup";
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
import React, { useEffect, useRef, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import Select from "../common/Select";
import RenderCount from "../common/RenderCount";
import useRenderCount from "../../hooks/useRenderCount";

const ReactHookForm = (): React.ReactNode => {
  const { count, resetCount } = useRenderCount();
  const accountNumber = useRef("");
  const {
    formState,
    register,
    errors,
    watch,
    control,
    handleSubmit,
    reset,
    setValue,
    getValues,
  } = useForm<IFormData>({
    resolver: yupResolver(getFormSchema()),
    mode: "onBlur",
    defaultValues: initialValues,
  });
  const { isValid, isSubmitting } = formState;
  const [submittedData, setSubmittedData] = useState<IFormData | null>(null);
  const state = watch("state");

  const resetForm = () => {
    reset();
    resetCount();
  };

  const onSubmit = handleSubmit((data) => {
    setSubmittedData({
      ...data,
      accountNumber: accountNumber.current,
      mobile: stripSpecialChars(data.mobile),
    });
    resetForm();
  });

  return (
    <>
      <h1 className="text-center pb-5">
        <a href="https://react-hook-form.com/" target="_blank" rel="noreferrer">
          React Hooks Form
        </a>
      </h1>
      <div className="d-flex p-5">
        <form className="Form col-6" onSubmit={onSubmit} autoComplete="false">
          <RenderCount />
          <div className="mb-3">
            <div className="form-group">
              <label htmlFor="username">Username</label>
              <input
                ref={register}
                type="text"
                className="form-control"
                id="username"
                name="username"
                placeholder="Username"
                aria-label="Username"
                aria-describedby="Username"
                autoComplete="new-password"
              />
            </div>
            <div className="text-danger">{errors?.username?.message}</div>
          </div>

          <div className="mb-3">
            <div className="form-group">
              <label htmlFor="accountNumber">Account Number</label>
              <Controller
                id="accountNumber"
                name="accountNumber"
                control={control}
                render={({ onBlur, ...params }) => (
                  <input
                    {...params}
                    name="accountNumber"
                    placeholder="Account Number"
                    aria-label="Account Number"
                    aria-describedby="Account Number"
                    type="text"
                    className="form-control"
                    id="accountNumber"
                    onFocus={() => {
                      setValue("accountNumber", accountNumber.current);
                    }}
                    onBlur={() => {
                      const mobile = getValues("mobile");
                      const formAccountNumber = getValues("accountNumber");
                      setValue(
                        "accountNumber",
                        mobile && validateMobileNumber(mobile)
                          ? maskAccountNumber(formAccountNumber)
                          : formAccountNumber
                      );
                      accountNumber.current = formAccountNumber;
                      onBlur();
                    }}
                  />
                )}
              />
            </div>
            <div className="text-danger">{errors?.accountNumber?.message}</div>
          </div>

          <div className="mb-3">
            <div className="d-flex">
              <div className="form-check mr-5">
                <input
                  ref={register}
                  className="form-check-input"
                  type="radio"
                  name="gender"
                  id="male"
                  value="male"
                />
                <label className="form-check-label" htmlFor="male">
                  Male
                </label>
              </div>

              <div className="form-check mr-5">
                <input
                  ref={register}
                  className="form-check-input"
                  type="radio"
                  name="gender"
                  id="female"
                  value="female"
                />
                <label className="form-check-label" htmlFor="female">
                  Female
                </label>
              </div>

              <div className="form-check">
                <input
                  ref={register}
                  className="form-check-input"
                  type="radio"
                  name="gender"
                  id="other"
                />
                <label className="form-check-label" htmlFor="other">
                  Other
                </label>
              </div>
            </div>
            <div className="text-danger">{errors?.gender?.message}</div>
          </div>

          <div className="mb-3">
            <div className="form-group">
              <label htmlFor="mobile">Mobile Number</label>
              <Controller
                id="mobile"
                control={control}
                name="mobile"
                render={({ value, onChange }) => (
                  <input
                    type="text"
                    name="mobile"
                    className="form-control"
                    placeholder="Mobile Number"
                    aria-label="Mobile Number"
                    aria-describedby="Mobile Number"
                    value={value}
                    onChange={(e) => {
                      const mobile = e.target.value;
                      const formAccountNumber = getValues("accountNumber");
                      if (mobile && validateMobileNumber(mobile)) {
                        setValue(
                          "accountNumber",
                          maskAccountNumber(formAccountNumber)
                        );
                      }
                      onChange(formatMobileNumber(mobile));
                    }}
                  />
                )}
              />
            </div>
            <div className="text-danger">{errors?.mobile?.message}</div>
          </div>

          <div className="mb-3">
            <div className="form-group">
              <label htmlFor="state">State</label>
              <Select
                options={states}
                defaultLabel="Select State"
                ref={register}
                id="state"
                name="state"
                onChange={() => {
                  setValue("city", "default");
                }}
              />
              <div className="text-danger">{errors?.state?.message}</div>
            </div>
          </div>

          <div className="mb-3">
            <div className="form-group">
              <label htmlFor="city">City</label>
              <Select
                options={getCitiesByState(state)}
                defaultLabel="Select City"
                ref={register}
                id="city"
                name="city"
                disabled={state === "default"}
              />
              <div className="text-danger">{errors?.city?.message}</div>
            </div>
          </div>

          <div className="mb-3">
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                ref={register}
                type="password"
                className="form-control"
                id="password"
                name="password"
                placeholder="Password"
                aria-label="Password"
                aria-describedby="Password"
                autoComplete="new-password"
              />
            </div>
            <div className="text-danger">{errors?.password?.message}</div>
          </div>

          <div className="mb-3">
            <div className="form-group">
              <label htmlFor="confirmPassword">Confirm Password</label>
              <input
                ref={register}
                type="password"
                className="form-control"
                id="confirmPassword"
                name="confirmPassword"
                placeholder="Confirm Password"
                aria-label="Confirm Password"
                aria-describedby="Confirm Password"
              />
            </div>
            <div className="text-danger">
              {errors?.confirmPassword?.message}
            </div>
          </div>

          <div className="d-flex">
            <button
              className="btn btn-primary order-2"
              disabled={!isValid || isSubmitting}
              type="submit"
            >
              Submit
            </button>

            <button
              className="btn btn-outline-secondary mr-3 order-1"
              type="button"
              onClick={() => {
                resetForm();
                setSubmittedData(null);
              }}
            >
              Clear Form
            </button>
          </div>
        </form>

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
      <DevTool control={control} />
    </>
  );
};

export default ReactHookForm;
