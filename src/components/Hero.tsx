import CursorImageTrail from "@/components/ui/cursorimagetrail";
import { MousePointer } from "lucide-react";

const images = Array.from({ length: 16 }, (_, i) => `/images/active/${i + 1}.webp`);

const Hero = () => {
  return (
    <section className="relative min-h-screen bg-background flex flex-col items-center justify-center text-black dark:text-neutral-200 antialiased">
      {/* Background Trail */}
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

      {/* Main Title */}
      <div className="relative z-10 text-center space-y-4 pointer-events-none flex-1 flex items-center justify-center">
        <h1 className="hero-title flex items-center gap-2 justify-center">
          <MousePointer className="w-10 h-10" />
          <span>Designer Anonymous</span>
        </h1>
      </div>

      {/* Subtitle pinned at bottom */}
      <div className="relative z-10 pointer-events-none mb-10">
        <p className="hero-subtitle fade-in-delayed text-center">
          A creative design club at BITS Pilani Hyderabad Campus.
        </p>
      </div>
    </section>
  );
};

export default Hero;
