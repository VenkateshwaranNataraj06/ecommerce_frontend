import React, { useState, useRef } from 'react';
import './ImageZoom.css';

const ImageZoom = ({ src, alt }) => {
  const [lens, setLens] = useState({ top: 0, left: 0 });
  const [zoom, setZoom] = useState({ backgroundImage: `url(${src})` });
  const imageRef = useRef(null);

  const handleMouseMove = (e) => {
    const { left, top, width, height } = imageRef.current.getBoundingClientRect();
    const lensWidth = 100; // Lens size
    const lensHeight = 100; // Lens size
    const x = e.clientX - left;
    const y = e.clientY - top;

    let lensX = x - lensWidth / 2;
    let lensY = y - lensHeight / 2;

    lensX = Math.max(0, Math.min(lensX, width - lensWidth));
    lensY = Math.max(0, Math.min(lensY, height - lensHeight));

    setLens({ top: lensY, left: lensX });
    setZoom({
      backgroundImage: `url(${src})`,
      backgroundPositionX: `-${lensX * 2}px`,
      backgroundPositionY: `-${lensY * 2}px`,
    });
  };

  return (
    <div
      className="image-zoom-container"
      onMouseMove={handleMouseMove}
      onMouseOut={() => setLens({ top: 0, left: 0 })}
    >
      <img
        src={src}
        alt={alt}
        className="image-zoom"
        ref={imageRef}
      />
      <div
        className="zoom-lens"
        style={{ top: lens.top, left: lens.left }}
      />
      <div
        className="zoom-result"
        style={zoom}
      />
    </div>
  );
};

export default ImageZoom;
