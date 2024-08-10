import axios from 'axios';
import  { useEffect, useState } from 'react';

const weatherUrl = 'https://api.openweathermap.org/data/2.5/weather'
export const useWeather = (lat, long) => {
  const [weather, setWeather] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  useEffect(() => {
    const getWeather= async () => {
      if (lat == null || long == null) {
        return; // Si lat o long son undefined o null, no hacer nada
      }
        try {
            setLoading(true)
            const response = await axios.get(
                `${weatherUrl}?lat=${lat}&lon=${long}&appid=${import.meta.env.VITE_API_KEY}`
              );
              setWeather(response.data)
              setLoading(false)
          } catch (error) {
            setError(error)
          }
    }
    getWeather();
  },[lat, long] );

  return {
    weather,
    loading,
    error
  };
};


