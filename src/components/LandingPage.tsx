import { GraduationCap, MapPin, Camera, Globe } from 'lucide-react';

interface LandingPageProps {
  onExplore: () => void;
}

function LandingPage({ onExplore }: LandingPageProps) {
  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PHBhdGggZD0iTTM2IDM0djItaDJWMzZoLTJ6bTAtNHYyaDJ2LTJoLTJ6bTAgNHYyaDJ2LTJoLTJ6Ii8+PC9nPjwvZz48L3N2Zz4=')] opacity-20"></div>

      <div className="absolute top-0 left-0 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl animate-float"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }}></div>

      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4 sm:px-6 lg:px-8">
        <div className="text-center animate-fade-in">
          <div className="mb-8 inline-flex items-center justify-center p-4 glassmorphism rounded-full animate-float">
            <GraduationCap className="w-16 h-16 text-blue-400" />
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-4 leading-tight">
            Shri Mata Vaishno Devi University
          </h1>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6 leading-tight">
            <span className="bg-gradient-to-r from-blue-400 via-cyan-400 to-teal-400 text-transparent bg-clip-text">
              Virtual Campus Tour
            </span>
          </h2>

          <p className="text-xl sm:text-2xl text-gray-300 mb-4 max-w-2xl mx-auto">
            Explore SMVDU campus in immersive 360° virtual reality
          </p>

          <p className="text-base sm:text-lg text-gray-400 mb-12 max-w-xl mx-auto">
            Navigate through stunning panoramic views of every corner of our campus - from classrooms to sports facilities
          </p>

          <button
            onClick={onExplore}
            className="group relative inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-blue-500 to-cyan-500 text-white text-lg font-semibold rounded-full transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-blue-500/50 animate-glow"
          >
            <Globe className="w-6 h-6 group-hover:rotate-12 transition-transform duration-300" />
            Explore Campus in VR
            <div className="absolute inset-0 rounded-full bg-white opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
          </button>

          <div className="mt-16 grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <div className="glassmorphism rounded-2xl p-6 hover:bg-white/20 transition-all duration-300 transform hover:-translate-y-2">
              <MapPin className="w-10 h-10 text-blue-400 mx-auto mb-4" />
              <h3 className="text-white font-semibold text-lg mb-2">Interactive Map</h3>
              <p className="text-gray-400 text-sm">Navigate through campus locations with ease</p>
            </div>

            <div className="glassmorphism rounded-2xl p-6 hover:bg-white/20 transition-all duration-300 transform hover:-translate-y-2">
              <Camera className="w-10 h-10 text-cyan-400 mx-auto mb-4" />
              <h3 className="text-white font-semibold text-lg mb-2">360° Views</h3>
              <p className="text-gray-400 text-sm">Immersive panoramic photography</p>
            </div>

            <div className="glassmorphism rounded-2xl p-6 hover:bg-white/20 transition-all duration-300 transform hover:-translate-y-2">
              <Globe className="w-10 h-10 text-teal-400 mx-auto mb-4" />
              <h3 className="text-white font-semibold text-lg mb-2">VR Ready</h3>
              <p className="text-gray-400 text-sm">Experience on any device, no headset needed</p>
            </div>
          </div>
        </div>
      </div>

      <footer className="absolute bottom-0 left-0 right-0 py-6 text-center text-gray-400 text-sm z-10">
        <p></p>
      </footer>
    </div>
  );
}

export default LandingPage;
