export interface FormInputProps {
    label: string;
    name: string;
    type: string;
    placeholder: string;
    value: string;
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    isValid: boolean;
    maxLength?: number
    errorMessage: string | null;
  };