import React from "react";
import { FormInputProps } from "../interfaces/formInputProps.ts";
import '../styles/ContactFormPage.css'; // Import the CSS file

const FormInput: React.FC<FormInputProps> = ({ label, name, type, placeholder, value, onChange, isValid, maxLength, errorMessage }) => {
  return (
    <div className="contact-form-input">
      <label htmlFor={name}>{label}</label>
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
        <p className="error-message">{errorMessage}</p>
      )}
    </div>
  );
};

export default FormInput;
