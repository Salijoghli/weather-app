/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import "./index.css";
import { useFetch } from "./hooks/useFetch";
import { CiSearch } from "react-icons/ci";

const API = "https://api.openweathermap.org/data/2.5/";

type Weather = {
  weather: [
    {
      id: number;
      main: string;
      description: string;
      icon: string;
    }
  ];
  main: {
    temp: number;
    feels_like: number;
    temp_min: number;
    temp_max: number;
    pressure: number;
    humidity: number;
  };
  visibility: number;
  wind: {
    speed: number;
    deg: number;
  };
  clouds: { all: number };
  sys: {
    sunrise: number;
    sunset: number;
    country: string;
  };
  name: string;
};

const defaultData: Weather = {
  weather: [
    {
      id: 0,
      main: "",
      icon: "",
      description: "",
    },
  ],
  main: {
    temp: 0,
    feels_like: 0,
    temp_min: 0,
    temp_max: 0,
    pressure: 0,
    humidity: 0,
  },
  wind: {
    speed: 0,
    deg: 0,
  },
  clouds: { all: 0 },
  name: "",
  sys: {
    sunrise: 0,
    sunset: 0,
    country: "",
  },
  visibility: 0,
};

function App() {
  const [input, setInput] = useState("batumi");
  const [city, setCity] = useState("");
  const { data, error, loading } = useFetch<Weather>(
    `${API}weather?q=${city}&appid=${import.meta.env.VITE_WEATHER_API_KEY}`,
    defaultData
  );
  const image = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;

  if (loading) return <div>Loading...</div>;
  return (
    <div className="relative max-w-full h-screen content-center">
      <div className="absolute top-0 left-0 w-full h-full bg-[url(./assets/images/rain.jpg)] bg-cover bg-no-repeat bg-center bg-black z-0"></div>
      <main className="relative w-1/2 border place-self-center">
        <div className="flex place-self-center relative w-1/2">
          <input
            onChange={(e) => setInput(e.target.value)}
            className=" w-full px-4 py-3 rounded-3xl bg-[rgb(0,0,0,0.65)] :placeholder-gray-400 text-white"
            placeholder="Search City"
            value={input}
          />
          <button
            className=" absolute right-1 top-1/2 transform -translate-y-1/2 border-none cursor-pointer flex justify-center items-center"
            onClick={() => setCity(input)}
          >
            <CiSearch color="white" size={30} />
          </button>
        </div>
      </main>
    </div>
  );
}

export default App;
