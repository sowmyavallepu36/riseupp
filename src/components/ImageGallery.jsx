import ImageCard from './ImageCard.jsx';

export default function ImageGallery({ photos, onOpen }) {
  return (
    <div className="gallery">
      {photos.map((photo) => (
        <ImageCard key={photo.id} photo={photo} onOpen={onOpen} />
      ))}
    </div>
  );
}
