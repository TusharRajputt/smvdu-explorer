// src/components/GlobeMap.tsx
import React, { useEffect, useRef } from "react";
import * as THREE from "three";

type Location = {
  id: string;
  title: string;
  image: string; // image URL (string)
  markerPos: { x: number; y: number; z: number }; // approx vector on sphere or plane
};

interface GlobeMapProps {
  locations: Location[];
  onSelectLocation: (loc: Location) => void;
  mapTextureUrl?: string; // optional map texture
}

const GlobeMap: React.FC<GlobeMapProps> = ({ locations, onSelectLocation, mapTextureUrl }) => {
  const mountRef = useRef<HTMLDivElement | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const markersRef = useRef<THREE.Mesh[]>([]);

  useEffect(() => {
    const container = mountRef.current!;
    const width = container.clientWidth;
    const height = container.clientHeight;

    const scene = new THREE.Scene();
    sceneRef.current = scene;

    const camera = new THREE.PerspectiveCamera(60, width / height, 0.1, 1000);
    camera.position.z = 5;
    cameraRef.current = camera;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    container.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // globe geometry
    let globe: THREE.Mesh;
    if (mapTextureUrl) {
      const tex = new THREE.TextureLoader().load(mapTextureUrl);
      const geo = new THREE.SphereGeometry(2, 64, 64);
      const mat = new THREE.MeshBasicMaterial({ map: tex });
      globe = new THREE.Mesh(geo, mat);
      scene.add(globe);
    } else {
      // fallback simple colored sphere
      const geo = new THREE.SphereGeometry(2, 64, 64);
      const mat = new THREE.MeshNormalMaterial();
      globe = new THREE.Mesh(geo, mat);
      scene.add(globe);
    }

    // markers
    const markers: THREE.Mesh[] = [];
    locations.forEach((loc) => {
      const mGeo = new THREE.SphereGeometry(0.06, 12, 12);
      const mMat = new THREE.MeshBasicMaterial({ color: 0xff5722 });
      const marker = new THREE.Mesh(mGeo, mMat);

      const v = new THREE.Vector3(loc.markerPos.x, loc.markerPos.y, loc.markerPos.z).normalize().multiplyScalar(2.05);
      marker.position.copy(v);
      marker.userData = loc;
      scene.add(marker);
      markers.push(marker);
    });
    markersRef.current = markers;

    // raycaster for clicks
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();

    function onClick(e: MouseEvent) {
      const rect = renderer.domElement.getBoundingClientRect();
      mouse.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      mouse.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;
      raycaster.setFromCamera(mouse, camera);
      const hits = raycaster.intersectObjects(markers);
      if (hits.length > 0) {
        const loc = (hits[0].object.userData as Location);
        onSelectLocation(loc);
      }
    }

    renderer.domElement.addEventListener("click", onClick);

    function animate() {
      requestAnimationFrame(animate);
      globe.rotation.y += 0.002;
      renderer.render(scene, camera);
    }
    animate();

    // responsive
    const onResize = () => {
      const w = container.clientWidth, h = container.clientHeight;
      renderer.setSize(w, h);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
    };
    window.addEventListener("resize", onResize);

    return () => {
      renderer.domElement.removeEventListener("click", onClick);
      window.removeEventListener("resize", onResize);
      container.removeChild(renderer.domElement);
      renderer.dispose();
    };
  }, [locations, mapTextureUrl, onSelectLocation]);

  return <div ref={mountRef} style={{ width: "100%", height: "70vh" }} />;
};

export default GlobeMap;
