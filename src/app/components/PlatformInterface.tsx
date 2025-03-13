'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';

// Define platform data types
interface PlatformData {
  id: string;
  name: string;
  handle: string;
  profileUrl: string;
  color: string;
  stats: { label: string; value: string }[];
  actionText: string;
  headerBg?: string;
  featuredVideoId?: string;
}

interface VideoData {
  id: string;
  title: string;
  thumbnail: string;
  views: string;
  date: string;
  duration: string;
}

interface Repository {
  id: string;
  name: string;
  description: string;
  stars: number;
  forks: number;
  language: string;
  lastUpdated: string;
}

// Props for the PlatformInterface component
interface PlatformInterfaceProps {
  platformId: string;
  onClose: () => void;
}

interface PlatformType {
  title: string;
  description: string;
  color: string;
  icon: string;
  profileUrl: string;
  buttonText: string;
  featuredVideoId?: string;
  stats?: string[];
  profileImage?: string;
}

const youtubeVideos: VideoData[] = [
  {
    id: 'video1',
    title: 'Rubik\'s Cube Collection 2024 - Toate cuburile mele',
    thumbnail: '/images/youtube/rubik-collection.jpg',
    views: '1.2K views',
    date: '2 weeks ago',
    duration: '12:34'
  },
  {
    id: 'video2',
    title: 'Cum să rezolvi cubul Rubik - Tutorial pentru începători',
    thumbnail: '/images/youtube/rubik-beginners.jpg',
    views: '3.4K views',
    date: '1 month ago',
    duration: '15:21'
  },
  {
    id: 'video3',
    title: 'RC Monster Truck Review - Mașină cu telecomandă',
    thumbnail: '/images/youtube/rc-monster.jpg',
    views: '2.1K views',
    date: '2 months ago',
    duration: '8:45'
  },
  {
    id: 'video4',
    title: 'Arad din dronă - Vedere panoramică',
    thumbnail: '/images/youtube/arad-drone.jpg',
    views: '5.6K views',
    date: '3 months ago',
    duration: '4:32'
  },
  {
    id: 'video5',
    title: 'Colegiul Moise Nicoară - Prezentare',
    thumbnail: '/images/youtube/moise-nicoara.jpg',
    views: '1.8K views',
    date: '4 months ago',
    duration: '6:15'
  },
  {
    id: 'video6',
    title: 'Cesky Krumlov Vlog - O zi în orașul medieval',
    thumbnail: '/images/youtube/cesky-krumlov.jpg',
    views: '2.3K views',
    date: '5 months ago',
    duration: '10:48'
  }
];

const popularVideos: VideoData[] = [
  {
    id: 'popular1',
    title: 'Comparație între diferite tipuri de cuburi Rubik',
    thumbnail: '/images/youtube/rubik-comparison.jpg',
    views: '15K views',
    date: '8 months ago',
    duration: '18:22'
  },
  {
    id: 'popular2',
    title: 'Junimea Română - Documentar Istoric',
    thumbnail: '/images/youtube/junimea.jpg',
    views: '12K views',
    date: '1 year ago',
    duration: '25:14'
  },
  {
    id: 'popular3',
    title: 'Tutorial Avansat Cub Rubik - Metoda Fridrich',
    thumbnail: '/images/youtube/rubik-tutorial.jpg',
    views: '8.5K views',
    date: '1 year ago',
    duration: '22:31'
  },
  {
    id: 'popular4',
    title: 'RC Car Revolt - Review mașină de curse',
    thumbnail: '/images/youtube/rc-revolt.jpg',
    views: '7.2K views',
    date: '1 year ago',
    duration: '14:45'
  }
];

const instagramPosts = [
  {
    id: 'post1',
    image: '/images/instagram/post1.jpg',
    likes: 245,
    comments: 12,
    caption: 'Explorând noi perspective cu drona 🚁 #AradFromAbove',
    date: '2 DAYS AGO'
  },
  {
    id: 'post2',
    image: '/images/instagram/post2.jpg',
    likes: 189,
    comments: 8,
    caption: 'Noua mea colecție de cuburi Rubik! 🎲 #SpeedCubing',
    date: '5 DAYS AGO'
  },
  {
    id: 'post3',
    image: '/images/instagram/post3.jpg',
    likes: 312,
    comments: 15,
    caption: 'Aventuri în Český Krumlov 🏰 #Travel',
    date: '1 WEEK AGO'
  },
  // ... more posts
];

const repositories: Repository[] = [
  {
    id: '1',
    name: 'arthurpopa.com',
    description: 'My personal portfolio website built with Next.js, TypeScript, and Tailwind CSS.',
    stars: 12,
    forks: 3,
    language: 'TypeScript',
    lastUpdated: '2024-03-15'
  },
  {
    id: '2',
    name: 'rubiks-cube-solver',
    description: 'An interactive Rubik\'s cube solver with step-by-step instructions and 3D visualization.',
    stars: 45,
    forks: 8,
    language: 'JavaScript',
    lastUpdated: '2024-02-28'
  },
  {
    id: '3',
    name: 'drone-footage-processor',
    description: 'A tool for processing and enhancing drone footage using computer vision techniques.',
    stars: 28,
    forks: 5,
    language: 'Python',
    lastUpdated: '2024-03-10'
  }
];

const PlatformInterface: React.FC<PlatformInterfaceProps> = ({ platformId, onClose }) => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulăm un timp scurt de încărcare pentru efectul de tranziție
    const timer = setTimeout(() => {
      setLoading(false);
    }, 800);

    return () => clearTimeout(timer);
  }, [platformId]);

  // Configurarea pentru platforme
  const platforms: Record<string, PlatformType> = {
    youtube: {
      title: 'Canal YouTube',
      description: 'Postez vloguri, reviewuri și alte videoclipuri foarte faine! Abonează-te pentru conținut nou.',
      color: '#FF0000',
      icon: 'fab fa-youtube',
      profileUrl: 'https://www.youtube.com/channel/UCqIL1pDpPByN-Z-TYzbwZnA',
      buttonText: 'Vizitează canalul',
      stats: ['@ArthurPopa', '1,55K abonați', '103 videoclipuri'],
      featuredVideoId: 'Z_UKbV_kzww',
      profileImage: 'poza-profil.jpg'
    },
    linkedin: {
      title: 'Profil LinkedIn',
      description: 'Profesionist în tehnologie și digital media. Pasionat de inovație și dezvoltare web.',
      color: '#0A66C2',
      icon: 'fab fa-linkedin',
      profileUrl: 'https://www.linkedin.com/in/arthur-popa',
      buttonText: 'Conectează-te pe LinkedIn',
      stats: ['Software Developer', '+500 conexiuni', 'Arad, România'],
      profileImage: 'poza-profil-linkedin.jpg'
    },
    instagram: {
      title: 'Profil Instagram',
      description: 'Momente din călătoriile mele, proiecte creative și pasiunile pentru tehnologie și artă.',
      color: '#E1306C',
      icon: 'fab fa-instagram',
      profileUrl: 'https://www.instagram.com/arthur.popa',
      buttonText: 'Urmărește pe Instagram',
      stats: ['@arthur.popa', '350+ urmăritori', '10+ postări'],
      profileImage: 'poza-profil.jpg'
    },
    github: {
      title: 'Profil GitHub',
      description: 'Proiecte open-source, contribuții și experimente de cod. De la web apps la AI.',
      color: '#161B22',
      icon: 'fab fa-github',
      profileUrl: 'https://github.com/arthurpopa',
      buttonText: 'Vezi codul pe GitHub',
      stats: ['10+ repositories', '200+ contribuții', 'TypeScript · JavaScript · Python'],
      profileImage: 'poza-profil.jpg'
    },
    portfolio: {
      title: 'Portofoliu',
      description: 'Colecție de proiecte personale, lucrări creative și realizări profesionale.',
      color: '#4CAF50',
      icon: 'fas fa-briefcase',
      profileUrl: 'https://arthurpopa.com',
      buttonText: 'Explorează portofoliul',
      stats: ['Web Development', 'Design', 'Media Production'],
      profileImage: 'punctual-video-logo.png'
    },
    creality: {
      title: 'Profil Creality',
      description: 'Modele 3D și proiecte de printare. Explorând lumea imprimării 3D.',
      color: '#4CAF50',
      icon: 'fas fa-cube',
      profileUrl: 'https://www.crealitycloud.com/user/5329807170',
      buttonText: 'Vezi profilul Creality',
      stats: ['10+ modele digitale', '1000+ vizualizări', 'Creator 3D'],
      profileImage: 'poza-profil-creality.jpg'
    }
  };

  const platform = platforms[platformId as keyof typeof platforms] || {
    title: platformId,
    description: 'Platformă digitală',
    color: '#555555',
    icon: 'fas fa-globe',
    profileUrl: '#',
    buttonText: 'Vizitează',
    featuredVideoId: 'Z_UKbV_kzww' // Default video
  } as PlatformType;

  return (
    <div style={{ 
      width: '100%', 
      height: '100%', 
      display: 'flex', 
      flexDirection: 'column',
      alignItems: 'stretch',
      padding: '0',
      backgroundColor: '#0f0f0f', 
      color: '#fff',
      borderRadius: '12px',
      overflow: 'hidden'
    }}>
      {loading ? (
        <div style={{ 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center',
          flexDirection: 'column',
          gap: '20px',
          width: '100%',
          height: '100%'
        }}>
          <div style={{ 
            width: '50px', 
            height: '50px', 
            border: '5px solid #333',
            borderTop: `5px solid ${platform.color}`,
            borderRadius: '50%',
            animation: 'spin 1s linear infinite'
          }}></div>
          <div style={{ color: '#aaa' }}>Se deschide {platform.title}...</div>
        </div>
      ) : (
        <div style={{
          width: '100%',
          height: '100%',
          display: 'flex', 
          flexDirection: 'column',
          position: 'relative',
          overflow: 'hidden'
        }}>
          {/* Header */}
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '16px 24px',
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            borderBottom: '1px solid rgba(255, 255, 255, 0.1)'
          }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '16px'
            }}>
              <div style={{
                width: '36px',
                height: '36px',
                borderRadius: '50%',
                backgroundColor: platform.color,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <i className={platform.icon} style={{ color: 'white', fontSize: '18px' }}></i>
              </div>
              <h2 style={{ 
                margin: '0', 
                fontSize: '18px', 
                fontWeight: 'bold'
              }}>
                Arthur Popa
              </h2>
              <div style={{ color: '#aaa', fontSize: '14px' }}>
                {platform.title}
              </div>
            </div>

            {/* Close Button */}
            <button onClick={onClose} style={{
              backgroundColor: 'rgba(255, 0, 0, 0.7)',
              color: 'white',
              border: 'none',
              borderRadius: '50%',
              width: '36px',
              height: '36px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              fontSize: '18px'
            }}>
              <i className="fas fa-times"></i>
            </button>
          </div>

          {/* Content Area */}
          <div style={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            overflowY: 'auto',
            padding: '0',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'radial-gradient(circle at center, rgba(20, 20, 20, 0.7) 0%, rgba(10, 10, 10, 0.95) 100%)'
          }}>
            {/* Common Platform Card Layout */}
            <div style={{
              width: '100%',
              maxWidth: '500px',
              backgroundColor: 'rgba(18, 18, 18, 0.9)',
              borderRadius: '12px',
              overflow: 'hidden',
              boxShadow: '0 10px 30px rgba(0, 0, 0, 0.5)',
              margin: '20px'
            }}>
              {/* Profile Information */}
              <div style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                padding: '40px 25px',
                textAlign: 'center'
              }}>
                {/* Profile Picture */}
                <div style={{
                  width: '120px',
                  height: '120px',
                  borderRadius: '50%',
                  overflow: 'hidden',
                  marginBottom: '25px',
                  border: `3px solid ${platform.color}30`
                }}>
                  <img 
                    src={
                      platformId === 'portfolio' ? "/images/punctual-video-logo.png" : 
                      platform.profileImage ? `/images/${platform.profileImage}` : "/images/poza-profil.jpg"
                    } 
                    alt="Arthur Popa" 
                    style={{ 
                      width: '100%', 
                      height: '100%', 
                      objectFit: platformId === 'portfolio' ? 'contain' : 'cover',
                      backgroundColor: platformId === 'portfolio' ? '#000' : 'transparent'
                    }}
                  />
                </div>
                
                {/* Name and Stats */}
                <h2 style={{ 
                  margin: '0 0 5px 0', 
                  fontSize: '24px', 
                  fontWeight: 'bold',
                  letterSpacing: '0.5px'
                }}>
                  Arthur Popa
                </h2>
                
                {platform.stats && (
                  <div style={{
                    color: '#aaa', 
                    fontSize: '14px', 
                    margin: '0 0 5px 0',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '8px'
                  }}>
                    {platform.stats.map((stat, index) => (
                      <React.Fragment key={index}>
                        {index > 0 && <span style={{fontSize: '6px', color: '#666'}}>•</span>}
                        <span>{stat}</span>
                      </React.Fragment>
                    ))}
                  </div>
                )}
                
                {/* Description */}
                <p style={{
                  margin: '20px 0',
                  fontSize: '15px',
                  lineHeight: '1.5',
                  color: '#ddd',
                  maxWidth: '400px'
                }}>
                  {platformId === 'youtube' 
                    ? 'Postez vloguri, reviewuri și alte videoclipuri foarte faine! Abonează-te pentru conținut nou.' 
                    : platform.description}
                </p>
                
                {/* Action Buttons */}
                <div style={{
                  display: 'flex',
                  gap: '10px',
                  marginTop: '10px'
                }}>
                  {/* Main Button */}
                  <a 
                    href={platform.profileUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      backgroundColor: platformId === 'youtube' ? 'rgba(255, 0, 0, 0.8)' : platform.color,
                      color: 'white',
                      padding: '10px 20px',
                      borderRadius: '4px',
                      textDecoration: 'none',
                      fontSize: '14px',
                      fontWeight: 'bold',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '6px',
                      transition: 'all 0.2s ease-in-out',
                      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
                    }}
                    onMouseOver={(e) => {
                      e.currentTarget.style.transform = 'translateY(-2px)';
                      e.currentTarget.style.boxShadow = '0 6px 8px rgba(0, 0, 0, 0.2)';
                    }}
                    onMouseOut={(e) => {
                      e.currentTarget.style.transform = 'translateY(0)';
                      e.currentTarget.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)';
                    }}
                  >
                    <i className={platformId === 'youtube' ? 'fab fa-youtube' : platform.icon}></i>
                    {platformId === 'youtube' ? 'Vizitează canalul' : platform.buttonText}
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PlatformInterface; 