import Spline from '@splinetool/react-spline'

export default function Hero() {
  return (
    <section className="relative w-full h-[70vh] sm:h-[80vh] overflow-hidden">
      <div className="absolute inset-0">
        <Spline scene="https://prod.spline.design/atN3lqky4IzF-KEP/scene.splinecode" style={{ width: '100%', height: '100%' }} />
      </div>
      <div className="relative z-10 h-full grid place-items-center bg-gradient-to-t from-slate-950/80 via-slate-950/30 to-transparent pointer-events-none">
        <div className="max-w-4xl px-6 text-center">
          <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-white drop-shadow">
            Flex · Run Boy Run
          </h1>
          <p className="mt-4 text-base sm:text-lg text-white/80">
            A colorful, fast-paced runner made for everyone. Sign in, play, and climb the leaderboard.
          </p>
        </div>
      </div>
    </section>
  )
}
