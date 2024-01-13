import Navbar from "./Navbar";
import Footer from "./Footer";
import { ThemeProvider } from "next-themes";
import Link from "next/link";

export default function Layout({ children }) {
  return (
    <div className="bg-defaultBg dark:bg-darkmodeBg">
      <div className="text-center bg-red-400 p-4 text-lg">
        This web application is outdated and will be completely overhauled and
        updated in the future. <Link href={"/outdated"} className="font-bold underline underline-offset-2">Learn More</Link>
      </div>
      <Navbar />
      <main>{children}</main>
      <Footer />
    </div>
  );
}
