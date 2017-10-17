import React from 'react';

import image from './loading.png';
import './loading-indicator.css';

export default function LoadingIndicator() {
  return <img src={image} alt='Loading' className="loading-indicator-image" />;
}
