const API_BASE_URL = 'http://localhost:5000/api';

// Weather API interfaces and functions
export interface WeatherData {
  temperature: number;
  humidity: number;
  windSpeed: number;
  condition: string;
  description: string;
  icon: string;
  city: string;
  country: string;
}

export interface ForecastData {
  date: string;
  day: string;
  temperature: number;
  condition: string;
  icon: string;
  humidity: number;
  windSpeed: number;
}

export interface WeatherAlert {
  type: 'info' | 'warning' | 'error';
  title: string;
  message: string;
  icon: string;
}

export interface WeatherResponse {
  weather: WeatherData;
  forecast: ForecastData[];
  alerts: WeatherAlert[];
}

// Weather API functions
export const getCurrentWeather = async (city: string = 'Mumbai', country: string = 'IN'): Promise<WeatherData> => {
  const response = await fetch(`${API_BASE_URL}/weather/current?city=${city}&country=${country}`);
  if (!response.ok) throw new Error('Failed to fetch weather data');
  const result = await response.json();
  return result.data;
};

export const getWeatherForecast = async (city: string = 'Mumbai', country: string = 'IN'): Promise<ForecastData[]> => {
  const response = await fetch(`${API_BASE_URL}/weather/forecast?city=${city}&country=${country}`);
  if (!response.ok) throw new Error('Failed to fetch forecast data');
  const result = await response.json();
  return result.data;
};

export const getWeatherAlerts = async (city: string = 'Mumbai', country: string = 'IN'): Promise<WeatherResponse> => {
  const response = await fetch(`${API_BASE_URL}/weather/alerts?city=${city}&country=${country}`);
  if (!response.ok) throw new Error('Failed to fetch weather alerts');
  return response.json().then(result => result.data);
};
