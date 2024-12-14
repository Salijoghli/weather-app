export type TWeather = {
  coord: {
    lon: number;
    lat: number;
  };
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

type WeatherProps = {
  data: TWeather;
};

export const Weather = ({ data }: WeatherProps) => {
  return (
    <div className="max-w-4xl mx-auto bg-gradient-to-b from-indigo-900 via-indigo-800 to-indigo-600 text-white p-8 rounded-3xl shadow-lg mb-8">
      {/* Header Section */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-5xl font-semibold">{data.name}</h1>
          <p className="text-xl text-gray-200">{data.sys.country}</p>
        </div>

        {/* Weather Icon and Temperature */}
        <div className="text-center">
          <img
            src={`http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`}
            alt={data.weather[0].description}
            className="w-24 h-24 mx-auto mb-4"
          />
          <p className="text-6xl font-bold">{data.main.temp}°C</p>
          <p className="capitalize text-xl text-gray-300">
            {data.weather[0].description}
          </p>
        </div>
      </div>

      {/* Main Weather Details */}
      <div className="grid grid-cols-2 gap-6 mb-8">
        <div>
          <p className="text-lg mb-3">
            <span className="font-semibold text-gray-300">Feels like:</span>{" "}
            {data.main.feels_like}°C
          </p>
          <p className="text-lg mb-3">
            <span className="font-semibold text-gray-300">Min Temp:</span>{" "}
            {data.main.temp_min}°C
          </p>
          <p className="text-lg mb-3">
            <span className="font-semibold text-gray-300">Max Temp:</span>{" "}
            {data.main.temp_max}°C
          </p>
        </div>

        <div>
          <p className="text-lg mb-3">
            <span className="font-semibold text-gray-300">Pressure:</span>{" "}
            {data.main.pressure} hPa
          </p>
          <p className="text-lg mb-3">
            <span className="font-semibold text-gray-300">Humidity:</span>{" "}
            {data.main.humidity}%
          </p>
          <p className="text-lg mb-3">
            <span className="font-semibold text-gray-300">Visibility:</span>{" "}
            {data.visibility / 1000} km
          </p>
        </div>
      </div>

      {/* Wind and Clouds Section */}
      <div className="flex justify-between mb-6">
        <div className="flex-1 text-center">
          <p className="text-lg font-semibold">Wind</p>
          <p className="text-xl">{data.wind.speed} m/s</p>
        </div>
        <div className="flex-1 text-center">
          <p className="text-lg font-semibold">Clouds</p>
          <p className="text-xl">{data.clouds.all}%</p>
        </div>
      </div>

      {/* Sunrise and Sunset Section */}
      <div className="flex justify-between">
        <div className="text-center">
          <p className="text-lg font-semibold">Sunrise</p>
          <p className="text-xl">
            {new Date(data.sys.sunrise * 1000).toLocaleTimeString()}
          </p>
        </div>
        <div className="text-center">
          <p className="text-lg font-semibold">Sunset</p>
          <p className="text-xl">
            {new Date(data.sys.sunset * 1000).toLocaleTimeString()}
          </p>
        </div>
      </div>
    </div>
  );
};
