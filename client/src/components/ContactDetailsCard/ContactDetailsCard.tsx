import React from "react";
import { Contact } from "../../interfaces/contact";
import './ContactDetailsCard.scss'; 

interface ContactDetailsCardProps {
  contact: Contact;
}

const ContactDetailsCard: React.FC<ContactDetailsCardProps> = ({ contact }) => {
  return (
    <div className="contact-card">
      <h2>{contact.name} {contact.surname}</h2>
      <p><strong>Birth Date:</strong> {contact.birthDate}</p>
      <p><strong>Reason:</strong> {contact.text}</p>
    </div>
  );
};

export default ContactDetailsCard;
