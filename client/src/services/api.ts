import axios from "axios";
// import appConfig from "../configs/appConfig";

export const createContact = async ({
  name,
  surname,
  phone,
  birthDate,
  text
}: {
  name: string;
  surname: string;
  phone: string;
  birthDate: string;
  text: string;

}) => {
  return await axios.post(`http://localhost:8081/contacts`, {
    name,
    surname,
    phone,
    birthDate,
    text
  },
	{
		headers: {
			'Content-Type': 'application/json'
		}
	});
};

export const fetchContacts = async () => {
  return await axios.get(`http://localhost:8081/contacts`);
};