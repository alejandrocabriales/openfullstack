import { useState, useEffect, useMemo } from 'react';
import { useContries } from './hooks/useContries';
import { useWeather } from './hooks/useWeather';

function App() {
  const { loading, error, countries } = useContries();
  const [activeCountry, setActiveCountry] = useState(null);

  const [value, setvalue] = useState('');
  const {
    loading: loadingWeather,
    error: errorWeather,
    weather,
  } = useWeather(activeCountry?.latlng?.[0], activeCountry?.latlng?.[1]);

  const handleOnChange = (event) => {
    const text = event.target.value;
    setvalue(text);
  };

  const handleShowInfo = (country) => {
    setActiveCountry(country);
  };

  const countriesToShow = useMemo(() => {
    return value
      ? countries.filter((country) =>
          country.name.common.toLowerCase().includes(value.toLowerCase())
        )
      : [];
  }, [value, countries]);

  useEffect(() => {
    if (countriesToShow.length === 1) {
      setActiveCountry(countriesToShow[0]);
    } else {
      setActiveCountry(null);
    }
  }, [countriesToShow]);

  // Small check for error and loading
  if (error || errorWeather) {
    return <div>error</div>;
  }
  if (loading || loadingWeather) {
    return <div>loading</div>;
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        <div>
          <label style={{ marginRight: 4 }}>Find the coutry</label>
          <input value={value} onChange={handleOnChange} />
        </div>
      </div>
      {countriesToShow.length > 10 && (
        <div>Too many matches, specify another filther</div>
      )}
      {countriesToShow.length > 1 &&
        countriesToShow.length < 10 &&
        countriesToShow.map((country) => (
          <div key={country.name.common}>
            {country.name.common}

            <button
              onClick={() => handleShowInfo(country)}
              style={{ marginLeft: 8 }}
            >
              show info
            </button>
          </div>
        ))}
      {activeCountry && (
        <div key={activeCountry.name.common}>
          <h1>{activeCountry.name.common}</h1>
          <div>
            <span>capital</span> {activeCountry.capital}
          </div>
          <div>
            <span>area</span> {activeCountry.area}
          </div>

          <h2>Languages</h2>
          <ul>
            {Object.values(activeCountry.languages).map((language) => (
              <li key={language}>{language}</li>
            ))}
          </ul>
          <img src={activeCountry.flags.png} alt={activeCountry.name.common} />
        </div>
      )}
      <div>
        {weather && activeCountry && (
          <div>
            <div>
              <h1> weather in {activeCountry.capital}</h1>
              <div>
                temperarture <span>{weather.main.tempß} Celcius</span>
              </div>
              <h2> Feels like {weather.main?.feels_like} Celcius</h2>

              <img
                src={`https://openweathermap.org/img/wn/${weather?.weather[0]?.icon}@2x.png`}
                alt={weather?.weather[0]?.description}
              />
              <div> Winds {weather?.wind?.speed}</div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
