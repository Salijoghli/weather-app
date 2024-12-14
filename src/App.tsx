/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import "./index.css";
import { useQuery } from "react-query";
import { useDebounce } from "use-debounce";
import { Loading } from "./components/Loading";
import { ErrorComponent } from "./components/Error";
import { Weather, type TWeather } from "./components/Weather";
import { WeatherForecast } from "./components/WeatherForecast";

const API = "https://api.openweathermap.org/data/2.5/";

const getWeatherData = async (city: string): Promise<TWeather> => {
  const response = await fetch(
    `${API}weather?q=${city}&appid=${
      import.meta.env.VITE_WEATHER_API_KEY
    }&units=metric`
  );
  if (!response.ok) {
    const errorDetails = await response.json();
    throw new Error(errorDetails.message || "Network response was not ok");
  }
  const data = await response.json();
  return data;
};

const getForeCastData = async (city: string) => {
  const response = await fetch(
    `${API}forecast?q=${city}&appid=${
      import.meta.env.VITE_WEATHER_API_KEY
    }&units=metric`
  );
  if (!response.ok) {
    const errorDetails = await response.json();
    throw new Error(errorDetails.message || "Network response was not ok");
  }
  const data = await response.json();
  return data;
};

function App() {
  const [input, setInput] = useState("");
  const [city] = useDebounce(input, 1000);
  const { data, isLoading, error } = useQuery<TWeather, Error>(
    ["weather", city],
    () => getWeatherData(city),
    {
      enabled: !!city,
      retry: 1,
      staleTime: 1000 * 60 * 5,
    }
  );

  const { data: forecastData } = useQuery(
    ["forecast", city],
    () => getForeCastData(city),
    {
      enabled: !!city,
      retry: 1,
      staleTime: 1000 * 60 * 5,
    }
  );

  //this regex will allow only georgian and latin letters
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const filteredValue = value.replace(
      /[^a-zA-Z\u10A0-\u10FF\u0400-\u04FF]/g,
      ""
    );
    setInput(filteredValue);
  };

  return (
    <div className="m-auto max-w-[1200px] w-full">
      <div className="sm:px-10 md:px-0">
        <input
          onChange={(e) => handleInputChange(e)}
          className="px-10 py-4  w-full sm:w-full md:max-w-64 rounded-3xl bg-[rgb(20,10,25,0.65)] :placeholder-gray-400 text-white"
          placeholder="Search City"
          value={input}
        />
        {isLoading ? (
          <Loading />
        ) : error ? (
          <ErrorComponent error={error} />
        ) : data ? (
          <>
            <Weather data={data} />
            {forecastData && <WeatherForecast forecastData={forecastData} />}
          </>
        ) : (
          <div>No data</div>
        )}
      </div>
    </div>
  );
}

export default App;
