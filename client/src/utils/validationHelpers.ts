import { validateRequiredField, validateOnlyLetters, validatePhoneNumber, validateBirthDate } from './validations';
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
    validationError = 'This field is required';
  } else if (name === 'name' || name === 'surname') {
    if (!validateOnlyLetters(value)) {
      validationError = 'Only letters and spaces are allowed';
    }
  } else if (name === 'phone') {
    if (!validatePhoneNumber(value)) {
      validationError = 'Invalid phone number';
    } else {
      formattedValue = formatPhoneNumber(value);
    }
  } else if (name === 'birthDate') {
    formattedValue = formatBirthDate(value);
    if (!validateBirthDate(formattedValue)) {
      validationError = 'Invalid date format';
    }
  }

  return {
    error: validationError,
    formattedValue,
  };
};
