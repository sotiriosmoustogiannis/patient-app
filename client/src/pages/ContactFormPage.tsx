import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useCreateContact from '../hooks/api/useCreateContact';
import FormInput from '../components/FormInput';
import '../styles/ContactFormPage.css';
import { validateAndFormatField } from '../utils/validationHelpers';

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
    navigate('/contacts');
  });

  const handleChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = evt.target;

    const { error: validationError, formattedValue } = validateAndFormatField(name, value);

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
    <div className="contact-form-container">
      <form className="contact-form" onSubmit={handleSubmit}>
        <FormInput
          label="Name"
          name="name"
          type="text"
          placeholder="Enter your name"
          value={contactFormData.name}
          onChange={handleChange}
          isValid={!errors.name}
          errorMessage={errors.name}
        />

        <FormInput
          label="Surname"
          name="surname"
          type="text"
          placeholder="Enter your surname"
          value={contactFormData.surname}
          onChange={handleChange}
          isValid={!errors.surname}
          errorMessage={errors.surname}
        />

        <FormInput
          label="Phone"
          name="phone"
          type="text"
          placeholder="Enter your phone number"
          value={contactFormData.phone}
          onChange={handleChange}
          isValid={!errors.phone}
          maxLength={14}
          errorMessage={errors.phone}
        />

        <FormInput
          label="Birth Date"
          name="birthDate"
          type="text"
          placeholder="Enter your birth date (YYYY-MM-DD)"
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
          placeholder="Additional information"
          value={contactFormData.text}
          onChange={handleChange}
          isValid={!errors.text}
          errorMessage={errors.text}
        />

        <button type="submit" disabled={isLoading || !!error}>Add Contact</button>
        {error && <p className="form-error-message">{error}</p>}
      </form>
    </div>
  );
}

export default ContactFormPage;
