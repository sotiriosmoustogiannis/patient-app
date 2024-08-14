export interface FormInputProps {
  type: string;
  name: string;
  value: string;
  label: string;
  isValid?: boolean;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  maxLength?: number;
  placeholder: string;
  errorMessage?: string | null;
};