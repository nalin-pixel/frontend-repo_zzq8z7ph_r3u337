import { Link, useLocation, useNavigate } from 'react-router-dom'

export default function Navbar() {
  const location = useLocation()
  const navigate = useNavigate()
  const token = localStorage.getItem('flex_token')
  const user = JSON.parse(localStorage.getItem('flex_user') || 'null')

  const logout = () => {
    localStorage.removeItem('flex_token')
    localStorage.removeItem('flex_user')
    navigate('/')
  }

  const isActive = (path) => (location.pathname === path ? 'text-white' : 'text-white/70 hover:text-white')

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur bg-slate-900/50 border-b border-white/10">
      <div className="max-w-6xl mx-auto px-4 h-14 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <span className="inline-block w-6 h-6 rounded bg-gradient-to-tr from-fuchsia-500 to-sky-400" />
          <span className="text-white font-semibold tracking-tight">flex</span>
        </Link>
        <div className="flex items-center gap-6 text-sm">
          <Link to="/" className={isActive('/')}>Home</Link>
          <Link to="/dashboard" className={isActive('/dashboard')}>Dashboard</Link>
          {!token ? (
            <Link to="/login" className="text-white/90 bg-white/10 hover:bg-white/20 px-3 py-1.5 rounded-md border border-white/10">Login</Link>
          ) : (
            <button onClick={logout} className="text-white/90 bg-white/10 hover:bg-white/20 px-3 py-1.5 rounded-md border border-white/10">Logout{user?.display_name ? ` · ${user.display_name}` : ''}</button>
          )}
        </div>
      </div>
    </nav>
  )
}
