import HeroSection from '../components/HeroSection'
import Label from '../components/Label'
import FocusCardFramerComponent from '../framer/focus-card'
import MapFramerComponent from '../framer/map'
import SectionContactFramerComponent from '../framer/section-contact'
import PrimaryFramerComponent from '../framer/primary'

export default function Home() {
  return (
    <>
      <HeroSection
        image="/images/hero.png"
        title="Smarter climate solutions for mountain regions and communities"
      />

      {/* Section Intro */}
      <section className="w-full flex justify-center" style={{ padding: '80px 16px', backgroundColor: '#F5F5F5' }}>
        <div className="w-full max-w-[1200px] flex flex-col gap-[37px]">
          <Label text="Introduction" />
          <div className="md:max-w-[80%]">
            <p
              className="text-[18px] md:text-[23px]"
              style={{
                fontFamily: "'Inter', sans-serif",
                lineHeight: '1.3em',
                letterSpacing: '-0.04em',
                color: 'var(--unframer-forrest)',
              }}
            >
              We are a science-based consulting company focused on delivering innovative,
              data-driven solutions for climate resilience in mountain regions. We work at the
              intersection of research, technology, and policy to support communities and
              institutions facing rapid environmental change.
            </p>
          </div>
          <PrimaryFramerComponent.Responsive
            BYNIrUSxY="Learn More"
            hYruqSCKG="/about"
          />
        </div>
      </section>

      {/* Focus Areas */}
      <section className="w-full flex justify-center" style={{ padding: '45px 16px 8px 16px', backgroundColor: '#F5F5F5' }}>
        <div className="w-full max-w-[1200px] flex flex-col gap-[48px]">
          <h2
            className="text-[24px] md:text-[35px]"
            style={{
              fontFamily: "'DM Mono', monospace",
              fontWeight: 300,
              lineHeight: '0.9em',
              letterSpacing: '-0.05em',
              color: 'var(--unframer-forrest)',
            }}
          >
            Our expertise
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2">
            <FocusCardFramerComponent.Responsive
              title="Energy & Water"
              overview="Advancing understanding of water and cryosphere processes to strengthen water and energy security."
              icon={{ src: 'https://framerusercontent.com/images/iiQwBNQcCcDi7J5sN4aFs0RI0Mg.png', alt: 'Energy & Water' }}
              style={{ width: '100%', height: '377px' }}
            />
            <FocusCardFramerComponent.Responsive
              title="Hazards & Risk"
              overview="Delivering solutions for disaster risk reduction to strengthen resilience and adaptive capacity."
              icon={{ src: 'https://framerusercontent.com/images/36NIpLGjIHMIAr8We5YC8ZO2PJQ.png', alt: 'Hazards & Risk' }}
              style={{ width: '100%', height: '377px' }}
            />
            <FocusCardFramerComponent.Responsive
              title="Adaptation Solutions"
              overview="Translating mountain climate knowledge into targeted actions that support resilient planning and safer communities."
              icon={{ src: 'https://framerusercontent.com/images/KnKOoD9a8xaIeLqTcXaGnkasHOA.png', alt: 'Adaptation Solutions' }}
              style={{ width: '100%', height: '377px' }}
            />
            <FocusCardFramerComponent.Responsive
              title="Policy Engagement"
              overview="Bridging science and policy to strengthen climate-resilient decision-making."
              icon={{ src: 'https://framerusercontent.com/images/he2V1ICax9WCiGgQtFUx05UhM0I.png', alt: 'Policy Engagement' }}
              style={{ width: '100%', height: '377px' }}
            />
          </div>
        </div>
      </section>

      {/* Where We Work */}
      <section className="w-full flex justify-center" style={{ padding: '128px 16px', backgroundColor: '#F5F5F5' }}>
        <div className="w-full max-w-[1200px] flex flex-col gap-[44px]">
          <div className="flex flex-col gap-[32px]">
            <Label text="Where we work" />
            <div className="md:max-w-[70%]">
              <p
                className="text-[20px] md:text-[29px]"
                style={{
                  fontFamily: "'Inter', sans-serif",
                  lineHeight: '34px',
                  letterSpacing: '-0.05em',
                  color: 'var(--unframer-forrest)',
                }}
              >
                Rooted in High Mountain Asia and extending across South America, New Zealand, and
                Europe, our work is supported by a growing global network of collaborators,
                partners, and communities dedicated to strengthening mountain futures.
              </p>
            </div>
          </div>
          <MapFramerComponent.Responsive style={{ width: '100%', maxWidth: '1100px', height: 'auto', aspectRatio: '1100/570' }} />
        </div>
      </section>

      <SectionContactFramerComponent.Responsive style={{ width: '100%' }} />
    </>
  )
}
