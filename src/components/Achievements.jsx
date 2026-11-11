import { achievements, activities } from '../data/profile'
import Section from './Section'

function List({ items }) {
  return (
    <ul className="divide-y divide-line-soft border-y border-line-soft">
      {items.map((a) => (
        <li key={a.title} className="flex gap-4 py-6">
          <span aria-hidden="true" className="mt-[0.7em] h-px w-4 shrink-0 bg-copper" />
          <div>
            <p className="font-medium text-fg">{a.title}</p>
            <p className="mt-1 max-w-[64ch] text-[15px] leading-relaxed text-muted">{a.detail}</p>
          </div>
        </li>
      ))}
    </ul>
  )
}

export default function Achievements() {
  return (
    <Section id="achievements" title="Achievements">
      <List items={achievements} />
      {activities.length > 0 && (
        <>
          <h3 className="mt-14 text-sm font-medium text-fg">Leadership & activities</h3>
          <div className="mt-4">
            <List items={activities} />
          </div>
        </>
      )}
    </Section>
  )
}
