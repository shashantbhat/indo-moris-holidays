import React from 'react'
import Stack from "~/components/Stack";

const TestimonialCards = () => {

    return (
        <section className="flex flex-col items-center w-full py-20 bg-gray-50 overflow-x-hidden">
            {/* Section Heading */}
            <div className="text-2xl sm:text-3xl font-extrabold text-center">
                Real Experiences, <br/>Real Smiles
            </div>

            <div className="text-lg sm:text-2xl font-medium mt-10 mb-8 text-center">
                Hear it from our guest
            </div>

            {/* Testimonial Stack */}
            <Stack
                randomRotation={true}
                sensitivity={150}
                sendToBackOnClick={false}
                cardDimensions={{ width: 360, height: 480 }}
            />
        </section>
    );
};

export default TestimonialCards;