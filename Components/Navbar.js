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
      <nav className="flex justify-between p-6 bg-lightmodeRed font-poppins">
        <motion.ul className="flex items-center text-xl"
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
          <Link href="/" className="mr-6 text-2xl font-poppins font-medium hidden md:block">
            K-Calendar
          </Link>
          <Link href="/" className="font-poppins font-medium text-3xl md:hidden flex justify-between">
            K-<AiFillCalendar href="/" className="mr-6 text-3xl font-poppins font-medium" />
          </Link>
          <Link href="/" className={"mr-6" + (props.page ==='Home' ? ' text-green-300': '')}>
            Home
          </Link>
          <Link 
            href={{
              pathname: "/releases",
            }} 
            className="mr-6"
          >
            Releases
          </Link>
          <Link
            href={{
                pathname: "/artists",
              }} 
              className="mr-6"
          >
            Artists
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