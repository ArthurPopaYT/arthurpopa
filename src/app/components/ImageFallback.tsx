'use client';

import { useState, useEffect } from 'react';
import Image, { ImageProps } from 'next/image';
import { createAvatarPlaceholder, createIconPlaceholder } from './SvgToDataUrl';

interface ImageFallbackProps extends Omit<ImageProps, 'onError'> {
  fallbackSrc?: string;
  type?: 'avatar' | 'icon';
  color?: string;
}

const ImageFallback = ({ 
  src, 
  fallbackSrc, 
  alt, 
  type = 'icon',
  color = '#333333',
  width = 32,
  height = 32,
  ...props 
}: ImageFallbackProps) => {
  const [imgSrc, setImgSrc] = useState<string>(
    typeof src === 'string' ? src : ''
  );
  
  // Generate fallback SVG if no fallbackSrc is provided
  useEffect(() => {
    if (!fallbackSrc) {
      const size = Math.max(Number(width), Number(height));
      const placeholder = type === 'avatar' 
        ? createAvatarPlaceholder(color, size)
        : createIconPlaceholder(color, size);
        
      setImgSrc(prev => prev || placeholder);
    }
  }, [fallbackSrc, type, color, width, height]);
  
  return (
    <Image
      {...props}
      src={imgSrc || (fallbackSrc as string)}
      alt={alt}
      width={Number(width)}
      height={Number(height)}
      onError={() => {
        if (fallbackSrc) {
          setImgSrc(fallbackSrc);
        } else {
          const size = Math.max(Number(width), Number(height));
          const placeholder = type === 'avatar' 
            ? createAvatarPlaceholder(color, size)
            : createIconPlaceholder(color, size);
          setImgSrc(placeholder);
        }
      }}
    />
  );
};

export default ImageFallback; 