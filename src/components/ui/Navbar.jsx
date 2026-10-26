import ThemeController from "./ThemeController"

const title = "Music App"
const links = [
  {
    name: "Home",
    href: "/",
  },
  {
    name: "Contact",
    href: "/contact",
  },
  {
    name: "About",
    href: "/about",
  },
]


export default function Navbar() {
  return (
    <div className="max-lg:collapse bg-base-200/80 shadow-sm lg:rounded-full  rounded-none z-10 fixed top-0 left-0 right-0 lg:top-10 lg:left-80 lg:right-80 lg:px-5">
      <input id="navbar-1-toggle" className="peer hidden" type="checkbox" />
      <label htmlFor="navbar-1-toggle" className="fixed inset-0 hidden max-lg:peer-checked:block"></label>
      <div className="collapse-title navbar">
        <div className="navbar-start">
          <label htmlFor="navbar-1-toggle" className="btn btn-ghost lg:hidden">
            <svg aria-label="Menu" xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
          </label>
          <button className="btn btn-ghost text-start lg:text-2xl font-bold bg-transparent ml-5 hover:text-secondary">{title}</button>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">
            {/* <li><button>Item 1</button></li> */}
            {links.map((link, index) => (
              <li key={index}>
                <a href={link.href}>{link.name}</a>
              </li>
            ))}
          </ul>
        </div>
        <div className="navbar-end lg:mr-5">
          <ThemeController />
        </div>
      </div>

      <div className="collapse-content lg:hidden z-1">
        <ul className="menu">
          {links.map((link, index) => (
            <li key={index}>
              <a href={link.href}>{link.name}</a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
