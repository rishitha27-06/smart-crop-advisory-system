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
    // Get current date and time for realistic weather data
    const now = new Date();
    const hour = now.getHours();

    // Simulate realistic weather patterns based on location and time
    const cityWeather = {
      Mumbai: {
        temperature: hour >= 6 && hour <= 18 ? 32 : 28, // Warmer during day
        humidity: 75,
        windSpeed: 8,
        condition: hour >= 6 && hour <= 18 ? 'Sunny' : 'Clear',
        description: hour >= 6 && hour <= 18 ? 'clear sky' : 'clear sky',
        icon: hour >= 6 && hour <= 18 ? '01d' : '01n'
      },
      Delhi: {
        temperature: hour >= 6 && hour <= 18 ? 35 : 30,
        humidity: 45,
        windSpeed: 12,
        condition: hour >= 6 && hour <= 18 ? 'Sunny' : 'Clear',
        description: hour >= 6 && hour <= 18 ? 'clear sky' : 'clear sky',
        icon: hour >= 6 && hour <= 18 ? '01d' : '01n'
      },
      Hyderabad: {
        temperature: hour >= 6 && hour <= 18 ? 34 : 29,
        humidity: 55,
        windSpeed: 10,
        condition: hour >= 6 && hour <= 18 ? 'Sunny' : 'Clear',
        description: hour >= 6 && hour <= 18 ? 'clear sky' : 'clear sky',
        icon: hour >= 6 && hour <= 18 ? '01d' : '01n'
      }
    };

    const weather = cityWeather[city] || cityWeather.Mumbai;

    return {
      temperature: weather.temperature,
      humidity: weather.humidity,
      windSpeed: weather.windSpeed,
      condition: weather.condition,
      description: weather.description,
      icon: weather.icon,
      city: city,
      country: 'IN'
    };
  }

  getMockForecastData() {
    const today = new Date();
    const forecast = [];

    // Get current month to simulate seasonal weather
    const currentMonth = today.getMonth();
    const isSummer = currentMonth >= 2 && currentMonth <= 4; // March-May
    const isMonsoon = currentMonth >= 5 && currentMonth <= 9; // June-Oct
    const isWinter = currentMonth >= 10 || currentMonth <= 1; // Nov-Feb

    for (let i = 0; i < 7; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);

      let dayLabel;
      if (i === 0) dayLabel = 'Today';
      else if (i === 1) dayLabel = 'Tomorrow';
      else dayLabel = date.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });

      // Base temperatures based on season - October is post-monsoon, cooling down
      let baseTemp;
      if (isSummer) baseTemp = 35;
      else if (isMonsoon) baseTemp = 28;
      else if (isWinter) baseTemp = 22;
      else baseTemp = 30; // Spring/Fall - October is transitioning to winter

      // Add daily variation
      const dailyVariation = Math.sin((i / 7) * Math.PI * 2) * 3;
      const randomVariation = (Math.random() - 0.5) * 6;
      const temperature = Math.round(baseTemp + dailyVariation + randomVariation);

      // Weather conditions based on season and temperature - October has mixed weather
      let condition, icon;
      if (isMonsoon && Math.random() > 0.6) {
        condition = Math.random() > 0.7 ? 'Rain' : 'Cloudy';
        icon = Math.random() > 0.7 ? '10d' : '03d';
      } else if (temperature > 33) {
        condition = 'Sunny';
        icon = '01d';
      } else if (temperature > 28) {
        condition = Math.random() > 0.6 ? 'Partly Cloudy' : 'Sunny';
        icon = Math.random() > 0.6 ? '02d' : '01d';
      } else if (temperature > 24) {
        condition = Math.random() > 0.5 ? 'Cloudy' : 'Partly Cloudy';
        icon = Math.random() > 0.5 ? '03d' : '02d';
      } else {
        condition = Math.random() > 0.7 ? 'Rain' : 'Cloudy';
        icon = Math.random() > 0.7 ? '10d' : '03d';
      }

      forecast.push({
        date: date.toISOString().split('T')[0],
        day: dayLabel,
        temperature: temperature,
        condition: condition,
        icon: icon,
        humidity: isMonsoon ? 70 + Math.floor(Math.random() * 25) : 40 + Math.floor(Math.random() * 40),
        windSpeed: 5 + Math.floor(Math.random() * 15)
      });
    }

    return forecast;
  }
}

export default new WeatherService();
