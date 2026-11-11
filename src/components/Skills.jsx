import { skills } from '../data/profile'
import Section from './Section'

export default function Skills() {
  return (
    <Section id="skills" title="Technical skills">
      <dl className="divide-y divide-line-soft border-y border-line-soft">
        {skills.map((s) => (
          <div key={s.group} className="grid gap-3 py-6 sm:grid-cols-[11rem_1fr] sm:gap-8">
            <dt className="text-sm font-medium text-fg sm:pt-0.5">{s.group}</dt>
            <dd className="text-[15px] leading-relaxed text-muted">
              <ul className="flex flex-wrap gap-x-6 gap-y-2">
                {s.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </dd>
          </div>
        ))}
      </dl>
    </Section>
  )
}
