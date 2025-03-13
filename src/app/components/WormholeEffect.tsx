'use client';

import React, { useRef, useEffect } from 'react';
import html2canvas from 'html2canvas';

interface WormholeEffectProps {
  active: boolean;
  color: string;
  onAnimationComplete: () => void;
}

const WormholeEffect: React.FC<WormholeEffectProps> = ({ 
  active, 
  color,
  onAnimationComplete
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const textureRef = useRef<HTMLImageElement | null>(null);
  const animationRef = useRef<number>(0);
  const progressRef = useRef<number>(0);
  const isCapturingRef = useRef<boolean>(false);
  
  // Debug log when props change
  useEffect(() => {
    console.log('WormholeEffect props changed:', { active, color });
  }, [active, color]);
  
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) {
      console.error('Canvas ref is null');
      return;
    }
    
    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) {
      console.error('Could not get 2D context');
      return;
    }
    
    console.log('WormholeEffect canvas initialized');
    
    const updateCanvasSize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      console.log('Canvas size updated:', { width: canvas.width, height: canvas.height });
    };
    
    updateCanvasSize();
    window.addEventListener('resize', updateCanvasSize);
    
    // Optimizăm captura de ecran
    const captureScreen = async () => {
      if (!active || isCapturingRef.current) return;
      
      console.log('Starting screen capture');
      isCapturingRef.current = true;
      
      try {
        canvas.style.display = 'none';
        
        // Skip the actual capture for now to simplify debugging
        console.log('Skipping actual screen capture for debugging');
        
        // Create a simple gradient instead of capturing the screen
        const tempCanvas = document.createElement('canvas');
        tempCanvas.width = window.innerWidth;
        tempCanvas.height = window.innerHeight;
        const tempCtx = tempCanvas.getContext('2d');
        
        if (tempCtx) {
          const gradient = tempCtx.createLinearGradient(0, 0, tempCanvas.width, tempCanvas.height);
          gradient.addColorStop(0, '#000000');
          gradient.addColorStop(1, color);
          tempCtx.fillStyle = gradient;
          tempCtx.fillRect(0, 0, tempCanvas.width, tempCanvas.height);
          
          const dataUrl = tempCanvas.toDataURL('image/jpeg', 0.8);
          
          const img = new Image();
          img.src = dataUrl;
          img.onload = () => {
            textureRef.current = img;
            canvas.style.display = 'block';
            isCapturingRef.current = false;
            console.log('Texture created successfully');
          };
        } else {
          console.error('Could not get temp context');
          canvas.style.display = 'block';
          isCapturingRef.current = false;
        }
      } catch (error) {
        console.error('Failed to capture screen:', error);
        canvas.style.display = 'block';
        isCapturingRef.current = false;
      }
    };

    if (active) {
      captureScreen();
    }
    
    const getRGBFromColor = (color: string): [number, number, number] => {
      if (color.startsWith('#')) {
        const r = parseInt(color.slice(1, 3), 16);
        const g = parseInt(color.slice(3, 5), 16);
        const b = parseInt(color.slice(5, 7), 16);
        return [r, g, b];
      }
      return [255, 255, 255];
    };
    
    const rgb = getRGBFromColor(color);
    
    let lastTime = performance.now();
    const targetFPS = 60;
    const frameInterval = 1000 / targetFPS;
    
    const animate = (currentTime: number) => {
      if (!active) {
        console.log('Animation stopped because active is false');
        progressRef.current = 0;
        return;
      }
      
      // Limitare FPS pentru performanță mai bună
      const elapsed = currentTime - lastTime;
      if (elapsed < frameInterval) {
        animationRef.current = requestAnimationFrame(animate);
        return;
      }
      
      lastTime = currentTime - (elapsed % frameInterval);
      
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Increment progress
      progressRef.current += 0.01; // Slower progress for debugging
      console.log('Animation progress:', progressRef.current.toFixed(2));
      
      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;
      
      // Optimizăm desenarea texturii
      if (textureRef.current && progressRef.current < 0.5) {
        const progress = progressRef.current;
        const scale = 1 + progress;
        
        ctx.save();
        ctx.translate(centerX, centerY);
        ctx.rotate(progress * Math.PI * 2);
        ctx.scale(scale, scale);
        
        const size = Math.max(canvas.width, canvas.height);
        const drawSize = size * (1 - progress);
        
        ctx.globalAlpha = 1 - progress * 2;
        ctx.drawImage(
          textureRef.current,
          -drawSize / 2,
          -drawSize / 2,
          drawSize,
          drawSize
        );
        
        ctx.restore();
      }
      
      // Draw a simple wormhole effect for debugging
      const maxRadius = Math.sqrt(canvas.width * canvas.width + canvas.height * canvas.height) / 2;
      
      // Draw a simple circle that grows with progress
      ctx.beginPath();
      ctx.arc(centerX, centerY, maxRadius * progressRef.current, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${rgb[0]}, ${rgb[1]}, ${rgb[2]}, 0.3)`;
      ctx.fill();
      
      // Draw a simple glow in the center
      const glowRadius = maxRadius * 0.2;
      const glow = ctx.createRadialGradient(
        centerX, centerY, 0,
        centerX, centerY, glowRadius
      );
      
      glow.addColorStop(0, `rgba(${rgb[0]}, ${rgb[1]}, ${rgb[2]}, 0.8)`);
      glow.addColorStop(1, 'rgba(0, 0, 0, 0)');
      
      ctx.fillStyle = glow;
      ctx.beginPath();
      ctx.arc(centerX, centerY, glowRadius, 0, Math.PI * 2);
      ctx.fill();
      
      if (progressRef.current >= 1) {
        console.log('Animation complete, calling onAnimationComplete');
        onAnimationComplete();
        return;
      }
      
      animationRef.current = requestAnimationFrame(animate);
    };
    
    if (active) {
      console.log('Starting animation');
      progressRef.current = 0;
      animationRef.current = requestAnimationFrame(animate);
    }
    
    return () => {
      window.removeEventListener('resize', updateCanvasSize);
      cancelAnimationFrame(animationRef.current);
    };
  }, [active, color, onAnimationComplete]);
  
  useEffect(() => {
    if (active) {
      // Trigger animation complete callback after the animation duration
      const timer = setTimeout(() => {
        onAnimationComplete();
      }, 2000); // Durata animației de 2 secunde
      
      return () => clearTimeout(timer);
    }
  }, [active, onAnimationComplete]);
  
  if (!active) return null;

  return (
    <div className="wormhole-effect-container">
      {/* Wormhole-ul este acum gestionat prin CSS în globals.css */}
    </div>
  );
};

export default WormholeEffect; 