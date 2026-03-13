import Label from '../components/Label'
import SectionContactFramerComponent from '../framer/section-contact'
import news from '../data/news.json'

const sorted = [...news].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })
}

function tagColor(tag: string) {
  const map: Record<string, string> = {
    publication: 'var(--unframer-mf-cyan)',
    project: 'var(--unframer-accent-blue)',
    release: '#a78bfa',
    WMO: '#fbbf24',
  }
  return map[tag] || 'var(--unframer-accent-blue)'
}

export default function News() {
  return (
    <>
      <section
        className="w-full flex flex-col items-center"
        style={{ padding: '160px 16px 80px 16px', backgroundColor: '#F5F5F5' }}
      >
        <div className="w-full max-w-[1200px]">
          {/* Header */}
          <div className="md:max-w-[55%] flex flex-col gap-[24px]" style={{ paddingBottom: '48px' }}>
            <Label text="News" />
            <p
              style={{
                fontFamily: "'Geist', sans-serif",
                fontSize: '1.14rem',
                lineHeight: '1.35em',
                letterSpacing: '-0.03em',
                color: 'var(--unframer-forrest)',
              }}
            >
              Latest publications, project updates, and releases from Mountain Futures.
            </p>
          </div>

          {/* News List */}
          <div className="flex flex-col">
            {sorted.map((item, i) => (
              <a
                key={i}
                href={item.link}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex flex-col md:flex-row gap-[12px] md:gap-[32px] md:items-baseline"
                style={{
                  textDecoration: 'none',
                  padding: '24px 0',
                  borderBottom: '1px solid var(--unframer-grey)',
                  transition: 'background-color 0.2s',
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.backgroundColor = 'rgba(185,255,255,0.08)'
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.backgroundColor = 'transparent'
                }}
              >
                {/* Date */}
                <span
                  className="shrink-0"
                  style={{
                    fontFamily: "'DM Mono', monospace",
                    fontWeight: 300,
                    fontSize: '12px',
                    letterSpacing: '-0.02em',
                    color: 'var(--unframer-neutral-400)',
                    width: '140px',
                  }}
                >
                  {formatDate(item.date)}
                </span>

                {/* Content */}
                <div className="flex flex-col gap-[8px] flex-1">
                  <h3
                    style={{
                      fontFamily: "'Inter', sans-serif",
                      fontSize: '16px',
                      lineHeight: '1.4em',
                      letterSpacing: '-0.03em',
                      color: 'var(--unframer-forrest)',
                      fontWeight: 500,
                    }}
                  >
                    {item.title}
                    <span
                      className="inline-block ml-1 opacity-0 group-hover:opacity-100"
                      style={{ transition: 'opacity 0.2s', color: 'var(--unframer-mf-cyan)' }}
                    >
                      →
                    </span>
                  </h3>
                  <p
                    style={{
                      fontFamily: "'Inter', sans-serif",
                      fontSize: '13px',
                      lineHeight: '1.55em',
                      letterSpacing: '-0.02em',
                      color: 'var(--unframer-neutral-400)',
                    }}
                  >
                    {item.summary}
                  </p>
                  {/* Tags */}
                  <div className="flex gap-[6px] flex-wrap">
                    {item.tags.map((tag, j) => (
                      <span
                        key={j}
                        style={{
                          fontFamily: "'DM Mono', monospace",
                          fontWeight: 300,
                          fontSize: '10px',
                          letterSpacing: '-0.02em',
                          color: 'var(--unframer-forrest)',
                          backgroundColor: tagColor(tag),
                          padding: '2px 8px',
                          borderRadius: '2px',
                        }}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      <SectionContactFramerComponent.Responsive style={{ width: '100%' }} />
    </>
  )
}
