import * as yup from "yup";

export const validateMobileNumber = (value = ""): boolean => {
  const match = value.replace(/\D/g, "").match(/^(\d{3})(\d{3})(\d{4})$/);
  return !!match;
};

export const getFormSchema = () => {
  const schema = yup.object().shape({
    username: yup.string().min(4).required("Username is a required field"),
    accountNumber: yup
      .string()
      .length(6)
      .required("AccountNumber is a required field"),
    gender: yup.string().required("Gender is a required field"),
    mobile: yup
      .string()
      .required("Mobilenumber is a required field")
      .test("len", "Must be 10 digits", (val) => validateMobileNumber(val)),
    state: yup.string().notOneOf(["default"], "State is a required field"),
    city: yup.string().notOneOf(["default"], "State is a required field"),
    password: yup.string().min(4).required("Password is a required field"),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref("password")], "Passwords must match")
      .required("Confirm Password is a required field"),
  });

  return schema;
};
