import Label from '../components/Label'
import SectionContactFramerComponent from '../framer/section-contact'
import projects from '../data/projects.json'

const mfProjects = projects.filter((p: any) => p.category === 'mf')
const trackRecord = projects.filter((p: any) => p.category === 'track-record')

function ProjectCard({ p }: { p: typeof projects[number] }) {
  return (
    <div
      className="flex flex-col overflow-hidden group"
      style={{
        borderRadius: '8px',
        backgroundColor: 'rgba(255,255,255,0.95)',
        border: '4px solid transparent',
        transition: 'border-color 0.3s, background-color 0.3s',
      }}
      onMouseEnter={e => {
        e.currentTarget.style.borderColor = 'var(--unframer-accent-blue)'
        e.currentTarget.style.backgroundColor = 'rgba(185, 255, 255, 0.08)'
      }}
      onMouseLeave={e => {
        e.currentTarget.style.borderColor = 'transparent'
        e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.95)'
      }}
    >
      {/* Image */}
      <div className="w-full overflow-hidden" style={{ aspectRatio: '16/10' }}>
        <img
          src={p.thumb}
          alt={p.title}
          className="w-full h-full object-cover resource-card-img"
        />
      </div>

      {/* Content */}
      <div className="flex flex-col gap-[10px] flex-1" style={{ padding: '20px' }}>
        {/* Tags */}
        <div className="flex gap-[8px] flex-wrap">
          <span
            style={{
              fontFamily: "'DM Mono', monospace",
              fontWeight: 300,
              fontSize: '11px',
              letterSpacing: '-0.02em',
              color: 'var(--unframer-light-green)',
              backgroundColor: 'var(--unframer-forrest)',
              padding: '2px 8px',
              borderRadius: '2px',
            }}
          >
            {p.region}
          </span>
          <span
            style={{
              fontFamily: "'DM Mono', monospace",
              fontWeight: 300,
              fontSize: '11px',
              letterSpacing: '-0.02em',
              color: 'var(--unframer-forrest)',
              backgroundColor: 'var(--unframer-accent-blue)',
              padding: '2px 8px',
              borderRadius: '2px',
            }}
          >
            {p.sector}
          </span>
        </div>

        {/* Title */}
        <h3
          style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: '16px',
            lineHeight: '1.3em',
            letterSpacing: '-0.03em',
            color: 'var(--unframer-forrest)',
            fontWeight: 500,
          }}
        >
          {p.title}
        </h3>

        {/* Meta */}
        <div className="flex gap-[16px]">
          <span
            style={{
              fontFamily: "'DM Mono', monospace",
              fontWeight: 300,
              fontSize: '12px',
              color: 'var(--unframer-neutral-400)',
            }}
          >
            {p.duration}
          </span>
          <span
            style={{
              fontFamily: "'DM Mono', monospace",
              fontWeight: 300,
              fontSize: '12px',
              color: 'var(--unframer-neutral-400)',
            }}
          >
            {p.donor}
          </span>
        </div>

        {/* Description */}
        <p
          style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: '13px',
            lineHeight: '1.5em',
            letterSpacing: '-0.02em',
            color: 'var(--unframer-neutral-400)',
          }}
        >
          {p.description}
        </p>

        {/* Links */}
        {p.links.length > 0 && (
          <div className="flex flex-col gap-[4px] mt-auto" style={{ paddingTop: '8px' }}>
            {p.links.map((link, j) => (
              <a
                key={j}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  fontFamily: "'DM Mono', monospace",
                  fontWeight: 300,
                  fontSize: '12px',
                  color: 'var(--unframer-mf-cyan)',
                  textDecoration: 'none',
                }}
              >
                {link.label} →
              </a>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default function Projects2() {
  return (
    <>
      <section
        className="w-full flex flex-col items-center"
        style={{ padding: '160px 16px 80px 16px', backgroundColor: '#F5F5F5' }}
      >
        <div className="w-full max-w-[1200px]">
          {/* Header */}
          <div style={{ paddingBottom: '48px' }}>
            <div className="md:max-w-[40%] flex flex-col gap-[24px]">
              <Label text="Mountain Futures Projects" />
              <p
                style={{
                  fontFamily: "'Geist', sans-serif",
                  fontSize: '1.14rem',
                  lineHeight: '1.35em',
                  letterSpacing: '-0.03em',
                  color: 'var(--unframer-forrest)',
                }}
              >
                Current and recent contracts delivered through Mountain Futures.
              </p>
            </div>
          </div>

          {/* MF Project Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {mfProjects.map((p, i) => (
              <ProjectCard key={i} p={p} />
            ))}
          </div>

          {/* Team Track Record */}
          <div style={{ paddingTop: '96px', paddingBottom: '48px' }}>
            <div className="md:max-w-[50%] flex flex-col gap-[24px]">
              <Label text="Team Track Record" />
              <p
                style={{
                  fontFamily: "'Geist', sans-serif",
                  fontSize: '1.14rem',
                  lineHeight: '1.35em',
                  letterSpacing: '-0.03em',
                  color: 'var(--unframer-forrest)',
                }}
              >
                Selected projects delivered by our team members prior to or alongside Mountain Futures.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {trackRecord.map((p, i) => (
              <ProjectCard key={i} p={p} />
            ))}
          </div>
        </div>
      </section>

      <SectionContactFramerComponent.Responsive style={{ width: '100%' }} />
    </>
  )
}
