import { motion, useReducedMotion } from 'framer-motion'
import { profile } from '../data/profile'
import { Download } from './Icons'
import Waveform from './Waveform'

export default function Hero() {
  const reduce = useReducedMotion()
  const rise = (delay) =>
    reduce
      ? {}
      : {
          initial: { opacity: 0, y: 12 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.7, delay, ease: [0.2, 0.7, 0.2, 1] },
        }

  return (
    <section id="top" aria-label="Introduction" className="relative overflow-hidden">
      {/* faint blueprint grid + copper glow */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div
          className="absolute inset-0 opacity-[0.35]"
          style={{
            backgroundImage:
              'linear-gradient(var(--color-line-soft) 1px, transparent 1px), linear-gradient(90deg, var(--color-line-soft) 1px, transparent 1px)',
            backgroundSize: '64px 64px',
            maskImage: 'radial-gradient(ellipse 80% 60% at 30% 20%, #000 30%, transparent 75%)',
            WebkitMaskImage:
              'radial-gradient(ellipse 80% 60% at 30% 20%, #000 30%, transparent 75%)',
          }}
        />
        <div
          className="absolute -left-40 -top-40 h-[36rem] w-[36rem] rounded-full opacity-[0.10] blur-3xl"
          style={{ background: 'radial-gradient(circle, var(--color-copper), transparent 65%)' }}
        />
      </div>

      <div className="relative mx-auto max-w-6xl px-6 pb-20 pt-32 md:px-10 md:pb-28 md:pt-44">
        <motion.h1
          {...rise(0.05)}
          className="display text-[3.25rem] font-semibold leading-[0.95] text-fg sm:text-7xl md:text-[6.5rem]"
        >
          {profile.name}
        </motion.h1>

        <motion.p
          {...rise(0.16)}
          className="mt-8 max-w-2xl text-xl leading-snug text-fg/90 md:text-2xl"
        >
          {profile.headline}
        </motion.p>

        <motion.p {...rise(0.24)} className="mt-5 max-w-[62ch] text-base leading-relaxed text-muted md:text-[17px]">
          {profile.intro}
        </motion.p>

        <motion.div {...rise(0.32)} className="mt-10 flex flex-wrap items-center gap-3">
          <a
            href={profile.resumeUrl}
            download={profile.resumeFileName}
            className="inline-flex items-center gap-2 rounded-md bg-copper px-5 py-2.5 text-[15px] font-medium text-ink transition-colors hover:bg-copper-bright"
          >
            <Download />
            Download resume
          </a>
          <a
            href="#contact"
            className="inline-flex items-center rounded-md border border-line px-5 py-2.5 text-[15px] text-fg transition-colors hover:border-muted"
          >
            Get in touch
          </a>
        </motion.div>

        <motion.div {...rise(0.4)} className="mt-16 md:mt-24">
          <Waveform />
        </motion.div>
      </div>
    </section>
  )
}
