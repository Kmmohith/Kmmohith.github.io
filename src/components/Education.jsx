import { education } from '../data/profile'
import Section from './Section'

export default function Education() {
  const e = education
  return (
    <Section id="education" title="Education">
      <div className="border-y border-line-soft">
        <div className="grid gap-10 py-10 md:grid-cols-[1fr_auto] md:items-end">
          <div>
            <h3 className="display text-lg font-semibold text-fg md:text-xl">{e.institution}</h3>
            <p className="mt-2 text-muted">{e.degree}</p>
            <p className="mt-1 text-sm text-faint">{e.period}</p>
          </div>
          <dl className="flex gap-10">
            <div>
              <dt className="text-sm text-faint">CGPA</dt>
              <dd className="display mt-1 text-4xl font-semibold text-fg">
                {e.cgpa}
                <span className="ml-1 text-lg font-normal text-faint">/ {e.cgpaScale}</span>
              </dd>
            </div>
            <div>
              <dt className="text-sm text-faint">Credits completed</dt>
              <dd className="display mt-1 text-4xl font-semibold text-fg">{e.credits}</dd>
            </div>
          </dl>
        </div>

        <div className="border-t border-line-soft py-6">
          <p className="text-sm text-faint">Relevant coursework</p>
          <p className="mt-2 max-w-[64ch] text-[15px] leading-relaxed text-muted">
            {e.coursework.join(', ')}
          </p>
        </div>

        <div className="flex flex-col gap-1 border-t border-line-soft py-6 sm:flex-row sm:items-baseline sm:justify-between">
          <div>
            <p className="font-medium text-fg">{e.school.name}</p>
            <p className="mt-1 text-[15px] text-muted">{e.school.detail}</p>
          </div>
          <p className="text-sm text-faint">{e.school.year}</p>
        </div>
      </div>
    </Section>
  )
}
