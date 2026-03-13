import './framer/styles.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import Home from './pages/Home'
import About from './pages/About'
import Expertise from './pages/Expertise'
import Projects from './pages/Projects'
import Resources from './pages/Resources'
import Careers from './pages/Careers'
import Contact from './pages/Contact'
import News from './pages/News'

export default function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/expertise" element={<Expertise />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/resources" element={<Resources />} />
          <Route path="/careers" element={<Careers />} />
          <Route path="/news" element={<News />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  )
}
