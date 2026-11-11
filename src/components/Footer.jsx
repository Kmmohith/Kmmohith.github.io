import { profile } from '../data/profile'

export default function Footer() {
  return (
    <footer className="border-t border-line-soft">
      <div className="mx-auto flex max-w-6xl flex-col gap-2 px-6 py-10 text-sm text-faint sm:flex-row sm:items-center sm:justify-between md:px-10">
        <p>
          © {new Date().getFullYear()} {profile.name}
        </p>
        <a href="#top" className="w-fit hover:text-fg">
          Back to top
        </a>
      </div>
    </footer>
  )
}
