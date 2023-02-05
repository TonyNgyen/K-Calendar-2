import Navbar from "./Navbar"
import Footer from "./Footer"
import { ThemeProvider } from 'next-themes'

export default function Layout({children}) {
  return (
    <ThemeProvider attribute="class">
        <div className="bg-defaultBg dark:bg-black">
          <Navbar />
          <main>{children}</main>
          <Footer />
        </div>
    </ThemeProvider>
  )
}