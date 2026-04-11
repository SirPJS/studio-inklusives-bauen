import { useState, useRef, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface ImageGalleryProps {
  images: string[];
  title: string;
  className?: string;
  eager?: boolean;
}

/** Convert an image path to its .webp sibling */
const toWebp = (src: string) => src.replace(/\.(jpg|jpeg|png)$/i, ".webp");

const ImageGallery = ({ images, title, className = "", eager = false }: ImageGalleryProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [aspectRatio, setAspectRatio] = useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Load the first image to determine the aspect ratio for all images
  useEffect(() => {
    if (!images.length) return;
    const img = new Image();
    img.onload = () => {
      setAspectRatio(img.naturalHeight / img.naturalWidth);
    };
    const src = images[0].startsWith("http")
      ? images[0]
      : `${import.meta.env.BASE_URL || "/"}${images[0]}`;
    // Use webp for faster aspect-ratio probe
    img.src = toWebp(src);
  }, [images]);

  const goToNext = () => {
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  if (!images.length) return null;

  const base = import.meta.env.BASE_URL || "/";
  const currentSrc = `${base}${images[currentIndex]}`;
  const currentWebp = toWebp(currentSrc);
  const isFirst = eager && currentIndex === 0;

  return (
    <div className={`relative ${className}`} ref={containerRef}>
      {/* Main Image - fixed aspect ratio based on first image */}
      <div className="relative w-full bg-background overflow-hidden group">
        <div
          style={
            aspectRatio
              ? { paddingBottom: `${aspectRatio * 100}%`, position: "relative" }
              : undefined
          }
        >
          <picture>
            <source srcSet={currentWebp} type="image/webp" />
            <img
              src={currentSrc}
              alt={`${title} - Bild ${currentIndex + 1}`}
              className={`${
                aspectRatio ? "absolute inset-0" : ""
              } w-full h-full object-contain transition-opacity duration-300`}
              loading={isFirst ? "eager" : "lazy"}
              decoding={isFirst ? "sync" : "async"}
              fetchPriority={isFirst ? "high" : "auto"}
              onError={(e) => {
                const target = e.currentTarget as HTMLImageElement;
                if (!target.getAttribute("data-fallback-tried")) {
                  target.setAttribute("data-fallback-tried", "true");
                  target.src = `/${images[currentIndex]}`;
                }
              }}
            />
          </picture>
        </div>

        {/* Navigation Arrows */}
        {images.length > 1 && (
          <>
            <button
              onClick={(e) => {
                e.stopPropagation();
                goToPrevious();
              }}
              className="gallery-nav left-2 opacity-0 group-hover:opacity-100"
              aria-label="Vorheriges Bild"
            >
              <ChevronLeft size={24} />
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                goToNext();
              }}
              className="gallery-nav right-2 opacity-0 group-hover:opacity-100"
              aria-label="Nächstes Bild"
            >
              <ChevronRight size={24} />
            </button>
          </>
        )}
      </div>

    </div>
  );
};

export default ImageGallery;
