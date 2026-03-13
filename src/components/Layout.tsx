import NavBarFramerComponent from '../framer/nav-bar'
import FooterFramerComponent from '../framer/global/footer'

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col items-center w-full bg-white">
      <div className="w-full sticky top-0 z-50">
        <NavBarFramerComponent.Responsive style={{ width: '100%' }} />
      </div>
      {children}
      <FooterFramerComponent.Responsive style={{ width: '100%' }} />
    </div>
  )
}
