import Label from '../components/Label'
import SectionContactFramerComponent from '../framer/section-contact'
import projects from '../data/projects.json'

export default function Projects() {
  return (
    <>
      <section
        className="w-full flex flex-col items-center"
        style={{
          backgroundImage: 'url(/images/contour-lines.svg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          padding: '160px 16px 80px 16px',
        }}
      >
        <div className="w-full max-w-[1200px]">
          {/* Header */}
          <div style={{ paddingBottom: '80px' }}>
            <div className="md:max-w-[40%] flex flex-col gap-[24px]">
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

          {/* Project Cards — alternating layout */}
          <div className="flex flex-col gap-[64px] md:gap-[100px]">
            {projects.map((p, i) => (
              <div
                key={i}
                className={`flex flex-col ${i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} gap-[32px] md:gap-[48px] items-stretch`}
              >
                {/* Image */}
                <div
                  className="w-full md:w-[60%] shrink-0 overflow-hidden group"
                  style={{ borderRadius: '8px' }}
                >
                  <img
                    src={p.thumb}
                    alt={p.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    style={{ minHeight: '280px', maxHeight: '440px' }}
                  />
                </div>

                {/* Content */}
                <div className="flex flex-col justify-center gap-[16px] flex-1">
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
                        padding: '3px 10px',
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
                        padding: '3px 10px',
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
                      fontSize: '22px',
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
                      fontSize: '14px',
                      lineHeight: '1.6em',
                      letterSpacing: '-0.02em',
                      color: 'var(--unframer-neutral-400)',
                    }}
                  >
                    {p.description}
                  </p>

                  {/* Links */}
                  {p.links.length > 0 && (
                    <div className="flex flex-col gap-[6px]" style={{ marginTop: '4px' }}>
                      {p.links.map((link, j) => (
                        <a
                          key={j}
                          href={link.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="group/link inline-flex items-center gap-[6px]"
                          style={{
                            fontFamily: "'DM Mono', monospace",
                            fontWeight: 300,
                            fontSize: '12px',
                            color: 'var(--unframer-mf-cyan)',
                            textDecoration: 'none',
                          }}
                        >
                          {link.label}
                          <span
                            className="inline-block transition-transform duration-200 group-hover/link:translate-x-1"
                          >
                            →
                          </span>
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
