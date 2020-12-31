export const formatMobileNumber = (value: string) => {
  const cleaned = stripSpecialChars(value);
  const match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);
  if (match) return "(" + match[1] + ") " + match[2] + "-" + match[3];
  return value;
};

export const stripSpecialChars = (value: string) => {
  return value.replace(/[()_-\D#]/gi, "");
};

export const maskAccountNumber = (value: string): string =>
  value && value.padEnd(6).replace(/\d(?=\d{4})/g, "#");
