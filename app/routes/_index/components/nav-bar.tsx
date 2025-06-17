import { Link } from "@remix-run/react";

export default function Navbar() {
  return (
    <nav className="fixed top-0 left-0 w-full bg-white shadow-md z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex items-center">
            <Link to="/" className="text-2xl font-extrabold">
              Indo Moris Holidays
            </Link>
          </div>
          <div className="hidden md:flex space-x-8 items-center">
            <Link to="/destinations" className="text-lg font-medium hover:underline">
              Destinations
            </Link>
            <Link to="/packages" className="text-lg font-medium hover:underline">
              Packages
            </Link>
            <Link to="/about" className="text-lg font-medium hover:underline">
              About Us
            </Link>
            <Link to="/contact" className="text-lg font-medium hover:underline">
              Contact
            </Link>
            <Link to="/login" className="px-3 py-1 border-2 border-black bg-white hover:bg-black text-black hover:text-white rounded-xl font-medium transition">
              Login
            </Link>
          </div>
          <div className="md:hidden">
            {/* Add hamburger menu for mobile if you want */}
          </div>
        </div>
      </div>
    </nav>
  );
}