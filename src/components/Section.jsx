// Datasheet-style section: title in a left column on wide screens, content on the right.
export default function Section({ id, title, children, className = '' }) {
  const headingId = `${id}-heading`
  return (
    <section
      id={id}
      aria-labelledby={headingId}
      className={`border-t border-line-soft py-16 md:py-24 ${className}`}
    >
      <div className="mx-auto grid max-w-6xl gap-10 px-6 md:grid-cols-[13rem_1fr] md:gap-16 md:px-10">
        <h2
          id={headingId}
          className="display text-xl font-semibold text-fg md:sticky md:top-28 md:self-start md:text-[1.375rem]"
        >
          {title}
        </h2>
        <div className="min-w-0">{children}</div>
      </div>
    </section>
  )
}

export function Tag({ children }) {
  return (
    <li className="rounded-full border border-line px-3 py-1 text-[13px] leading-5 text-muted">
      {children}
    </li>
  )
}
