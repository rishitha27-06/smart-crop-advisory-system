const weatherService = require('../services/weatherService');
const asyncHandler = require('../middleware/asyncHandler');

exports.getCurrentWeather = asyncHandler(async (req, res) => {
  const { city = 'Mumbai', country = 'IN' } = req.query;

  const weatherData = await weatherService.getCurrentWeather(city, country);

  res.status(200).json({
    success: true,
    data: weatherData
  });
});

exports.getForecast = asyncHandler(async (req, res) => {
  const { city = 'Mumbai', country = 'IN' } = req.query;

  const forecastData = await weatherService.getForecast(city, country);

  res.status(200).json({
    success: true,
    data: forecastData
  });
});

exports.getWeatherAlerts = asyncHandler(async (req, res) => {
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
