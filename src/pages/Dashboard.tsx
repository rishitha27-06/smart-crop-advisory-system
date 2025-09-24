import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Leaf, LogOut, BarChart3, CloudRain, Sun, Thermometer } from 'lucide-react';
import { motion } from 'framer-motion';
import { useAuth } from '@/context/AuthContext';
import { apiClient, Crop, Order } from '@/lib/api-fixed';
import { getCurrentWeather, getWeatherForecast, getWeatherAlerts, WeatherData, ForecastData, WeatherAlert } from '@/lib/api-weather';
import { useToast } from '@/hooks/use-toast';
import { useTranslation } from 'react-i18next';

const Dashboard = () => {
  const navigate = useNavigate();
  const { state, logout } = useAuth();
  const { toast } = useToast();
  const { t } = useTranslation();
  const [crops, setCrops] = useState<Crop[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [forecast, setForecast] = useState<ForecastData[]>([]);
  const [alerts, setAlerts] = useState<WeatherAlert[]>([]);
  const [soilHealth, setSoilHealth] = useState<any>(null);
  const [marketPrices, setMarketPrices] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadDashboardData = async () => {
      if (!state.user) return;
      try {
        setLoading(true);
        const token = localStorage.getItem('token');
        if (!token) {
          toast({ title: "Auth Error", description: "Login again", variant: "destructive" });
          navigate('/login');
          return;
        }
        const [cropsData, ordersData] = await Promise.all([
          apiClient.getCrops(),
          apiClient.getOrders(token)
        ]);
        setCrops(cropsData);
        setOrders(ordersData);
      } catch (error) {
        console.error(error);
        toast({ title: "Error", description: "Failed to load dashboard" });
      } finally {
        setLoading(false);
      }
    };

    const loadWeatherSoilMarket = async () => {
      try {
        const [weatherData, forecastData, weatherAlerts] = await Promise.all([
          getCurrentWeather('Mumbai', 'IN'),
          getWeatherForecast('Mumbai', 'IN'),
          getWeatherAlerts('Mumbai', 'IN')
        ]);
        setWeather(weatherData);
        setForecast(forecastData);
        setAlerts(weatherAlerts.alerts);
      } catch (error) {
        setWeather({
          temperature: 30,
          humidity: 60,
          windSpeed: 10,
          condition: "Sunny",
          description: "Clear sky",
          icon: "01d",
          city: "Mumbai",
          country: "IN"
        });
        setForecast([
          { day: "Mon", date: "2023-10-02", temperature: 29, condition: "Sunny", icon: "01d", humidity: 55, windSpeed: 9 },
          { day: "Tue", date: "2023-10-03", temperature: 31, condition: "Cloudy", icon: "02d", humidity: 65, windSpeed: 12 },
          { day: "Wed", date: "2023-10-04", temperature: 28, condition: "Rain", icon: "10d", humidity: 70, windSpeed: 15 },
          { day: "Thu", date: "2023-10-05", temperature: 30, condition: "Sunny", icon: "01d", humidity: 58, windSpeed: 10 },
          { day: "Fri", date: "2023-10-06", temperature: 27, condition: "Storm", icon: "11d", humidity: 75, windSpeed: 20 },
          { day: "Sat", date: "2023-10-07", temperature: 29, condition: "Cloudy", icon: "02d", humidity: 60, windSpeed: 11 },
          { day: "Sun", date: "2023-10-08", temperature: 32, condition: "Sunny", icon: "01d", humidity: 50, windSpeed: 8 },
        ]);
        setAlerts([{ type: "info", title: "Good Weather", message: "Favorable for sowing rice", icon: "🌱" }]);
      }

      // Soil health mock data
      setSoilHealth({
        ph: 6.8,
        moisture: "Moderate (45%)",
        fertility: "High",
        nitrogen: "Sufficient",
        phosphorus: "Moderate",
        potassium: "Adequate",
        organicMatter: "Good (3.5%)"
      });

      // Market prices mock data
      setMarketPrices([
        { crop: "Wheat", price: 2200, market: "Delhi" },
        { crop: "Rice", price: 1850, market: "Hyderabad" },
        { crop: "Maize", price: 1600, market: "Bangalore" },
        { crop: "Cotton", price: 5600, market: "Mumbai" },
        { crop: "Sugarcane", price: 320, market: "Pune" },
        { crop: "Turmeric", price: 7500, market: "Nizamabad" }
      ]);
    };

    loadDashboardData();
    loadWeatherSoilMarket();
  }, [state.user, toast, navigate]);

  const handleLogout = () => {
    logout();
    toast({ title: "Logged out", description: "See you again!" });
    navigate('/');
  };

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center text-xl font-semibold">{t('common.loading')}</div>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-green-100 py-8 px-4 sm:py-12 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-6 sm:space-y-8">

        {/* Header */}
        <div className="flex justify-between items-center">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-green-700">{t('dashboard.welcome')}, {state.user?.name}!</h1>
          <Button variant="destructive" size="sm" onClick={handleLogout} className="flex items-center space-x-1">
            <LogOut className="h-4 w-4" /> <span>{t('nav.logout')}</span>
          </Button>
        </div>

        {/* Alerts */}
        {alerts.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4"
          >
            {alerts.map((alert, i) => (
              <div key={i} className="bg-yellow-100 border-l-4 border-yellow-500 p-4 rounded-lg shadow-sm">
                <p className="font-semibold">{alert.icon} {alert.title}</p>
                <p className="text-sm text-gray-700">{alert.message}</p>
              </div>
            ))}
          </motion.div>
        )}

        {/* Weather & Soil */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Weather Card */}
          <Card asChild>
            <motion.div whileHover={{ scale: 1.03 }} className="cursor-pointer">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2"><Sun className="text-yellow-500" /> {t('dashboard.weather')} - {weather?.city}</CardTitle>
                <CardDescription>{t('dashboard.weatherForecast')}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4">
                  {forecast.map((day, i) => (
                    <div key={i} className="bg-green-50 p-2 rounded-lg shadow-inner text-center hover:shadow-lg transition-shadow duration-300">
                      <p className="font-medium">{day.day}</p>
                      <img src={`https://openweathermap.org/img/wn/${day.icon}@2x.png`} alt={day.condition} className="mx-auto h-12 w-12" />
                      <p className="font-semibold">{day.temperature}°C</p>
                      <p className="text-xs text-gray-600">{day.condition}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </motion.div>
          </Card>

          {/* Soil Health Card */}
          <Card asChild>
            <motion.div whileHover={{ scale: 1.03 }} className="cursor-pointer">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2"><Leaf className="text-green-500" /> Soil Health</CardTitle>
                <CardDescription>Current Field Report</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-1 text-sm">
                  <li>🌱 pH: {soilHealth?.ph}</li>
                  <li>💧 Moisture: {soilHealth?.moisture}</li>
                  <li>🌾 Fertility: {soilHealth?.fertility}</li>
                  <li>🧪 Nitrogen: {soilHealth?.nitrogen}</li>
                  <li>🧪 Phosphorus: {soilHealth?.phosphorus}</li>
                  <li>🧪 Potassium: {soilHealth?.potassium}</li>
                  <li>🌿 Organic Matter: {soilHealth?.organicMatter}</li>
                </ul>
              </CardContent>
            </motion.div>
          </Card>
        </div>

        {/* Market Prices */}
        <Card asChild>
          <motion.div whileHover={{ scale: 1.02 }} className="cursor-pointer">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2"><BarChart3 className="text-blue-500" /> Live Market Prices</CardTitle>
              <CardDescription>Daily Sample Rates</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {marketPrices.map((item, idx) => (
                  <div key={idx} className="border p-4 rounded-lg bg-white shadow-sm hover:shadow-md transition-shadow flex justify-between items-center">
                    <div>
                      <p className="font-medium">{item.crop}</p>
                      <p className="text-xs text-gray-500">{item.market}</p>
                    </div>
                    <Badge variant="secondary" className="text-green-700">₹{item.price}/qtl</Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </motion.div>
        </Card>

      </div>
    </div>
  );
};

export default Dashboard;
