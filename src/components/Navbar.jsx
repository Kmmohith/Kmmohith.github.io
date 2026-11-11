import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { nav, profile } from '../data/profile'
import useActiveSection from '../hooks/useActiveSection'
import { Close, Menu } from './Icons'

const ids = nav.map((n) => n.id)

export default function Navbar() {
  const active = useActiveSection(ids)
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    if (!open) return
    const onKey = (e) => e.key === 'Escape' && setOpen(false)
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
        scrolled || open
          ? 'border-b border-line-soft bg-ink/85 backdrop-blur-md'
          : 'border-b border-transparent'
      }`}
    >
      <nav
        aria-label="Primary"
        className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6 md:px-10"
      >
        <a href="#top" className="display text-[15px] font-semibold text-fg">
          {profile.name}
        </a>

        <ul className="hidden items-center gap-1 lg:flex">
          {nav.map((item) => (
            <li key={item.id}>
              <a
                href={`#${item.id}`}
                aria-current={active === item.id ? 'true' : undefined}
                className={`relative rounded px-3 py-2 text-sm transition-colors ${
                  active === item.id ? 'text-fg' : 'text-muted hover:text-fg'
                }`}
              >
                {item.label}
                <span
                  aria-hidden="true"
                  className={`absolute inset-x-3 -bottom-px h-px bg-copper transition-opacity duration-300 ${
                    active === item.id ? 'opacity-100' : 'opacity-0'
                  }`}
                />
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          <a
            href={profile.resumeUrl}
            download={profile.resumeFileName}
            className="hidden rounded-md border border-line px-3.5 py-1.5 text-sm text-fg transition-colors hover:border-copper sm:inline-block"
          >
            Resume
          </a>
          <button
            type="button"
            onClick={() => setOpen((o) => !o)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? 'Close menu' : 'Open menu'}
            className="-mr-2 rounded-md p-2 text-muted hover:text-fg lg:hidden"
          >
            {open ? <Close /> : <Menu />}
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            key="mobile-menu"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            className="border-t border-line-soft lg:hidden"
          >
            <ul className="mx-auto max-w-6xl px-6 py-4 md:px-10">
              {nav.map((item) => (
                <li key={item.id}>
                  <a
                    href={`#${item.id}`}
                    onClick={() => setOpen(false)}
                    className={`block py-2.5 text-base ${
                      active === item.id ? 'text-fg' : 'text-muted'
                    }`}
                  >
                    {item.label}
                  </a>
                </li>
              ))}
              <li className="mt-2 border-t border-line-soft pt-4 sm:hidden">
                <a href={profile.resumeUrl} download={profile.resumeFileName} className="block py-2 text-copper">
                  Download resume
                </a>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
