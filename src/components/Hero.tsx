import CursorImageTrail from "@/components/ui/cursorimagetrail";
import { MousePointer } from "lucide-react";

const images = [
  "/images/active/1.webp",
  "/images/active/2.webp",
  "/images/active/3.webp",
  "/images/active/4.webp",
  "/images/active/5.webp",
  "/images/active/6.webp",
  "/images/active/7.webp",
  "/images/active/8.webp",
  "/images/active/9.webp",
  "/images/active/10.webp",
  "/images/active/11.webp",
  "/images/active/12.webp",
  "/images/active/13.webp",
  "/images/active/14.webp",
  "/images/active/15.webp",
  "/images/active/16.png",
];

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
