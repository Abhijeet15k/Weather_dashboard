import { motion } from 'framer-motion';

const ForecastCards = ({ data, darkMode }) => {
  const dailyForecast = data.list.reduce((acc, item) => {
    const date = new Date(item.dt * 1000).toISOString().split('T')[0];
    if (!acc[date]) acc[date] = item;
    return acc;
  }, {});

  return (
    <div className="pb-8">
      <h3 className={`text-xl font-semibold mb-4 ${darkMode ? 'text-white' : 'text-slate-900'}`}>
        5-Day Forecast
      </h3>
      <div className="flex gap-4 overflow-x-auto pb-4">
        {Object.values(dailyForecast).slice(0, 5).map((item, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className={`min-w-[150px] p-4 rounded-xl ${darkMode ? 'bg-slate-800' : 'bg-white'} shadow-md`}
          >
            <p className={`mb-2 ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>
              {new Date(item.dt * 1000).toLocaleDateString('en-US', { weekday: 'short' })}
            </p>
            <img
              src={`https://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`}
              alt="Weather icon"
              className="w-12 h-12 mx-auto mb-2"
            />
            <div className="flex justify-between items-center">
              <span className={`font-semibold ${darkMode ? 'text-white' : 'text-slate-900'}`}>
                {Math.round(item.main.temp_max)}°C
              </span>
              <span className={`text-sm ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>
                {Math.round(item.main.temp_min)}°C
              </span>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default ForecastCards;