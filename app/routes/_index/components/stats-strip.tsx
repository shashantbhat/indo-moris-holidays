import CountUp from "~/components/CountUp";

export default function StatsStrip(){
    return(
        <section className="py-12 px-6">
            <div className="mx-auto max-w-5xl grid grid-cols-2 sm:grid-cols-4 gap-8 text-center">
            <div>
                {/* <p className="font-serif text-3xl text-white">2008</p> */}
                <CountUp
                    from={1971}
                    to={2008}
                    separator=","
                    direction="up"
                    duration={1}
                    className="text-3xl text-white"
                    delay={0}
                />
                <p className="mt-1 text-xs uppercase tracking-[0.1em] text-neutral-400">
                Year Founded
                </p>
            </div>
            <div>
                {/* <p className="font-serif text-3xl text-white">17+</p> */}
                <CountUp
                    from={0}
                    to={8}
                    separator=","
                    direction="up"
                    duration={1}
                    className="text-3xl text-white"
                    delay={0}
                />
                <span className="font-serif text-3xl text-white">+</span>
                <p className="mt-1 text-xs uppercase tracking-[0.1em] text-neutral-400">
                Years of Service
                </p>
            </div>
            <div>
                {/* <p className="font-serif text-3xl text-white">1000s</p> */}
                <CountUp
                    from={0}
                    to={100}
                    separator=","
                    direction="up"
                    duration={1}
                    className="text-3xl text-white"
                    delay={0}
                />
                <span className="text-3xl text-white">+</span>
                <p className="mt-1 text-xs uppercase tracking-[0.1em] text-neutral-400">
                Happy Travellers
                </p>
            </div>
            <div>
                {/* <p className="font-serif text-3xl text-white">5.0★</p> */}
                <CountUp
                    from={0}
                    to={4.6}
                    separator=","
                    direction="up"
                    duration={1}
                    className="text-3xl text-white"
                    delay={0}
                />
                <span className="text-2xl text-white">★</span>
                <p className="mt-1 text-xs uppercase tracking-[0.1em] text-neutral-400">
                Guest Rating
                </p>
            </div>
            </div>
        </section>
    )
}