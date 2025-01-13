import { ProtectedRoute } from './components/ProtectedRoute'
import { About } from './components/About'
import { Features } from './components/Features'
import { Footer } from './components/Footer'
import { Hero } from './components/Hero'
import { Navbar } from './components/Navbar'
import { Pricing } from './components/Pricing'

function App() {
  return (
    <ProtectedRoute>
      <Navbar />
      <Hero />
      <div id="features">
        <Features />
      </div>
      <div id="pricing">
        <Pricing />
      </div>
      <div id="about">
        <About />
      </div>
      <div id="contact">
        <Footer />
      </div>
    </ProtectedRoute>
  )
}

export default App