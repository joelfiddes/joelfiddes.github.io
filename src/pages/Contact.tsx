import Label from '../components/Label'

export default function Contact() {
  return (
    <section
      className="w-full flex justify-center"
      style={{
        backgroundImage: 'url(/images/contact-hero.jpg)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        minHeight: '100vh',
      }}
    >
      <div className="w-full max-w-[1200px] px-4">
        <div style={{ padding: '120px 0 0 0' }}>
          <div className="md:max-w-[55%] flex flex-col gap-[24px]">
            <Label text="Get in touch" />
            <p
              style={{
                fontFamily: "'Geist', sans-serif",
                fontSize: '1.14rem',
                lineHeight: '1.35em',
                letterSpacing: '-0.03em',
                color: 'var(--unframer-forrest)',
              }}
            >
              Whether you're launching a project or exploring partnerships, we're here to
              collaborate.
            </p>
          </div>
        </div>

        {/* Contact Form */}
        <div className="w-full" style={{ padding: '65px 0 145px 0' }}>
          <form
            action="https://api.web3forms.com/submit"
            method="POST"
            className="flex flex-col gap-[36px]"
          >
            <input type="hidden" name="access_key" value="9209aecb-cee3-4948-abc5-c7af1686e041" />
            <input type="hidden" name="redirect" value="https://mountainfutures.ch/contact" />
            <input type="hidden" name="subject" value="New contact from mountainfutures.ch" />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <label className="flex flex-col gap-[10px]">
                <span
                  style={{
                    fontFamily: "'DM Mono', monospace",
                    fontWeight: 300,
                    fontSize: '16px',
                    letterSpacing: '-0.04em',
                  }}
                >
                  Name
                </span>
                <input
                  type="text"
                  name="name"
                  required
                  className="w-full border-b border-neutral-300 bg-transparent py-2 outline-none"
                  style={{ fontFamily: "'Inter', sans-serif", fontSize: '14px' }}
                />
              </label>
              <label className="flex flex-col gap-[10px]">
                <span
                  style={{
                    fontFamily: "'DM Mono', monospace",
                    fontWeight: 300,
                    fontSize: '16px',
                    letterSpacing: '-0.04em',
                  }}
                >
                  Phone
                </span>
                <input
                  type="tel"
                  name="phone"
                  className="w-full border-b border-neutral-300 bg-transparent py-2 outline-none"
                  style={{ fontFamily: "'Inter', sans-serif", fontSize: '14px' }}
                />
              </label>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <label className="flex flex-col gap-[10px]">
                <span
                  style={{
                    fontFamily: "'DM Mono', monospace",
                    fontWeight: 300,
                    fontSize: '16px',
                    letterSpacing: '-0.04em',
                  }}
                >
                  Company
                </span>
                <input
                  type="text"
                  name="company"
                  className="w-full border-b border-neutral-300 bg-transparent py-2 outline-none"
                  style={{ fontFamily: "'Inter', sans-serif", fontSize: '14px' }}
                />
              </label>
              <label className="flex flex-col gap-[10px]">
                <span
                  style={{
                    fontFamily: "'DM Mono', monospace",
                    fontWeight: 300,
                    fontSize: '16px',
                    letterSpacing: '-0.04em',
                  }}
                >
                  Email
                </span>
                <input
                  type="email"
                  name="email"
                  required
                  className="w-full border-b border-neutral-300 bg-transparent py-2 outline-none"
                  style={{ fontFamily: "'Inter', sans-serif", fontSize: '14px' }}
                />
              </label>
            </div>
            <label className="flex flex-col gap-[10px]">
              <span
                style={{
                  fontFamily: "'DM Mono', monospace",
                  fontWeight: 300,
                  fontSize: '16px',
                  letterSpacing: '-0.04em',
                }}
              >
                Your message
              </span>
              <textarea
                rows={4}
                name="message"
                required
                className="w-full border-b border-neutral-300 bg-transparent py-2 outline-none resize-none"
                style={{ fontFamily: "'Inter', sans-serif", fontSize: '14px' }}
              />
            </label>
            <button
              type="submit"
              style={{
                fontFamily: "'DM Mono', monospace",
                fontWeight: 300,
                fontSize: '16px',
                letterSpacing: '-0.04em',
                backgroundColor: 'var(--unframer-forrest)',
                color: 'white',
                padding: '12px 24px',
                border: 'none',
                cursor: 'pointer',
                width: 'fit-content',
              }}
            >
              Send Message
            </button>
          </form>
        </div>
      </div>
    </section>
  )
}
