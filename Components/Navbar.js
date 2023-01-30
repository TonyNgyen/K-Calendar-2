import {BsFillMoonStarsFill} from "react-icons/bs"
import {MdAccountCircle} from "react-icons/md"
import { useState } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import {AiFillCalendar} from "react-icons/ai"

export default function Navbar(props) {
  const [darkMode, setDarkMode] = useState(false);
  return (
    <div className={darkMode ? "dark" : ""}>
      <nav className="flex justify-between p-6 bg-white font-poppins md:p-10">
        <motion.ul className="flex items-center text-xl md:text-2xl"
          initial = {{
            x: -500,
            opacity: 0,
            scale: 0.5
          }}
          animate = {{
            x: 0,
            opacity: 1,
            scale: 1,
          }}
          transition = {{
            duration: 1.5,
          }}
        >
          <Link href="/" className="mr-6 md:mr-10 text-2xl font-poppins font-medium hidden md:block group transition duration-300 md:text-4xl text-lightmodeRed">
            K-Calendar
            <span className="block max-w-0 group-hover:max-w-full transition-all duration-500 h-0.5 bg-lightmodeRed"></span>
          </Link>
          <Link href="/" className="font-poppins font-medium text-3xl md:hidden flex justify-between text-lightmodeRed">
            K-<AiFillCalendar href="/" className="mr-6 text-3xl font-poppins font-medium" />
          </Link>
          <Link href="/" className={"mr-6 group transition duration-300" + (props.page ==='Home' ? ' text-green-300': '')}>
            Home
            <span className="block max-w-0 group-hover:max-w-full transition-all duration-500 h-0.5 bg-lightmodeRed"></span>
          </Link>
          <Link 
            href={{
              pathname: "/releases",
            }} 
            className="mr-6 group transition duration-300"
          >
            Releases
            <span className="block max-w-0 group-hover:max-w-full transition-all duration-500 h-0.5 bg-lightmodeRed"></span>
          </Link>
          <Link
            href={{
                pathname: "/artists",
              }} 
              className="mr-6 group transition duration-300"
          >
            Artists
            <span className="block max-w-0 group-hover:max-w-full transition-all duration-500 h-0.5 bg-lightmodeRed"></span>
          </Link>
        </motion.ul>
        <motion.ul className="flex justify-evenly items-center"
          initial = {{
            x: 150,
            opacity: 0,
            scale: 0.5
          }}
          animate = {{
            x: 0,
            opacity: 1,
            scale: 1,
          }}
          transition = {{
            duration: 1.5,
          }}
        >
          <li>
            <BsFillMoonStarsFill onClick={() => setDarkMode(!darkMode)} className="cursor-pointer text-2xl dark:text-white"/>
          </li>
          <li className=" ml-6">
            <MdAccountCircle onClick={() => setDarkMode(!darkMode)} className="cursor-pointer text-3xl dark:text-white"/>
          </li>
        </motion.ul>
      </nav>
    </div>
  )
}