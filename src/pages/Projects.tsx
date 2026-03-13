import Label from '../components/Label'
import SectionContactFramerComponent from '../framer/section-contact'
import projects from '../data/projects.json'

export default function Projects() {
  return (
    <>
      <section
        className="w-full flex flex-col items-center"
        style={{
          backgroundImage: 'url(/images/projects-bg.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          padding: '160px 20px',
        }}
      >
        <div className="w-full max-w-[1200px] flex flex-col gap-[160px]">
          {/* Header */}
          <div style={{ padding: '180px 16px 14px 16px' }}>
            <div className="max-w-[40%] flex flex-col gap-[24px]">
              <Label text="Our Projects" />
              <p
                style={{
                  fontFamily: "'Geist', sans-serif",
                  fontSize: '1.14rem',
                  lineHeight: '1.35em',
                  letterSpacing: '-0.03em',
                  color: 'var(--unframer-forrest)',
                }}
              >
                Discover how we turn research and data into real-world impact for mountain
                environments and communities.
              </p>
            </div>
          </div>

          {/* Project Cards */}
          <div className="grid grid-cols-3 gap-5" style={{ padding: '0 20px' }}>
            {projects.map((p, i) => (
              <div
                key={i}
                className="flex flex-col overflow-hidden"
                style={{ borderRadius: '8px', backgroundColor: 'rgba(255,255,255,0.95)' }}
              >
                <div className="w-full" style={{ aspectRatio: '16/10' }}>
                  <img
                    src={p.thumb}
                    alt={p.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex flex-col gap-[10px]" style={{ padding: '20px' }}>
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
                  {p.links.length > 0 && (
                    <div className="flex flex-col gap-[4px]" style={{ marginTop: '8px' }}>
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
            ))}
          </div>
        </div>
      </section>

      <SectionContactFramerComponent.Responsive style={{ width: '100%' }} />
    </>
  )
}
