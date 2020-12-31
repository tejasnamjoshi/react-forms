import { getFormSchema } from "../../code/validators";
import { setIn } from "final-form";

const validateFormValues = (schema) => async (values) => {
  if (typeof schema === "function") {
    schema = schema();
  }
  try {
    await schema.validate(values, { abortEarly: false });
  } catch (err) {
    const errors = err.inner.reduce((formError, innerError) => {
      return setIn(formError, innerError.path, innerError.message);
    }, {});

    return errors;
  }
};
const validate = validateFormValues(getFormSchema());
export default validate;
