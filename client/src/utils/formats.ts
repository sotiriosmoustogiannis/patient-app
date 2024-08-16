export const formatBirthDate = (date: string): string => {
  const cleaned = date.replace(/\D+/g, '');
  const match = cleaned.match(/^(\d{4})(\d{0,2})(\d{0,2})$/);

  // Add (-) as the user types the date of burth

  if (match) {
    const [, year, month, day] = match;

    return [year, month, day].filter(Boolean).join('-');
  }

  return date;
};

export const formatPhoneNumber = (phone: string): string => {
  // Remove not numeric characters except the plus sign
  let sanitizedPhone = phone.replace(/[^\d+]/g, '');

  if (!sanitizedPhone.startsWith('+30')) {
    sanitizedPhone = `+30${sanitizedPhone}`;
  }

  // +30 XXXXXXXXXX format
  const formattedPhone = sanitizedPhone.replace(/(\+30)(\d{10})/, '$1 $2');

  return formattedPhone;
};