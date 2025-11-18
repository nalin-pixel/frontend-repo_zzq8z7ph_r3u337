import { useState } from 'react'

export default function Auth({ onSuccess }) {
  const [mode, setMode] = useState('login')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [displayName, setDisplayName] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const baseUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

  const submit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    try {
      const endpoint = mode === 'login' ? '/auth/login' : '/auth/register'
      const body = mode === 'login' ? { email, password } : { email, password, display_name: displayName }
      const res = await fetch(`${baseUrl}${endpoint}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.detail || 'Something went wrong')
      localStorage.setItem('flex_token', data.token)
      localStorage.setItem('flex_user', JSON.stringify(data.user))
      onSuccess?.(data)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="bg-slate-900/60 border border-white/10 rounded-xl p-6 text-white">
      <div className="flex gap-2 mb-4">
        <button onClick={() => setMode('login')} className={`px-3 py-1.5 rounded-md border ${mode==='login'?'bg-white/20 border-white/20':'bg-white/5 border-white/10'}`}>Login</button>
        <button onClick={() => setMode('register')} className={`px-3 py-1.5 rounded-md border ${mode==='register'?'bg-white/20 border-white/20':'bg-white/5 border-white/10'}`}>Register</button>
      </div>
      <form onSubmit={submit} className="space-y-3">
        <div>
          <label className="block text-sm text-white/70 mb-1">Email</label>
          <input type="email" value={email} onChange={(e)=>setEmail(e.target.value)} required className="w-full px-3 py-2 rounded-md bg-white/5 border border-white/10 focus:outline-none focus:ring-2 focus:ring-fuchsia-500" />
        </div>
        {mode==='register' && (
          <div>
            <label className="block text-sm text-white/70 mb-1">Display name</label>
            <input value={displayName} onChange={(e)=>setDisplayName(e.target.value)} required className="w-full px-3 py-2 rounded-md bg-white/5 border border-white/10 focus:outline-none focus:ring-2 focus:ring-fuchsia-500" />
          </div>
        )}
        <div>
          <label className="block text-sm text-white/70 mb-1">Password</label>
          <input type="password" value={password} onChange={(e)=>setPassword(e.target.value)} required className="w-full px-3 py-2 rounded-md bg-white/5 border border-white/10 focus:outline-none focus:ring-2 focus:ring-fuchsia-500" />
        </div>
        {error && <p className="text-pink-300 text-sm">{error}</p>}
        <button disabled={loading} className="w-full bg-gradient-to-r from-fuchsia-500 to-sky-400 text-white font-semibold py-2 rounded-md shadow disabled:opacity-60">
          {loading ? 'Please wait…' : mode==='login' ? 'Login' : 'Create account'}
        </button>
      </form>
    </div>
  )
}
