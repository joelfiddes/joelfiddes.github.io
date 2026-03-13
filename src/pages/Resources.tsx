import Label from '../components/Label'
import SectionContactFramerComponent from '../framer/section-contact'
import resources from '../data/resources.json'

export default function Resources() {
  return (
    <>
      <section
        className="w-full flex flex-col items-center"
        style={{
          backgroundImage: 'url(/images/resources-bg.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          padding: '160px 16px',
        }}
      >
        <div className="w-full max-w-[1200px]">
          {/* Header */}
          <div className="flex gap-[78px]" style={{ padding: '0 0 20px 0' }}>
            <div className="md:max-w-[65%] flex flex-col gap-[26px]">
              <Label text="Resources" />
              <p
                style={{
                  fontFamily: "'Geist', sans-serif",
                  fontSize: '1.14rem',
                  lineHeight: '1.35em',
                  letterSpacing: '-0.03em',
                  color: 'var(--unframer-forrest)',
                }}
              >
                Looking to explore further? This resources page serves as a central hub for a range
                of external publications, tools, datasets, and reference material that showcase our
                work.
              </p>
            </div>
          </div>

          {/* Resources Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-16 gap-y-10" style={{ padding: '21px 0' }}>
            {resources.map((r, i) => (
              <a
                key={i}
                href={r.link}
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-col gap-[12px] group"
                style={{
                  textDecoration: 'none',
                  padding: '12px',
                  borderRadius: '8px',
                  border: '6px solid transparent',
                  transition: 'border-color 0.3s, background-color 0.3s',
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.borderColor = 'var(--unframer-accent-blue)'
                  e.currentTarget.style.backgroundColor = 'rgba(185, 255, 255, 0.08)'
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.borderColor = 'transparent'
                  e.currentTarget.style.backgroundColor = 'transparent'
                }}
              >
                <div
                  className="w-full overflow-hidden relative"
                  style={{ aspectRatio: '1/1', borderRadius: '8px' }}
                >
                  <img
                    src={r.thumb}
                    alt={r.title}
                    className="w-full h-full object-cover resource-card-img"
                  />
                  <div
                    className="absolute inset-0 flex flex-col justify-end"
                    style={{
                      background: 'linear-gradient(to top, rgba(0,0,0,0.7) 0%, transparent 60%)',
                      padding: '12px',
                    }}
                  >
                    <span
                      style={{
                        fontFamily: "'DM Mono', monospace",
                        fontWeight: 300,
                        fontSize: '11px',
                        letterSpacing: '-0.02em',
                        color: 'rgba(255,255,255,0.7)',
                      }}
                    >
                      {r.date}
                    </span>
                    <span
                      style={{
                        fontFamily: "'Inter', sans-serif",
                        fontSize: '13px',
                        lineHeight: '1.3em',
                        letterSpacing: '-0.03em',
                        color: '#ffffff',
                      }}
                    >
                      {r.title}
                    </span>
                  </div>
                </div>
              </a>
            ))}
          </div>
        </div>

        <SectionContactFramerComponent.Responsive style={{ width: '100%' }} />
      </section>
    </>
  )
}
