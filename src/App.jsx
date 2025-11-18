import Layout from './components/Layout'
import Hero from './components/Hero'
import Auth from './components/Auth'
import { Link } from 'react-router-dom'

function App() {
  const onAuthSuccess = () => {
    window.location.href = '/dashboard'
  }

  return (
    <Layout>
      <Hero />
      <section className="max-w-6xl mx-auto px-4 py-10 grid md:grid-cols-2 gap-8 text-white">
        <div>
          <h2 className="text-2xl font-semibold">Play the run</h2>
          <p className="text-white/70 mt-2">Dash through a vibrant city as our energetic boy hero. Jump, slide, and sprint to rack up points. Designed for everyone with simple controls and a clean, colorful interface.</p>
          <div className="mt-6 flex gap-3">
            <Link to="/dashboard" className="px-5 py-2.5 rounded-md bg-gradient-to-r from-fuchsia-500 to-sky-400 font-semibold">Open Dashboard</Link>
            <a href="#login" className="px-5 py-2.5 rounded-md border border-white/10 bg-white/5">Create Account</a>
          </div>
        </div>
        <div id="login">
          <Auth onSuccess={onAuthSuccess} />
        </div>
      </section>
    </Layout>
  )
}

export default App