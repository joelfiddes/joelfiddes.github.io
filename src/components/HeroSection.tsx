import { useEffect, useState } from 'react'

interface HeroSectionProps {
  image: string
  title: string
  height?: string
}

export default function HeroSection({ image, title, height = '100vh' }: HeroSectionProps) {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 100)
    return () => clearTimeout(timer)
  }, [])

  return (
    <section
      className="relative w-full flex flex-col justify-end items-center overflow-hidden"
      style={{ height, padding: '32px 32px 16px 32px' }}
    >
      <img
        src={image}
        alt=""
        className="absolute inset-0 w-full h-full object-cover"
        style={{ zIndex: 0 }}
      />
      <div className="w-full max-w-[1200px] relative" style={{ zIndex: 1 }}>
        <div className="max-w-[900px]" style={{ padding: '11px 0' }}>
          <h1
            style={{
              fontFamily: "'DM Mono', monospace",
              fontWeight: 300,
              fontSize: '66px',
              lineHeight: '1em',
              letterSpacing: '-0.05em',
              color: '#ffffff',
              opacity: visible ? 1 : 0,
              transform: visible ? 'translateY(0)' : 'translateY(20px)',
              transition: 'opacity 0.8s ease-out, transform 0.8s ease-out',
            }}
          >
            {title}
          </h1>
        </div>
      </div>
    </section>
  )
}
