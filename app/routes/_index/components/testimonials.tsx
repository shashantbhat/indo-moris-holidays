import React, { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface Card {
    id: number;
    name: string;
    description: string;
    color: string;
    photo: string;
}

const TestimonialCards = () => {
    const [currentCard, setCurrentCard] = useState<number>(0);
    const cardsContainerRef = useRef<HTMLDivElement>(null);

    const cards: Card[] = [
        {
            id: 1,
            name: "Krishna",
            description: 'This was the best trip my family and I ever had in India. Mr. Sandeep was incredibly helpful even before we arrived, assisting with online shopping and every detail. We were warmly welcomed at the airport and stayed at the excellent Taj Princess Hotel — clean, well-maintained, and with amazing staff. Indo Moris organized seamless shopping trips to top designers and unforgettable dinners at the hotel. A truly great and memorable experience!',
            color: 'white',
            photo: '/assets/testimonial_1.jpg'
        },
        {
            id: 2,
            name: "Archna Matabadal",
            description: 'Had a wonderful holiday thanks to Sandeep Sir and Indo Moris! The trip was very well organized with great hotels, and we had a fantastic time as a family. Can’t wait to return again, maybe to Kerala and beyond. Thank you so much for everything!',
            color: 'white',
            photo: '/assets/testimonial_2.jpg'
        },
        {
            id: 3,
            name: "Elena Zenovic",
            description: 'Thank you Indo Moris for an unforgettable trip! Our group of 19 visited Agra, Jaipur, Varanasi, Rishikesh, Haridwar, and Delhi in complete comfort — great hotels, AC bus, and excellent guides who spoke Russian. Everything was perfectly arranged, from skipping long queues at monuments to incredible experiences like rafting, Ganga Aarti, Holi celebrations, and temple visits. I truly fell in love with India, its people, and culture. An amazing, life-changing journey!',
            color: 'white',
            photo: '/assets/testimonial_3.jpg'
        }
    ];

    const updateCardPosition = (cardIndex: number) => {
        if (cardsContainerRef.current) {
            const translateX = -cardIndex * (100 / cards.length);
            cardsContainerRef.current.style.transform = `translateX(${translateX}%)`;
        }
    };

    const nextCard = () => {
        const newIndex = (currentCard + 1) % cards.length;
        setCurrentCard(newIndex);
    };

    const prevCard = () => {
        const newIndex = currentCard === 0 ? cards.length - 1 : currentCard - 1;
        setCurrentCard(newIndex);
    };

    useEffect(() => {
        updateCardPosition(currentCard);
    }, [currentCard]);

    return (
        <section className="w-full">
            <div className="relative bg-gradient-to-br from-blue-200 via-blue-300 to-blue-400 overflow-x-hidden">
                {/* Header */}
                <div className="text-center text-white py-24 px-5">
                    <h1 className="heading-2 mb-5 drop-shadow-lg">
                        Hear It From Our Guests
                    </h1>
                    <p className="subheading-2">
                        They Loved Their Journey — You Will Too!
                    </p>
                </div>

                {/* Cards Section */}
                <div className="h-screen flex overflow-hidden w-full relative pb-24">
                    {/* Cards Container */}
                    <div
                        ref={cardsContainerRef}
                        className="flex transition-transform duration-700 ease-out"
                        style={{
                            width: `${cards.length * 100}%`,
                            height: '80vh'
                        }}
                    >
                        {cards.map((card) => (
                            <div
                                key={card.id}
                                className="flex-shrink-0 mx-6 rounded-3xl shadow-2xl backdrop-blur-lg border border-white/20 relative overflow-hidden"
                                style={{
                                    width: `${100 / cards.length}%`,
                                    background: card.color,
                                    height: '100%',
                                    minWidth: '800px'
                                }}
                            >
                                {/* Card Content - Horizontal Layout */}
                                <div className="flex h-full p-8">
                                    {/* Left Side - Photo */}
                                    <div className="flex-shrink-0 w-80 h-full flex items-center justify-center">
                                        <div className="w-72 h-72 rounded-2xl overflow-hidden shadow-lg">
                                            <img
                                                src={card.photo}
                                                alt={`${card.name}'s photo`}
                                                className="w-full h-full object-cover"
                                                onError={(e) => {
                                                    e.currentTarget.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(card.name)}&size=400&background=667eea&color=fff`;
                                                }}
                                            />
                                        </div>
                                    </div>

                                    {/* Right Side - Content */}
                                    <div className="flex-1 flex flex-col justify-between pl-12 py-8">
                                        {/* Quote Icon */}
                                        <div className="mb-6">
                                            <svg className="w-12 h-12 text-blue-500 opacity-50" fill="currentColor" viewBox="0 0 24 24">
                                                <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h4v10h-10z"/>
                                            </svg>
                                        </div>

                                        {/* Description */}
                                        <div className="flex-1 flex items-center">
                                            <p className="text-xl leading-relaxed text-gray-700 font-medium italic">
                                                "{card.description}"
                                            </p>
                                        </div>

                                        {/* Guest Name - Bottom Right */}
                                        <div className="flex justify-end mt-8">
                                            <div className="text-right">
                                                <div className="text-2xl font-bold text-gray-800 mb-1">
                                                    {card.name}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Navigation Buttons - Now at Bottom */}
                    <div className="absolute bottom-12 left-1/2 transform -translate-x-1/2 flex gap-6 z-50">
                        <button
                            onClick={prevCard}
                            className="bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-full p-4 transition-all duration-300 hover:scale-110 shadow-lg"
                            aria-label="Previous testimonial"
                        >
                            <ChevronLeft className="w-6 h-6 text-white" />
                        </button>

                        <button
                            onClick={nextCard}
                            className="bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-full p-4 transition-all duration-300 hover:scale-110 shadow-lg"
                            aria-label="Next testimonial"
                        >
                            <ChevronRight className="w-6 h-6 text-white" />
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default TestimonialCards;