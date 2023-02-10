import Navbar from "./Navbar"
import Footer from "./Footer"
import { ThemeProvider } from 'next-themes'

export default function Layout({children}) {
  return (
    <div className="bg-defaultBg dark:bg-darkmodeBg">
       <Navbar />
       <main>{children}</main>
       <Footer />
     </div>
  )
}