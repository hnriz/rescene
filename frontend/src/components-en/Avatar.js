import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';

function Avatar({ src, alt = 'Avatar', className = '', size = 'medium' }) {
  const [imageError, setImageError] = React.useState(false);

  const handleImageError = () => {
    setImageError(true);
  };

  // Se tiver imagem e não houver erro, renderizar imagem
  if (src && !imageError) {
    return (
      <img
        src={src}
        alt={alt}
        className={className}
        onError={handleImageError}
      />
    );
  }

  // Se não houver imagem ou houver erro, renderizar avatar padrão
  return (
    <div className={`default-avatar ${size} ${className}`}>
      <FontAwesomeIcon icon={faUser} />
    </div>
  );
}

export default Avatar;
