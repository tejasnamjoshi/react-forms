import { getFormSchema } from "../../code/validators";

const validateFormValues = (schema) => async (formValues) => {
  try {
    await schema.validate(formValues, { abortEarly: false });
    console.log("here");
    return {};
  } catch (errors) {
    const e = errors.inner.reduce(
      (errors, err) => ({
        ...errors,
        [err.path]: err.message,
      }),
      {}
    );
    throw e;
  }
};
const validate = validateFormValues(getFormSchema());
export default validate;
