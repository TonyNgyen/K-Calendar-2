import Navbar from "./Navbar"
import Footer from "./Footer"

export default function Layout({children}) {
  return (
    <div>
      <Navbar />
      <main>{children}</main>
      <Footer />
    </div>
  )
}