import { useState } from "react";
import { createContact } from "../../services/api";
import { useMutation, useQueryClient } from "react-query";
import { AxiosError, AxiosResponse } from "axios";
import { Contact } from "../../interfaces/contact";

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
            if (error.response?.status === 401) {
                setError('Invalid credentials. Please try again.');
            } else {
                setError('Something went wrong');
            }
        }
    });

    return { createContact: mutate, isLoading, error }
}

export default useCreateContact;
