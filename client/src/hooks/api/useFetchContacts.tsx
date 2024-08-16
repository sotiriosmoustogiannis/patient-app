import { useQuery } from "react-query";
import { fetchContacts } from "../../services/api";
import { AxiosResponse } from "axios";
import { useState } from "react";

const useFetchContacts = () => {
  const [error, setError] = useState<string | null>(null);

  const { data, isLoading } = useQuery('contacts', () => fetchContacts(), {
    select: (response: AxiosResponse) => {
      return response.data;
    },
    onError: (error: any) => {
      if (error.response.status === 404) {
        setError('Contacts not found. Please try again later.');
        return;
      }

      setError('An unexpected error occurred. Please try again.');
    },
    staleTime: 1000 * 60 * 10
  });

  return { contacts: data, isLoading, error }
};

export default useFetchContacts;