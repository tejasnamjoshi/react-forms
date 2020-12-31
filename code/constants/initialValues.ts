export enum GenderEnum {
  female = "female",
  male = "male",
  other = "other",
}

export interface IFormData {
  username: string;
  accountNumber: string;
  gender: GenderEnum | "";
  mobile: string;
  city: string;
  state: string;
  password: string;
  confirmPassword: string;
}

export const initialValues: IFormData = {
  username: "",
  accountNumber: "",
  gender: "",
  mobile: "",
  state: "default",
  city: "default",
  password: "",
  confirmPassword: "",
};

export interface IDisplayData extends IFormData {
  renderCount: number;
}
