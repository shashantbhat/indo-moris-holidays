const OurExclusive = () => {
    return (
        <section className="relative h-screen w-full grid sm:grid-cols-2">

            <div className="absolute flex flex-col text-center pt-12 z-50 text-white w-full justify-center">
                <span className="heading-1">Our Exclusives</span>
                <span className="subheading-3">Explore their beauty like never before</span>
            </div>

            {/* India Block */}
            <div className="relative group overflow-hidden">
                <img
                    src="/assets/india.jpeg"
                    alt="India"
                    className="w-full h-full object-cover transform group-hover:scale-105 transition-all duration-500"
                />
                <div className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center text-white px-6">
                    <span className="heading-2 mb-2">India</span>
                    <span className="body-md">Explore its royal heritage and vibrant colors</span>
                </div>
            </div>

            {/* Mauritius Block */}
            <div className="relative group overflow-hidden">
                <img
                    src="/assets/mauritius.jpg"
                    alt="Mauritius"
                    className="w-full h-full object-cover transform group-hover:scale-105 transition-all duration-500"
                />
                <div className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center text-white px-6">
                    <span className="heading-2 mb-2">Mauritius</span>
                    <span className="body-md">Discover paradise on crystal-clear shores</span>
                </div>
            </div>
        </section>
    )
}

export default OurExclusive;