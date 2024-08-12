import React from 'react';
import useFetchContacts from '../hooks/api/useFetchContacts';
import { Contact } from '../interfaces/contactType';

const ContactDeatailsPage: React.FC = () => {
  const { contacts, isLoading, error } = useFetchContacts();

  return (
    <div>
      {!isLoading && !error ? (
        contacts.map((contact: Contact, index: number) => (
          // its not best practise to put as key the index (it would be better a unique id), but its ok as the list is static
          <ul key={index}>
            <li>{contact.name}</li>
            <li>{contact.surname}</li>
            <li>{contact.birthDate}</li>
            <li>{contact.text}</li>
          </ul>
        ))
      ) : (
        <p>{error ? error : 'Loading...'}</p>
      )}
    </div>
  );
};

export default ContactDeatailsPage;
