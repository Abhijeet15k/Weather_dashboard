const WeatherStats = ({ data, darkMode }) => {
    const stats = [
      { label: 'Feels Like', value: `${Math.round(data.main.feels_like)}°C`, icon: '🌡️' },
      { label: 'Humidity', value: `${data.main.humidity}%`, icon: '💧' },
      { label: 'Wind Speed', value: `${data.wind.speed} km/h`, icon: '🌪️' },
      { label: 'Pressure', value: `${data.main.pressure} hPa`, icon: '⏲️' },
    ];
  
    return (
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        {stats.map((stat, index) => (
          <div 
            key={index}
            className={`p-4 rounded-xl ${darkMode ? 'bg-slate-800' : 'bg-white'} shadow-md`}
          >
            <div className="flex items-center gap-3">
              <span className="text-2xl">{stat.icon}</span>
              <div>
                <p className={`text-sm ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>
                  {stat.label}
                </p>
                <p className={`text-xl font-semibold ${darkMode ? 'text-white' : 'text-slate-900'}`}>
                  {stat.value}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  };
  
  export default WeatherStats;