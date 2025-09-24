import { motion, useMotionValue, useTransform } from 'motion/react';
import { useState } from 'react';
import {ArrowDown} from 'lucide-react';
import './Stack.css';

function CardRotate({ children, onSendToBack, sensitivity }) {
    const x = useMotionValue(0);
    const y = useMotionValue(0);
    const rotateX = useTransform(y, [-100, 100], [60, -60]);
    const rotateY = useTransform(x, [-100, 100], [-60, 60]);

    function handleDragEnd(_, info) {
        if (Math.abs(info.offset.x) > sensitivity || Math.abs(info.offset.y) > sensitivity) {
            onSendToBack();
        } else {
            x.set(0);
            y.set(0);
        }
    }

    return (
        <motion.div
            className="card-rotate"
            style={{ x, y, rotateX, rotateY }}
            drag
            dragConstraints={{ top: 0, right: 0, bottom: 0, left: 0 }}
            dragElastic={0.6}
            whileTap={{ cursor: 'grabbing' }}
            onDragEnd={handleDragEnd}
        >
            {children}
        </motion.div>
    );
}

export default function Stack({
                                  randomRotation = false,
                                  sensitivity = 200,
                                  cardDimensions = { width: 420, height: 520 },
                                  cardsData = [],
                                  animationConfig = { stiffness: 260, damping: 20 },
                                  sendToBackOnClick = false
                              }) {
    const [cards, setCards] = useState(
        cardsData.length
            ? cardsData
            : [
                {
                    id: 1,
                    img: 'assets/testimonial_1.jpg',
                    name: 'Krishna',
                    comment:
                        '“This was the best trip my family and I ever had! Mr. Sandeep and Indo Moris made everything seamless—from airport pickup to hotel stay at Taj Princess, shopping trips, and dinners. Highly professional, helpful, and memorable!”'
                },
                {
                    id: 2,
                    img: 'assets/testimonial_2.jpg',
                    name: 'Archna Matabadal',
                    comment:
                        '“Had a superb, well-organized holiday with great hotels. Wonderful family time—looking forward to visiting Kerala and more. Thank you, Sandeep Sir & Indo Moris!”'
                },
                {
                    id: 3,
                    img: 'assets/testimonial_3.jpg',
                    name: 'Elena Zenovic',
                    comment:
                        '“Had an amazing trip for 19 people across Agra, Jaipur, Varanasi, Rishikesh, Haridwar, and Delhi. Comfortable travel, great hotels, smooth sightseeing with expert guides, and well-organized excursions. Plenty of time for shopping, activities, and cultural experiences like Holi and Ganga Aarti. Truly the best trip of my life—thank you, Indo Moris!”'
                }
            ]
    );

    const sendToBack = id => {
        setCards(prev => {
            const newCards = [...prev];
            const index = newCards.findIndex(card => card.id === id);
            const [card] = newCards.splice(index, 1);
            newCards.unshift(card);
            return newCards;
        });
    };

    // 👉 Next button logic (always moves top card to back)
    const handleNext = () => {
        if (cards.length > 0) {
            const topCardId = cards[cards.length - 1].id;
            sendToBack(topCardId);
        }
    };

    return (
        <div
            className="stack-wrapper"
            style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem' }}
        >
            <div
                className="stack-container"
                style={{
                    width: cardDimensions.width,
                    height: cardDimensions.height,
                    perspective: 600
                }}
            >
                {cards.map((card, index) => {
                    const randomRotate = randomRotation ? Math.random() * 10 - 5 : 0;

                    return (
                        <CardRotate key={card.id} onSendToBack={() => sendToBack(card.id)} sensitivity={sensitivity}>
                            <motion.div
                                className="card w-[320px] sm:w-[380px] h-[500px] sm:h-[520px]"
                                onClick={() => sendToBackOnClick && sendToBack(card.id)}
                                animate={{
                                    rotateZ: (cards.length - index - 1) * 4 + randomRotate,
                                    scale: 1 + index * 0.06 - cards.length * 0.06,
                                    transformOrigin: '90% 90%'
                                }}
                                initial={false}
                                transition={{
                                    type: 'spring',
                                    stiffness: animationConfig.stiffness,
                                    damping: animationConfig.damping
                                }}
                                style={{
                                    // width: 380,
                                    // height: 520,
                                    display: 'flex',
                                    flexDirection: 'column',
                                    background: '#fff',
                                    borderRadius: '20px',
                                    overflow: 'hidden',
                                    boxShadow: '0 12px 24px rgba(0,0,0,0.2)',
                                    padding: '0'
                                }}
                            >
                                <img
                                    src={card.img}
                                    alt={`card-${card.id}`}
                                    className="card-image h-[50%] sm:h-[60%] w-[90%] sm:w-[100%]"
                                    style={{
                                        width: '100%',
                                        height: '60%',
                                        objectFit: 'cover'
                                    }}
                                />
                                <div
                                    style={{
                                        padding: '20px',
                                        textAlign: 'center',
                                        flex: 1,
                                        display: 'flex',
                                        flexDirection: 'column',
                                        justifyContent: 'center'
                                    }}
                                >
                                    <h3 style={{ fontSize: '1.3rem', fontWeight: '600', margin: '0 0 8px 0' }}>{card.name}</h3>
                                    <p className="text-sm text-black" style={{ lineHeight: 1.5 }}>
                                        {card.comment}
                                    </p>
                                </div>
                            </motion.div>
                        </CardRotate>
                    );
                })}
            </div>

            {/* 👉 Next button below cards */}
            <button
                onClick={handleNext}
                className="relative w-[6em] h-[3em] rounded-xl flex items-center justify-center
             bg-white/30 backdrop-blur-lg border border-white/40 shadow-md mt-16"
                style={{
                    boxShadow: "0 4px 20px rgba(0, 0, 0, 0.15), inset 0 0 0 0.5px rgba(255, 255, 255, 0.6)"
                }}
            >
              <span className="text-black font-semibold text-lg flex items-center gap-1">
                Next <ArrowDown />
              </span>
            </button>
        </div>
    );
}