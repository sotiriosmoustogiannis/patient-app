import { useQuery } from "react-query";
import { fetchContacts } from "../../services/api";
import { useState } from "react";
import { AxiosResponse } from "axios";

const useFetchContacts = () => {
  const [error, setError] = useState<string | null>(null);

  const {data, isLoading} = useQuery('contacts', () => fetchContacts(), {
    select: (response: AxiosResponse) => {
        return response.data;
    },
    onError: (error: any) => {
      if (error.response.status === 401) {
        return;
      }
      
      setError('Something went wrong. Please try again later.');
    },
    staleTime: 1000 * 60 * 10
  });

  return {contacts: data, isLoading, error}
};

export default useFetchContacts;