import { useEffect, useState } from 'react'

export default function Dashboard() {
  const [user, setUser] = useState(null)
  const [top, setTop] = useState([])
  const [score, setScore] = useState('')
  const baseUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

  useEffect(() => {
    const u = JSON.parse(localStorage.getItem('flex_user') || 'null')
    setUser(u)
    fetchTop()
  }, [])

  const fetchTop = async () => {
    const res = await fetch(`${baseUrl}/scores/top`)
    const data = await res.json()
    setTop(data.scores || [])
  }

  const submitScore = async (e) => {
    e.preventDefault()
    const token = localStorage.getItem('flex_token')
    if (!token) return alert('Please login first')
    const res = await fetch(`${baseUrl}/scores`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({ value: parseInt(score || '0', 10) })
    })
    if (res.ok) {
      setScore('')
      fetchTop()
      alert('Score submitted!')
    } else {
      const d = await res.json()
      alert(d.detail || 'Failed to submit score')
    }
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 text-white">
      <h2 className="text-2xl font-semibold">Dashboard</h2>
      <p className="text-white/70 mt-1">Welcome back{user?.display_name ? `, ${user.display_name}` : ''}! Submit a new score and climb the leaderboard.</p>

      <div className="grid md:grid-cols-2 gap-6 mt-6">
        <div className="bg-slate-900/60 border border-white/10 rounded-xl p-5">
          <h3 className="font-semibold mb-3">Submit score</h3>
          <form onSubmit={submitScore} className="flex gap-3">
            <input value={score} onChange={(e)=>setScore(e.target.value)} type="number" min="0" className="flex-1 px-3 py-2 rounded-md bg-white/5 border border-white/10 focus:outline-none focus:ring-2 focus:ring-sky-500" placeholder="e.g. 1200" />
            <button className="px-4 py-2 rounded-md bg-gradient-to-r from-fuchsia-500 to-sky-400 font-semibold">Submit</button>
          </form>
        </div>

        <div className="bg-slate-900/60 border border-white/10 rounded-xl p-5">
          <h3 className="font-semibold mb-3">Top players</h3>
          <ul className="divide-y divide-white/5">
            {top.map((s, i) => (
              <li key={i} className="flex items-center justify-between py-2">
                <span className="text-white/90">{i+1}. {s.display_name}</span>
                <span className="text-sky-300 font-semibold">{s.value}</span>
              </li>
            ))}
            {top.length === 0 && <li className="py-2 text-white/60">No scores yet. Be the first!</li>}
          </ul>
        </div>
      </div>
    </div>
  )
}
