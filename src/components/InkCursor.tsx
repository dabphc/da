import { useEffect, useRef } from 'react';

// Define the Dot class at the top level
class Dot {
    index: number;
    anglespeed = 0.05;
    x = 0;
    y = 0;
    scale: number;
    range: number;
    limit: number;
    element: HTMLSpanElement;
    lockX: number = 0;
    lockY: number = 0;
    angleX: number = 0;
    angleY: number = 0;
    idleRef: React.MutableRefObject<boolean>;
  
    constructor(index = 0, cursorElement: HTMLElement, idleRef: React.MutableRefObject<boolean>) {
      this.index = index;
      this.idleRef = idleRef;
      this.scale = 1 - 0.05 * index;
      this.range = 26 / 2 - (26 / 2) * this.scale + 2;
      this.limit = 26 * 0.75 * this.scale;
      this.element = document.createElement("span");
      (window as any).gsap.set(this.element, { scale: this.scale });
      cursorElement.appendChild(this.element);
    }
  
    lock() {
      this.lockX = this.x;
      this.lockY = this.y;
      this.angleX = Math.PI * 2 * Math.random();
      this.angleY = Math.PI * 2 * Math.random();
    }
  
    draw() {
      if (!this.idleRef.current || this.index <= Math.floor(20 * 0.3)) {
        (window as any).gsap.set(this.element, { x: this.x, y: this.y });
      } else {
        this.angleX += this.anglespeed;
        this.angleY += this.anglespeed;
        this.y = this.lockY + Math.sin(this.angleY) * this.range;
        this.x = this.lockX + Math.sin(this.angleX) * this.range;
        (window as any).gsap.set(this.element, { x: this.x, y: this.y });
      }
    }
  }

export const InkCursor = () => {
  const cursorRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    // Access GSAP from the window object inside useEffect
    const gsap = (window as any).gsap;
    if (!gsap) {
      console.error("GSAP not found. Make sure it is loaded.");
      return;
    }

    const cursorElement = cursorRef.current;
    if (!cursorElement) return;

    const amount = 20;
    const idleTimeout = 150;
    
    let firstMove = true;
    let timeoutID: number | undefined;
    let idle = false;
    let dots: Dot[] = [];
    let mousePosition = { x: 0, y: 0 };
    
    const goInactive = () => {
      idle = true;
      for (const dot of dots) {
        dot.lock();
      }
    };

    const startIdleTimer = () => {
      timeoutID = window.setTimeout(goInactive, idleTimeout);
      idle = false;
    };
    
    const resetIdleTimer = () => {
      if (timeoutID !== undefined) {
        window.clearTimeout(timeoutID);
      }
      startIdleTimer();
    };

    const onMouseMove = (event: MouseEvent) => {
        if (firstMove) {
            cursorElement.style.display = 'block';
            gsap.fromTo(cursorElement, { opacity: 0 }, { opacity: 1, duration: 0.3 });
            firstMove = false;
        }
        mousePosition.x = event.clientX;
        mousePosition.y = event.clientY;
        resetIdleTimer();
    };

    const onTouchMove = (event: TouchEvent) => {
        if (event.touches.length > 0) {
            if (firstMove) {
                cursorElement.style.display = 'block';
                gsap.fromTo(cursorElement, { opacity: 0 }, { opacity: 1, duration: 0.3 });
                firstMove = false;
            }
            mousePosition.x = event.touches[0].clientX;
            mousePosition.y = event.touches[0].clientY;
            resetIdleTimer();
        }
    };
    
    const idleRef = { current: idle };
    Object.defineProperty(idleRef, 'current', {
        get: () => idle,
        set: (v) => { idle = v; }
    });


    const buildDots = () => {
      for (let i = 0; i < amount; i++) {
        const dot = new Dot(i, cursorElement, idleRef);
        dots.push(dot);
      }
    };
    
    buildDots();
    startIdleTimer();

    let animationFrameId: number;

    const positionCursor = () => {
      let x = mousePosition.x;
      let y = mousePosition.y;
      dots.forEach((dot, index) => {
        const nextDot = dots[index + 1] || dots[0];
        dot.x = x;
        dot.y = y;
        dot.draw();
        if (!idle || index <= Math.floor(amount * 0.3)) {
          const dx = (nextDot.x - dot.x) * 0.35;
          const dy = (nextDot.y - dot.y) * 0.35;
          x += dx;
          y += dy;
        }
      });
    };

    const render = () => {
      positionCursor();
      animationFrameId = requestAnimationFrame(render);
    };
    
    render();

    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("touchmove", onTouchMove);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("touchmove", onTouchMove);
      if (timeoutID !== undefined) {
        window.clearTimeout(timeoutID);
      }
      cancelAnimationFrame(animationFrameId);
      if (cursorRef.current) {
        while (cursorRef.current.firstChild) {
            cursorRef.current.removeChild(cursorRef.current.firstChild);
        }
      }
    };
  }, []);

  return (
    <>
      <svg xmlns="http://www.w3.org/2000/svg" version="1.1" width="800" style={{ display: 'none' }}>
        <defs>
          <filter id="goo">
            <feGaussianBlur in="SourceGraphic" stdDeviation="6" result="blur" />
            <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 35 -15" result="goo" />
            <feComposite in="SourceGraphic" in2="goo" operator="atop" />
          </filter>
        </defs>
      </svg>
      <div id="cursor" className="Cursor" ref={cursorRef}></div>
    </>
  );
};

