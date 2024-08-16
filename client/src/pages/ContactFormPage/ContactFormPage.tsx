import React, { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { debounce } from 'lodash';
import { validateAndFormatField } from '../../utils/validationHelpers';
import { FormInputProps } from '../../interfaces/formInputProps';
import useCreateContact from '../../hooks/api/useCreateContact';
import FormInput from '../../components/FormInput/FormInput';
import { Contact } from '../../interfaces/contact';
import { FieldName } from '../../types/types';
import './ContactFormPage.scss';

interface FormFieldErrors {
  [key: string]: string | null;
};

const ContactFormPage: React.FC = () => {
  const navigate = useNavigate();

  const [contactFormData, setContactFormData] = useState<Contact>({
    name: "",
    surname: "",
    phone: "",
    birthDate: "",
    text: ""
  });

  const [fieldErrors, setFieldErrors] = useState<FormFieldErrors>({});
  const [formError, setFormError] = useState<string | null>(null);

  const { createContact, isLoading, error } = useCreateContact({
    onSuccess: () => {
      // Navigate to contacts page after successful creation
      navigate('/contacts');
    }
  });

  // Debounced function that delays form fields validation errors
  const debouncedValidateField = useCallback(
    debounce((fieldName: FieldName, validationError: string|null) => {

      setFieldErrors((prevErrors) => ({
        ...prevErrors,
        [fieldName]: validationError,
      }));
    }, 400),
    []
  );

  const handleChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = evt.target;
    const fieldName = name as FieldName;

    const { formattedValue, error: validationError } = validateAndFormatField(fieldName, value);

    setContactFormData((currData) => ({
      ...currData,
      [fieldName]: formattedValue,
    }));

    debouncedValidateField(fieldName, validationError);
  };

  const handleSubmit = async (evt: React.FormEvent) => {
    evt.preventDefault();

    const hasErrors = Object.values(fieldErrors).some((error) => error !== null);
    
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
          isValid: !fieldErrors.name,
          errorMessage: fieldErrors.name,
        })}
        {renderFormInput({
          label: 'Surname',
          name: 'surname',
          type: 'text',
          placeholder: 'Enter your surname',
          value: contactFormData.surname,
          onChange: handleChange,
          isValid: !fieldErrors.surname,
          errorMessage: fieldErrors.surname,
        })}
        {renderFormInput({
          label: 'Phone',
          name: 'phone',
          type: 'text',
          placeholder: 'Enter your phone number',
          value: contactFormData.phone,
          onChange: handleChange,
          isValid: !fieldErrors.phone,
          maxLength: 14,
          errorMessage: fieldErrors.phone,
        })}
        {renderFormInput({
          label: 'Birth Date',
          name: 'birthDate',
          type: 'text',
          placeholder: 'Enter your birth date (YYYY-MM-DD)',
          value: contactFormData.birthDate,
          onChange: handleChange,
          isValid: !fieldErrors.birthDate,
          maxLength: 10,
          errorMessage: fieldErrors.birthDate,
        })}
        {renderFormInput({
          label: 'Text',
          name: 'text',
          type: 'text',
          placeholder: 'Additional information',
          value: contactFormData.text,
          onChange: handleChange,
          isValid: !fieldErrors.text,
          errorMessage: fieldErrors.text,
        })}

        <button type="submit" disabled={isLoading || !!error}>Add Contact</button>
        {formError && <p className="form-error-message">{formError}</p>}
        {error && <p className="form-error-message">{error}</p>}
      </form>
    </div>
  );
};

export default ContactFormPage;
