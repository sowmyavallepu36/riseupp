import { useCallback, useEffect, useRef, useState } from 'react';
import { ExternalLink, Heart, Ruler, X } from 'lucide-react';
import { UTM } from '../services/unsplashApi.js';

export default function ImageDetails({ photo, onClose }) {
  const [closing, setClosing] = useState(false);
  const closeRef = useRef(null);

  const requestClose = useCallback(() => {
    setClosing(true);
    window.setTimeout(onClose, 200); // let the exit animation play
  }, [onClose]);

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden'; // lock background scroll
    closeRef.current?.focus();
    const onKey = (event) => {
      if (event.key === 'Escape') requestClose();
    };
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', onKey);
    };
  }, [requestClose]);

  const description = photo.description || photo.alt_description || 'Untitled photograph';
  const profile = `${photo.user.links.html}?${UTM}`;
  const source = `${photo.links.html}?${UTM}`;

  return (
    <div
      className={`modal-backdrop ${closing ? 'is-closing' : ''}`}
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) requestClose();
      }}
    >
      <div className="modal" role="dialog" aria-modal="true" aria-labelledby="modal-title">
        <button
          ref={closeRef}
          type="button"
          className="modal-close"
          onClick={requestClose}
          aria-label="Close details"
        >
          <X size={22} />
        </button>

        <div className="modal-media" style={{ backgroundColor: photo.color || '#241044' }}>
          <img src={photo.urls.regular} alt={photo.alt_description || description} />
        </div>

        <div className="modal-body">
          <h2 id="modal-title">{description}</h2>

          <a className="modal-author" href={profile} target="_blank" rel="noopener noreferrer">
            <img src={photo.user.profile_image.medium} alt="" width="48" height="48" />
            <span>
              <strong>{photo.user.name}</strong>
              <small>View photographer profile</small>
            </span>
            <ExternalLink size={16} aria-hidden="true" />
          </a>

          <dl className="modal-stats">
            <div>
              <dt>
                <Heart size={16} aria-hidden="true" /> Likes
              </dt>
              <dd>{photo.likes.toLocaleString()}</dd>
            </div>
            <div>
              <dt>
                <Ruler size={16} aria-hidden="true" /> Dimensions
              </dt>
              <dd>
                {photo.width} × {photo.height}
              </dd>
            </div>
          </dl>

          <a className="modal-source" href={source} target="_blank" rel="noopener noreferrer">
            View on Unsplash <ExternalLink size={16} aria-hidden="true" />
          </a>
        </div>
      </div>
    </div>
  );
}
