// Utility function to create a placeholder SVG as a Data URL
export const createAvatarPlaceholder = (color = '#333333', size = 100) => {
  const svg = `
    <svg width="${size}" height="${size}" viewBox="0 0 ${size} ${size}" xmlns="http://www.w3.org/2000/svg">
      <rect width="${size}" height="${size}" fill="${color}" />
      <circle cx="${size/2}" cy="${size/3}" r="${size/4}" fill="rgba(255,255,255,0.3)" />
      <rect x="${size/4}" y="${size/2}" width="${size/2}" height="${size/2}" rx="${size/10}" fill="rgba(255,255,255,0.3)" />
    </svg>
  `;

  const encoded = encodeURIComponent(svg)
    .replace(/'/g, '%27')
    .replace(/"/g, '%22');

  return `data:image/svg+xml,${encoded}`;
};

export const createIconPlaceholder = (color = '#333333', size = 32) => {
  const svg = `
    <svg width="${size}" height="${size}" viewBox="0 0 ${size} ${size}" xmlns="http://www.w3.org/2000/svg">
      <rect width="${size}" height="${size}" rx="${size/4}" fill="${color}" />
      <path d="M${size/4} ${size/4}L${3*size/4} ${size/4}L${3*size/4} ${3*size/4}L${size/4} ${3*size/4}Z" stroke="rgba(255,255,255,0.5)" fill="none" stroke-width="2"/>
    </svg>
  `;

  const encoded = encodeURIComponent(svg)
    .replace(/'/g, '%27')
    .replace(/"/g, '%22');

  return `data:image/svg+xml,${encoded}`;
};