import { useState } from "react";
import { createContact } from "../../services/api";
import { useMutation } from "react-query";
import { AxiosError, AxiosResponse } from "axios";

const useCreateContact = (onSuccess: (...args: any) => void) => {
    const [error, setError] = useState<string | null>(null);
    
    const { mutate, isLoading } = useMutation(createContact, {
        onSuccess: (response: AxiosResponse) => {
            console.log(response)
            onSuccess(response.data)
        },
        onError: (error: AxiosError) => {
            if (error.response?.status === 401) {
                setError('Invalid credentials. Please try again.');
            }else {
                setError('Something went wrong');
            }
        }
    });

    return { createContact: mutate, isLoading, error }
}

export default useCreateContact