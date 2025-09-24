const Footer = () => {
    return (
        <footer className="w-full pb-6 mt-16">
            <div className="max-w-7xl mx-auto px-6 sm:px-12 body-sm">
                <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-10">
                    {/* Brand & Social */}
                    <div>
                        <h2 className="subheading-3 text-black mb-2">Indo Moris Holidays</h2>
                        <div className="mb-3 text-gray-600 text-sm sm:text-base">
                            Explore the world's wonders with us—your trusted travel partner for dream vacations, unique experiences, and reliable support.
                        </div>
                        <div className="flex gap-x-3">
                            <a href="https://www.instagram.com/indomoris/" target="_blank" rel="noopener">
                                <img
                                    src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/e7/Instagram_logo_2016.svg/2048px-Instagram_logo_2016.svg.png"
                                    alt="Instagram"
                                    className="object-contain size-6"
                                />
                            </a>
                            <a href="https://www.facebook.com/p/Indo-Moris-Holidays-100066821523903/" target="_blank" rel="noopener">
                                <img
                                    src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b8/2021_Facebook_icon.svg/2048px-2021_Facebook_icon.svg.png"
                                    alt="Facebook"
                                    className="object-contain size-6"
                                />
                            </a>
                        </div>
                    </div>
                    {/* Quick Links */}
                    <div>
                        <div className="font-semibold text-gray-900 mb-3 text-sm sm:text-base">Quick Links</div>
                        <ul className="space-y-2">
                            <li><a href="/about" className="text-gray-400 text-xs sm:text-sm hover:text-blue-700 cursor-not-allowed pointer-events-none">About Us</a></li>
                            <li><a href="/destinations" className="text-gray-400 text-xs sm:text-sm hover:text-blue-700 cursor-not-allowed pointer-events-none">Destinations</a></li>
                            <li>
                                <a
                                    href="mailto:indomorisholidays@gmail.com"
                                    className="text-gray-600 hover:text-blue-700 text-xs sm:text-sm"
                                >
                                    Contact
                                </a>
                            </li>
                            <li><a href="/faq" className="text-gray-400 hover:text-blue-700 cursor-not-allowed pointer-events-none text-xs sm:text-sm">FAQ</a></li>
                        </ul>
                    </div>
                    {/* Contact */}
                    <div>
                        <div className="font-semibold text-gray-900 mb-3 text-sm sm:text-base">Contact Us</div>
                        <ul className="space-y-1 text-gray-700 text-xs sm:text-sm">
                            <li>Email: <a href="mailto:indomorisholidays@gmail.com" className="text-blue-700 hover:underline">indomorisholidays@gmail.com</a></li>
                            <li>Phone: <a href="tel:+91-9180519001" className="text-blue-700 hover:underline">+91-9810519001</a></li>
                            <li>Location: D-260, Lane No - 11, 2nd Floor, Laxmi Nagar, New Delhi-110092, India</li>
                        </ul>
                    </div>
                    {/* Newsletter */}
                    {/*<div>*/}
                    {/*    <h3 className="font-semibold text-gray-900 mb-3">Newsletter</h3>*/}
                    {/*    <form className="flex flex-col gap-2">*/}
                    {/*        <input*/}
                    {/*            type="email"*/}
                    {/*            placeholder="Your email"*/}
                    {/*            className="border rounded px-2 py-1 text-sm"*/}
                    {/*        />*/}
                    {/*        <button*/}
                    {/*            type="submit"*/}
                    {/*            className="bg-blue-700 text-white rounded px-3 py-1 mt-1 hover:bg-blue-800 transition"*/}
                    {/*        >*/}
                    {/*            Subscribe*/}
                    {/*        </button>*/}
                    {/*    </form>*/}
                    {/*</div>*/}
                </div>
                <hr className="my-8 border-gray-300"/>
                <div className="flex flex-col md:flex-row justify-between items-center text-gray-500 text-xs sm:text-sm">
                    <span>&copy; {new Date().getFullYear()} Indo Moris Holidays. All rights reserved.</span>
                    <span>
                        Made with ❤️ by Indo Moris Team
                    </span>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
