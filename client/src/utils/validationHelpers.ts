import { validateRequiredField, validateOnlyLettersSpaces, validatePhoneNumber, validateBirthDate } from './validations';
import { formatBirthDate, formatPhoneNumber } from './formats';
import { FieldName } from '../types/types';

export interface ValidationResult {
  error: string | null;
  formattedValue: string;
}

export const validateAndFormatField = (name: FieldName, value: string): ValidationResult => {
  let validationError: string | null = null;
  let formattedValue = value;

  if (!validateRequiredField(value)) {
    return {
      error: 'This field is required',
      formattedValue: value
    };
  }

  // Validate and format based on field type
  switch (name) {
    case 'name':
    case 'surname':
      if (!validateOnlyLettersSpaces(value)) {
        validationError = 'Only Latin letters and spaces are allowed';
      }
      break;

    case 'phone':
      if (!validatePhoneNumber(value)) {
        validationError = 'Invalid phone number';
      } else {
        formattedValue = formatPhoneNumber(value);
      }
      break;

    case 'birthDate':
      formattedValue = formatBirthDate(value);
      if (!validateBirthDate(formattedValue)) {
        validationError = 'Invalid date format';
      }
      break;

    case 'text':
      break;

    default:
      validationError = 'Invalid field type';
  }

  return {
    error: validationError,
    formattedValue,
  };
};
