import HeroSection from '../components/HeroSection'
import Label from '../components/Label'
import SectionContactFramerComponent from '../framer/section-contact'
import PrimaryFramerComponent from '../framer/primary'

export default function About() {
  return (
    <>
      <HeroSection image="/images/about-hero.jpg" title="About us" height="74vh" />

      {/* About Header */}
      <section className="w-full flex justify-center" style={{ padding: '70px 16px 67px 16px', backgroundColor: '#f5f5f5' }}>
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
          padding: '80px 16px 0 16px',
          borderBottom: '1px solid var(--unframer-neutral-300)',
        }}
      >
        <div className="w-full max-w-[1200px]">
          <Label text="Meet the team" />

          {/* Joel */}
          <div
            className="flex flex-col md:flex-row mt-14"
            style={{ borderBottom: '1px solid var(--unframer-neutral-300)', paddingBottom: '20px' }}
          >
            <div className="md:flex-1 flex flex-col gap-[40px] md:gap-[76px]" style={{ padding: '19px 0' }}>
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
                className="w-full md:w-[374px]"
                style={{ height: '322px', objectFit: 'cover' }}
              />
            </div>
            <div
              className="md:flex-1 pt-4 md:pt-0"
              style={{
                borderLeft: 'none',
                padding: '0 0 0 0',
              }}
            >
              <div className="md:border-l md:border-[var(--unframer-neutral-300)] md:pl-[15px]">
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
            </div>
            <div
              className="pt-4 md:pt-0 flex flex-col gap-[20px]"
              style={{ flex: '0.5' }}
            >
              <div className="md:border-l md:border-[var(--unframer-neutral-300)] md:pl-[12px]">
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
              <div className="flex gap-[12px] items-center md:pl-[12px]">
                <PrimaryFramerComponent.Responsive
                  BYNIrUSxY="Contact"
                  hYruqSCKG="mailto:joel.fiddes@slf.ch"
                />
                <a
                  href="https://www.linkedin.com/in/joelfiddes/"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ display: 'flex', alignItems: 'center' }}
                >
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="var(--unframer-forrest)">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                </a>
              </div>
            </div>
          </div>

          {/* Simon */}
          <div
            className="flex flex-col md:flex-row mt-10"
            style={{ borderBottom: '1px solid var(--unframer-neutral-300)', paddingBottom: '20px' }}
          >
            <div className="flex flex-col gap-[40px] md:gap-[91px]" style={{ flex: '1.1', padding: '0 12px 0 0' }}>
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
              className="md:flex-1 pt-4 md:pt-0"
            >
              <div className="md:border-l md:border-[var(--unframer-neutral-300)] md:pl-[15px]">
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
            </div>
            <div
              className="pt-4 md:pt-0 flex flex-col gap-[58px]"
              style={{ flex: '0.6' }}
            >
              <div className="md:border-l md:border-[var(--unframer-neutral-300)] md:pl-[12px]">
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
              <div className="flex gap-[12px] items-center md:pl-[12px]">
                <PrimaryFramerComponent.Responsive
                  BYNIrUSxY="Contact"
                  hYruqSCKG="mailto:simon.allen@geo.uzh.ch"
                />
                <a
                  href="https://www.linkedin.com/in/simon-allen-351a28194/"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ display: 'flex', alignItems: 'center' }}
                >
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="var(--unframer-forrest)">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Network - running logo banner */}
      <section className="w-full flex flex-col items-center overflow-hidden" style={{ padding: '80px 0 67px 0', backgroundColor: '#f5f5f5' }}>
        <div className="w-full max-w-[1200px] px-[16px] md:px-[21px]">
          <Label text="Our network" />
        </div>
        <div className="w-full overflow-hidden" style={{ marginTop: '31px' }}>
          <div className="logo-marquee">
            {[...Array(2)].map((_, copy) => (
              <div key={copy} className="logo-marquee-track">
                {[
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
                ].map((src, i) => (
                  <div
                    key={i}
                    className="flex items-center justify-center flex-shrink-0"
                    style={{ width: '220px', height: '100px', padding: '0 25px' }}
                  >
                    <img
                      src={src}
                      alt=""
                      style={{
                        maxWidth: '100%',
                        maxHeight: '60px',
                        objectFit: 'contain',
                        opacity: 0.7,
                        transition: 'opacity 0.3s',
                      }}
                      onMouseEnter={e => (e.currentTarget.style.opacity = '1')}
                      onMouseLeave={e => (e.currentTarget.style.opacity = '0.7')}
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
