export default function Hero (){
    return(
        <section className="relative w-screen h-screen sm:min-h-svh rounded-b-3xl overflow-hidden">
            <img
                src="/assets/hero-image.jpg"
                className="w-full h-full object-cover z-0"
                alt="Group photograph"
                draggable={false}
            />

             {/*Overlay for slight dark effect*/}
             {/*<div className="absolute inset-0 bg-black bg-opacity-40 z-10"/>*/}

            {/* Hero Content */}
            <div className="absolute -top-[15%] sm:top-[10%] h-full sm:h-auto w-full flex items-center justify-center z-20 px-4 sm:mt-10 text-white">
                <div className="text-center">
                    <h1 className="font-medium text-2xl sm:text-3xl">
                        Explore like never before
                    </h1>
                    <p className="font-extrabold text-4xl sm:text-5xl mt-8">
                        Personalized trips,<br/> effortless travel
                    </p>
                    <button
                        onClick={() => {
                            document.getElementById("target-section")?.scrollIntoView({
                                behavior: "smooth",
                            });
                        }}
                        className="bg-black text-white font-normal px-2.5 py-1.5 rounded-xl mt-4"
                    >
                        Book Now
                    </button>
                </div>
            </div>
        </section>
    )
}