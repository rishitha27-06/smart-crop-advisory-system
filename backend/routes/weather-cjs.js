const express = require('express');
const router = express.Router();
const {
  getCurrentWeather,
  getForecast,
  getWeatherAlerts
} = require('../controllers/weatherController');

// @route   GET /api/weather/current
// @desc    Get current weather
// @access  Public
router.get('/current', getCurrentWeather);

// @route   GET /api/weather/forecast
// @desc    Get 7-day weather forecast
// @access  Public
router.get('/forecast', getForecast);

// @route   GET /api/weather/alerts
// @desc    Get agricultural weather alerts
// @access  Public
router.get('/alerts', getWeatherAlerts);

module.exports = router;
