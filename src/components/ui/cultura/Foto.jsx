import React, { useEffect, useState } from 'react';

// Degradados con los colores de la Quebrada: se ven mientras no cargues tus fotos.
const tonos = [
  'linear-gradient(160deg,#3b2a4a 0%,#9c3f35 40%,#e08a3c 72%,#2a1a14 100%)',
  'linear-gradient(200deg,#4a2b3c 0%,#b5482f 45%,#d9a05a 80%,#2a1a14 100%)',
  'linear-gradient(170deg,#2f3a4d 0%,#8a4a3a 50%,#c97b3a 80%,#241810 100%)',
  'linear-gradient(190deg,#463054 0%,#a8523a 42%,#f0b25a 78%,#2a1a14 100%)',
];

export default function Foto({ src, alt = '', tono = 0, className = '', style, ...resto }) {
  const [fallo, setFallo] = useState(false);

  useEffect(() => {
    setFallo(false);
  }, [src]);

  if (!src || fallo) {
    return (
      <div
        role={alt ? 'img' : undefined}
        aria-label={alt || undefined}
        aria-hidden={alt ? undefined : true}
        className={className}
        style={{ background: tonos[Math.abs(tono) % tonos.length], ...style }}
      />
    );
  }

  return <img src={src} alt={alt} className={className} style={style} onError={() => setFallo(true)} {...resto} />;
}