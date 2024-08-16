// Check if a field is empty
export const validateRequiredField = (value: string): boolean => {
  return value.trim() !== "";
};

// Check if a field contains only latin letters and spaces
export const validateOnlyLettersSpaces = (value: string): boolean => {
  const lettersSpacesOnlyRegex = /^[A-Za-z\s]+$/;
  return lettersSpacesOnlyRegex.test(value.trim());
};

export const validatePhoneNumber = (phoneNumber: string): boolean => {
  const greekPhoneRegex = /^(?:\+30\s?)?\d{10}$/
  return greekPhoneRegex.test(phoneNumber);
};

// Function to validate the birth date
export const validateBirthDate = (date: string): boolean => {
  if (date.length !== 10) {
    return false;
  }

  // Check the format YYYY-MM-DD
  const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
  if (!dateRegex.test(date)) {
    return false;
  }

  // Get birth year, month, and day splitting by '-'
  const [year, month, day] = date.split('-').map(Number);

  // Validate the number of days based on month and leap year
  const daysInMonth = [31, isLeapYear(year) ? 29 : 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  if (month < 1 || month > 12 || day < 1 || day > daysInMonth[month - 1]) {
    return false;
  }

  // Use the function to check if the entered date is not in the future
  return !isFutureDate(year, month, day);
};

// Check if the entered date is in the future
const isFutureDate = (year: number, month: number, day: number): boolean => {
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth() + 1;
  const currentDay = currentDate.getDate();

  if (year > currentYear) {
    return true;
  }
  if (year === currentYear && month > currentMonth) {
    return true;
  }
  if (year === currentYear && month === currentMonth && day > currentDay) {
    return true;
  }

  return false;
};

// Function to check if a given year is a leap year
const isLeapYear = (year: number): boolean => {
  return new Date(year, 1, 29).getMonth() === 1;
};
