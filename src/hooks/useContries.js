import axios from 'axios';
import  { useEffect, useState } from 'react';

const baseUrl = 'https://studies.cs.helsinki.fi/restcountries/api/all';
export const useContries = () => {
  const [countries, setCountries] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  useEffect(() => {
    const getCountries = async () => {
        try {
            setLoading(true)
         const response = await axios.get(`${baseUrl}`)
              setCountries(response.data)
              setLoading(false)
          } catch (error) {
            setError(error)
          }
    }
    getCountries();
  
  }, []);

  return {
    countries,
    loading,
    error
  };
};


