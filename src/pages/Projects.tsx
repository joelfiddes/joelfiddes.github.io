import Label from '../components/Label'
import SectionContactFramerComponent from '../framer/section-contact'

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

          {/* Project Grid placeholder */}
          <div className="grid grid-cols-3 gap-5" style={{ padding: '0 20px' }}>
            <p
              className="col-span-3 text-center"
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: '14px',
                color: 'var(--unframer-neutral-400)',
                padding: '80px 0',
              }}
            >
              Project cards will be populated from CMS data
            </p>
          </div>
        </div>
      </section>

      <SectionContactFramerComponent.Responsive style={{ width: '100%' }} />
    </>
  )
}
