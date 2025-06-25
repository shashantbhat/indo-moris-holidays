import { Link } from "@remix-run/react";
import {MailStroke} from "~/components/icons/mail-stroke";

export default function Navbar() {
  return (
    <nav className="fixed top-0 left-0 w-full bg-white/70 backdrop-blur-md shadow-md z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-14 items-center">
          <div className="flex items-center">
            <img
                src="/assets/indo_moris_logo.png"
                alt="Indo Moris Logo"
                className="object-contain scale-[50%]"
            />
            <Link to="/" className="subheading-2">
              Indo Moris Holidays
            </Link>
          </div>
          <div className="hidden md:flex space-x-8 items-center body-sm">
            {/*<Link to="/destinations" className="text-lg font-medium hover:underline">*/}
            {/*  Destinations*/}
            {/*</Link>*/}
            {/*<Link to="/packages" className="text-lg font-medium hover:underline">*/}
            {/*  Packages*/}
            {/*</Link>*/}

            {/*TODO: make a about page*/}
            {/*<Link to="/about" className="text-lg font-medium hover:underline">*/}
            {/*  About Us*/}
            {/*</Link>*/}

            <a
                href="https://www.tripadvisor.in/Attraction_Review-g304551-d17412839-Reviews-Indo_Moris_Tours-New_Delhi_National_Capital_Territory_of_Delhi.html"
            >
              about us
            </a>
            {/*TODO:need to replace this with a proper contact page*/}
            <a
                href="mailto:indomorisholidays1@gmail.com"
            >
              <MailStroke/>
            </a>
            <Link to="/login" className="px-3 py-1 bg-black text-white rounded-xl transition hover:bg-gradient-to-r hover:from-blue-300 hover:to-blue-400">
              Login
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}