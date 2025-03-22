'use client'

import { useEffect, useState } from 'react'
import Loading from '@/components/Loading'

export default function Home() {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Simulate loading time
    const timer = setTimeout(() => {
      setIsLoading(false)
      console.log('Loading complete')
    }, 3000)

    return () => clearTimeout(timer)
  }, [])

  if (isLoading) {
    return <Loading />
  }

  return (
    <main className="flex flex-col items-center justify-center min-h-screen p-4 bg-black text-white">
      <h1 className="text-4xl font-bold text-center mb-6">Arthur Popa</h1>
      <h2 className="text-2xl mb-8 text-blue-400">Digital Creator</h2>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-4xl">
        <SocialCard
          name="YouTube"
          url="https://youtube.com/@arthurpopa"
          color="#FF0000"
          description="Videos, tutorials, and creative content"
        />
        <SocialCard
          name="LinkedIn"
          url="https://www.linkedin.com/in/arthur-popa-591439331/"
          color="#0077B5"
          description="Professional profile and connections"
        />
        <SocialCard
          name="Instagram"
          url="https://instagram.com/arthur_popa"
          color="#E1306C"
          description="Photos and social updates"
        />
        <SocialCard
          name="GitHub"
          url="https://github.com/ArthurPopaYT"
          color="#6e5494"
          description="Code projects and repositories"
        />
      </div>
      
      <footer className="mt-12 text-center text-gray-400">
        <p>&copy; {new Date().getFullYear()} Arthur Popa. All rights reserved.</p>
      </footer>
    </main>
  )
}

function SocialCard({ name, url, color, description }: { name: string, url: string, color: string, description: string }) {
  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="block p-6 rounded-lg transition-transform transform hover:scale-105"
      style={{ backgroundColor: `${color}22`, borderLeft: `4px solid ${color}` }}
    >
      <h3 className="text-xl font-bold mb-2" style={{ color }}>
        {name}
      </h3>
      <p className="text-gray-300">{description}</p>
    </a>
  )
} 