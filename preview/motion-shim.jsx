// Preview-only stand-in for the small part of the framer-motion API this site uses
// (motion.*, AnimatePresence, MotionConfig, useReducedMotion), implemented with the
// Web Animations API. The real project uses framer-motion; this exists only so the
// hosted preview can be built offline.
import {
  createContext,
  createElement,
  forwardRef,
  useContext,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from 'react'

const ConfigCtx = createContext({ reducedMotion: 'never' })
const PresenceCtx = createContext(null)

const prefersReduced = () =>
  typeof window !== 'undefined' &&
  window.matchMedia?.('(prefers-reduced-motion: reduce)').matches

export function useReducedMotion() {
  const [r, setR] = useState(prefersReduced)
  useEffect(() => {
    const mq = window.matchMedia?.('(prefers-reduced-motion: reduce)')
    if (!mq) return
    const on = () => setR(mq.matches)
    mq.addEventListener?.('change', on)
    return () => mq.removeEventListener?.('change', on)
  }, [])
  return r
}

export function MotionConfig({ reducedMotion = 'never', children }) {
  return createElement(ConfigCtx.Provider, { value: { reducedMotion } }, children)
}

function toFrame(v = {}) {
  const f = {}
  const t = []
  if (v.x != null) t.push(`translateX(${v.x}px)`)
  if (v.y != null) t.push(`translateY(${v.y}px)`)
  if (v.scale != null) t.push(`scale(${v.scale})`)
  if (t.length) f.transform = t.join(' ')
  if (v.opacity != null) f.opacity = v.opacity
  if (v.clipPath != null) f.clipPath = v.clipPath
  return f
}

function easing(e) {
  if (Array.isArray(e)) return `cubic-bezier(${e.join(',')})`
  return { easeOut: 'ease-out', easeIn: 'ease-in', easeInOut: 'ease-in-out', linear: 'linear' }[e] || 'ease'
}

function fillNeutral(from, to) {
  // Make sure both keyframes share the same properties.
  const a = { ...from }
  const b = { ...to }
  for (const k of Object.keys(a)) if (!(k in b)) b[k] = k === 'opacity' ? 1 : k === 'transform' ? 'none' : 'inset(0 0 0 0)'
  for (const k of Object.keys(b)) if (!(k in a)) a[k] = k === 'opacity' ? 1 : k === 'transform' ? 'none' : 'inset(0 0 0 0)'
  return [a, b]
}

const STRIP = ['initial', 'animate', 'exit', 'transition', 'whileInView', 'viewport', 'layout', 'layoutId']

function makeMotion(tag) {
  const C = forwardRef(function Motion(props, outerRef) {
    const { initial, animate, exit, transition = {} } = props
    const ref = useRef(null)
    const cfg = useContext(ConfigCtx)
    const presence = useContext(PresenceCtx)
    const reduce = cfg.reducedMotion === 'always' || (cfg.reducedMotion === 'user' && prefersReduced())

    useLayoutEffect(() => {
      const el = ref.current
      if (!el || !el.animate || initial === false || !initial || !animate || reduce) return
      const [a, b] = fillNeutral(toFrame(initial), toFrame(animate))
      el.animate([a, b], {
        duration: (transition.duration ?? 0.3) * 1000,
        delay: (transition.delay ?? 0) * 1000,
        easing: easing(transition.ease),
        fill: 'both',
      })
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    useEffect(() => {
      if (!presence?.exiting) return
      const el = ref.current
      if (!el || !exit || reduce || !el.animate) {
        presence.done()
        return
      }
      const [a, b] = fillNeutral(toFrame(animate), toFrame(exit))
      const anim = el.animate([a, b], {
        duration: (transition.duration ?? 0.2) * 1000,
        easing: easing(transition.ease),
        fill: 'forwards',
      })
      anim.onfinish = () => presence.done()
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [presence?.exiting])

    const rest = { ...props }
    STRIP.forEach((k) => delete rest[k])
    rest.ref = (node) => {
      ref.current = node
      if (typeof outerRef === 'function') outerRef(node)
      else if (outerRef) outerRef.current = node
    }
    return createElement(tag, rest)
  })
  C.displayName = `motion.${tag}`
  return C
}

const cache = {}
export const motion = new Proxy(
  {},
  { get: (_, tag) => (cache[tag] ||= makeMotion(tag)) },
)

export function AnimatePresence({ children }) {
  const [kept, setKept] = useState(children || null)
  const [exiting, setExiting] = useState(false)

  useEffect(() => {
    if (children) {
      setKept(children)
      setExiting(false)
    } else if (kept) {
      setExiting(true)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [children])

  const shown = children || kept
  if (!shown) return null
  const value = {
    exiting: !children && exiting,
    done: () => {
      setKept(null)
      setExiting(false)
    },
  }
  return createElement(PresenceCtx.Provider, { value }, shown)
}
