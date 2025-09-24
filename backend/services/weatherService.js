import axios from 'axios';

class WeatherService {
  constructor() {
    this.apiKey = process.env.OPENWEATHER_API_KEY || 'demo_key';
    this.baseURL = 'https://api.openweathermap.org/data/2.5';
  }

  async getCurrentWeather(city = 'Mumbai', country = 'IN') {
    // For demo purposes, return mock data instead of calling external API
    // To use real weather data, set OPENWEATHER_API_KEY in .env file
    console.log('Using mock weather data for demo. Set OPENWEATHER_API_KEY in .env for real data.');

    if (this.apiKey && this.apiKey !== 'demo_key') {
      try {
        const response = await axios.get(`${this.baseURL}/weather`, {
          params: {
            q: `${city},${country}`,
            appid: this.apiKey,
            units: 'metric'
          }
        });

        return {
          temperature: Math.round(response.data.main.temp),
          humidity: response.data.main.humidity,
          windSpeed: response.data.wind.speed,
          condition: response.data.weather[0].main,
          description: response.data.weather[0].description,
          icon: response.data.weather[0].icon,
          city: response.data.name,
          country: response.data.sys.country
        };
      } catch (error) {
        console.error('Weather API Error:', error.message);
        // Return mock data if API fails
        return this.getMockWeatherData(city);
      }
    } else {
      // Return mock data for demo
      return this.getMockWeatherData(city);
    }
  }

  async getForecast(city = 'Mumbai', country = 'IN') {
    try {
      const response = await axios.get(`${this.baseURL}/forecast`, {
        params: {
          q: `${city},${country}`,
          appid: this.apiKey,
          units: 'metric'
        }
      });

      const forecast = response.data.list
        .filter((item, index) => index % 8 === 0) // Get daily forecast
        .slice(0, 7) // Next 7 days
        .map(item => ({
          date: item.dt_txt.split(' ')[0],
          day: new Date(item.dt_txt).toLocaleDateString('en-US', { weekday: 'short' }),
          temperature: Math.round(item.main.temp),
          condition: item.weather[0].main,
          icon: item.weather[0].icon,
          humidity: item.main.humidity,
          windSpeed: item.wind.speed
        }));

      return forecast;
    } catch (error) {
      console.error('Forecast API Error:', error.message);
      // Return mock forecast data if API fails
      return this.getMockForecastData();
    }
  }

  async getAgriculturalAlerts(weatherData, forecastData) {
    const alerts = [];

    // High temperature alert
    if (weatherData.temperature > 35) {
      alerts.push({
        type: 'warning',
        title: 'High Temperature Alert',
        message: `Temperature is ${weatherData.temperature}°C. Consider irrigation and crop protection measures.`,
        icon: '🌡️'
      });
    }

    // Low temperature alert
    if (weatherData.temperature < 10) {
      alerts.push({
        type: 'warning',
        title: 'Low Temperature Alert',
        message: `Temperature is ${weatherData.temperature}°C. Protect sensitive crops from cold stress.`,
        icon: '❄️'
      });
    }

    // Rain forecast alert
    const rainForecast = forecastData.filter(day => day.condition.toLowerCase().includes('rain'));
    if (rainForecast.length > 0) {
      alerts.push({
        type: 'info',
        title: 'Rain Expected',
        message: `Rain expected in ${rainForecast.length} of the next 7 days. Plan harvesting accordingly.`,
        icon: '🌧️'
      });
    }

    // Pest-prone conditions
    if (weatherData.humidity > 70 && weatherData.temperature > 25) {
      alerts.push({
        type: 'warning',
        title: 'Pest Favorable Conditions',
        message: 'High humidity and warm temperature may favor pest development. Monitor crops closely.',
        icon: '🐛'
      });
    }

    return alerts;
  }

  getMockWeatherData(city) {
    return {
      temperature: 28,
      humidity: 65,
      windSpeed: 12,
      condition: 'Partly Cloudy',
      description: 'partly cloudy',
      icon: '02d',
      city: city,
      country: 'IN'
    };
  }

  getMockForecastData() {
    const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
    return days.map((day, index) => ({
      date: new Date(Date.now() + (index + 1) * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      day: day,
      temperature: 25 + Math.floor(Math.random() * 10),
      condition: ['Sunny', 'Cloudy', 'Rain'][Math.floor(Math.random() * 3)],
      icon: '01d',
      humidity: 60 + Math.floor(Math.random() * 30),
      windSpeed: 5 + Math.floor(Math.random() * 15)
    }));
  }
}

export default new WeatherService();
