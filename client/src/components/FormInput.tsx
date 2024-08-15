import React from "react";
import { FormInputProps } from "../interfaces/formInputProps";
import '../styles/FormInput.scss';

const FormInput: React.FC<FormInputProps> = ({
  type,
  name,
  value,
  label,
  isValid,
  onChange,
  maxLength,
  placeholder,
  errorMessage
}) => {
  return (
    <div className="contact-form-input">
      <label htmlFor={name}>{label}</label>
      <input
        id={name}
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        maxLength={maxLength}
        placeholder={placeholder}
      />
      {!isValid && 
        <p className="error-message">{errorMessage}</p>
      }
    </div>
  );
};

export default FormInput;
