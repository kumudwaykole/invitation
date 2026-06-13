import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import confetti from 'canvas-confetti';
import CalligraphicFlourish from './CalligraphicFlourish';

const fontStyle = `
  @import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@600;700;800&family=Cormorant+Garamond:ital,wght@0,400;0,600;1,400;1,600&display=swap');
  .save-cinzel { font-family: 'Cinzel', serif; font-weight: 700; letter-spacing: 0.06em; }
  .save-cormorant { font-family: 'Cormorant Garamond', serif; }

  @keyframes shimmerSlide {
    0%   { transform: translateX(-120%); }
    100% { transform: translateX(220%); }
  }
  .shimmer-bar {
    animation: shimmerSlide 1.4s linear infinite;
    will-change: transform;
  }
`;

const WEDDING_DATE = new Date('2026-07-04T12:00:00+05:30');

function getTimeLeft() {
    const diff = WEDDING_DATE.getTime() - Date.now();
    if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 };
    return {
        days: Math.floor(diff / (1000 * 60 * 60 * 24)),
        hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((diff / (1000 * 60)) % 60),
        seconds: Math.floor((diff / 1000) % 60),
    };
}

function CountdownTimer() {
    const [time, setTime] = useState(getTimeLeft);

    useEffect(() => {
        const id = setInterval(() => setTime(getTimeLeft()), 1000);
        return () => clearInterval(id);
    }, []);

    const units = [
        { label: 'Days', value: time.days },
        { label: 'Hours', value: time.hours },
        { label: 'Mins', value: time.minutes },
        { label: 'Secs', value: time.seconds },
    ];

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col items-center gap-3 mt-6"
        >
            <p className="save-cinzel text-[10px] tracking-[3px] uppercase" style={{ color: '#a07830' }}>
                Counting Down
            </p>
            <div className="flex gap-3 items-start">
                {units.map(({ label, value }, i) => (
                    <div key={label} className="flex items-center gap-3">
                        <div className="flex flex-col items-center">
                            <div
                                className="relative flex items-center justify-center rounded-[10px]"
                                style={{
                                    width: 62, height: 62,
                                    background: 'linear-gradient(145deg,#fffdf5,#faf3e0)',
                                    border: '1px solid rgba(201,168,76,0.4)',
                                    boxShadow: '0 4px 16px rgba(201,168,76,0.18)',
                                }}
                            >
                                <AnimatePresence mode="popLayout">
                                    <motion.span
                                        key={value}
                                        className="save-cinzel"
                                        style={{ fontSize: 26, color: '#3d2b1f', lineHeight: 1 }}
                                        initial={{ y: -16, opacity: 0 }}
                                        animate={{ y: 0, opacity: 1 }}
                                        exit={{ y: 16, opacity: 0 }}
                                        transition={{ duration: 0.28, ease: 'easeOut' }}
                                    >
                                        {String(value).padStart(2, '0')}
                                    </motion.span>
                                </AnimatePresence>
                            </div>
                            <span className="save-cinzel text-[9px] tracking-[2px] uppercase mt-1.5" style={{ color: '#b08840' }}>
                                {label}
                            </span>
                        </div>
                        {i < 3 && (
                            <span className="save-cinzel text-[22px] mt-2.5" style={{ color: 'rgba(201,168,76,0.5)', lineHeight: 1 }}>:</span>
                        )}
                    </div>
                ))}
            </div>
        </motion.div>
    );
}

// CSS shimmer — no Framer Motion backgroundPosition animation
function ShimmerLayer({ active }) {
    if (!active) return null;
    return (
        <div className="absolute inset-0 pointer-events-none z-10 rounded-[10px] overflow-hidden">
            <div
                className="shimmer-bar absolute inset-y-0 w-[60%]"
                style={{
                    background: 'linear-gradient(105deg, transparent 35%, rgba(255,255,220,0.45) 50%, transparent 65%)',
                }}
            />
        </div>
    );
}

// Simplified sparkle — fewer elements, CSS transform
function SparkleBurst() {
    return (
        <motion.div
            className="absolute inset-0 pointer-events-none z-20"
            initial={{ opacity: 1 }}
            animate={{ opacity: 0 }}
            transition={{ duration: 1.0, delay: 0.3 }}
        >
            {[...Array(6)].map((_, i) => {
                const angle = (i / 6) * 360;
                return (
                    <motion.div
                        key={i}
                        className="absolute top-1/2 left-1/2 w-[3px] h-[3px] rounded-full"
                        style={{ background: i % 2 === 0 ? '#c9a84c' : '#e8c96a' }}
                        initial={{ x: 0, y: 0, opacity: 1 }}
                        animate={{
                            x: Math.cos((angle * Math.PI) / 180) * 48,
                            y: Math.sin((angle * Math.PI) / 180) * 48,
                            opacity: 0,
                        }}
                        transition={{ duration: 0.6, ease: 'easeOut' }}
                    />
                );
            })}
        </motion.div>
    );
}

function ScratchCard({ label, value, delay, onRevealed }) {
    const canvasRef = useRef(null);
    const [revealed, setRevealed] = useState(false);
    const [hovered, setHovered] = useState(false);
    const [showSparkle, setShowSparkle] = useState(false);
    const drawing = useRef(false);
    const [cardRef, inView] = useInView({ triggerOnce: true });

    const CARD_W = 340;
    const CARD_H = 80;
    const DPR = typeof window !== 'undefined' ? window.devicePixelRatio || 1 : 1;

    useEffect(() => {
        const c = canvasRef.current;
        if (!c) return;
        c.width = CARD_W * DPR;
        c.height = CARD_H * DPR;
        c.style.width = `${CARD_W}px`;
        c.style.height = `${CARD_H}px`;
        const ctx = c.getContext('2d');
        ctx.scale(DPR, DPR);
        const g = ctx.createLinearGradient(0, 0, CARD_W, CARD_H);
        g.addColorStop(0, '#b8922a');
        g.addColorStop(0.3, '#e8c96a');
        g.addColorStop(0.6, '#c9a84c');
        g.addColorStop(1, '#8a6420');
        ctx.fillStyle = g;
        ctx.fillRect(0, 0, CARD_W, CARD_H);
        ctx.fillStyle = 'rgba(60,35,5,0.75)';
        ctx.font = 'bold 11px "Cormorant Garamond", serif';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.letterSpacing = '2px';
        ctx.fillText('✦ SCRATCH ✦', CARD_W / 2, CARD_H / 2 - 8);
        ctx.fillText('HERE', CARD_W / 2, CARD_H / 2 + 10);
    }, []);

    const getXY = (e, c) => {
        const r = c.getBoundingClientRect();
        const src = e.touches ? e.touches[0] : e;
        return { x: src.clientX - r.left, y: src.clientY - r.top };
    };

    const erase = (e) => {
        if (!drawing.current || revealed) return;
        const c = canvasRef.current;
        const ctx = c.getContext('2d');
        const { x, y } = getXY(e, c);
        ctx.globalCompositeOperation = 'destination-out';
        ctx.beginPath();
        ctx.arc(x * DPR, y * DPR, 28 * DPR, 0, Math.PI * 2);
        ctx.fill();
        const px = ctx.getImageData(0, 0, c.width, c.height).data;
        let gone = 0;
        for (let i = 3; i < px.length; i += 4) if (px[i] < 128) gone++;
        if (gone / (px.length / 4) > 0.5) {
            setRevealed(true);
            setShowSparkle(true);
            setTimeout(() => setShowSparkle(false), 1000);
            onRevealed?.();
        }
    };

    return (
        <motion.div
            ref={cardRef}
            initial={{ opacity: 0, y: 40, scale: 0.82 }}
            animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
            transition={{ duration: 0.85, delay, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col items-center gap-[9px] flex-1"
        >
            <span className="save-cinzel text-sm tracking-[2.5px] uppercase" style={{ color: '#a07830' }}>
                {label}
            </span>
            <div
                className="relative rounded-[12px] overflow-hidden"
                style={{
                    width: CARD_W,
                    height: CARD_H,
                    boxShadow: revealed
                        ? '0 0 0 2px #c9a84c, 0 8px 28px rgba(201,168,76,0.35)'
                        : '0 4px 18px rgba(201,168,76,0.22)',
                    cursor: revealed ? 'default' : 'crosshair',
                }}
                onMouseEnter={() => !revealed && setHovered(true)}
                onMouseLeave={() => { setHovered(false); drawing.current = false; }}
            >
                {/* Revealed content */}
                <div
                    className="absolute inset-0 flex flex-col items-center justify-center"
                    style={{ background: 'linear-gradient(145deg,#fffdf5,#faf3e0)' }}
                >
                    <span
                        className="save-cinzel leading-none"
                        style={{ fontSize: 34, color: '#3d2b1f', filter: 'drop-shadow(0 2px 6px rgba(201,168,76,0.3))' }}
                    >
                        {value}
                    </span>
                    {revealed && (
                        <motion.div
                            initial={{ opacity: 0, scaleX: 0 }}
                            animate={{ opacity: 1, scaleX: 1 }}
                            transition={{ delay: 0.3, duration: 0.4 }}
                            className="h-px w-10 mt-2"
                            style={{ background: 'linear-gradient(to right,transparent,#c9a84c,transparent)' }}
                        />
                    )}
                </div>

                <ShimmerLayer active={hovered && !revealed} />

                <canvas
                    ref={canvasRef}
                    className="absolute inset-0 touch-none"
                    style={{
                        opacity: revealed ? 0 : 1,
                        transition: revealed ? 'opacity 0.6s ease' : 'none',
                        cursor: revealed ? 'default' : 'crosshair',
                    }}
                    onMouseDown={() => { drawing.current = true; }}
                    onMouseUp={() => { drawing.current = false; }}
                    onMouseMove={erase}
                    onTouchStart={e => { e.preventDefault(); drawing.current = true; }}
                    onTouchEnd={() => { drawing.current = false; }}
                    onTouchMove={e => { e.preventDefault(); erase(e); }}
                />
                {showSparkle && <SparkleBurst />}
            </div>
        </motion.div>
    );
}

function GoldDivider({ inView }) {
    return (
        <motion.div
            className="flex items-center gap-2.5 w-full max-w-[260px] mx-auto mb-9"
            initial={{ opacity: 0, scaleX: 0 }}
            animate={inView ? { opacity: 1, scaleX: 1 } : {}}
            transition={{ duration: 0.9, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
        >
            <div className="flex-1 h-px" style={{ background: 'linear-gradient(to right,transparent,#c9a84c)' }} />
            <span style={{ color: '#c9a84c', fontSize: 11 }}>✦</span>
            <div className="flex-1 h-px" style={{ background: 'linear-gradient(to left,transparent,#c9a84c)' }} />
        </motion.div>
    );
}

function AddToCalendarButton() {
    const gcalUrl =
        'https://calendar.google.com/calendar/render?action=TEMPLATE' +
        '&text=Wedding+Celebration+%F0%9F%92%9B' +
        '&dates=20260704T063000Z/20260704T183000Z' +
        '&details=You+are+cordially+invited+to+our+wedding+celebration.+%F0%9F%8C%B8' +
        '&location=Jalgaon%2C+Maharashtra';

    return (
        <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="mt-6 flex flex-col items-center gap-3"
        >
            <p className="save-cormorant italic text-[22px] leading-tight" style={{ color: '#3d2b1f' }}>
                Mark this special day
            </p>
            <a
                href={gcalUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2.5 px-6 py-3 rounded-full no-underline"
                style={{
                    background: 'linear-gradient(135deg, #fdf3dc, #fae8b4)',
                    border: '1px solid rgba(201,168,76,0.55)',
                    boxShadow: '0 3px 16px rgba(201,168,76,0.25)',
                    textDecoration: 'none',
                    transition: 'transform 0.2s ease, box-shadow 0.2s ease',
                }}
                onMouseEnter={e => { e.currentTarget.style.transform = 'scale(1.04)'; e.currentTarget.style.boxShadow = '0 6px 28px rgba(201,168,76,0.4)'; }}
                onMouseLeave={e => { e.currentTarget.style.transform = ''; e.currentTarget.style.boxShadow = '0 3px 16px rgba(201,168,76,0.25)'; }}
            >
                <p className="save-cinzel text-xs tracking-[3px] uppercase" style={{ color: '#a07830' }}>
                    On Your Calendar
                </p>
            </a>
        </motion.div>
    );
}

export default function SaveTheDateSection() {
    const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.2 });
    const [allRevealed, setAllRevealed] = useState(false);
    const confettiFired = useRef(false);

    const handleRevealed = () => setAllRevealed(true);

    useEffect(() => {
        if (allRevealed && !confettiFired.current) {
            confettiFired.current = true;
            const colors = ['#c9a84c', '#e8c96a', '#fff4cf', '#f5d6a0', '#a07830', '#4a7c59'];
            confetti({ particleCount: 100, spread: 80, startVelocity: 45, origin: { x: 0.5, y: 0.5 }, colors, gravity: 1.1, scalar: 1.0 });
            setTimeout(() => {
                confetti({ particleCount: 50, angle: 60, spread: 60, startVelocity: 38, origin: { x: 0.1, y: 0.55 }, colors });
                confetti({ particleCount: 50, angle: 120, spread: 60, startVelocity: 38, origin: { x: 0.9, y: 0.55 }, colors });
            }, 250);
        }
    }, [allRevealed]);

    return (
        <>
            <style>{fontStyle}</style>
            <section
                ref={ref}
                className="min-h-[80vh] flex flex-col items-center justify-center px-7 py-10 relative overflow-hidden pb-50"
                style={{ background: 'linear-gradient(180deg,#fdf8f0 0%,#faf3e0 55%,#fdf8f0 100%)' }}
            >
                {/* Static glow orb — no animation, just a soft static bg accent */}
                <div
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[320px] h-80 rounded-full pointer-events-none"
                    style={{ background: 'radial-gradient(circle,rgba(255,248,200,0.45) 0%,transparent 70%)' }}
                />

                <div className="relative z-[1] text-center max-w-[360px] w-full">
                    <motion.p
                        initial={{ opacity: 0, y: 14 }}
                        animate={inView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.6 }}
                        className="save-cinzel text-xs tracking-widest uppercase mb-3"
                        style={{ color: '#a07830' }}
                    >
                        A Celebration of Love
                    </motion.p>

                    <motion.h2
                        initial={{ opacity: 0, y: 22 }}
                        animate={inView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.75, delay: 0.12 }}
                        className="font-greatvibes text-[58px] leading-[1.1] my-1"
                        style={{ color: '#3d2b1f', filter: 'drop-shadow(0 2px 8px rgba(201,168,76,0.2))' }}
                    >
                        Save the Date
                    </motion.h2>

                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={inView ? { opacity: 1 } : {}}
                        transition={{ duration: 0.6, delay: 0.25 }}
                        className="save-cormorant italic text-lg mb-5"
                        style={{ color: '#8a6e58' }}
                    >
                        A beautiful chapter of forever is about to begin.
                    </motion.p>

                    <CalligraphicFlourish variant="corner-tl" position={{ top: -150, left: -40 }} />
                    <CalligraphicFlourish variant="corner-br" position={{ bottom: -150, right: -40 }} size={0.85} delay={0.6} />

                    <GoldDivider inView={inView} />

                    <motion.div
                        className="flex justify-center items-start"
                        initial={{ opacity: 0, y: 20 }}
                        animate={inView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.6, delay: 0.45 }}
                    >
                        <ScratchCard label="Reveal The Date" value="4 July 2026" delay={0.5} onRevealed={handleRevealed} />
                    </motion.div>

                    <AnimatePresence>
                        {allRevealed && (
                            <motion.div
                                key="post-reveal"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ duration: 0.5 }}
                            >
                                <CountdownTimer />
                                <AddToCalendarButton />
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </section>
        </>
    );
}