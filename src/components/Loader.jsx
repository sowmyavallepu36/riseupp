// Skeleton heights mimic a masonry gallery so the layout stays stable while loading.
const RATIOS = [1.3, 0.75, 1, 1.5, 0.8, 1.2, 0.67, 1.1, 1.4, 0.9, 1, 1.25];

export default function Loader() {
  return (
    <div className="gallery" role="status" aria-label="Loading images">
      {RATIOS.map((ratio, index) => (
        <div
          key={index}
          className="card skeleton"
          style={{ aspectRatio: `1 / ${ratio}` }}
          aria-hidden="true"
        />
      ))}
    </div>
  );
}
