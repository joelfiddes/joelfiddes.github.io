import HeroSection from '../components/HeroSection'
import Label from '../components/Label'
import SectionContactFramerComponent from '../framer/section-contact'
import PrimaryFramerComponent from '../framer/primary'

export default function About() {
  return (
    <>
      <HeroSection image="/images/about-hero.jpg" title="About us" height="74vh" />

      {/* About Header */}
      <section className="w-full flex justify-center" style={{ padding: '70px 32px 67px 32px' }}>
        <div className="w-full max-w-[1200px]">
          <div className="flex justify-between items-end gap-[48px]">
            <div className="max-w-[700px] flex flex-col gap-[24px]">
              <Label text="About" />
              <p
                style={{
                  fontFamily: "'Geist', sans-serif",
                  fontSize: '1.14rem',
                  lineHeight: '1.35em',
                  letterSpacing: '-0.03em',
                  color: 'var(--unframer-forrest)',
                }}
              >
                We are a science-based consulting company focused on delivering innovative,
                data-driven solutions for climate resilience in mountain regions. We work at the
                intersection of research, technology, and policy to support communities and
                institutions facing rapid environmental change.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Meet the Team */}
      <section
        className="w-full flex flex-col items-center"
        style={{
          backgroundImage: 'url(/images/about-team-bg.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          padding: '174px 0 0 32px',
          borderBottom: '1px solid var(--unframer-neutral-300)',
        }}
      >
        <div className="w-full max-w-[1200px]">
          <Label text="Meet the team" />

          {/* Joel */}
          <div
            className="flex mt-14"
            style={{ borderBottom: '1px solid var(--unframer-neutral-300)', paddingBottom: '20px' }}
          >
            <div className="flex-1 flex flex-col gap-[76px]" style={{ padding: '19px 0' }}>
              <div>
                <h3
                  style={{
                    fontFamily: "'DM Mono', monospace",
                    fontWeight: 300,
                    fontSize: '23px',
                    lineHeight: '1em',
                    letterSpacing: '-0.05em',
                  }}
                >
                  Joel Fiddes
                </h3>
                <p
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: '14px',
                    lineHeight: '1.55em',
                    letterSpacing: '-0.03em',
                    color: 'var(--unframer-neutral-400)',
                  }}
                >
                  Co-Founder
                </p>
              </div>
              <img
                src="/images/joel.png"
                alt="Joel Fiddes"
                style={{ width: '374px', height: '322px', objectFit: 'cover' }}
              />
            </div>
            <div
              className="flex-1"
              style={{
                borderLeft: '1px solid var(--unframer-neutral-300)',
                padding: '0 0 0 15px',
              }}
            >
              <p
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: '14px',
                  lineHeight: '1.55em',
                  letterSpacing: '-0.03em',
                }}
              >
                Over 15 years of international experience in mountain hydrology and climate change,
                translating science into practice through operational tools and data-driven solutions
                for water resources and climate risk in High Mountain Asia and beyond.
              </p>
              <p
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: '14px',
                  lineHeight: '1.55em',
                  letterSpacing: '-0.03em',
                  marginTop: '1em',
                }}
              >
                Lead developer of widely adopted open-source tools for climate downscaling and snow
                modelling used by the global research community. WMO expert and affiliated researcher
                at the WSL Institute for Snow and Avalanche Research (SLF).
              </p>
            </div>
            <div
              style={{
                flex: '0.5',
                borderLeft: '1px solid var(--unframer-neutral-300)',
                padding: '0 0 0 12px',
              }}
              className="flex flex-col gap-[20px]"
            >
              <div>
                <p
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: '13px',
                    lineHeight: '1.55em',
                    letterSpacing: '-0.03em',
                    fontWeight: 500,
                  }}
                >
                  Areas of expertise
                </p>
                <p
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: '13px',
                    lineHeight: '1.55em',
                    letterSpacing: '-0.03em',
                  }}
                >
                  Snow forecasting<br />Water management<br />Climate models
                </p>
              </div>
              <div className="flex gap-[21px] items-center mt-auto">
                <PrimaryFramerComponent.Responsive
                  BYNIrUSxY="Contact"
                  hYruqSCKG="mailto:joel.fiddes@slf.ch"
                />
              </div>
            </div>
          </div>

          {/* Simon */}
          <div
            className="flex mt-10"
            style={{ borderBottom: '1px solid var(--unframer-neutral-300)', paddingBottom: '20px' }}
          >
            <div className="flex flex-col gap-[91px]" style={{ flex: '1.1', padding: '0 12px 0 0' }}>
              <div>
                <h3
                  style={{
                    fontFamily: "'DM Mono', monospace",
                    fontWeight: 300,
                    fontSize: '23px',
                    lineHeight: '1em',
                    letterSpacing: '-0.05em',
                  }}
                >
                  Simon Allen
                </h3>
                <p
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: '14px',
                    lineHeight: '1.55em',
                    letterSpacing: '-0.03em',
                    color: 'var(--unframer-neutral-400)',
                  }}
                >
                  Co-Founder
                </p>
              </div>
              <img
                src="/images/simon.png"
                alt="Simon Allen"
                style={{ width: '100%', height: '285px', objectFit: 'cover' }}
              />
            </div>
            <div
              className="flex-1"
              style={{
                borderLeft: '1px solid var(--unframer-neutral-300)',
                padding: '0 0 0 15px',
              }}
            >
              <p
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: '14px',
                  lineHeight: '1.55em',
                  letterSpacing: '-0.03em',
                }}
              >
                Focus on climate impacts and disaster risk management in developing regions and high
                mountain environments. Over the past decade, extensive work alongside local
                stakeholders to deliver integrated climate risk assessments supporting adaptation
                planning and sustainable development across South and Central Asia, the Caucasus,
                the Andes, and Tibet.
              </p>
            </div>
            <div
              style={{
                flex: '0.6',
                borderLeft: '1px solid var(--unframer-neutral-300)',
                padding: '0 0 0 12px',
              }}
              className="flex flex-col gap-[58px]"
            >
              <div>
                <p
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: '13px',
                    lineHeight: '1.55em',
                    letterSpacing: '-0.03em',
                    fontWeight: 500,
                  }}
                >
                  Areas of expertise
                </p>
                <p
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: '13px',
                    lineHeight: '1.55em',
                    letterSpacing: '-0.03em',
                  }}
                >
                  Climate impacts<br />Disaster risk management<br />Mountain hazards
                </p>
              </div>
              <div className="flex gap-[21px] items-center">
                <PrimaryFramerComponent.Responsive
                  BYNIrUSxY="Contact"
                  hYruqSCKG="mailto:simon.allen@geo.uzh.ch"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Network - logos */}
      <section className="w-full flex justify-center" style={{ padding: '156px 21px 67px 21px' }}>
        <div className="w-full max-w-[1200px] flex flex-col gap-[31px]">
          <Label text="Our network" />
          <p
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: '14px',
              lineHeight: '1.55em',
              letterSpacing: '-0.03em',
              color: 'var(--unframer-neutral-400)',
              textAlign: 'center',
              padding: '40px 0',
            }}
          >
            Partner logos coming soon
          </p>
        </div>
      </section>

      <SectionContactFramerComponent.Responsive style={{ width: '100%' }} />
    </>
  )
}
