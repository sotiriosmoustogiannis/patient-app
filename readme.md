# Patient App

![image](https://user-images.githubusercontent.com/18698923/235904899-cf3d4893-38d5-4ffc-ba9b-32cade454833.png)


👋 Hello! Meet Dr Schmidt, a stressed-out senior cardiologist at P1 Generograd Medical Center. The patient inflow in the last few hours has been massive and his team had trouble organizing patient info and prioitizing cases. As the developer on site you suggest a simple React app to gather patient info and status before the patient has even entered the Medical Center. Dr Schmidt hastly agrees with your solution but the look on his face leaves you wondering whether he has understood the task at hand. In the ER's waiting room you yank out your laptop and start building a prototype. 

**Tasks:**  
1.  Build a "Contact Form" page that has the following five inputs: name, surname, phone, date of birth, and text. 
2.  Build a second page that displays all the contact form submissions that are stored in our backend (which we have provided)

**Specification:**

✅ Field Validation:
- Phone number: Optional country code and then 10 digits (we're thinking of only Greek phone numbers)
- Birth date: Proper date format
- Automatically add slashes or dots to the date field

✅ One animation: For example, you can add a spinning circle when the form is being sent.

✅ Contact form look is important: We have a professional design that is visually appealing.

❌ Restrictions: Two restrictions:
- No validation library.
- No pre-made CSS. (e.g., MUI)

For more information on the backend api check [Backend API](#backend-api).

***

## Backend API

There are two endpoints, that

### GET `/contacts`

Returns all contact forms info available in the backend's database (used `OPTIONALLY`)

**Responses**
* Response 200 (application/json)
  ```json
  [
    {
      "name": "Morty",
      "surname": "Smith",
      "phone": "+306971119977",
      "birthDate": "2009-05-17",
      "text": "SOS!!! We need to go to Forbodulon Prime ASAP... need the crystals!"
    },
    // other objects ...
  ]
  ```

### POST `/contacts`

Adds a new entry in the contact form database (data must be valid). Every request needs a non empty body

**Body**
```json
{
  "name": string,
  "surname": string,
  "phone": string,
  "birthDate": string,
  "text": string,
}
```

**Responses**
* Response 200 (application/json)
  ```json
  {
    "message":"Contact added successfully"
  }
  ```
* Response 400 (application/json), if body is not correctly defined
  ```json
  {
    "error":"Input data is not valid ContactInfo"
  }
  ```
### How to run

**Prerequisites** Given that nodejs is insatlled:
* Install node modules
    ```bash
    npm ci
    ```
* Set up env variables in `.env` file
    ```bash
    BACK_HOST=localhost
    BACK_PORT=8081
    ```

**To start** use
```bash
npm start
```

**To test** its functionality here are two curl commands. If you changed the url and/or port also change it here
 * ```bash
    curl -X GET localhost:8081/contacts
   ```
 * ```bash
    curl -X POST localhost:8081/contacts \
        -d '{"name":"Best","surname":"FrontEndDev","phone":"+306971119977","birthDate":"2009-05-17","text":"Test"}' \
        -H 'Content-Type: application/json'
   ```

# Patient App - Online Patient Info Application - React App

## Project Description

This online patient information application streamlines the management of medical appointments by offering a convenient platform for patients to submit their personal details. Patients can fill out a contact form that includes their name, surname, phone number, date of birth, and the reason for their visit to the doctor. This information allows doctors to access patient contact details and review the purpose of their visit in advance. The application is designed to offer a seamless and user-friendly experience, making it easier for both patients and doctors to manage appointments effectively.

## Table of Contents

- [Installation](#installation)
- [Technologies](#technologies)
- [Usage](#usage)
- [Contributing](#contributing)

## Installation

### Prerequisites

- [Node.js](https://nodejs.org/) (Recommended version: 14.x or higher)
- [npm](https://www.npmjs.com/) (Comes with Node.js)

### Getting Started

1. Clone the repository using HTTPS:

   ```bash
   git clone https://github.com/sotiriosmoustogiannis/take-home-fronteng-c1a13.git

- or Clone the repository using SSH Key:

   ```bash
   git clone https://github.com/sotiriosmoustogiannis/take-home-fronteng-c1a13.git

2. Navigate to the Project Directory and Install Dependencies

   ```bash
   npm install

3. Navigate to the server Directory and Install Dependencies

   ```bash
   cd server
   npm install

4. Navigate to the client Directory and Install Dependencies

   ```bash
   cd client
   npm install

5. Start both the Server and Client App

   ```bash
   cd ..
   npm start

5. Open a web browser and visit the URL shown in your terminal 
   (usually http://localhost:5173/).

## Technologies

- Frontend: [React](https://reactjs.org/), [Vite](https://vitejs.dev/guide)

## Usage

- **Contact Form Page**: On the Contact Form page, patients can enter and submit their personal and contact details, including the reason for their visit. This submission enables doctors to review and assess the patient's case prior to the appointment, ensuring informed and effective consultations.

- **Display Patient Contact Details**: On the Contact Details page, doctors can review information about each patient, including personal details and the reason for the visit. This allows healthcare providers to gain valuable insights into the patient's needs and prepare accordingly for the consultation.

## Contributing

Contributions to this project are welcome!
