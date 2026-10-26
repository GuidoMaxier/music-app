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
    <div className="max-lg:collapse fixed top-0 left-0 right-0 z-50 bg-base-200/60 backdrop-blur-md shadow-lg rounded-none lg:w-full lg:max-w-3xl lg:top-6 lg:left-1/2 lg:-translate-x-1/2 lg:rounded-full lg:px-6">
      <input id="navbar-1-toggle" className="peer hidden" type="checkbox" />
      <label htmlFor="navbar-1-toggle" className="fixed inset-0 hidden max-lg:peer-checked:block"></label>
      <div className="collapse-title navbar">
        <div className="navbar-start gap-2">
          <label htmlFor="navbar-1-toggle" className="btn btn-ghost lg:hidden">
            <svg aria-label="Menu" xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
          </label>
          <Link to="/" className="btn btn-ghost text-start lg:text-xl font-bold bg-transparent hover:text-primary">
            {title}
          </Link>
        </div>

        <div className="navbar-center hidden lg:flex items-center">
          <ul className="menu menu-horizontal px-1 gap-2 text-sm font-semibold">
            {links.map((link, index) => (
              <li key={index}>
                <Link to={link.href} className="hover:text-primary rounded-full px-4 transition-colors">
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="navbar-end lg:mr-8">
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
