import { memo, useState } from 'react';
import { Heart, Maximize2 } from 'lucide-react';
import { UTM } from '../services/unsplashApi.js';

const isTouchOnly = () =>
  typeof window !== 'undefined' && window.matchMedia('(hover: none)').matches;

function ImageCard({ photo, onOpen }) {
  const [revealed, setRevealed] = useState(false);
  const description = photo.description || photo.alt_description || 'Untitled photograph';
  const profile = `${photo.user.links.html}?${UTM}`;

  // Mouse users: clicking opens details. Touch users: first tap reveals the info panel.
  const handleImageClick = () => {
    if (isTouchOnly()) setRevealed((value) => !value);
    else onOpen(photo);
  };

  return (
    <figure
      className={`card ${revealed ? 'is-revealed' : ''}`}
      style={{ backgroundColor: photo.color || '#E9DFFF' }}
    >
      <button
        type="button"
        className="card-image-btn"
        onClick={handleImageClick}
        aria-label={`${description}. Show details`}
      >
        <img
          src={photo.urls.small}
          srcSet={`${photo.urls.small} 400w, ${photo.urls.regular} 1080w`}
          sizes="(max-width: 479px) 100vw, (max-width: 767px) 50vw, (max-width: 1199px) 33vw, 25vw"
          width={photo.width}
          height={photo.height}
          alt={photo.alt_description || description}
          loading="lazy"
          style={{ aspectRatio: `${photo.width} / ${photo.height}` }}
        />
      </button>

      <figcaption className="card-overlay">
        <p className="card-desc">{description}</p>
        <div className="card-meta">
          <a href={profile} target="_blank" rel="noopener noreferrer" className="card-author">
            <img src={photo.user.profile_image.small} alt="" width="28" height="28" />
            {photo.user.name}
          </a>
          <span className="card-likes" title="Likes">
            <Heart size={14} aria-hidden="true" /> {photo.likes.toLocaleString()}
          </span>
        </div>
        <div className="card-foot">
          <span className="card-dims">
            {photo.width} × {photo.height}
          </span>
          <button type="button" className="card-view" onClick={() => onOpen(photo)}>
            <Maximize2 size={14} aria-hidden="true" /> View Details
          </button>
        </div>
      </figcaption>
    </figure>
  );
}

export default memo(ImageCard);
