import { profile } from '../data/profile'
import { ArrowUpRight, GitHub, LinkedIn, Mail } from './Icons'
import Section from './Section'

export default function Contact() {
  const links = [
    {
      label: 'Email',
      value: profile.email,
      href: `mailto:${profile.email}`,
      icon: Mail,
      external: false,
    },
    {
      label: 'LinkedIn',
      value: profile.linkedin.replace(/^https?:\/\/(www\.)?/, ''),
      href: profile.linkedin,
      icon: LinkedIn,
      external: true,
    },
    {
      label: 'GitHub',
      value: profile.github.replace(/^https?:\/\/(www\.)?/, ''),
      href: profile.github,
      icon: GitHub,
      external: true,
    },
  ]

  return (
    <Section id="contact" title="Contact">
      <p className="display max-w-[22ch] text-3xl font-semibold leading-tight text-fg md:text-[2.75rem]">
        Open to research internships and core engineering roles.
      </p>
      <p className="mt-5 max-w-[56ch] leading-relaxed text-muted">
        If you’re working on VLSI, semiconductor, wireless or applied ML problems and think I could
        help, email is the best way to reach me.
      </p>

      <ul className="mt-12 divide-y divide-line-soft border-y border-line-soft">
        {links.map(({ label, value, href, icon: Icon, external }) => (
          <li key={label}>
            <a
              href={href}
              {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
              className="group flex items-center gap-4 py-5 transition-colors"
            >
              <Icon className="shrink-0 text-faint transition-colors group-hover:text-copper" />
              <span className="w-24 shrink-0 text-sm text-faint">{label}</span>
              <span className="min-w-0 truncate text-fg transition-colors group-hover:text-copper-bright">
                {value}
              </span>
              <ArrowUpRight className="ml-auto shrink-0 text-faint transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-copper" />
              {external && <span className="sr-only">(opens in a new tab)</span>}
            </a>
          </li>
        ))}
      </ul>
    </Section>
  )
}
