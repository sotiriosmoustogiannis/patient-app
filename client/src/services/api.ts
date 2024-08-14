import axios from "axios";
import { Contact } from "../interfaces/contact";
// import appConfig from "../configs/appConfig";

export const createContact = async (contact: Contact) => {
  try {
    return await axios.post('http://localhost:8081/contacts', contact, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    throw new Error(`Failed to create contact: ${error}`);
  }
};

export const fetchContacts = async () => {
  try {
    return await axios.get('http://localhost:8081/contacts');
  } catch (error) {
    throw new Error(`Failed to fetch contacts: ${error}`);
  }
};