import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useCreateContact from '../hooks/api/useCreateContact';
import { validateRequiredField, validatePhoneNumber, validateBirthDate } from '../utils/validations';
import { formatBirthDate, formatPhoneNumber } from '../utils/formats';
import FormInput from '../components/FormInput';

const ContactFormPage: React.FC = () => {
  const navigate = useNavigate();

  const [contactFormData, setContactFormData] = useState({ 
    name: "",
    surname: "",
    phone: "",
    birthDate: "",
    text: "" 
  });

  const [errors, setErrors] = useState<{ [key: string]: string | null }>({});

  const { createContact, isLoading, error } = useCreateContact(() => {
    navigate('/');
  });

  const handleChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = evt.target;

    let validationError: string | null = null;
    let formattedValue = value;

    if (!validateRequiredField(value)) {
      validationError = 'This field is required';
    } else if (name === 'phone') {
      if (!validatePhoneNumber(value)) {
        validationError = 'Invalid phone number';
      } else {
        formattedValue = formatPhoneNumber(value);
      }
    } else if (name === 'birthDate') {
      if (!validateBirthDate(value)) {
        validationError = 'Invalid date format';
      } else {
        formattedValue = formatBirthDate(value);
      }
    }

    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: validationError,
    }));

    setContactFormData((currData) => ({
      ...currData,
      [name]: formattedValue,
    }));
  };

  const handleSubmit = async (evt: React.FormEvent) => {
    evt.preventDefault();

    // Final validation check before submission
    const hasErrors = Object.values(errors).some((error) => error !== null);

    if (!hasErrors) {
      createContact(contactFormData);
    } else {
      alert('Please fix the validation errors before submitting.');
    }
  };
  
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <FormInput
          label="Name"
          name="name"
          type="text"
          placeholder="name"
          value={contactFormData.name}
          onChange={handleChange}
          isValid={!errors.name}
          errorMessage={errors.name}
        />
        
        <FormInput
          label="Surname"
          name="surname"
          type="text"
          placeholder="surname"
          value={contactFormData.surname}
          onChange={handleChange}
          isValid={!errors.surname}
          errorMessage={errors.surname}
        />

        <FormInput
          label="Phone"
          name="phone"
          type="text"
          placeholder="phone"
          value={contactFormData.phone}
          onChange={handleChange}
          isValid={!errors.phone}
          errorMessage={errors.phone}
        />

        <FormInput
          label="Birth Date"
          name="birthDate"
          type="text"
          placeholder="birthDate"
          value={contactFormData.birthDate}
          onChange={handleChange}
          isValid={!errors.birthDate}
          maxLength={10}
          errorMessage={errors.birthDate}
        />

        <FormInput
          label="Text"
          name="text"
          type="text"
          placeholder="text"
          value={contactFormData.text}
          onChange={handleChange}
          isValid={!errors.text}
          errorMessage={errors.text}
        />

        <button type="submit" disabled={isLoading || !!error}>Add Item</button>
        {error && <p style={{ color: 'red' }}>{error}</p>}
      </form>
    </div>
  );
}

export default ContactFormPage;
