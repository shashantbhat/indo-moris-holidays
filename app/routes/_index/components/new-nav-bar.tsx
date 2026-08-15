import GlassSurface from "~/components/GlassSurface";
import { useEffect, useState } from "react";
import { Form, Link } from "react-router-dom";
import { useRouteLoaderData } from "@remix-run/react";

const CDN =  import.meta.env.VITE_CDN_URL;
const NewNavBar = () => {
    const rootData = useRouteLoaderData<{
        isLoggedIn: boolean;
    }>("root");
    const [isSupported, setIsSupported] = useState(false);
    const [isDarkBackground, setIsDarkBackground] = useState(false);
    const isUserLoggedin = rootData?.isLoggedIn ?? false;
    
    useEffect(() => {
        const checkSupport = () => {
            try {
                const el = document.createElement("div");
                setIsSupported(true);
            } catch {
                setIsSupported(false);
            }
        };
        checkSupport();
    }, []);

    useEffect(() => {
        const checkNavTheme = () => {
            // Point just below the navbar
            const x = window.innerWidth / 2;
            const y = 100;

            const element = document.elementFromPoint(x, y);

            const section = element?.closest("[data-nav-theme]");

            setIsDarkBackground(
                section?.getAttribute("data-nav-theme") === "dark"
            );
        };

        checkNavTheme();

        window.addEventListener("scroll", checkNavTheme, { passive: true });
        window.addEventListener("resize", checkNavTheme);

        return () => {
            window.removeEventListener("scroll", checkNavTheme);
            window.removeEventListener("resize", checkNavTheme);
        };
    }, []);

    if (!isSupported) return null;

    const textColor = isDarkBackground ? "text-white" : "text-black";

    return (
        <div className="fixed top-0 left-0 w-full flex justify-center mt-8 z-50">
            <GlassSurface
                displace={3}
                distortionScale={20} //-150 was by default for the reverse distortion.
                redOffset={5}
                greenOffset={15}
                blueOffset={25}
                brightness={60}
                opacity={0.8}
                mixBlendMode="screen"
                className="!w-[90%] md:!w-[70%] lg:!w-[60%] xl:!w-[40%] !h-14"
            >
                <div
                    className={`flex items-center justify-between w-full px-2 sm:px-2.5 py-1 sm:py-1.5 ${textColor} transition-colors duration-300`}
                >

                    {/* Left: Brand + Links */}
                    <div className="flex items-center space-x-4 sm:space-x-8">
                        <Link to={"/"} className="hidden sm:block text-xl font-semibold">
                            Indo Moris Holidays
                        </Link>
                        <Link to={"/"}>
                            <img
                                src={`${CDN}/indo_moris_logo.png`}
                                alt="Indo Moris Logo"
                                className="h-6 w-6 !ml-0 block sm:hidden"
                            />
                        </Link>
                        

                        <div className="mx-4 border-l border-gray-300 h-6"></div>

                        <div className="flex space-x-2 sm:space-x-6 text-xs sm:text-base font-normal">
                            <Link to="about" className="cursor-pointer">About</Link>
                            <Link to="itinerary" className="cursor-pointer">Itinerary</Link>
                            <a
                                href="mailto:indomorisholidays@gmail.com?subject=Contact%20Us"
                                className="cursor-pointer"
                            >
                                Contact Us
                            </a>
                        </div>
                    </div>
                    {
                        isUserLoggedin ? (
                            <Form method="post" action="/logout">
                                <button className="bg-black text-white text-xs sm:text-sm px-2 sm:px-2.5 py-1 sm:py-1.5 rounded-[10px] sm:rounded-xl">
                                    Log Out
                                </button>
                            </Form>
                        ):(
                            <Link to={'/login'}>
                                <button className="bg-black text-white text-xs sm:text-sm px-2 sm:px-2.5 py-1 sm:py-1.5 rounded-[10px] sm:rounded-xl">
                                    Log In
                                </button>
                            </Link>
                        )
                    }
                </div>
            </GlassSurface>
        </div>
    );
};

export default NewNavBar;