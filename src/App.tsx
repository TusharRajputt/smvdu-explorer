import { useState } from 'react';
import LandingPage from './components/LandingPage';
import CampusMap from './components/CampusMap';
import PanoramaViewer from './components/PanoramaViewer';
import GlobeMap from './components/GlobeMap';
import type { Location } from './types';

type View = 'landing' | 'map' | 'panorama' | 'globe';

function App() {
  const [view, setView] = useState<View>('landing');
  const [selectedLocation, setSelectedLocation] = useState<Location | null>(null);

  const handleExplore = () => setView('map');

  const handleLocationClick = (loc: Location) => {
    setSelectedLocation(loc);
    setView('panorama');
  };

  const handleBackToLanding = () => setView('landing');
  const handleBackToMap = () => setView('map');

  return (
    <div>
      {view === 'landing' && <LandingPage onExplore={handleExplore} />}
      {view === 'map' && (
        <CampusMap onLocationClick={handleLocationClick} onBackToLanding={handleBackToLanding} />
      )}
      {view === 'globe' && (
        <div className="p-6">
          <button onClick={() => setView('map')} className="mb-4">Back to Map</button>
          <GlobeMap locations={[]} onSelectLocation={() => {}} />
        </div>
      )}
      {view === 'panorama' && selectedLocation && (
        <PanoramaViewer location={selectedLocation} onBackToMap={handleBackToMap} />
      )}
    </div>
  );
}

export default App;
