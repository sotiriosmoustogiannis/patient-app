import React from "react";
import { FormInputProps } from "../interfaces/formInputProps.ts";

const FormInput: React.FC<FormInputProps> = ({ label, name, type, placeholder, value, onChange, isValid, maxLength, errorMessage }) => {
  return (
    <div>
      <label htmlFor={name}>{label}: </label>
      <input
        type={type}
        placeholder={placeholder}
        name={name}
        id={name}
        onChange={onChange}
        maxLength={maxLength}
        value={value}
      />
      {!isValid && (
        <p style={{ color: 'red' }}>{errorMessage}</p>
      )}
    </div>
  );
};

export default FormInput;
