import { Link } from "react-router-dom"
import ThemeController from "./ThemeController"

const title = "Music App"
const links = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
  { name: "Contact", href: "/contact" },
]

export default function Navbar() {
  return (
    <div className="max-lg:collapse fixed top-0 left-0 right-0 z-50 bg-base-200/70 backdrop-blur-md shadow-xl rounded-none lg:w-full lg:max-w-xl lg:top-5 lg:left-1/2 lg:-translate-x-1/2 lg:rounded-full lg:px-4 lg:py-1 border border-white/10 transition-all">
      <input id="navbar-1-toggle" className="peer hidden" type="checkbox" />
      <label htmlFor="navbar-1-toggle" className="fixed inset-0 hidden max-lg:peer-checked:block"></label>
      <div className="collapse-title navbar min-h-11 px-2 py-0">
        <div className="navbar-start gap-1">
          <label htmlFor="navbar-1-toggle" className="btn btn-ghost btn-xs btn-circle lg:hidden">
            <svg aria-label="Menu" xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
          </label>
          <Link to="/" className="btn btn-ghost btn-sm text-start font-extrabold tracking-tight text-sm bg-transparent hover:text-primary px-2">
            {title}
          </Link>
        </div>

        <div className="navbar-center hidden lg:flex items-center">
          <ul className="menu menu-horizontal px-1 gap-1 text-xs font-semibold">
            {links.map((link, index) => (
              <li key={index}>
                <Link to={link.href} className="hover:text-primary hover:bg-white/5 rounded-full px-3 py-1 transition-colors">
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="navbar-end gap-1">
          <ThemeController />
        </div>
      </div>

      <div className="collapse-content lg:hidden z-1 pb-4">
        <ul className="menu">
          {links.map((link, index) => (
            <li key={index}>
              <Link to={link.href}>{link.name}</Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
