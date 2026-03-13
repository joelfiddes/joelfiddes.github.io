import Label from '../components/Label'
import SectionContactFramerComponent from '../framer/section-contact'

export default function Resources() {
  return (
    <>
      <section
        className="w-full flex flex-col items-center"
        style={{
          backgroundImage: 'url(/images/resources-bg.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          padding: '160px 20px',
        }}
      >
        <div className="w-full max-w-[1200px]">
          {/* Header */}
          <div className="flex gap-[78px]" style={{ padding: '0 18px 0 18px' }}>
            <div className="max-w-[65%] flex flex-col gap-[26px]" style={{ padding: '0 65px 20px 0' }}>
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

          {/* Resources Grid placeholder */}
          <div className="grid grid-cols-3 gap-x-16 gap-y-4" style={{ padding: '21px' }}>
            <p
              className="col-span-3 text-center"
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: '14px',
                color: 'var(--unframer-neutral-400)',
                padding: '80px 0',
              }}
            >
              Resource cards will be populated from CMS data
            </p>
          </div>
        </div>

        <SectionContactFramerComponent.Responsive style={{ width: '100%' }} />
      </section>
    </>
  )
}
