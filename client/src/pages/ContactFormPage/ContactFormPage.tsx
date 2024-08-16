import React, { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { debounce } from 'lodash';
import { validateAndFormatField } from '../../utils/validationHelpers';
import useCreateContact from '../../hooks/api/useCreateContact';
import FormInput from '../../components/FormInput/FormInput';
import { Contact } from '../../interfaces/contact';
import { FieldName } from '../../types/types';
import './ContactFormPage.scss';
import { FormInputProps } from '../../interfaces/formInputProps';

interface FormErrors {
  [key: string]: string | null;
}

const ContactFormPage: React.FC = () => {
  const navigate = useNavigate();

  const [contactFormData, setContactFormData] = useState<Contact>({
    name: "",
    surname: "",
    phone: "",
    birthDate: "",
    text: ""
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [formError, setFormError] = useState<string | null>(null);

  const { createContact, isLoading, error } = useCreateContact({
    onSuccess: () => {
      // Navigate to contacts page after successful creation
      navigate('/contacts');
    }
  });

  // Debounced validation function
  const debouncedValidateField = useCallback(
    debounce((fieldName: FieldName, value: string) => {
      const { error: validationError } = validateAndFormatField(fieldName, value);

      setErrors((prevErrors) => ({
        ...prevErrors,
        [fieldName]: validationError,
      }));
    }, 400),
    []
  );

  const handleChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = evt.target;
    const fieldName = name as FieldName;

    const { formattedValue } = validateAndFormatField(fieldName, value);

    setContactFormData((currData) => ({
      ...currData,
      [fieldName]: formattedValue,
    }));

    debouncedValidateField(fieldName, formattedValue);
  };

  const handleSubmit = async (evt: React.FormEvent) => {
    evt.preventDefault();

    const hasErrors = Object.values(errors).some((error) => error !== null);
    const hasContactEmptyField = Object.values(contactFormData).some(
      (contact) => contact === ""
    );

    if (hasContactEmptyField) {
      setFormError('Please fill all the fields.');
      return;
    }

    if (hasErrors) {
      setFormError('Please fix the validation errors before submitting.');
      return;
    }

    setFormError(null);

    try {
      createContact(contactFormData);
    } catch (e) {
      setFormError('Failed to create contact. Please try again.');
    }
  };

  const renderFormInput = (props: FormInputProps) => (
    <FormInput {...props} />
  );

  return (
    <div className="contact-form-container">
      <form className="contact-form" onSubmit={handleSubmit}>
        {renderFormInput({
          label: 'Name',
          name: 'name',
          type: 'text',
          placeholder: 'Enter your name',
          value: contactFormData.name,
          onChange: handleChange,
          isValid: !errors.name,
          errorMessage: errors.name,
        })}
        {renderFormInput({
          label: 'Surname',
          name: 'surname',
          type: 'text',
          placeholder: 'Enter your surname',
          value: contactFormData.surname,
          onChange: handleChange,
          isValid: !errors.surname,
          errorMessage: errors.surname,
        })}
        {renderFormInput({
          label: 'Phone',
          name: 'phone',
          type: 'text',
          placeholder: 'Enter your phone number',
          value: contactFormData.phone,
          onChange: handleChange,
          isValid: !errors.phone,
          maxLength: 14,
          errorMessage: errors.phone,
        })}
        {renderFormInput({
          label: 'Birth Date',
          name: 'birthDate',
          type: 'text',
          placeholder: 'Enter your birth date (YYYY-MM-DD)',
          value: contactFormData.birthDate,
          onChange: handleChange,
          isValid: !errors.birthDate,
          maxLength: 10,
          errorMessage: errors.birthDate,
        })}
        {renderFormInput({
          label: 'Text',
          name: 'text',
          type: 'text',
          placeholder: 'Additional information',
          value: contactFormData.text,
          onChange: handleChange,
          isValid: !errors.text,
          errorMessage: errors.text,
        })}

        <button type="submit" disabled={isLoading || !!error}>Add Contact</button>
        {formError && <p className="form-error-message">{formError}</p>}
        {error && <p className="form-error-message">{error}</p>}
      </form>
    </div>
  );
};

export default ContactFormPage;
