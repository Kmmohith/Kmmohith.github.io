import { motion, useReducedMotion } from 'framer-motion'

// A small logic-analyzer style trace. It is decorative: the same information
// (interests) is in the About section as text, so it is hidden from screen readers.

const W = 720
const LABEL_W = 112
const X0 = LABEL_W + 8
const X1 = W - 16
const ROW_H = 40

const rows = [
  { name: 'clk', kind: 'clock' },
  { name: 'rst_n', kind: 'reset' },
  {
    name: 'focus[15:0]',
    kind: 'bus',
    values: ['VLSI', 'RTL', 'ASIC', '5G NR', 'OFDM', 'ML'],
  },
  { name: 'valid', kind: 'strobe' },
]

const H = rows.length * ROW_H + 24

function clockPath(y) {
  const hi = y - 9
  const lo = y + 9
  const half = 16
  let level = lo
  let x = X0
  let d = `M ${x} ${level}`
  while (x + half <= X1) {
    x += half
    d += ` L ${x} ${level}`
    if (x + half <= X1) {
      level = level === lo ? hi : lo
      d += ` L ${x} ${level}`
    }
  }
  return d
}

function resetPath(y) {
  const at = X0 + 64
  return `M ${X0} ${y + 9} L ${at} ${y + 9} L ${at} ${y - 9} L ${X1} ${y - 9}`
}

function busSegments(values) {
  const start = X0 + 64
  const idle = { x0: X0, x1: start, label: null }
  const span = (X1 - start) / values.length
  return [
    idle,
    ...values.map((v, i) => ({
      x0: start + i * span,
      x1: start + (i + 1) * span,
      label: v,
    })),
  ]
}

function strobePath(y, segments) {
  let d = `M ${X0} ${y + 9}`
  segments.slice(1).forEach((s) => {
    const a = s.x0 + 6
    const b = s.x0 + 22
    d += ` L ${a} ${y + 9} L ${a} ${y - 9} L ${b} ${y - 9} L ${b} ${y + 9}`
  })
  d += ` L ${X1} ${y + 9}`
  return d
}

function busShape(s, y) {
  const k = 5
  const t = y - 9
  const b = y + 9
  return `M ${s.x0} ${y} L ${s.x0 + k} ${t} L ${s.x1 - k} ${t} L ${s.x1} ${y} L ${s.x1 - k} ${b} L ${s.x0 + k} ${b} Z`
}

export default function Waveform() {
  const reduce = useReducedMotion()
  const bus = rows.find((r) => r.kind === 'bus')
  const segments = busSegments(bus.values)

  return (
    <figure
      aria-hidden="true"
      className="relative overflow-hidden rounded-lg border border-line bg-raised/60"
    >
      <div className="flex items-center justify-between border-b border-line-soft px-4 py-2.5 font-mono text-[11px] text-faint">
        <span>mohith.vcd</span>
        <span className="hidden sm:inline">timescale 1ns / 1ps</span>
      </div>

      <motion.div
        initial={reduce ? false : { clipPath: 'inset(0 100% 0 0)' }}
        animate={{ clipPath: 'inset(0 0% 0 0)' }}
        transition={{ duration: 1.8, delay: 0.5, ease: [0.45, 0, 0.2, 1] }}
      >
        <div className="overflow-x-auto sm:overflow-visible">
        <svg
          viewBox={`0 0 ${W} ${H}`}
          className="block h-auto w-full min-w-[34rem] sm:min-w-0"
          preserveAspectRatio="xMinYMid meet"
          role="presentation"
        >
          {/* time grid */}
          {Array.from({ length: Math.floor((X1 - X0) / 64) + 1 }).map((_, i) => (
            <line
              key={i}
              x1={X0 + i * 64}
              x2={X0 + i * 64}
              y1={8}
              y2={H - 8}
              stroke="var(--color-line-soft)"
              strokeWidth="1"
            />
          ))}

          {rows.map((row, i) => {
            const y = 12 + i * ROW_H + ROW_H / 2
            return (
              <g key={row.name}>
                <text
                  x={16}
                  y={y + 4}
                  fill="var(--color-faint)"
                  fontFamily="var(--font-mono)"
                  fontSize="12"
                >
                  {row.name}
                </text>

                {row.kind === 'clock' && (
                  <path d={clockPath(y)} fill="none" stroke="var(--color-signal)" strokeOpacity="0.55" strokeWidth="1.25" />
                )}
                {row.kind === 'reset' && (
                  <path d={resetPath(y)} fill="none" stroke="var(--color-muted)" strokeWidth="1.25" />
                )}
                {row.kind === 'strobe' && (
                  <path d={strobePath(y, segments)} fill="none" stroke="var(--color-muted)" strokeWidth="1.25" />
                )}
                {row.kind === 'bus' &&
                  segments.map((s, j) => (
                    <g key={j}>
                      <path
                        d={busShape(s, y)}
                        fill={s.label ? 'color-mix(in srgb, var(--color-copper) 9%, transparent)' : 'none'}
                        stroke={s.label ? 'var(--color-copper)' : 'var(--color-faint)'}
                        strokeWidth="1.25"
                      />
                      {s.label && (
                        <text
                          x={(s.x0 + s.x1) / 2}
                          y={y + 4}
                          textAnchor="middle"
                          fill="var(--color-copper-bright)"
                          fontFamily="var(--font-mono)"
                          fontSize="12"
                        >
                          {s.label}
                        </text>
                      )}
                    </g>
                  ))}
              </g>
            )
          })}
        </svg>
        </div>
      </motion.div>
    </figure>
  )
}
