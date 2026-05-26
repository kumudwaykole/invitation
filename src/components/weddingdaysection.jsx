import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const fontStyle = `
  @import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@500;600;700&family=Cormorant+Garamond:ital,wght@0,400;0,600;1,400;1,600&family=Great+Vibes&display=swap');
  .wd-cinzel     { font-family: 'Cinzel', serif; letter-spacing: 0.06em; }
  .wd-cormorant  { font-family: 'Cormorant Garamond', serif; }
  .wd-vibes      { font-family: 'Great Vibes', cursive; }
`;

const DAY3 = {
    label: 'Day 3',
    date: 'Friday, 3rd July 2026',
    color: '#7b3fa0',
    accent: '#ce93d8',
    bgGradient: 'linear-gradient(180deg,#fdf0ff 0%,#f5e0ff 55%,#fdf8ff 100%)',
    events: [
        { time: '7:30 AM', title: 'Barat Swagat', sub: 'Welcome of the Baraat with Breakfast', icon: '🎺', highlight: true },
        { time: '11:00 AM onwards', title: 'Carnival with Lunch', sub: 'Festive fun & celebrations', icon: '🎡' },
        { time: '2:00 – 4:00 PM', title: 'Mahera', sub: 'Auspicious ceremony with High Tea', icon: '🌸' },
        { time: '8:00 PM onwards', title: 'Sangeet with Dinner', sub: 'Music, dance & joyful evening', icon: '🎶', highlight: true },
    ],
};

const DAY4 = {
    label: 'Day 4',
    date: 'Saturday, 4th July 2026',
    color: '#b8860b',
    accent: '#f5d76e',
    bgGradient: 'linear-gradient(180deg,#fffdf0 0%,#fdf5d0 55%,#fffdf8 100%)',
    events: [
        { time: '7:00 – 8:00 AM', title: 'Samayak', sub: 'Sacred morning ritual', icon: '🕯️', highlight: true },
        { time: '8:00 – 10:00 AM', title: 'Breakfast', sub: 'Start the big day right', icon: '🌅' },
        { time: '11:00 – 11:30 AM', title: 'Samela', sub: 'Feta & ready for procession', icon: '👑' },
        { time: '11:30 – 12:30 PM', title: 'Procession', sub: 'The grand wedding procession', icon: '🪷', highlight: true },
        { time: '1:00 PM', title: 'Vermalla', sub: 'All rasams & photoshoot', icon: '📸' },
        { time: '1:00 – 3:00 PM', title: 'Sahi Lunch', sub: 'Grand celebratory feast', icon: '🍽️' },
        { time: '6:00 PM', title: 'Musical Fera', sub: 'Sacred wedding ceremony with music', icon: '💍', highlight: true },
        { time: '9:30 PM', title: 'Bidhai', sub: 'Farewell with all rasams', icon: '🌹', highlight: true },
        { time: '12:00 AM', title: 'Departure to Jalgaon', sub: 'Journey home begins', icon: '🚗' },
    ],
};

function EventRow({ ev, index, color, accent }) {
    const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.15 });
    const isEven = index % 2 === 0;

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, x: isEven ? -36 : 36 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.72, ease: [0.22, 1, 0.36, 1], delay: index * 0.07 }}
            className="flex items-center gap-0 mb-0"
        >
            {/* Left side: time (always visible) */}
            <div
                className="w-[90px] shrink-0 text-right pr-3"
                style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 11, color: color, opacity: 0.75, fontStyle: 'italic', lineHeight: 1.3 }}
            >
                {ev.time}
            </div>

            {/* Centre dot + spine */}
            <div className="flex flex-col items-center shrink-0" style={{ width: 28 }}>
                <motion.div
                    initial={{ scale: 0 }}
                    animate={inView ? { scale: 1 } : {}}
                    transition={{ duration: 0.4, delay: index * 0.07 + 0.15, type: 'spring', stiffness: 320, damping: 22 }}
                    className="rounded-full flex items-center justify-center shrink-0 z-[2]"
                    style={{
                        width: ev.highlight ? 30 : 22,
                        height: ev.highlight ? 30 : 22,
                        background: ev.highlight
                            ? `linear-gradient(135deg,${color},${accent})`
                            : `rgba(0,0,0,0.04)`,
                        border: ev.highlight
                            ? `none`
                            : `1.5px solid ${color}55`,
                        boxShadow: ev.highlight ? `0 3px 12px ${color}55` : 'none',
                        fontSize: ev.highlight ? 13 : 11,
                    }}
                >
                    {ev.icon}
                </motion.div>
            </div>

            {/* Right side: event card */}
            <motion.div
                whileHover={{ scale: 1.015, x: 3 }}
                transition={{ duration: 0.25 }}
                className="flex-1 ml-2 rounded-xl py-3 px-4 mb-2 cursor-default"
                style={{
                    background: ev.highlight ? `linear-gradient(135deg,${color}12,${accent}18)` : 'rgba(255,255,255,0.65)',
                    border: ev.highlight ? `1px solid ${color}35` : '1px solid rgba(0,0,0,0.06)',
                    boxShadow: ev.highlight ? `0 4px 18px ${color}18` : '0 2px 8px rgba(0,0,0,0.04)',
                }}
            >
                <p
                    style={{
                        fontFamily: "'Cormorant Garamond', serif",
                        fontSize: ev.highlight ? 20 : 17,
                        fontWeight: 600,
                        color: ev.highlight ? color : '#3d2b1f',
                        lineHeight: 1.15,
                        marginBottom: 2,
                    }}
                >
                    {ev.title}
                </p>
                <p
                    style={{
                        fontFamily: "'Cinzel', serif",
                        fontSize: 9,
                        letterSpacing: '1.5px',
                        textTransform: 'uppercase',
                        color: '#8a6e58',
                        opacity: 0.8,
                    }}
                >
                    {ev.sub}
                </p>
            </motion.div>
        </motion.div>
    );
}

function DaySection({ day }) {
    const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.08 });

    return (
        <section
            ref={ref}
            className="relative overflow-hidden pb-10 pt-10"
            style={{ background: day.bgGradient }}
        >
            {/* Sparkles */}
            {Array.from({ length: 7 }).map((_, i) => (
                <motion.span
                    key={i}
                    animate={{ opacity: [0.1, 0.5, 0.1], scale: [0.8, 1.2, 0.8] }}
                    transition={{ duration: 2.5 + i * 0.5, repeat: Infinity, delay: i * 0.4 }}
                    className="absolute pointer-events-none"
                    style={{
                        color: day.color,
                        fontSize: 9 + (i % 3) * 3,
                        top: `${6 + ((i * 14) % 80)}%`,
                        left: `${4 + ((i * 13) % 90)}%`,
                        opacity: 0.2,
                    }}
                >
                    ✦
                </motion.span>
            ))}

            <div className="max-w-[420px] mx-auto px-5 relative z-10">
                {/* Day Header */}
                <motion.div
                    initial={{ opacity: 0, y: 18 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.7 }}
                    className="text-center mb-8"
                >
                    <p
                        className="wd-cinzel text-[10px] tracking-[3px] uppercase mb-2"
                        style={{ color: day.color }}
                    >
                        {day.label}
                    </p>
                    <h2
                        className="wd-vibes leading-[1.1]"
                        style={{ fontSize: 52, color: '#3d2b1f', filter: `drop-shadow(0 2px 8px ${day.color}30)` }}
                    >
                        {day.date.split(',')[1]?.trim().split(' 2026')[0]}
                    </h2>
                    <p className="wd-cormorant italic text-sm mt-1" style={{ color: '#8a6e58' }}>{day.date}</p>

                    {/* Gold rule */}
                    <motion.div
                        initial={{ scaleX: 0, opacity: 0 }}
                        animate={inView ? { scaleX: 1, opacity: 1 } : {}}
                        transition={{ duration: 0.8, delay: 0.3 }}
                        className="flex items-center gap-2.5 justify-center mt-4"
                    >
                        <div className="flex-1 h-px max-w-[80px]" style={{ background: `linear-gradient(to right,transparent,${day.color})` }} />
                        <span style={{ color: day.color, fontSize: 11 }}>✦</span>
                        <div className="flex-1 h-px max-w-[80px]" style={{ background: `linear-gradient(to left,transparent,${day.color})` }} />
                    </motion.div>
                </motion.div>

                {/* Vertical spine */}
                <div className="relative">
                    <div
                        className="absolute z-[1] top-0 bottom-4"
                        style={{
                            left: 104,
                            width: 1.5,
                            background: `linear-gradient(to bottom, transparent, ${day.color}50 10%, ${day.color}50 90%, transparent)`,
                        }}
                    />
                    <div className="flex flex-col gap-0">
                        {day.events.map((ev, i) => (
                            <EventRow key={i} ev={ev} index={i} color={day.color} accent={day.accent} />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}

export default function WeddingDaySection() {
    return (
        <>
            <style>{fontStyle}</style>
            {/* Section Heading */}
            <section
                className="pt-12 pb-2 text-center relative overflow-hidden"
                style={{ background: 'linear-gradient(180deg,#fdf8f0 0%,#faf3e0 100%)' }}
            >
                <p
                    className="wd-cinzel text-[10px] tracking-[4px] uppercase mb-3"
                    style={{ color: '#a07830' }}
                >
                    The Wedding Celebrations
                </p>
                <h2
                    className="wd-vibes leading-[1.0]"
                    style={{ fontSize: 64, color: '#3d2b1f', filter: 'drop-shadow(0 3px 12px rgba(201,168,76,0.25))' }}
                >
                    Wedding Day Schedule
                </h2>
                <p
                    className="wd-cormorant italic text-lg mt-1 mb-6"
                    style={{ color: '#8a6e58' }}
                >
                    3rd &amp; 4th July 2026 · Jalgaon
                </p>
                <div className="flex items-center gap-2.5 justify-center px-10">
                    <div className="flex-1 h-px" style={{ background: 'linear-gradient(to right,transparent,#c9a84c)' }} />
                    <span style={{ color: '#c9a84c', fontSize: 13 }}>✦</span>
                    <div className="flex-1 h-px" style={{ background: 'linear-gradient(to left,transparent,#c9a84c)' }} />
                </div>
            </section>
            <DaySection day={DAY3} />
            <DaySection day={DAY4} />
        </>
    );
}