import GlassSurface from "~/components/GlassSurface";
import { useEffect, useState } from "react";

const NewNavBar = () => {
    const [isSupported, setIsSupported] = useState(false);

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

    if (!isSupported) return null;

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
                <div className="flex items-center justify-between w-full px-2 sm:px-2.5 py-1 sm:py-1.5">

                    {/* Left: Brand + Links */}
                    <div className="flex items-center space-x-4 sm:space-x-8">
                        <div className="hidden sm:block text-xl font-semibold">
                            Indo Moris Holidays
                        </div>
                        <img
                            src="/indo_moris_logo.png"
                            alt="Indo Moris Logo"
                            className="h-6 w-6 !ml-0 block sm:hidden"
                        />

                        <div className="mx-4 border-l border-gray-300 h-6"></div>

                        <div className="flex space-x-2 sm:space-x-6 text-xs sm:text-base font-normal">
                            <span className="cursor-pointer">About</span>
                            <span className="cursor-pointer">Itinerary</span>
                            <span className="cursor-pointer">Contact Us</span>
                        </div>
                    </div>

                    {/* Right: Sign In */}
                    <button className="bg-black text-white text-xs sm:text-sm px-2 sm:px-2.5 py-1 sm:py-1.5 rounded-[10px] sm:rounded-xl">
                        Sign In
                    </button>
                </div>
            </GlassSurface>
        </div>
    );
};

export default NewNavBar;