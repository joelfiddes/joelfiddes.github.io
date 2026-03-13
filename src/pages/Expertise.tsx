import HeroSection from '../components/HeroSection'
import Label from '../components/Label'
import SectionContactFramerComponent from '../framer/section-contact'

const services = [
  {
    title: 'Energy & Water',
    image: '/images/energy-water.png',
    description:
      'Mountain water fuels hydropower, agriculture, and communities downstream. We combine high-resolution modelling with field-based observations to clarify how climate and cryosphere changes affect water availability. Our insights help partners optimise hydropower operations, plan seasonal water use, and build resilient energy–water systems.',
  },
  {
    title: 'Hazards & Risk',
    image: '/images/hazards-risk.png',
    description:
      'Mountain regions face rising risks from floods, avalanches, landslides, and glacier-related hazards. We integrate cutting-edge field monitoring, modelling, and remote sensing to assess emerging threats to communities and infrastructure. Our solutions support early warning, build local capacities, reduce vulnerabilities, and enable climate-resilient planning.',
  },
  {
    title: 'Adaptation Solutions',
    image: '/images/adaptation.png',
    description:
      'We turn mountain climate science into practical strategies that help communities and institutions adapt to change. By combining robust data, scenario analysis, and close collaboration with local partners, we co-develop solutions that strengthen water security, reduce hazard impacts, and build long-term resilience in mountain regions.',
  },
  {
    title: 'Policy Engagement',
    image: '/images/policy.png',
    description:
      'We bridge mountain science and policy to support informed, evidence-based decision-making. Through tailored briefings, guidance documents, capacity building, and long-term partnerships with government agencies and regional institutions, we help integrate climate risk and water insights into planning, governance, and resource management.',
  },
]

export default function Expertise() {
  return (
    <>
      <HeroSection
        image="/images/expertise-hero.jpg"
        title="Our solutions and expertise"
        height="74vh"
      />

      {/* Services Grid */}
      <section
        className="w-full flex justify-center"
        style={{
          backgroundImage: 'url(/images/expertise-bg.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          padding: '80px 0 60px 0',
        }}
      >
        <div className="w-full max-w-[1135px] flex flex-col gap-[33px]">
          {/* Header */}
          <div
            style={{
              borderBottom: '1px solid var(--unframer-neutral-300)',
              padding: '0 32px 119px 32px',
            }}
          >
            <div className="max-w-[700px] flex flex-col gap-[24px]">
              <Label text="Our solutions" />
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

          {/* Service Cards Grid */}
          <div className="grid grid-cols-2 gap-x-10 gap-y-2" style={{ padding: '0 32px' }}>
            {services.map((service) => (
              <div key={service.title} className="flex flex-col gap-[22px] pb-16">
                <h3
                  style={{
                    fontFamily: "'DM Mono', monospace",
                    fontWeight: 300,
                    fontSize: '23px',
                    lineHeight: '1em',
                    letterSpacing: '-0.05em',
                    color: 'var(--unframer-forrest)',
                  }}
                >
                  {service.title}
                </h3>
                <img
                  src={service.image}
                  alt={service.title}
                  style={{ width: '100%', height: '340px', objectFit: 'cover', borderRadius: '20px' }}
                />
                <p
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: '14px',
                    lineHeight: '1.55em',
                    letterSpacing: '-0.03em',
                    color: 'var(--unframer-forrest)',
                  }}
                >
                  {service.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <SectionContactFramerComponent.Responsive style={{ width: '100%' }} />
    </>
  )
}
