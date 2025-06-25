import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

const ChooseUs = () => {
    const sectionRef = useRef(null);
    const cardsRef = useRef([]);

    // Reset cardsRef array before repopulating
    useEffect(() => {
        cardsRef.current = [];
    }, []);

    useEffect(() => {
        gsap.set(cardsRef.current, {
            opacity: 0,
            y: 50,
        });

        gsap.to(cardsRef.current, {
            opacity: 1,
            y: 0,
            duration: 0.8,
            stagger: 0.4,
            ease: "power2.out",
            scrollTrigger: {
                trigger: sectionRef.current,
                start: "top 75%",
                end: "bottom 20%",
                toggleActions: "play none none reverse",
                markers: false, // set to true for debugging
            }
        });

        return () => {
            ScrollTrigger.getAll().forEach(trigger => trigger.kill());
        };
    }, []);

    // Helper to attach each card ref
    const addToRefs = (el) => {
        if (el && !cardsRef.current.includes(el)) {
            cardsRef.current.push(el);
        }
    };

    return (
        <section ref={sectionRef} className={"px-8 py-10 bg-gray-200"}>
            <span className={"heading-3 pb-4"}>Why to choose us?</span>
            <div className={"grid sm:grid-cols-3 gap-4"}>
                <div
                    ref={addToRefs}
                    className="card flex flex-col border rounded-2xl bg-gray-100 py-4 px-3"
                >
                    <span className={"subheading-3"}>Personalized Experiences</span>
                    <span className={"body-sm"}>
                        We don't believe in one-size-fits-all. Every trip is tailored to your preferences — whether you're seeking adventure, luxury, or cultural discovery, we design the perfect itinerary just for you.
                    </span>
                </div>

                <div
                    ref={addToRefs}
                    className="card flex flex-col border rounded-2xl bg-gray-100 py-4 px-3"
                >
                    <span className={"subheading-3"}>Trusted Local Expertise</span>
                    <span className={"body-sm"}>
                        With deep local connections and years of experience in Mauritius, we offer you exclusive access to hidden gems, authentic experiences, and trusted partners — ensuring a seamless and memorable journey.
                    </span>
                </div>

                <div
                    ref={addToRefs}
                    className="card flex flex-col border rounded-2xl bg-gray-100 py-4 px-3"
                >
                    <span className={"subheading-3"}>24/7 Dedicated Support</span>
                    <span className={"body-sm"}>
                        From the moment you book until you return home, our support team is available around the clock to assist you. Your comfort, safety, and satisfaction are always our top priority.
                    </span>
                </div>
            </div>
        </section>
    )
}

export default ChooseUs;