export type Location = {
  id: string;
  name: string;
  description?: string;
  position?: { x: number; y: number };
  markerPos?: { x: number; y: number; z: number };
};

export default Location;
