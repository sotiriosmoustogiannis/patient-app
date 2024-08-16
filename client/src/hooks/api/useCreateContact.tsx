import { useState } from "react";
import { AxiosError, AxiosResponse } from "axios";
import { useMutation, useQueryClient } from "react-query";
import { Contact } from "../../interfaces/contact";
import { createContact } from "../../services/api";

interface UseCreateContactProps {
  onSuccess: (data: Contact) => void;
}

const useCreateContact = ({ onSuccess }: UseCreateContactProps) => {
  const [error, setError] = useState<string | null>(null);
  const queryClient = useQueryClient();

  const { mutate, isLoading } = useMutation(createContact, {
    onSuccess: (response: AxiosResponse<Contact>) => {
      queryClient.invalidateQueries('contacts');
      onSuccess(response.data);
    },
    onError: (error: AxiosError) => {
      if (error.response?.status === 400) {
        setError('Invalid data provided. Please check your input and try again.');
        
        return;
      }
      setError('An unexpected error occurred. Please try again.');
    }
  });

  return { createContact: mutate, isLoading, error }
}

export default useCreateContact;
