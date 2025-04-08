import { useState, useEffect } from 'react';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import { SunIcon, MoonIcon, MagnifyingGlassIcon } from '@heroicons/react/24/solid';
import WeatherHero from './components/WeatherHero';
import ForecastCards from './components/Forecast';
import WeatherStats from './components/WeatherStats';

function App() {
  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [darkMode, setDarkMode] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const toggleTheme = () => {
    setDarkMode(!darkMode);
  };

  const fetchData = async (location) => {
    if (!location) return;
    
    try {
      setLoading(true);
      setError('');
      
      // Fetch current weather
      const weatherRes = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=${process.env.REACT_APP_API_KEY}`
      );
      setWeather(weatherRes.data);

      // Fetch forecast
      const forecastRes = await axios.get(
        `https://api.openweathermap.org/data/2.5/forecast?q=${location}&units=metric&appid=${process.env.REACT_APP_API_KEY}`
      );
      setForecast(forecastRes.data);
    } catch (err) {
      setError('Failed to fetch weather data. Please try another location.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={`min-h-screen transition-all duration-500 ${darkMode ? 'bg-slate-900' : 'bg-gradient-to-br from-blue-100 to-indigo-50'}`}>
      
      {/* New Header */}
      <header className="container mx-auto px-4 py-6 flex justify-between items-center">
        <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          Weather Dashboard
        </h1>
        <button
          onClick={toggleTheme}
          className={`p-2 rounded-lg ${darkMode ? 'bg-slate-800' : 'bg-white'} shadow-sm`}
        >
          {darkMode ? (
            <SunIcon className="w-6 h-6 text-amber-400" />
          ) : (
            <MoonIcon className="w-6 h-6 text-slate-600" />
          )}
        </button>
      </header>

      {/* Search Bar */}
      <div className="container mx-auto px-4 mb-8">
        <div className={`max-w-xl mx-auto rounded-xl p-1 ${darkMode ? 'bg-slate-800' : 'bg-white'} shadow-lg`}>
          <div className="flex items-center gap-2 px-4 py-2">
            <MagnifyingGlassIcon className={`w-5 h-5 ${darkMode ? 'text-slate-400' : 'text-slate-600'}`} />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && fetchData(searchTerm)}
              placeholder="Search city..."
              className={`flex-1 bg-transparent outline-none ${darkMode ? 'text-white' : 'text-slate-900'}`}
            />
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="container mx-auto px-4">
        {loading && (
          <div className="text-center py-8">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          </div>
        )}

        {weather && forecast && (
          <AnimatePresence>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
            >
              <WeatherHero data={weather} darkMode={darkMode} />
              <WeatherStats data={weather} darkMode={darkMode} />
              <ForecastCards data={forecast} darkMode={darkMode} />
            </motion.div>
          </AnimatePresence>
        )}

        {/* Error Message */}
        {error && (
          <div className={`p-4 rounded-xl ${darkMode ? 'bg-red-900/30' : 'bg-red-100'} text-red-500 text-center`}>
            {error}
          </div>
        )}
      </main>
    </div>
  );
}

export default App;