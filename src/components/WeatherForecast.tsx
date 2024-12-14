/* eslint-disable @typescript-eslint/no-explicit-any */
type ForecastProps = {
  forecastData: any; // Adjust the type based on the API response
};

export const WeatherForecast = ({ forecastData }: ForecastProps) => {
  return (
    <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-5 gap-6">
      {forecastData.list.slice(0, 5).map((forecast: any, index: number) => (
        <div
          key={index}
          className="bg-gradient-to-b from-indigo-600 to-indigo-500 p-6 rounded-xl shadow-lg text-center text-white"
        >
          <img
            src={`http://openweathermap.org/img/wn/${forecast.weather[0].icon}@2x.png`}
            alt={forecast.weather[0].description}
            className="w-20 h-20 mx-auto mb-4"
          />
          <p className="text-xl font-semibold">
            {new Date(forecast.dt * 1000).toLocaleDateString()}
          </p>
          <p className="text-lg capitalize">
            {forecast.weather[0].description}
          </p>
          <p className="text-lg">{forecast.main.temp}°C</p>
        </div>
      ))}
    </div>
  );
};
