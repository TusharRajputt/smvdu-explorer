import 'react';

declare global {
  namespace JSX {
    interface IntrinsicElements {
     
      'a-scene': any;
      'a-assets': any;
      'a-sky': any;
      'a-entity': any;
      'a-assets-item': any;
    }
  }
}

export {};
