import axios from "axios";
import { Contact } from "../interfaces/contact";
import appConfig from "../configs/appConfig";

export const createContact = async (contact: Contact) => {
  try {
    return await axios.post( `${appConfig.BACK_HOST_API}/contacts`, contact, {
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
    return await axios.get(`${appConfig.BACK_HOST_API}/contacts`);
  } catch (error) {
    throw new Error(`Failed to fetch contacts: ${error}`);
  }
};