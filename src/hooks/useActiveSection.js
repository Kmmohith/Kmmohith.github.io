import { useEffect, useState } from 'react'

// Returns the id of the section currently nearest the top of the viewport.
export default function useActiveSection(ids) {
  const [active, setActive] = useState(null)

  useEffect(() => {
    if (typeof IntersectionObserver === 'undefined') return
    const visible = new Map()
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) visible.set(e.target.id, e.boundingClientRect.top)
          else visible.delete(e.target.id)
        })
        if (visible.size === 0) return
        const first = ids.find((id) => visible.has(id))
        setActive(first ?? null)
      },
      { rootMargin: '-35% 0px -55% 0px', threshold: 0 },
    )
    ids.forEach((id) => {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    })
    const onScroll = () => {
      if (window.scrollY < 200) setActive(null)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      observer.disconnect()
      window.removeEventListener('scroll', onScroll)
    }
  }, [ids])

  return active
}
