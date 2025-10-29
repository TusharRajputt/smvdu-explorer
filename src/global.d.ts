import 'react';

declare global {
  namespace JSX {
    interface IntrinsicElements {
      // A-Frame elements used in the project
      'a-scene': any;
      'a-assets': any;
      'a-sky': any;
      'a-entity': any;
      'a-assets-item': any;
    }
  }
}

export {};
