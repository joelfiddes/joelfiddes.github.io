import HeroSection from '../components/HeroSection'
import Label from '../components/Label'
import SectionContactFramerComponent from '../framer/section-contact'

const services = [
  {
    title: 'Energy & Water',
    image: '/images/energy-water.png',
    description:
      'High-resolution snow and hydrological modelling combined with field observations to quantify how cryosphere change affects water availability. We support hydropower planning, seasonal forecasting, and water security across mountain basins.',
    sectors: ['Snow Monitoring', 'Water Resources', 'Cryosphere Monitoring'],
  },
  {
    title: 'Hazards & Risk',
    image: '/images/hazards-risk.png',
    description:
      'Integrated field monitoring, modelling, and remote sensing to assess glacier, permafrost, and flood hazards. We deliver risk assessments, early warning support, and capacity building for disaster risk reduction.',
    sectors: ['DRR'],
  },
  {
    title: 'Adaptation Solutions',
    image: '/images/adaptation.png',
    description:
      'Translating climate data and scenario analysis into actionable adaptation strategies. We work with local partners to co-develop plans that strengthen water security, reduce hazard exposure, and build long-term resilience.',
    sectors: ['Climate Adaptation', 'Climate Scenarios', 'Climate Services'],
  },
  {
    title: 'Policy Engagement',
    image: '/images/policy.png',
    description:
      'Tailored briefings, technical guidance, and institutional partnerships that bring climate and water science into governance and resource management decisions.',
    sectors: ['Monitoring Networks'],
  },
]

const methodology = [
  {
    step: '01',
    title: 'Field Monitoring',
    description: 'Ground-truth data collection from high-altitude stations and field campaigns.',
  },
  {
    step: '02',
    title: 'Modelling & Analysis',
    description: 'Climate downscaling, hydrological simulation, and hazard assessment using tools like TopoPyScale and SnowMapper.',
  },
  {
    step: '03',
    title: 'Dashboards & Tools',
    description: 'Interactive platforms that make complex data accessible and actionable for decision-makers.',
  },
  {
    step: '04',
    title: 'Policy & Capacity',
    description: 'Translating findings into guidance documents, training programmes, and institutional partnerships.',
  },
]

const partnerLogos = [
  'https://framerusercontent.com/images/6blXjB6orGNl5HuJTGaWZazTTk.png',
  'https://framerusercontent.com/images/uJFmh1ReohVM6IkQqSNtKAGtygI.png',
  'https://framerusercontent.com/images/ApXjjP0iUUbkUDwZm3cdLvIka5I.png',
  'https://framerusercontent.com/images/2BtnXE1PMp0IgIySJAQdU9n7Lq0.png',
  'https://framerusercontent.com/images/tIDQ8Daek1PshKehwLHfqc3lOmg.png',
  'https://framerusercontent.com/images/oUHwyG7R7IVcQkiLWgq4OtZnmU.png',
  'https://framerusercontent.com/images/OGfW7RHqKGtMEaVqNy5OtUZ7dsk.png',
  'https://framerusercontent.com/images/Pyk3ZKfsd4HhZqFzP93815nMk.png',
  'https://framerusercontent.com/images/V0nZeK5cPymB0wIHDC9ZYsWmRCA.png',
  'https://framerusercontent.com/images/lMH1ZAr2RvpuhuhjziVh8Jl07M.png',
  'https://framerusercontent.com/images/HIA2J8PcSyJpQGPCOOKmVmr6E.png',
  'https://framerusercontent.com/images/4X27eq8U0piuPjXzhuo6EkPII.png',
  'https://framerusercontent.com/images/6A0esCRiUbJT4OdFzZo7cjP8Ipo.png',
]

export default function Expertise() {
  return (
    <>
      <HeroSection
        image="/images/expertise-hero.jpg"
        title="Our solutions and expertise"
        height="74vh"
      />

      {/* Services Grid */}
      <section
        className="w-full flex justify-center"
        style={{
          backgroundImage: 'url(/images/contour-lines.svg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundColor: '#F5F5F5',
          padding: '80px 0 60px 0',
        }}
      >
        <div className="w-full max-w-[1135px] flex flex-col gap-[33px]">
          {/* Header */}
          <div
            style={{
              borderBottom: '1px solid var(--unframer-neutral-300)',
              padding: '0 16px 119px 16px',
            }}
          >
            <div className="max-w-[700px] flex flex-col gap-[24px]">
              <Label text="Our solutions" />
              <p
                style={{
                  fontFamily: "'Geist', sans-serif",
                  fontSize: '1.14rem',
                  lineHeight: '1.35em',
                  letterSpacing: '-0.03em',
                  color: 'var(--unframer-forrest)',
                }}
              >
                From high-altitude field stations to policy briefings, we deliver end-to-end
                solutions that connect mountain science with real-world impact. Each practice area
                draws on our integrated approach to monitoring, modelling, and knowledge transfer.
              </p>
            </div>
          </div>

          {/* Service Cards — alternating image/text layout */}
          <div className="flex flex-col" style={{ padding: '0 16px' }}>
            {services.map((service, i) => (
              <div
                key={service.title}
                className={`flex flex-col md:flex-row gap-[32px] md:gap-[64px] pb-16 group ${i % 2 === 1 ? 'md:flex-row-reverse' : ''}`}
                style={{ borderBottom: i < services.length - 1 ? '1px solid var(--unframer-neutral-300)' : 'none', paddingTop: i > 0 ? '64px' : '0' }}
              >
                <div className="md:w-1/2 overflow-hidden" style={{ borderRadius: '20px' }}>
                  <img
                    src={service.image}
                    alt={service.title}
                    className="h-[240px] md:h-[340px] resource-card-img"
                    style={{ width: '100%', objectFit: 'cover' }}
                  />
                </div>
                <div className="md:w-1/2 flex flex-col gap-[22px] justify-center">
                  <h3
                    style={{
                      fontFamily: "'DM Mono', monospace",
                      fontWeight: 300,
                      fontSize: '23px',
                      lineHeight: '1em',
                      letterSpacing: '-0.05em',
                      color: 'var(--unframer-forrest)',
                    }}
                  >
                    {service.title}
                  </h3>
                  <p
                    style={{
                      fontFamily: "'Geist', sans-serif",
                      fontSize: '1.14rem',
                      lineHeight: '1.35em',
                      letterSpacing: '-0.03em',
                      color: 'var(--unframer-forrest)',
                    }}
                  >
                    {service.description}
                  </p>
                  <a
                    href={`/projects?sector=${encodeURIComponent(service.sectors[0])}`}
                    style={{
                      fontFamily: "'DM Mono', monospace",
                      fontWeight: 400,
                      fontSize: '13px',
                      color: 'var(--unframer-mf-accent-blue)',
                      backgroundColor: 'var(--unframer-mf-dark-blue)',
                      textDecoration: 'none',
                      padding: '10px 20px',
                      borderRadius: '6px',
                      display: 'inline-block',
                      width: 'fit-content',
                    }}
                  >
                    See related projects →
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How We Work — Circular */}
      <section
        className="w-full flex justify-center"
        style={{ padding: '96px 16px', backgroundColor: '#F5F5F5' }}
      >
        <div className="w-full max-w-[1135px] flex flex-col gap-[48px]">
          <Label text="How we work" />

          {/* Mobile: stacked with arrows */}
          <div className="flex flex-col items-center gap-2 md:hidden">
            {methodology.map((item, i) => (
              <div key={i} className="flex flex-col items-center w-full">
                <div
                  className="methodology-card"
                  style={{
                    backgroundColor: 'var(--unframer-neutral-200)',
                    borderRadius: '8px',
                    padding: '20px',
                    width: '100%',
                    textAlign: 'center',
                    transition: 'all 0.3s ease',
                    cursor: 'default',
                    border: '2px solid transparent',
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.backgroundColor = 'rgba(255,255,255,1)'
                    e.currentTarget.style.borderColor = 'var(--unframer-mf-accent-blue)'
                    e.currentTarget.style.transform = 'scale(1.03)'
                    e.currentTarget.style.boxShadow = '0 4px 20px rgba(0,0,0,0.08)'
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.backgroundColor = 'var(--unframer-neutral-200)'
                    e.currentTarget.style.borderColor = 'transparent'
                    e.currentTarget.style.transform = 'scale(1)'
                    e.currentTarget.style.boxShadow = 'none'
                  }}
                >
                  <h4
                    style={{
                      fontFamily: "'DM Mono', monospace",
                      fontWeight: 400,
                      fontSize: '16px',
                      letterSpacing: '-0.03em',
                      color: 'var(--unframer-forrest)',
                    }}
                  >
                    {item.title}
                  </h4>
                  <p
                    style={{
                      fontFamily: "'Inter', sans-serif",
                      fontSize: '13px',
                      lineHeight: '1.5em',
                      letterSpacing: '-0.02em',
                      color: 'var(--unframer-neutral-400)',
                      marginTop: '6px',
                    }}
                  >
                    {item.description}
                  </p>
                </div>
                {/* Arrow down */}
                {i < methodology.length - 1 && (
                  <svg width="20" height="28" viewBox="0 0 20 28" style={{ margin: '2px 0' }}>
                    <line x1="10" y1="0" x2="10" y2="22" stroke="var(--unframer-mf-accent-blue)" strokeWidth="2" />
                    <polygon points="10,28 5,20 15,20" fill="var(--unframer-mf-accent-blue)" />
                  </svg>
                )}
                {/* Curved arrow back to top after last item */}
                {i === methodology.length - 1 && (
                  <svg width="40" height="28" viewBox="0 0 40 28" style={{ margin: '2px 0' }}>
                    <path d="M20 0 Q20 14 10 14 Q0 14 0 28" fill="none" stroke="var(--unframer-mf-accent-blue)" strokeWidth="2" strokeDasharray="4 3" />
                  </svg>
                )}
              </div>
            ))}
          </div>

          {/* Desktop: ring diagram */}
          <div className="hidden md:flex justify-center">
            <div style={{ position: 'relative', width: '580px', height: '580px' }}>
              {/* Outer ring with arrows */}
              <svg
                viewBox="0 0 580 580"
                style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}
              >
                <circle
                  cx="290"
                  cy="290"
                  r="190"
                  fill="none"
                  stroke="var(--unframer-neutral-300)"
                  strokeWidth="6.5"
                />
                {/* Curved arrows between nodes */}
                {[
                  { start: 12, end: 75 },
                  { start: 102, end: 165 },
                  { start: 192, end: 255 },
                  { start: 282, end: 345 },
                ].map((arc, i) => {
                  const r = 190
                  const cx = 290
                  const cy = 290
                  const toRad = (deg: number) => ((deg - 90) * Math.PI) / 180
                  const x1 = cx + r * Math.cos(toRad(arc.start))
                  const y1 = cy + r * Math.sin(toRad(arc.start))
                  const x2 = cx + r * Math.cos(toRad(arc.end))
                  const y2 = cy + r * Math.sin(toRad(arc.end))
                  const aRad = toRad(arc.end)
                  const tangentAngle = aRad + Math.PI / 2
                  const aLen = 10
                  const aSpread = 0.35
                  const ax1 = x2 - aLen * Math.cos(tangentAngle - aSpread)
                  const ay1 = y2 - aLen * Math.sin(tangentAngle - aSpread)
                  const ax2 = x2 - aLen * Math.cos(tangentAngle + aSpread)
                  const ay2 = y2 - aLen * Math.sin(tangentAngle + aSpread)
                  return (
                    <g key={i}>
                      <path
                        d={`M ${x1} ${y1} A ${r} ${r} 0 0 1 ${x2} ${y2}`}
                        fill="none"
                        stroke="var(--unframer-mf-accent-blue)"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                      />
                      <polygon
                        points={`${x2},${y2} ${ax1},${ay1} ${ax2},${ay2}`}
                        fill="var(--unframer-mf-accent-blue)"
                      />
                    </g>
                  )
                })}
              </svg>

              {/* Center label */}
              <div
                style={{
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                  textAlign: 'center',
                }}
              >
                <span
                  style={{
                    fontFamily: "'DM Mono', monospace",
                    fontWeight: 400,
                    fontSize: '28px',
                    letterSpacing: '-0.03em',
                    color: 'var(--unframer-neutral-400)',
                  }}
                >
                  Our Approach
                </span>
              </div>

              {/* Node cards at 12, 3, 6, 9 o'clock — no numbers, hover effect */}
              {methodology.map((item, i) => {
                const positions = [
                  { top: '50px', left: '50%', transform: 'translateX(-50%)' },
                  { top: '50%', right: '-40px', transform: 'translateY(-50%)' },
                  { bottom: '50px', left: '50%', transform: 'translateX(-50%)' },
                  { top: '50%', left: '-40px', transform: 'translateY(-50%)' },
                ]
                const pos = positions[i]
                const isVertical = i === 0 || i === 2
                return (
                  <div
                    key={i}
                    style={{
                      position: 'absolute',
                      ...pos,
                      width: isVertical ? '210px' : '190px',
                      textAlign: 'center',
                      zIndex: 1,
                    }}
                  >
                    <div
                      className="methodology-card"
                      style={{
                        backgroundColor: 'var(--unframer-neutral-200)',
                        borderRadius: '8px',
                        padding: '18px 16px',
                        border: '2px solid transparent',
                        transition: 'all 0.3s ease',
                        cursor: 'default',
                      }}
                      onMouseEnter={e => {
                        e.currentTarget.style.backgroundColor = 'rgba(255,255,255,1)'
                        e.currentTarget.style.borderColor = 'var(--unframer-mf-accent-blue)'
                        e.currentTarget.style.transform = 'scale(1.08)'
                        e.currentTarget.style.boxShadow = '0 6px 24px rgba(0,0,0,0.1)'
                        e.currentTarget.style.zIndex = '10'
                      }}
                      onMouseLeave={e => {
                        e.currentTarget.style.backgroundColor = 'var(--unframer-neutral-200)'
                        e.currentTarget.style.borderColor = 'transparent'
                        e.currentTarget.style.transform = 'scale(1)'
                        e.currentTarget.style.boxShadow = 'none'
                        e.currentTarget.style.zIndex = '1'
                      }}
                    >
                      <h4
                        style={{
                          fontFamily: "'DM Mono', monospace",
                          fontWeight: 400,
                          fontSize: '14px',
                          letterSpacing: '-0.03em',
                          color: 'var(--unframer-forrest)',
                          marginBottom: '6px',
                        }}
                      >
                        {item.title}
                      </h4>
                      <p
                        style={{
                          fontFamily: "'Inter', sans-serif",
                          fontSize: '12px',
                          lineHeight: '1.45em',
                          letterSpacing: '-0.02em',
                          color: 'var(--unframer-neutral-400)',
                        }}
                      >
                        {item.description}
                      </p>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Partners */}
      <section
        className="w-full flex flex-col items-center overflow-hidden"
        style={{ padding: '80px 0 67px 0', backgroundColor: '#F5F5F5' }}
      >
        <div className="w-full max-w-[1200px] px-[16px] md:px-[21px]">
          <Label text="Our clients & partners" />
        </div>
        <div className="w-full overflow-hidden" style={{ marginTop: '31px' }}>
          <div className="logo-marquee">
            {[...Array(2)].map((_, copy) => (
              <div key={copy} className="logo-marquee-track">
                {partnerLogos.map((src, i) => (
                  <div
                    key={i}
                    className="flex items-center justify-center flex-shrink-0"
                    style={{ width: '180px', height: '80px', padding: '0 20px' }}
                  >
                    <img
                      src={src}
                      alt=""
                      style={{
                        maxWidth: '100%',
                        maxHeight: '100%',
                        objectFit: 'contain',
                        filter: 'grayscale(100%)',
                        opacity: 0.7,
                      }}
                    />
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </section>

      <SectionContactFramerComponent.Responsive style={{ width: '100%' }} />
    </>
  )
}
