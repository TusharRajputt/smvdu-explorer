
import React, { useEffect } from "react";
import "aframe";
import type { Location } from "../types";

interface PanoramaViewerProps {
  location: Location;
  onBackToMap: () => void;
}

const PanoramaViewer: React.FC<PanoramaViewerProps> = ({
  location,
  onBackToMap,
}) => {
  useEffect(() => {
    
    const sky = document.getElementById("sky");
    if (sky) {
     
      sky.setAttribute("src", `/assets/${location.id}.jpg`);
    }
  }, [location]);

  return (
    <div style={{ width: "100%", height: "100vh", position: "relative" }}>
      <button
        onClick={onBackToMap}
        className="absolute top-4 left-4 z-10 bg-black/60 text-white px-4 py-2 rounded-md hover:bg-black/80 transition"
      >
        ← Back to Map
      </button>

      <div className="absolute top-4 right-4 text-white bg-black/50 px-3 py-2 rounded-md z-10">
        <h2 className="font-semibold">{location.name}</h2>
        <p className="text-sm opacity-80">{location.description}</p>
      </div>

      <a-scene embedded vr-mode-ui="enabled: false" style={{ height: "100%", width: "100%" }}>
        <a-assets>
          {}
          <img id={location.id} src={`/assets/${location.id}.jpg`} alt={location.name} />
        </a-assets>

        {}
        <a-sky id="sky" src={`#${location.id}`} rotation="0 -90 0"></a-sky>

        {}
        <a-entity camera look-controls position="0 1.6 0">
          <a-entity
            cursor="rayOrigin: mouse"
            raycaster="objects: .clickable"
            geometry="primitive: ring; radiusInner: 0.005; radiusOuter: 0.01"
            material="shader: flat; opacity: 0.9"
            position="0 0 -1"
          ></a-entity>
        </a-entity>
      </a-scene>
    </div>
  );
};

export default PanoramaViewer;
