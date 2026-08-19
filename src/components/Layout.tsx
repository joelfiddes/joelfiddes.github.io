import NavBarFramerComponent from '../framer/nav-bar'
import FooterFramerComponent from '../framer/global/footer'

// Banner shown only on the password-protected preview at test-site.mountainfutures.ch
// (see docs/test-site.md) so screenshots/shares are never mistaken for the live site.
function TestSiteBanner() {
  if (!window.location.hostname.startsWith('test-site')) return null
  return (
    <div
      style={{
        width: '100%',
        backgroundColor: 'var(--unframer-forrest, #122023)',
        color: 'var(--unframer-light-green, #E1FCAD)',
        fontFamily: '"DM Mono", monospace',
        fontSize: '12px',
        letterSpacing: '0.08em',
        textTransform: 'uppercase',
        textAlign: 'center',
        padding: '6px 16px',
      }}
    >
      Test site — not live · mountainfutures.ch is the public site
    </div>
  )
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col items-center w-full bg-white">
      <div className="w-full sticky top-0 z-50">
        <TestSiteBanner />
        <NavBarFramerComponent.Responsive style={{ width: '100%' }} />
      </div>
      {children}
      <FooterFramerComponent.Responsive style={{ width: '100%' }} />
    </div>
  )
}
