import React from 'react';
import useFetchContacts from '../hooks/api/useFetchContacts';
import { Contact } from '../interfaces/contactType';
import '../styles/ContactDetailsPage.css'; 
import Spinner from '../components/Spinner';

const ContactDetailsPage: React.FC = () => {
  const { contacts, isLoading, error } = useFetchContacts();

  return (
    <div className="contact-details-container">
      <div className=''>Contacts</div>
      {!isLoading && !error ? (
        contacts.map((contact: Contact, index: number) => (
        // its not best practise to put as key the index (it would be better a unique id), but its ok as the list is static
          <div className="contact-card" key={index}>
            <h2>{contact.name} {contact.surname}</h2>
            <p><strong>Birth Date:</strong> {contact.birthDate}</p>
            <p><strong>Details:</strong> {contact.text}</p>
          </div>
        ))
      ) : (
        <p>{error ? error : <Spinner />}</p>
      )}
    </div>
  );
};

export default ContactDetailsPage;
