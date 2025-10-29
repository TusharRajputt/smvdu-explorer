// VRViewer is not implemented in this project; export a simple placeholder or reuse PanoramaViewer logic.
import type { Location } from '../types';

interface VRViewerProps {
  location: Location;
  onBackToMap: () => void;
}

export default function VRViewer(_props: VRViewerProps) {
  // this file previously duplicated PanoramaViewer; the project uses PanoramaViewer component instead.
  return null;
}

