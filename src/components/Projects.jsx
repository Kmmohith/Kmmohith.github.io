import { otherProjects, projects } from '../data/profile'
import { ArrowUpRight, GitHub } from './Icons'
import Section, { Tag } from './Section'

export default function Projects() {
  return (
    <Section id="projects" title="Projects">
      <ul className="divide-y divide-line-soft border-y border-line-soft">
        {projects.map((p) => (
          <li key={p.title} className="py-10 md:py-12">
            <article className="max-w-[66ch]">
              <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                <h3 className="display text-xl font-semibold leading-snug text-fg md:text-[1.5rem]">
                  {p.title}
                </h3>
                {p.note && <span className="text-sm text-faint">{p.note}</span>}
              </div>

              <p className="mt-4 leading-relaxed text-muted">{p.summary}</p>

              <ul className="mt-5 space-y-2">
                {p.points.map((pt) => (
                  <li key={pt} className="flex gap-3 text-[15px] leading-relaxed text-fg/85">
                    <span aria-hidden="true" className="mt-[0.75em] h-px w-3 shrink-0 bg-copper" />
                    {pt}
                  </li>
                ))}
              </ul>

              <ul className="mt-6 flex flex-wrap gap-2" aria-label="Technologies">
                {p.tags.map((t) => (
                  <Tag key={t}>{t}</Tag>
                ))}
              </ul>

              {(p.github || p.demo) && (
              <div className="mt-6 flex flex-wrap gap-5 text-sm">
                {p.github && (
                  <a
                    href={p.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-fg transition-colors hover:text-copper"
                  >
                    <GitHub />
                    Source code
                    <span className="sr-only"> for {p.title} (opens in a new tab)</span>
                  </a>
                )}
                {p.demo && (
                  <a
                    href={p.demo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-fg transition-colors hover:text-copper"
                  >
                    Live demo
                    <ArrowUpRight />
                    <span className="sr-only"> for {p.title} (opens in a new tab)</span>
                  </a>
                )}
              </div>
              )}
            </article>
          </li>
        ))}
      </ul>

      <h3 className="mt-14 text-sm font-medium text-fg">Other projects</h3>
      <ul className="mt-4 divide-y divide-line-soft border-y border-line-soft">
        {otherProjects.map((p) => (
          <li key={p.title} className="grid gap-2 py-6 md:grid-cols-[16rem_1fr] md:gap-8">
            <p className="font-medium leading-snug text-fg">{p.title}</p>
            <div>
              <p className="max-w-[64ch] text-[15px] leading-relaxed text-muted">{p.summary}</p>
              <p className="mt-2 text-sm text-faint">{p.tags.join(', ')}</p>
            </div>
          </li>
        ))}
      </ul>
    </Section>
  )
}
