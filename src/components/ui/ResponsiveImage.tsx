import { useState, useRef, useEffect } from 'react';
import { cn } from "@/lib/utils";

interface ResponsiveImageProps {
  src: string;
  alt: string;
  className?: string;
  fallbackSrc?: string;
  lazy?: boolean;
  blur?: boolean;
  aspectRatio?: 'square' | 'video' | 'wide' | 'portrait';
  sizes?: string;
  priority?: boolean;
}

export const ResponsiveImage = ({
  src,
  alt,
  className,
  fallbackSrc = '/placeholder.svg',
  lazy = true,
  blur = true,
  aspectRatio,
  sizes = '100vw',
  priority = false
}: ResponsiveImageProps) => {
  const [imageSrc, setImageSrc] = useState(priority ? src : fallbackSrc);
  const [imageLoaded, setImageLoaded] = useState(!lazy);
  const [hasError, setHasError] = useState(false);
  const [inView, setInView] = useState(!lazy);
  const imgRef = useRef<HTMLImageElement>(null);

  const aspectRatioClasses = {
    square: 'aspect-square',
    video: 'aspect-video',
    wide: 'aspect-[21/9]',
    portrait: 'aspect-[3/4]'
  };

  useEffect(() => {
    if (!lazy || priority) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { rootMargin: '50px' }
    );

    if (imgRef.current) {
      observer.observe(imgRef.current);
    }

    return () => observer.disconnect();
  }, [lazy, priority]);

  useEffect(() => {
    if (inView && imageSrc === fallbackSrc && !hasError) {
      setImageSrc(src);
    }
  }, [inView, src, imageSrc, fallbackSrc, hasError]);

  const handleLoad = () => {
    setImageLoaded(true);
  };

  const handleError = () => {
    setHasError(true);
    setImageSrc(fallbackSrc);
  };

  return (
    <div className={cn(
      "relative overflow-hidden bg-air-gray/20",
      aspectRatio && aspectRatioClasses[aspectRatio],
      className
    )}>
      <img
        ref={imgRef}
        src={imageSrc}
        alt={alt}
        sizes={sizes}
        onLoad={handleLoad}
        onError={handleError}
        className={cn(
          "w-full h-full object-cover transition-all duration-700",
          !imageLoaded && blur && "blur-sm scale-105",
          imageLoaded && "blur-0 scale-100"
        )}
      />
      
      {/* Loading Overlay */}
      {!imageLoaded && (
        <div className="absolute inset-0 bg-air-gray/20 animate-pulse flex items-center justify-center">
          <div className="w-8 h-8 border-2 border-air-red border-t-transparent rounded-full animate-spin" />
        </div>
      )}
    </div>
  );
};

// Image Gallery Component
interface ImageGalleryProps {
  images: Array<{ src: string; alt: string; caption?: string }>;
  className?: string;
}

export const ImageGallery = ({ images, className }: ImageGalleryProps) => {
  const [selectedImage, setSelectedImage] = useState<number | null>(null);

  return (
    <>
      <div className={cn("grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4", className)}>
        {images.map((image, index) => (
          <div
            key={index}
            className="cursor-pointer group"
            onClick={() => setSelectedImage(index)}
          >
            <ResponsiveImage
              src={image.src}
              alt={image.alt}
              aspectRatio="square"
              className="rounded-lg group-hover:scale-105 transition-transform duration-300"
            />
          </div>
        ))}
      </div>

      {/* Lightbox */}
      {selectedImage !== null && (
        <div
          className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedImage(null)}
        >
          <div className="relative max-w-4xl max-h-full">
            <ResponsiveImage
              src={images[selectedImage].src}
              alt={images[selectedImage].alt}
              className="max-h-[80vh] w-auto"
              priority
            />
            {images[selectedImage].caption && (
              <p className="text-white text-center mt-4">
                {images[selectedImage].caption}
              </p>
            )}
            <button
              onClick={(e) => {
                e.stopPropagation();
                setSelectedImage(null);
              }}
              className="absolute top-4 right-4 w-8 h-8 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center text-white"
            >
              ×
            </button>
          </div>
        </div>
      )}
    </>
  );
};