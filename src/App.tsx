import React, { useState, useEffect } from 'react';
import { Search, Cloud, Sun, CloudRain, CloudSnow, CloudLightning, CloudFog, Wind } from 'lucide-react';

function App() {
  const [weather, setWeather] = useState({
    location: 'Loading...',
    temperature: 0,
    condition: 'loading',
    conditionText: 'Scanning the cosmos...'
  });
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Simulate fetching weather data
  useEffect(() => {
    const fetchWeather = () => {
      setLoading(true);
      
      // Simulate API call delay
      setTimeout(() => {
        // Random weather conditions for demo
        const conditions = ['clear', 'cloudy', 'rainy', 'snowy', 'stormy', 'foggy', 'windy'];
        const randomCondition = conditions[Math.floor(Math.random() * conditions.length)];
        const randomTemp = Math.floor(Math.random() * 35) - 5; // -5 to 30°C
        
        const locations = ['Cosmic City', 'Nebula Heights', 'Andromeda Avenue', 'Stellar Street', 'Galaxy Gardens'];
        const randomLocation = locations[Math.floor(Math.random() * locations.length)];
        
        const conditionTexts = {
          clear: 'Clear cosmic skies',
          cloudy: 'Nebula formations gathering',
          rainy: 'Meteor shower incoming',
          snowy: 'Stardust precipitation',
          stormy: 'Solar flare activity',
          foggy: 'Cosmic dust clouds',
          windy: 'Solar winds intensifying'
        };
        
        setWeather({
          location: randomLocation,
          temperature: randomTemp,
          condition: randomCondition,
          conditionText: conditionTexts[randomCondition]
        });
        
        setLoading(false);
      }, 1500);
    };
    
    fetchWeather();
    
    // Refresh weather every 30 seconds
    const intervalId = setInterval(fetchWeather, 30000);
    
    return () => clearInterval(intervalId);
  }, []);

  // Handle search
  const handleSearch = (e) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    
    setLoading(true);
    setWeather({
      ...weather,
      location: 'Searching...',
      conditionText: 'Scanning the cosmos...'
    });
    
    // Simulate search delay
    setTimeout(() => {
      // Random weather for searched location
      const conditions = ['clear', 'cloudy', 'rainy', 'snowy', 'stormy', 'foggy', 'windy'];
      const randomCondition = conditions[Math.floor(Math.random() * conditions.length)];
      const randomTemp = Math.floor(Math.random() * 35) - 5;
      
      const conditionTexts = {
        clear: 'Clear cosmic skies',
        cloudy: 'Nebula formations gathering',
        rainy: 'Meteor shower incoming',
        snowy: 'Stardust precipitation',
        stormy: 'Solar flare activity',
        foggy: 'Cosmic dust clouds',
        windy: 'Solar winds intensifying'
      };
      
      setWeather({
        location: searchQuery,
        temperature: randomTemp,
        condition: randomCondition,
        conditionText: conditionTexts[randomCondition]
      });
      
      setLoading(false);
      setSearchQuery('');
    }, 1000);
  };

  // Get weather icon based on condition
  const getWeatherIcon = () => {
    switch(weather.condition) {
      case 'clear':
        return <Sun className="h-16 w-16 text-yellow-400" />;
      case 'cloudy':
        return <Cloud className="h-16 w-16 text-gray-300" />;
      case 'rainy':
        return <CloudRain className="h-16 w-16 text-blue-400" />;
      case 'snowy':
        return <CloudSnow className="h-16 w-16 text-white" />;
      case 'stormy':
        return <CloudLightning className="h-16 w-16 text-yellow-500" />;
      case 'foggy':
        return <CloudFog className="h-16 w-16 text-gray-400" />;
      case 'windy':
        return <Wind className="h-16 w-16 text-blue-300" />;
      default:
        return <Cloud className="h-16 w-16 text-gray-400" />;
    }
  };

  // Get background class based on condition
  const getBackgroundClass = () => {
    switch(weather.condition) {
      case 'clear':
        return 'bg-gradient-to-br from-blue-500 to-purple-800';
      case 'cloudy':
        return 'bg-gradient-to-br from-gray-400 to-blue-700';
      case 'rainy':
        return 'bg-gradient-to-br from-blue-700 to-gray-900';
      case 'snowy':
        return 'bg-gradient-to-br from-blue-200 to-indigo-900';
      case 'stormy':
        return 'bg-gradient-to-br from-gray-900 to-purple-900';
      case 'foggy':
        return 'bg-gradient-to-br from-gray-500 to-gray-800';
      case 'windy':
        return 'bg-gradient-to-br from-blue-400 to-blue-900';
      default:
        return 'bg-gradient-to-br from-blue-500 to-purple-800';
    }
  };

  return (
    <div className={`min-h-screen ${getBackgroundClass()} flex flex-col items-center justify-center relative overflow-hidden`}>
      {/* Animated stars */}
      <div className="stars absolute inset-0"></div>
      
      {/* Main content */}
      <div className="z-10 w-full max-w-md">
        <div className="backdrop-blur-lg bg-black/30 rounded-xl p-8 shadow-2xl border border-white/10">
          <h1 className="text-3xl font-bold text-center text-white mb-6">Cosmic Weather</h1>
          
          {/* Search form */}
          <form onSubmit={handleSearch} className="mb-6">
            <div className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search location..."
                className="w-full py-2 pl-4 pr-10 rounded-full bg-white/10 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/50"
              />
              <button 
                type="submit" 
                className="absolute right-2 top-1/2 transform -translate-y-1/2 text-white/70 hover:text-white"
              >
                <Search className="h-5 w-5" />
              </button>
            </div>
          </form>
          
          {/* Weather display */}
          <div className="text-center">
            <h2 className="text-2xl font-semibold text-white mb-2">{weather.location}</h2>
            
            <div className="flex justify-center items-center my-4">
              {getWeatherIcon()}
            </div>
            
            <div className="text-5xl font-bold text-white mb-2">
              {loading ? '--' : `${weather.temperature}°C`}
            </div>
            
            <p className="text-xl text-white/80 mb-4">{weather.conditionText}</p>
            
            {/* Additional cosmic details */}
            <div className="grid grid-cols-2 gap-4 mt-6">
              <div className="bg-white/10 p-3 rounded-lg">
                <p className="text-sm text-white/60">Cosmic Radiation</p>
                <p className="text-lg font-semibold text-white">{Math.floor(Math.random() * 100)}%</p>
              </div>
              <div className="bg-white/10 p-3 rounded-lg">
                <p className="text-sm text-white/60">Solar Activity</p>
                <p className="text-lg font-semibold text-white">{['Low', 'Medium', 'High'][Math.floor(Math.random() * 3)]}</p>
              </div>
              <div className="bg-white/10 p-3 rounded-lg">
                <p className="text-sm text-white/60">Meteor Probability</p>
                <p className="text-lg font-semibold text-white">{Math.floor(Math.random() * 100)}%</p>
              </div>
              <div className="bg-white/10 p-3 rounded-lg">
                <p className="text-sm text-white/60">Stellar Visibility</p>
                <p className="text-lg font-semibold text-white">{['Poor', 'Fair', 'Good', 'Excellent'][Math.floor(Math.random() * 4)]}</p>
              </div>
            </div>
          </div>
        </div>
        
        <p className="text-center text-white/50 text-xs mt-4">
          Data refreshes every 30 seconds • Last updated: {new Date().toLocaleTimeString()}
        </p>
      </div>
    </div>
  );
}

export default App;