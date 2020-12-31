import React from 'react';

type Option = {
  label: React.ReactNode;
  value: string | number;
};

interface ISelectProps
  extends React.DetailedHTMLProps<
    React.SelectHTMLAttributes<HTMLSelectElement>,
    HTMLSelectElement
  > {
  options: Option[];
  defaultLabel?: string;
}

const Select = React.forwardRef(
  (
    { defaultLabel, value, ...props }: ISelectProps,
    ref: React.Ref<HTMLSelectElement>
  ) => (
    <select
      ref={ref}
      id={props.id}
      name={props.name}
      className={`custom-select ${props.className ?? ''}`}
      disabled={props.disabled}
      defaultValue="default"
      onChange={props.onChange ? props.onChange : () => null}
      {...props}
    >
      {defaultLabel && (
        <option disabled value="default">
          {defaultLabel}
        </option>
      )}
      {props.options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  )
);

export default Select;