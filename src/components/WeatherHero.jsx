import { motion } from 'framer-motion';

const WeatherHero = ({ data, darkMode }) => {
  return (
    <div className={`rounded-2xl p-6 mb-8 ${darkMode ? 'bg-slate-800' : 'bg-white'} shadow-xl`}>
      <motion.div 
        className="flex flex-col md:flex-row items-center justify-between"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <div className="text-center md:text-left mb-4 md:mb-0">
          <h2 className={`text-4xl font-bold mb-2 ${darkMode ? 'text-white' : 'text-slate-900'}`}>
            {Math.round(data.main.temp)}°C
          </h2>
          <p className={`text-xl ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>
            {data.name}
          </p>
        </div>
        
        <div className="text-center">
          <img
            src={`https://openweathermap.org/img/wn/${data.weather[0].icon}@4x.png`}
            alt="Weather icon"
            className="w-32 h-32 mx-auto"
          />
          <p className={`text-lg capitalize ${darkMode ? 'text-slate-300' : 'text-slate-600'}`}>
            {data.weather[0].description}
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default WeatherHero;