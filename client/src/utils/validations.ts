export const validateRequiredField = (value: string): boolean => {
    return value.trim() !== "";
  };
  
  export const validatePhoneNumber = (phone: string): boolean => {
    const greekPhoneRegex = /^(?:\+30)?\d{10}$/;
    return greekPhoneRegex.test(phone);
  };
  
  export const validateBirthDate = (date: string): boolean => {
    if (date.length !== 10) {
      return false;
    }
    
    // YYYY-MM-DD format
    const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
    
    if (!dateRegex.test(date)) {
      return false;
    }
  
    const [year, month, day] = date.split('-').map(Number);
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
  
    // Validate year
    if (year > currentYear) {
      return false;
    }
  
    // Validate month
    if (month < 1 || month > 12) {
      return false;
    }
  
    // Validate number of day based on month and leap year
    const daysInMonth = [31, (isLeapYear(year) ? 29 : 28), 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    if (day < 1 || day > daysInMonth[month - 1]) {
      return false;
    }
  
    return true;
  };
  
  const isLeapYear = (year: number): boolean => {
    return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
  };
  