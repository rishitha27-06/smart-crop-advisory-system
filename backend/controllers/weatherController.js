import { asyncHandler } from '../middleware/asyncHandler.js';
import weatherService from '../services/weatherService.js';

export const getCurrentWeather = asyncHandler(async (req, res) => {
  const { city = 'Mumbai', country = 'IN' } = req.query;

  const weatherData = await weatherService.getCurrentWeather(city, country);

  res.status(200).json({
    success: true,
    data: weatherData
  });
});

export const getForecast = asyncHandler(async (req, res) => {
  const { city = 'Mumbai', country = 'IN' } = req.query;

  const forecastData = await weatherService.getForecast(city, country);

  res.status(200).json({
    success: true,
    data: forecastData
  });
});

export const getWeatherAlerts = asyncHandler(async (req, res) => {
  const { city = 'Mumbai', country = 'IN' } = req.query;

  const [weatherData, forecastData] = await Promise.all([
    weatherService.getCurrentWeather(city, country),
    weatherService.getForecast(city, country)
  ]);

  const alerts = await weatherService.getAgriculturalAlerts(weatherData, forecastData);

  res.status(200).json({
    success: true,
    data: {
      weather: weatherData,
      forecast: forecastData,
      alerts: alerts
    }
  });
});
