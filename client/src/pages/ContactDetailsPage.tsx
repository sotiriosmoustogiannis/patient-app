import React from 'react';
import Spinner from '../components/Spinner';
import ContactDetailsCard from '../components/ContactDetailsCard';
import useFetchContacts from '../hooks/api/useFetchContacts';
import { Contact } from '../interfaces/contact';
import '../styles/ContactDetailsPage.scss'; 

const ContactDetailsPage: React.FC = () => {
  const { contacts, isLoading, error } = useFetchContacts();

  /* 
    To improve code readability and maintainability, I have separated 
    the rendering logic into distinct functions. 
  */
  const renderError = () => <p className="contacts-error-message">{error}</p>;

  const renderNoContactsMessage = () => <p className='contacts-error-message'>No contacts available.</p>;

  const renderContacts = () => (
    contacts.map((contact: Contact, index: number) => (
      //index is not recommended to add on key is not good practise, but in this case thwe index we will not have any change, if needed the add an unique id on contacts
      <ContactDetailsCard
        key={index}
        contact={contact}
      />
    ))
  );

  // Render the appropriate UI components based on the current state of data fetching
  if (isLoading) return <Spinner />;
  if (error) return renderError();
  if (contacts.length === 0) return renderNoContactsMessage();

  return (
    <div className="contact-details-container">  
      {renderContacts()}
    </div>
  );
};

export default ContactDetailsPage;
