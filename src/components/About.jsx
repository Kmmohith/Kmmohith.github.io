import { about } from '../data/profile'
import Section from './Section'

export default function About() {
  return (
    <Section id="about" title="About">
      <div className="grid gap-12 lg:grid-cols-[1fr_15rem]">
        <div className="max-w-[64ch] space-y-5 text-[17px] leading-[1.7] text-muted">
          {about.paragraphs.map((p, i) => (
            <p key={i} className={i === 0 ? 'text-fg/90' : undefined}>
              {p}
            </p>
          ))}
        </div>
        <div>
          <h3 className="text-sm font-medium text-fg">Areas of interest</h3>
          <ul className="mt-4 space-y-2.5 text-[15px] text-muted">
            {about.interests.map((item) => (
              <li key={item} className="flex gap-3">
                <span aria-hidden="true" className="mt-[0.6em] h-px w-3 shrink-0 bg-copper" />
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Section>
  )
}
