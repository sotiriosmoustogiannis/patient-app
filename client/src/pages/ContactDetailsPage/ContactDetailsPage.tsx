import React from 'react';
import Spinner from '../../components/Spinner/Spinner';
import ContactDetailsCard from '../../components/ContactDetailsCard/ContactDetailsCard';
import useFetchContacts from '../../hooks/api/useFetchContacts';
import { Contact } from '../../interfaces/contact';
import './ContactDetailsPage.scss'; 

const ContactDetailsPage: React.FC = () => {
  const { contacts, isLoading, error } = useFetchContacts();

  /* 
    To improve code readability and maintainability, I have separated 
    the rendering components into distinct functions. 
  */

  const renderError = (error: string|null) => <p className="contacts-error-message">{error}</p>;

  const renderContacts = () => (
    contacts.map((contact: Contact, index: number) => (
      // Index is not recommended to add as a key (is not good practise), but in our case the index will not be changed, 
      // If is needed, we can save a unique id for every record on the database to use as a key (ex. if we want to delete a contact)
      <ContactDetailsCard
        key={index}
        contact={contact}
      />
    ))
  );

  // Render the appropriate UI components based on the current state of data fetching
  if (isLoading) return <Spinner />;
  if (error) return renderError(error);
  if (contacts.length === 0) return renderError('No contacts available.');

  return (
    <div className="contact-details-container">  
      {renderContacts()}
    </div>
  );
};

export default ContactDetailsPage;
