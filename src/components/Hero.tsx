import { useEffect, useState } from "react";
import CursorImageTrail from "@/components/ui/cursorimagetrail";
import { useIsMobile } from "@/hooks/use-mobile";

const images = Array.from(
  { length: 16 },
  (_, i) => `/images/active/${i + 1}.webp`,
);

const Hero = () => {
  const isMobile = useIsMobile();
  const [isAnimating, setIsAnimating] = useState(false);
  const [imagesLoaded, setImagesLoaded] = useState(false);

  useEffect(() => {
    if (!isMobile) {
      const minLoadTime = new Promise((resolve) => setTimeout(resolve, 4000));
      
      const imagePromises = images.map((src) => {
        return new Promise((resolve) => {
          const img = new Image();
          img.src = src;
          // Resolve on both load and error to prevent hanging
          img.onload = resolve;
          img.onerror = resolve;
        });
      });

      Promise.all([minLoadTime, ...imagePromises]).then(() => {
        setImagesLoaded(true);
      });
    } else {
      setImagesLoaded(true);
    }

    const animationTimer = setTimeout(() => {
      setIsAnimating(true);
    }, 200);

    return () => clearTimeout(animationTimer);
  }, [isMobile]);

  return (
    <section className="relative min-h-screen bg-background flex flex-col items-center justify-center text-black dark:text-neutral-200 antialiased">
      {/* Conditional Background */}
      {isMobile ? (
        <div className="absolute inset-0 z-0 overflow-hidden">
          <video autoPlay loop muted playsInline className="hero-video-bg">
            <source src="/videos/mobile-bg.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
          <div className="absolute inset-0 bg-black/50" />
        </div>
      ) : (
        <div className="absolute inset-0 z-0">
          <CursorImageTrail
            renderImageBuffer={150}
            rotationRange={25}
            animationStyle="dynamic"
            images={images}
          >
            <div className="h-full w-full" />
          </CursorImageTrail>
        </div>
      )}

      {/* Desktop Loader Overlay */}
      {!isMobile && (
        <div 
          className={`absolute inset-0 z-50 flex items-center justify-center bg-background transition-opacity duration-1000 ${
            imagesLoaded ? "opacity-0 pointer-events-none delay-500" : "opacity-100"
          }`}
        >
          <div className="relative w-[400px] aspect-video rounded-lg overflow-hidden shadow-2xl">
            <video 
              autoPlay 
              loop 
              muted 
              playsInline 
              className="w-full h-full object-cover"
            >
              <source src="/videos/mobile-bg.mp4" type="video/mp4" />
            </video>
            {/* Overlay to dim the video slightly */}
            <div className="absolute inset-0 bg-black/10" /> 
          </div>
        </div>
      )}

      {/* Render text only on non-mobile devices */}
      {!isMobile && (
        <>
          {/* Main Title - fades in when images are loaded */}
          <div 
            className={`relative z-10 text-center space-y-4 pointer-events-none flex-1 flex items-center justify-center transition-all duration-1000 ${
              imagesLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            }`}
          >
              <h1 className="hero-title flex flex-col items-center justify-center py-4 text-focus-in">
                <span>DESIGNERS</span>
                <span>ANONYMOUS</span>
              </h1>
          </div>

          {/* Subtitle pinned at bottom */}
          <div 
            className={`relative z-10 pointer-events-none mb-10 transition-all duration-1000 delay-300 ${
              imagesLoaded ? "opacity-100" : "opacity-0"
            }`}
          >
            <p className="hero-subtitle fade-in-delayed text-center">
              A creative design club at BITS Pilani Hyderabad Campus.
            </p>
          </div>
        </>
      )}
    </section>
  );
};

export default Hero;