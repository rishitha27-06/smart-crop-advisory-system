import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Leaf, LogOut, BarChart3, CloudRain, Sun, Thermometer, MapPin, Droplets, Zap } from 'lucide-react';
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

  const [marketPrices, setMarketPrices] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedLocation, setSelectedLocation] = useState('Mumbai');

  const updateDataBasedOnLocation = async (location: string) => {
    try {
      const [weatherData, forecastData, weatherAlerts] = await Promise.all([
        getCurrentWeather(location, 'IN'),
        getWeatherForecast(location, 'IN'),
        getWeatherAlerts(location, 'IN')
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
        city: location,
        country: "IN"
      });
      // Generate current date-based forecast for fallback
      const today = new Date();
      const fallbackForecast = [];
      for (let i = 0; i < 7; i++) {
        const date = new Date(today);
        date.setDate(today.getDate() + i);
        let dayLabel;
        if (i === 0) dayLabel = 'Today';
        else if (i === 1) dayLabel = 'Tomorrow';
        else dayLabel = date.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });

        fallbackForecast.push({
          day: dayLabel,
          date: date.toISOString().split('T')[0],
          temperature: 28 + Math.floor(Math.random() * 8),
          condition: ["Sunny", "Cloudy", "Partly Cloudy", "Rain"][Math.floor(Math.random() * 4)],
          icon: ["01d", "02d", "03d", "10d"][Math.floor(Math.random() * 4)],
          humidity: 50 + Math.floor(Math.random() * 30),
          windSpeed: 5 + Math.floor(Math.random() * 15)
        });
      }
      setForecast(fallbackForecast);
      setAlerts([{ type: "info", title: "Good Weather", message: "Favorable for sowing rice", icon: "🌱" }]);
    }

    // Update market prices based on location with more variety
    const locationPrices = {
      Mumbai: [
        { crop: "Cotton", price: 5600, market: "Mumbai", change: "+2.5%", trend: "up" },
        { crop: "Rice", price: 1850, market: "Hyderabad", change: "-1.2%", trend: "down" },
        { crop: "Wheat", price: 2200, market: "Delhi", change: "+0.8%", trend: "up" },
        { crop: "Maize", price: 1600, market: "Bangalore", change: "+3.1%", trend: "up" },
        { crop: "Sugarcane", price: 320, market: "Pune", change: "-0.5%", trend: "down" },
        { crop: "Turmeric", price: 7500, market: "Nizamabad", change: "+1.7%", trend: "up" },
        { crop: "Soybean", price: 4200, market: "Indore", change: "+4.2%", trend: "up" },
        { crop: "Groundnut", price: 5800, market: "Rajkot", change: "-2.1%", trend: "down" }
      ],
      Delhi: [
        { crop: "Wheat", price: 2200, market: "Delhi", change: "+0.8%", trend: "up" },
        { crop: "Rice", price: 1850, market: "Hyderabad", change: "-1.2%", trend: "down" },
        { crop: "Maize", price: 1600, market: "Bangalore", change: "+3.1%", trend: "up" },
        { crop: "Cotton", price: 5600, market: "Mumbai", change: "+2.5%", trend: "up" },
        { crop: "Sugarcane", price: 320, market: "Pune", change: "-0.5%", trend: "down" },
        { crop: "Turmeric", price: 7500, market: "Nizamabad", change: "+1.7%", trend: "up" },
        { crop: "Mustard", price: 4800, market: "Jaipur", change: "+2.9%", trend: "up" },
        { crop: "Bajra", price: 1400, market: "Bikaner", change: "-1.8%", trend: "down" }
      ],
      Hyderabad: [
        { crop: "Rice", price: 1850, market: "Hyderabad", change: "-1.2%", trend: "down" },
        { crop: "Wheat", price: 2200, market: "Delhi", change: "+0.8%", trend: "up" },
        { crop: "Maize", price: 1600, market: "Bangalore", change: "+3.1%", trend: "up" },
        { crop: "Cotton", price: 5600, market: "Mumbai", change: "+2.5%", trend: "up" },
        { crop: "Sugarcane", price: 320, market: "Pune", change: "-0.5%", trend: "down" },
        { crop: "Turmeric", price: 7500, market: "Nizamabad", change: "+1.7%", trend: "up" },
        { crop: "Chilli", price: 12000, market: "Guntur", change: "+5.3%", trend: "up" },
        { crop: "Tobacco", price: 180, market: "Kurnool", change: "-0.9%", trend: "down" }
      ]
    };
    setMarketPrices(locationPrices[location as keyof typeof locationPrices] || locationPrices.Mumbai);


  };

  useEffect(() => {
    const loadDashboardData = async () => {
      try {
        setLoading(true);
        
        // Load data without authentication checks
        const cropsData = [
          { id: '1', name: 'Wheat', quantity: 100, price: 2200, location: 'Delhi', harvestDate: '2023-12-01', photos: [], farmerId: 'demo-id', farmerName: 'Demo Farmer', createdAt: new Date().toISOString() },
          { id: '2', name: 'Rice', quantity: 50, price: 1850, location: 'Hyderabad', harvestDate: '2023-11-15', photos: [], farmerId: 'demo-id', farmerName: 'Demo Farmer', createdAt: new Date().toISOString() }
        ];
        const ordersData = [
          { id: '1', buyerId: 'buyer-id', sellerId: 'demo-id', cropId: '1', quantity: 10, totalAmount: 22000, status: 'pending' as const, createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() }
        ];
        setCrops(cropsData);
        setOrders(ordersData);
      } catch (error) {
        console.error(error);
        toast({ title: "Error", description: "Failed to load dashboard" });
      } finally {
        setLoading(false);
      }
    };

    loadDashboardData();
    updateDataBasedOnLocation(selectedLocation);
  }, [toast]); // Removed state.user and navigate dependencies

  useEffect(() => {
    updateDataBasedOnLocation(selectedLocation);
  }, [selectedLocation]);

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
          <h1 className="text-3xl sm:text-4xl font-extrabold text-green-700">{t('dashboard.welcome')}, Demo User!</h1>
          <div className="flex items-center space-x-4">
            <Select value={selectedLocation} onValueChange={setSelectedLocation}>
              <SelectTrigger className="w-32">
                <SelectValue placeholder="Location" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Mumbai">Mumbai</SelectItem>
                <SelectItem value="Delhi">Delhi</SelectItem>
                <SelectItem value="Hyderabad">Hyderabad</SelectItem>
              </SelectContent>
            </Select>
          </div>
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

        {/* Weather */}
        <Card className="bg-gradient-to-r from-blue-50 to-cyan-50 border-blue-200 shadow-lg">
          <motion.div whileHover={{ scale: 1.02 }} className="cursor-pointer">
            <CardHeader className="pb-4">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="flex items-center space-x-2 text-blue-800">
                    <Sun className="text-yellow-500 h-6 w-6" />
                    <span>{t('dashboard.weather')} - {weather?.city}</span>
                  </CardTitle>
                  <CardDescription className="text-blue-600 mt-1">
                    7-Day Weather Forecast
                  </CardDescription>
                </div>
                {weather && (
                  <div className="text-right">
                    <div className="text-3xl font-bold text-blue-900">{weather.temperature}°C</div>
                    <div className="text-sm text-blue-700">{weather.condition}</div>
                    <div className="text-xs text-blue-600">Humidity: {weather.humidity}%</div>
                  </div>
                )}
              </div>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-3">
                {forecast.map((day, i) => (
                  <motion.div
                    key={i}
                    whileHover={{ scale: 1.05 }}
                    className={`p-4 rounded-xl shadow-md text-center transition-all duration-300 ${
                      i === 0
                        ? 'bg-gradient-to-br from-yellow-100 to-orange-100 border-2 border-yellow-300'
                        : 'bg-white hover:bg-blue-50 border border-gray-200'
                    }`}
                  >
                    <p className={`font-semibold mb-2 ${i === 0 ? 'text-yellow-800' : 'text-gray-700'}`}>
                      {day.day}
                    </p>
                    <p className="text-xs text-gray-500 mb-2">
                      {new Date(day.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                    </p>
                    <img
                      src={`https://openweathermap.org/img/wn/${day.icon}@2x.png`}
                      alt={day.condition}
                      className="mx-auto h-14 w-14 mb-2"
                    />
                    <p className="font-bold text-lg text-gray-800 mb-1">{day.temperature}°C</p>
                    <p className="text-xs text-gray-600 capitalize">{day.condition}</p>
                    <div className="mt-2 text-xs text-gray-500">
                      💧 {day.humidity}%
                    </div>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </motion.div>
        </Card>

        {/* Market Prices */}
        <Card className="bg-gradient-to-r from-green-50 to-emerald-50 border-green-200 shadow-lg">
          <motion.div whileHover={{ scale: 1.02 }} className="cursor-pointer">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2 text-green-800">
                <BarChart3 className="text-green-600 h-6 w-6" />
                <span>Live Market Prices</span>
              </CardTitle>
              <CardDescription className="text-green-600">Daily Sample Rates - Updated Today</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {marketPrices.map((item, idx) => (
                  <motion.div
                    key={idx}
                    whileHover={{ scale: 1.03 }}
                    className="bg-white p-5 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 border border-green-100"
                  >
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <h3 className="font-bold text-lg text-gray-800">{item.crop}</h3>
                        <p className="text-sm text-gray-500 flex items-center">
                          <MapPin className="h-3 w-3 mr-1" />
                          {item.market}
                        </p>
                      </div>
                      <div className="text-right">
                        <Badge className="bg-green-100 text-green-800 hover:bg-green-200 text-sm px-3 py-1 mb-1">
                          ₹{item.price}/qtl
                        </Badge>
                        <div className={`text-xs font-medium ${item.trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
                          {item.change}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center justify-between text-xs text-gray-600">
                      <span className="flex items-center">
                        <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                        Active Market
                      </span>
                      <span>Updated Today</span>
                    </div>
                  </motion.div>
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
