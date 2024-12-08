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
    <div className="rounded-3xl p-10">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-4xl font-bold">{data.name}</h1>
          <p className="text-xl">{data.sys.country}</p>
        </div>
        <div>
          <img
            src={`http://openweathermap.org/img/wn/${data.weather[0].icon}.png`}
            alt={data.weather[0].description}
          />
          <p className="text-3xl font-bold">{data.main.temp}°C</p>
        </div>
      </div>
      <div>
        <p>{data.weather[0].description}</p>
      </div>
      <div>
        <p>Feels like: {data.main.feels_like}°C</p>
        <p>Min: {data.main.temp_min}°C</p>
        <p>Max: {data.main.temp_max}°C</p>
        <p>Pressure: {data.main.pressure}hPa</p>
        <p>Humidity: {data.main.humidity}%</p>
        <p>Visibility: {data.visibility / 1000}km</p>
        <p>Wind: {data.wind.speed}m/s</p>
        <p>Clouds: {data.clouds.all}%</p>
        <p>Sunrise: {new Date(data.sys.sunrise * 1000).toLocaleTimeString()}</p>
        <p>Sunset: {new Date(data.sys.sunset * 1000).toLocaleTimeString()}</p>
      </div>
    </div>
  );
};
