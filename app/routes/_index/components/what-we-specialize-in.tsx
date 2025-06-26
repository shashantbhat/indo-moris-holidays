import React, { useEffect, useRef } from "react";

const WhatWeSpecializeIn = () => {
    const containerRef = useRef(null);
    const sectionsRef = useRef([]);

    const specializations = [
        {
            title: "Customized Travel Experiences",
            description: "Every traveler is unique. We create bespoke itineraries tailored to your personal interests, whether you're seeking culture, luxury, spirituality, or adventure.",
            gradient: "from-purple-500 to-pink-500",
            // bgColor: "bg-gradient-to-br from-purple-100 to-pink-100",
            backgroundImage: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80"
        },
        {
            title: "Wide Range of Destinations",
            description: "From the Golden Triangle to Kashmir's peaks, we cover India's most captivating destinations.",
            destinations: [
                "The Golden Triangle: Agra, Jaipur & Delhi",
                "Rajasthan: Forts & Palaces",
                "Kerala & South India: Backwaters & Beaches",
                "Goa: Sun & Serenity",
                "Kashmir: The Himalayan Paradise"
            ],
            gradient: "from-blue-500 to-cyan-500",
            bgColor: "bg-gradient-to-br from-blue-100 to-cyan-100",
            fade: true,
            backgroundImage: "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?ixlib=rb-4.0.3&auto=format&fit=crop&w=2071&q=80"
        },
        {
            title: "Specialized Tours",
            description: "Transformative experiences designed for spiritual growth and wellness.",
            destinations: [
                "Yoga & Wellness Retreats",
                "Pilgrimage Journeys",
                "Spiritual & Cultural Experiences"
            ],
            gradient: "from-green-500 to-emerald-500",
            bgColor: "bg-gradient-to-br from-green-100 to-emerald-100",
            backgroundImage: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80"
        },
        {
            title: "Trusted Partnerships",
            description: "We partner with India's finest hospitality brands like Taj Group, Sheraton Group, and Oberoi Group to ensure your comfort throughout your journey.",
            gradient: "from-orange-500 to-red-500",
            bgColor: "bg-gradient-to-br from-orange-100 to-red-100",
            backgroundImage: "https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80"
        }
    ];

    useEffect(() => {
        // Check if GSAP is available (you'll need to install and import it)
        if (typeof window !== 'undefined' && window.gsap && window.ScrollTrigger) {
            const gsap = window.gsap;
            const ScrollTrigger = window.ScrollTrigger;

            gsap.registerPlugin(ScrollTrigger);

            let sections = sectionsRef.current;

            // Main horizontal scroll animation
            let scrollTween = gsap.to(sections, {
                xPercent: -100 * (sections.length - 1),
                ease: "none",
                scrollTrigger: {
                    trigger: containerRef.current,
                    pin: true,
                    scrub: 0.1,
                    end: "+=3000"
                }
            });

            // Fade animation for the second card (similar to gray section in original)
            const fadeCard = sections.find(section => section.classList.contains('fade-card'));
            if (fadeCard) {
                gsap.to(fadeCard, {
                    opacity: 0,
                    ease: "none",
                    scrollTrigger: {
                        trigger: fadeCard,
                        containerAnimation: scrollTween,
                        start: "center 20%",
                        scrub: true,
                    }
                });
            }

            // Cleanup
            return () => {
                ScrollTrigger.getAll().forEach(trigger => trigger.kill());
            };
        }
    }, []);

    const addToRefs = (el) => {
        if (el && !sectionsRef.current.includes(el)) {
            sectionsRef.current.push(el);
        }
    };

    return (
        <>
            {/* Wrapper to prevent horizontal overflow */}
            <div className="overflow-x-hidden">
                {/* Horizontal scrolling container */}
                <div
                    ref={containerRef}
                    className="h-screen flex flex-nowrap"
                    style={{ width: `${specializations.length * 100}vw` }}
                >
                    {specializations.map((spec, index) => (
                        <div
                            key={index}
                            ref={addToRefs}
                            className={`
                            w-screen h-full flex items-center justify-center p-8 flex-shrink-0 relative
                            ${spec.bgColor}
                            ${spec.fade ? 'fade-card' : ''}
                        `}
                        >
                            {/* Background Image with reduced opacity */}
                            <div
                                className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-80"
                                style={{
                                    backgroundImage: `url(${spec.backgroundImage})`,
                                    zIndex: 1
                                }}
                            ></div>

                            {/* Overlay gradient for better text readability */}
                            <div className="absolute inset-0 bg-gradient-to-br from-white/30 to-transparent" style={{ zIndex: 2 }}></div>

                            <div className="max-w-4xl mx-auto relative" style={{ zIndex: 10 }}>
                                <div className="bg-white/95 backdrop-blur-sm rounded-3xl p-12 shadow-2xl border border-gray-200 hover:shadow-3xl transition-all duration-500">
                                    {/* Gradient accent */}
                                    <div className={`w-16 h-2 bg-gradient-to-r ${spec.gradient} rounded-full mb-8`}></div>

                                    <h3 className="text-3xl font-bold text-gray-900 mb-4">
                                        {spec.title}
                                    </h3>

                                    <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                                        {spec.description}
                                    </p>

                                    {spec.destinations && (
                                        <ul className="space-y-2">
                                            {spec.destinations.map((dest, idx) => (
                                                <li key={idx} className="flex items-start gap-3 text-gray-700 text-base">
                                                    <div className={`w-2 h-2 rounded-full bg-gradient-to-r ${spec.gradient} mt-2 flex-shrink-0`}></div>
                                                    <span>{dest}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* GSAP CDN Scripts - Add these to your app's head */}
            <script
                src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/gsap.min.js"
                onLoad={() => {
                    // Load ScrollTrigger after GSAP is loaded
                    const script = document.createElement('script');
                    script.src = 'https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/ScrollTrigger.min.js';
                    document.head.appendChild(script);
                }}
            />
        </>
    );
};

export default WhatWeSpecializeIn;