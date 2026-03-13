import Label from '../components/Label'
import SectionContactFramerComponent from '../framer/section-contact'
import PrimaryFramerComponent from '../framer/primary'
import BenefitItemFramerComponent from '../framer/benefit-item'

export default function Careers() {
  return (
    <>
      {/* Careers Header */}
      <section className="w-full flex justify-center" style={{ padding: '120px 16px 48px 16px' }}>
        <div className="w-full max-w-[1800px]">
          <div className="max-w-[500px]">
            <h1
              className="text-[36px] md:text-[66px]"
              style={{
                fontFamily: "'DM Mono', monospace",
                fontWeight: 300,
                lineHeight: '1em',
                letterSpacing: '-0.05em',
                color: 'var(--unframer-forrest)',
              }}
            >
              Careers
            </h1>
          </div>
        </div>
      </section>

      {/* Hero Image */}
      <section className="w-full relative h-[300px] md:h-[640px]">
        <img
          src="/images/careers-hero.webp"
          alt="Mountain landscape"
          className="w-full h-full object-cover"
        />
      </section>

      {/* Open Positions */}
      <section className="w-full flex justify-center" style={{ padding: '80px 16px' }}>
        <div className="w-full max-w-[1800px] flex flex-col gap-[32px]">
          <Label text="careers" color="var(--unframer-light-green)" />
          <h2
            className="text-[22px] md:text-[29px]"
            style={{
              fontFamily: "'Inter', sans-serif",
              lineHeight: '34px',
              letterSpacing: '-0.05em',
              color: 'var(--unframer-forrest)',
            }}
          >
            Open Positions
          </h2>
          <p
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: '14px',
              lineHeight: '1.55em',
              letterSpacing: '-0.03em',
              color: 'var(--unframer-neutral-400)',
              padding: '20px 0',
            }}
          >
            No open positions currently. Check back soon or follow us on LinkedIn.
          </p>
          <PrimaryFramerComponent.Responsive
            BYNIrUSxY="All Open Positions"
            hYruqSCKG="https://linkedin.com"
          />
        </div>
      </section>

      {/* Benefits */}
      <section
        className="w-full flex justify-center"
        style={{
          backgroundColor: 'var(--unframer-grey)',
          padding: '80px 16px',
        }}
      >
        <div className="w-full max-w-[1800px] flex flex-col gap-[48px] md:gap-[92px]">
          <div className="md:max-w-[70%] flex flex-col gap-[32px]">
            <Label text="Our Benefits" color="var(--unframer-light-green)" />
            <h2
              className="text-[22px] md:text-[29px]"
              style={{
                fontFamily: "'Inter', sans-serif",
                lineHeight: '34px',
                letterSpacing: '-0.05em',
                color: 'var(--unframer-forrest)',
              }}
            >
              Your Well-being, Our Priority
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12 md:gap-y-20">
            <BenefitItemFramerComponent.Responsive
              o8cqVruEu="01"
              ZzfhAtmjk="Flexible Work Arrangements"
              wf4B0gy71="We offer flexible work arrangements for better work-life balance."
            />
            <BenefitItemFramerComponent.Responsive
              o8cqVruEu="02"
              ZzfhAtmjk="Generous Vacation Time"
              wf4B0gy71="We provide generous vacation time to recharge and relax."
            />
            <BenefitItemFramerComponent.Responsive
              o8cqVruEu="03"
              ZzfhAtmjk="Wellness Programs"
              wf4B0gy71="We support employee wellness through various programs and initiatives."
            />
            <BenefitItemFramerComponent.Responsive
              o8cqVruEu="04"
              ZzfhAtmjk="Paid Time Off"
              wf4B0gy71="We offer paid time off for personal and family needs."
            />
            <BenefitItemFramerComponent.Responsive
              o8cqVruEu="05"
              ZzfhAtmjk="Remote Work Options"
              wf4B0gy71="We offer remote work options for increased flexibility."
            />
            <BenefitItemFramerComponent.Responsive
              o8cqVruEu="06"
              ZzfhAtmjk="International Fieldwork"
              wf4B0gy71="Opportunities for fieldwork in mountain regions around the world."
            />
          </div>
        </div>
      </section>

      <SectionContactFramerComponent.Responsive style={{ width: '100%' }} />
    </>
  )
}
