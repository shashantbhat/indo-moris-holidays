export default function Hero (){
    return(
        <div className="relative w-screen h-screen">
            <img
                src="/assets/background_pic2.jpg"
                className="w-full h-full object-cover z-0 rounded-xl"
                alt="Group photograph"
                draggable={false}
            />
        
            {/* Overlay for slight dark effect */}
            {/* <div className="absolute inset-0 bg-black bg-opacity-40 z-10"/> */}

            {/* Hero Content */}
            <div className="absolute top-[10%] w-full flex items-center justify-center z-20 px-4">
                <div className="text-center">
                    <h1 className="heading-1 text-white leading-tight drop-shadow-lg">
                        Discover The <span className="bg-gradient-to-r from-blue-300 to-blue-400 text-transparent bg-clip-text">World</span>,<br className="hidden md:block" /> One Journey At A Time.
                    </h1>
                    <p className="mt-6 heading-4 text-gray-200 drop-shadow-md">
                        Unforgettable destinations. Curated experiences. Memories that last forever.
                    </p>
                </div>
            </div>
        </div>
    )
}