import { useState, useEffect } from 'react';
import { MapPin, Home, BookOpen, Dumbbell, Coffee, Building2, ChevronLeft } from 'lucide-react';
import type { Location } from '../types';

interface CampusMapProps {
  onLocationClick: (location: Location) => void;
  onBackToLanding: () => void;
}

const campusLocations: Location[] = [
  {
    id: 'main-gate',
    name: 'Main Gate',
    description: 'Welcome to SMVDU campus',
    position: { x: 30, y: 50 }
  },
  {
    id: 'library',
    name: 'Central Library',
    description: 'State-of-the-art learning facility',
    position: { x: 45, y: 35 }
  },
  {
    id: 'hostel',
    name: 'Student Hostel',
    description: 'Comfortable living spaces',
    position: { x: 70, y: 45 }
  },
  {
    id: 'sports',
    name: 'Sports Complex',
    description: 'World-class athletic facilities',
    position: { x: 55, y: 65 }
  },
  {
    id: 'cafeteria',
    name: 'Cafeteria',
    description: 'Delicious food and refreshments',
    position: { x: 35, y: 70 }
  },
  {
    id: 'academic',
    name: 'Academic Block',
    description: 'Main teaching facility',
    position: { x: 60, y: 30 }
  }
];

const getLocationIcon = (id: string) => {
  switch (id) {
    case 'main-gate':
      return Home;
    case 'library':
      return BookOpen;
    case 'hostel':
      return Building2;
    case 'sports':
      return Dumbbell;
    case 'cafeteria':
      return Coffee;
    case 'academic':
      return Building2;
    default:
      return MapPin;
  }
};

function CampusMap({ onLocationClick, onBackToLanding }: CampusMapProps) {
  const [hoveredLocation, setHoveredLocation] = useState<string | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setTimeout(() => setIsVisible(true), 100);
  }, []);

  return (
    <div className={`relative min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 transition-opacity duration-700 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-blue-900/20 via-transparent to-transparent"></div>

      <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>

      <button
        onClick={onBackToLanding}
        className="absolute top-6 left-6 z-20 flex items-center gap-2 px-4 py-2 glassmorphism text-white rounded-full hover:bg-white/20 transition-all duration-300 group"
      >
        <ChevronLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform duration-300" />
        <span className="hidden sm:inline">Back to Home</span>
      </button>

      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4 py-20">
        <div className={`text-center mb-12 transition-all duration-700 delay-200 ${isVisible ? 'translate-y-0 opacity-100' : '-translate-y-10 opacity-0'}`}>
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4">
            SMVDU Campus Map
          </h2>
          <p className="text-gray-400 text-lg">
            Click on any location to explore in 360°
          </p>
        </div>

        <div className="relative w-full max-w-5xl aspect-video glassmorphism rounded-3xl overflow-hidden shadow-2xl">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-900/30 to-slate-900/50"></div>

          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4wMyI+PHBhdGggZD0iTTAgMGg0MHY0MEgweiIvPjwvZz48L2c+PC9zdmc+')] opacity-40"></div>

          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3/4 h-3/4 border-2 border-blue-400/30 rounded-full"></div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1/2 h-1/2 border-2 border-cyan-400/20 rounded-full"></div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-blue-400/50 rounded-full animate-pulse"></div>

          {campusLocations.map((location, index) => {
            const Icon = getLocationIcon(location.id);
            const isHovered = hoveredLocation === location.id;
            const delay = index * 100;

            return (
              <div
                key={location.id}
                className={`absolute transition-all duration-700`}
                style={{
                        left: `${location.position?.x ?? 50}%`,
                        top: `${location.position?.y ?? 50}%`,
                        transform: 'translate(-50%, -50%)',
                        transitionDelay: `${delay}ms`,
                        opacity: isVisible ? 1 : 0,
                        scale: isVisible ? 1 : 0.5
                      }}
              >
                <button
                  onClick={() => onLocationClick(location)}
                  onMouseEnter={() => setHoveredLocation(location.id)}
                  onMouseLeave={() => setHoveredLocation(null)}
                  className="relative group"
                >
                  <div className={`absolute inset-0 bg-blue-500/30 rounded-full blur-xl transition-all duration-300 ${isHovered ? 'scale-150 opacity-100' : 'scale-100 opacity-50'}`}></div>

                  <div className={`relative flex items-center justify-center w-14 h-14 rounded-full glassmorphism transition-all duration-300 ${
                    isHovered ? 'scale-125 bg-gradient-to-br from-blue-500 to-cyan-500 shadow-2xl shadow-blue-500/50' : 'hover:scale-110'
                  }`}>
                    <Icon className={`w-6 h-6 transition-all duration-300 ${isHovered ? 'text-white' : 'text-blue-400'}`} />
                  </div>

                  {!isHovered && (
                    <div className="absolute inset-0 rounded-full border-2 border-blue-400/50 pulse-ring"></div>
                  )}

                  <div className={`absolute top-full left-1/2 -translate-x-1/2 mt-3 transition-all duration-300 ${
                    isHovered ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2 pointer-events-none'
                  }`}>
                    <div className="glassmorphism rounded-lg px-4 py-3 min-w-max shadow-xl">
                      <p className="text-white font-semibold text-sm whitespace-nowrap">{location.name}</p>
                      <p className="text-gray-300 text-xs mt-1">{location.description}</p>
                      <p className="text-cyan-400 text-xs mt-2 font-medium">Click to explore →</p>
                    </div>
                  </div>
                </button>
              </div>
            );
          })}
        </div>

        <div className={`mt-8 grid grid-cols-2 sm:grid-cols-3 gap-3 transition-all duration-700 delay-500 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          {campusLocations.map((location) => {
            const Icon = getLocationIcon(location.id);
            return (
              <button
                key={location.id}
                onClick={() => onLocationClick(location)}
                onMouseEnter={() => setHoveredLocation(location.id)}
                onMouseLeave={() => setHoveredLocation(null)}
                className={`flex items-center gap-3 px-4 py-3 glassmorphism rounded-xl transition-all duration-300 ${
                  hoveredLocation === location.id ? 'bg-white/20 scale-105' : 'hover:bg-white/10'
                }`}
              >
                <Icon className="w-5 h-5 text-blue-400" />
                <span className="text-white text-sm font-medium">{location.name}</span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default CampusMap;
