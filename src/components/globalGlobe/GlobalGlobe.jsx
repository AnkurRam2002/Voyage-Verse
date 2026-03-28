"use client";

import { useEffect, useRef } from "react";
import createGlobe from "cobe";

const GlobalGlobe = ({ posts }) => {
  const canvasRef = useRef();

  useEffect(() => {
    let phi = 0;

    const markers = posts
      .filter((p) => p.lat && p.lng)
      .map((p) => ({
        location: [p.lat, p.lng],
        size: 0.06,
      }));

    let globe;
    const updateSize = () => {
      if (!canvasRef.current) return;
      const width = canvasRef.current.offsetWidth;
      if (globe) globe.destroy();
      
      globe = createGlobe(canvasRef.current, {
        devicePixelRatio: 2,
        width: width * 2,
        height: width * 2,
        phi: 0,
        theta: 0,
        dark: 1, // dark mode
        diffuse: 1.2,
        mapSamples: 16000,
        mapBrightness: 6,
        baseColor: [0.1, 0.1, 0.25], // deep blue
        markerColor: [0, 0.9, 1], // cyan glow neon
        glowColor: [0.4, 0.2, 1], // purple outer glow
        markers: markers,
        onRender: (state) => {
          state.phi = phi;
          phi += 0.0025; // rotation speed
        },
      });
    };

    updateSize();
    const observer = new ResizeObserver(updateSize);
    if (canvasRef.current) observer.observe(canvasRef.current);
    
    // Fade in the globe slowly
    setTimeout(() => {
      if (canvasRef.current) canvasRef.current.style.opacity = "1";
    }, 100);

    return () => {
      if (globe) globe.destroy();
      observer.disconnect();
    };
  }, [posts]);

  return (
    <div style={{ width: "100%", maxWidth: "600px", aspectRatio: 1, margin: "auto", position: "relative" }}>
      <canvas
        ref={canvasRef}
        style={{ 
          width: "100%", 
          height: "100%", 
          contain: "layout paint size", 
          opacity: 0, 
          transition: "opacity 1s ease",
          cursor: "grab"
        }}
        onPointerDown={(e) => {
          e.target.style.cursor = "grabbing";
        }}
        onPointerUp={(e) => {
          e.target.style.cursor = "grab";
        }}
      />
    </div>
  );
};

export default GlobalGlobe;
