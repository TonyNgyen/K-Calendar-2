import {BsFillMoonStarsFill} from "react-icons/bs"
import {MdAccountCircle} from "react-icons/md"
import Link from "next/link"
import { motion } from "framer-motion"
import {AiFillCalendar} from "react-icons/ai"
import {AiFillHome} from "react-icons/ai"
import {ImMusic} from "react-icons/im"
import {HiUserGroup} from "react-icons/hi"
import {useTheme} from 'next-themes'
import {BsFillSunFill} from "react-icons/bs"
import { useState, useEffect } from "react"

export default function Navbar(props) {
  const {systemTheme, theme, setTheme} = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, [])

  const themeChanger = () => {
    if (!mounted) return null;

    const currentTheme = theme === "system" ? systemTheme : theme

    if (currentTheme === "dark") {
      return (
        <BsFillSunFill className="w-7 h-7" role="button" onClick={() => setTheme("light")} />
      )
    } else {
      return (
        <BsFillMoonStarsFill className="w-7 h-7" role="button" onClick={() => setTheme("dark")} />
      )
    }
  }
  
  return (
      <nav className="flex justify-between p-6 bg-defaultBg font-poppins md:p-10 dark:bg-darkmodeBg">
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
          <Link href="/" className="mr-6 md:mr-10 text-2xl font-poppins font-medium hidden md:block group transition duration-300 md:text-4xl text-lightmodeRed dark:text-darkmodeRed">
            K-Calendar
            <span className="block max-w-0 group-hover:max-w-full transition-all duration-500 h-0.5 dark:bg-darkmodeRed bg-lightmodeRed"></span>
          </Link>
          <Link href="/" className="font-poppins font-medium text-3xl md:hidden flex justify-between text-lightmodeRed">
            K-<AiFillCalendar href="/" className="mr-8 text-3xl font-poppins font-medium" />
          </Link>
          <Link href="/" className={"mr-6 group transition duration-300" + (props.page ==='Home' ? ' text-green-300': '')}>
            <div className="hidden md:block">Home</div>
            <AiFillHome className="md:hidden text-black text-3xl mr-2"></AiFillHome>
            <span className="block max-w-0 group-hover:max-w-full transition-all duration-500 h-0.5  dark:bg-darkmodeRed bg-lightmodeRed"></span>
          </Link>
          <Link 
            href={{
              pathname: "/releases",
            }} 
            className="mr-6 group transition duration-300"
          >
            <div className="hidden md:block">Releases</div>
            <ImMusic className="md:hidden text-black text-2xl mr-2"></ImMusic>
            <span className="block max-w-0 group-hover:max-w-full transition-all duration-500 h-0.5  dark:bg-darkmodeRed bg-lightmodeRed"></span>
          </Link>
          <Link
            href={{
                pathname: "/artists",
              }} 
              className="mr-6 group transition duration-300"
          >
            <div className="hidden md:block">Artists</div>
            <HiUserGroup className="md:hidden text-black text-3xl"></HiUserGroup>
            <span className="block max-w-0 group-hover:max-w-full transition-all duration-500 h-0.5  dark:bg-darkmodeRed bg-lightmodeRed"></span>
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
            {themeChanger()}
          </li>
          <li className=" ml-6">
            <MdAccountCircle onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')} className="cursor-pointer text-3xl dark:text-white"/>
          </li>
        </motion.ul>
      </nav>
  )
}