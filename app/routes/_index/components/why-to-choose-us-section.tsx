const ChooseUs = () => {
    return (
        <section className="min-h-[550px] w-full relative flex">

            <div className="flex w-full h-full  items-center justify-center">

                <div className="flex flex-col pt-12 pb-8">
                    <span className={"heading-3 flex w-full justify-center"}>Why to choose us?</span>
                    <div className="grid grid-cols-2 gap-4 pt-12 max-w-3xl space-x-4">
                        <div className="flex flex-col min-h-[250px] border-2 bg-white/70 rounded-2xl px-2 py-3">
                            <span className={"subheading-3"}>Personalized Experiences</span>
                            <span className={"body-sm pt-2"}>
                                We don't believe in one-size-fits-all. Every trip is tailored to your preferences — whether you're seeking adventure, luxury, or cultural discovery, we design the perfect itinerary just for you.
                            </span>
                        </div>
                        <div className="flex flex-col mi-h-[250px] border-2 bg-white/70 rounded-2xl px-2 py-3">
                            <span className={"subheading-3"}>Trusted Local Expertise</span>
                            <span className={"body-sm pt-2 max-w-lg"}>
                                With deep local connections and years of experience in Mauritius, we offer you exclusive access to hidden gems, authentic experiences, and trusted partners — ensuring a seamless and memorable journey.
                            </span>
                        </div>
                    </div>
                </div>
            </div>

        </section>
    )
}

export default ChooseUs;



