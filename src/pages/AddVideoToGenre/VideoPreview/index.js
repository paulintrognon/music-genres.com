import React from 'react';

import './style.css';

export default function VideoPreview(props) {
  return (
    <div className="video-preview">
      <iframe
        type="text/html"
        width="614"
        height="360"
        frameBorder="0"
        title="Youtube Player"
        src={`http://www.youtube.com/embed/${props.trackId}?origin=https://www.music-genre.com`}
      />
    </div>
  );
}
