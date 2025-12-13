// import { useState } from "react"

// function NavLink({ href, children, onClick }) {
//   return (
//     <a
//       href={href}
//       onClick={onClick}
//       className="relative group"
//     >
//       {children}
//       <span
//         className="absolute left-0 -bottom-1 w-0 h-[2px] bg-current
//                    transition-all duration-300 group-hover:w-full"
//       />
//     </a>
//   )
// }

// export default function Navbar({ theme, toggleTheme, sun, moon }) {
//   const [open, setOpen] = useState(false)

//   return (
//     <nav
//       className="
//         fixed top-0 left-0 w-full z-30
//         backdrop-blur-xl bg-white/40 dark:bg-stone-900/40
//         border-b border-white/20 dark:border-stone-700/30
//       "
//     >
//       <div
//         className="
//           max-w-5xl mx-auto w-11/12 h-16
//           flex items-center justify-between
//         "
//       >
//         <span
//           className="
//             font-semibold tracking-wide text-lg
//             text-stone-800 dark:text-stone-200
//           "
//         >
//           Achraf Mez
//         </span>

//         <div
//           className="
//             hidden md:flex gap-8
//             text-stone-700 dark:text-stone-300 font-medium
//           "
//         >
//           <NavLink href="#about">About</NavLink>
//           <NavLink href="#Journey">Journey</NavLink>
//           <NavLink href="#contact">Contact</NavLink>
//         </div>

//         <div className="flex items-center gap-3">
//           <button
//             onClick={toggleTheme}
//             className="
//               p-2 rounded-md
//               bg-stone-900 dark:bg-yellow-300
//               text-white dark:text-black
//             "
//           >
//             {theme === "dark" ? sun : moon}
//           </button>

//           <button
//             onClick={() => setOpen(!open)}
//             className="
//               md:hidden p-2 rounded-md
//               text-stone-800 dark:text-stone-200
//             "
//             aria-label="Toggle menu"
//           >
//             ☰
//           </button>
//         </div>
//       </div>

//       {open && (
//         <div
//           className="
//             md:hidden border-t
//             border-white/20 dark:border-stone-700/30
//             bg-white/70 dark:bg-stone-900/70
//             backdrop-blur-xl
//           "
//         >
//           <div
//             className="
//               flex flex-col items-center gap-6 py-6
//               text-stone-700 dark:text-stone-300 font-medium
//             "
//           >
//             <NavLink href="#about" onClick={() => setOpen(false)}>
//               About
//             </NavLink>
//             <NavLink href="#Journey" onClick={() => setOpen(false)}>
//               Journey
//             </NavLink>
//             <NavLink href="#contact" onClick={() => setOpen(false)}>
//               Contact
//             </NavLink>
//           </div>
//         </div>
//       )}
//     </nav>
//   )
// }
