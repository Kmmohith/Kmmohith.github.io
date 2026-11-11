import { experience } from '../data/profile'
import Section, { Tag } from './Section'

export default function Experience() {
  return (
    <Section id="experience" title="Experience">
      <ol className="divide-y divide-line-soft border-y border-line-soft">
        {experience.map((job) => (
          <li key={job.org} className="grid gap-4 py-10 md:grid-cols-[14rem_1fr] md:gap-10">
            <div>
              <h3 className="display text-lg font-semibold text-fg">{job.org}</h3>
              <p className="mt-1 text-sm leading-snug text-faint">{job.orgDetail}</p>
              <p className="mt-3 text-sm text-muted">{job.period}</p>
            </div>
            <div className="max-w-[64ch]">
              <p className="font-medium text-fg">{job.role}</p>
              <p className="mt-3 leading-relaxed text-muted">{job.summary}</p>
              {job.points?.length > 0 && (
                <ul className="mt-4 space-y-2">
                  {job.points.map((pt) => (
                    <li key={pt} className="flex gap-3 text-[15px] leading-relaxed text-fg/85">
                      <span aria-hidden="true" className="mt-[0.75em] h-px w-3 shrink-0 bg-faint" />
                      {pt}
                    </li>
                  ))}
                </ul>
              )}
              {job.highlights.length > 0 && (
                <ul className="mt-4 space-y-1.5">
                  {job.highlights.map((h) => (
                    <li key={h} className="flex gap-3 text-[15px] text-copper-bright">
                      <span aria-hidden="true" className="mt-[0.6em] h-px w-3 shrink-0 bg-copper" />
                      {h}
                    </li>
                  ))}
                </ul>
              )}
              <ul className="mt-5 flex flex-wrap gap-2" aria-label="Technologies and areas">
                {job.areas.map((a) => (
                  <Tag key={a}>{a}</Tag>
                ))}
              </ul>
            </div>
          </li>
        ))}
      </ol>
    </Section>
  )
}
