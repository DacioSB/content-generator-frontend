import { About } from './components/About'
import { Features } from './components/Features'
import { Footer } from './components/Footer'
import { Hero } from './components/Hero'
import { Navbar } from './components/Navbar'
import { Pricing } from './components/Pricing'
import axios from 'axios';
import { useAuth } from '@clerk/clerk-react'
import Dashboard from './pages/dashboard/page'

function App() {
  const { getToken } = useAuth();

  const fetchData = async () => {
    const token = await getToken();
    // const response = await axios.get('https://your-backend-url/api/data', {
    //   headers: {
    //     Authorization: `Bearer ${token}`,
    //   },
    // });
    console.log(token);
  };
  
  return (
    <>
      <Dashboard />
      {/* <Navbar />
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
      </div> */}

      {/* <button onClick={fetchData}>Fetch Data</button> */}
    </>
  )
}

export default App