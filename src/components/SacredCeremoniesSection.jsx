import { useRef, useEffect, useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { RosePetal } from './VenueSection';
import CalligraphicFlourish from './CalligraphicFlourish';
const VIDEOS = [
    { src: '/dayone_tejaswi.mp4', poster: '/day1fallback.webp', date: '3rd July' },
    { src: '/daytwo_Video.mp4', poster: '/day2fallback.webp', date: '4th July' },
];

function GoldDivider() {
    return (
        <div className="flex items-center gap-3 w-full max-w-[200px] mx-auto my-5">
            <div className="flex-1 h-px bg-gradient-to-r from-transparent to-[#c9a84c]" />
            <span className="text-[10px] text-[#c9a84c]">✦</span>
            <div className="flex-1 h-px bg-gradient-to-l from-transparent to-[#c9a84c]" />
        </div>
    );
}

function DateTitle({ day, date, inView, delay = 0 }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay }}
            className="text-center mb-5"
        >
            {/* <p className="font-cinzel text-[9px] tracking-[4px] uppercase mb-1 text-[#a07830]">
                {day}
            </p> */}
            <p className="font-cinzel leading-none text-2xl text-[#3d2b1f]">
                {date}
            </p>
            {/* <div className="flex items-center gap-2 max-w-[120px] mx-auto mt-2">
                <div className="flex-1 h-px bg-gradient-to-r from-transparent to-[#c9a84c]" />
                <span className="text-[9px] text-[#c9a84c]">✦</span>
                <div className="flex-1 h-px bg-gradient-to-l from-transparent to-[#c9a84c]" />
            </div> */}
        </motion.div>
    );
}

function SmoothScrubber({ videoRef }) {
    const trackRef = useRef(null);
    const fillRef = useRef(null);
    const thumbRef = useRef(null);
    const rafRef = useRef(null);
    const isDragging = useRef(false);

    // RAF loop — updates DOM directly, zero React re-renders → buttery smooth
    useEffect(() => {
        const tick = () => {
            const v = videoRef.current;
            const fill = fillRef.current;
            const thumb = thumbRef.current;
            if (v && fill && thumb && v.duration && !isDragging.current) {
                const pct = (v.currentTime / v.duration) * 100;
                fill.style.width = `${pct}%`;
                thumb.style.left = `${pct}%`;
            }
            rafRef.current = requestAnimationFrame(tick);
        };
        rafRef.current = requestAnimationFrame(tick);
        return () => cancelAnimationFrame(rafRef.current);
    }, [videoRef]);

    const scrubTo = useCallback((e) => {
        const track = trackRef.current;
        const v = videoRef.current;
        if (!track || !v || !v.duration) return;
        const rect = track.getBoundingClientRect();
        const clientX = e.touches ? e.touches[0].clientX : e.clientX;
        const pct = Math.max(0, Math.min(1, (clientX - rect.left) / rect.width));
        v.currentTime = pct * v.duration;
        if (fillRef.current) fillRef.current.style.width = `${pct * 100}%`;
        if (thumbRef.current) thumbRef.current.style.left = `${pct * 100}%`;
    }, [videoRef]);

    const onPointerDown = useCallback((e) => {
        isDragging.current = true;
        scrubTo(e);
        const onMove = (ev) => scrubTo(ev);
        const onUp = () => {
            isDragging.current = false;
            window.removeEventListener('pointermove', onMove);
            window.removeEventListener('pointerup', onUp);
        };
        window.addEventListener('pointermove', onMove);
        window.addEventListener('pointerup', onUp);
    }, [scrubTo]);

    return (
        <div
            ref={trackRef}
            onPointerDown={onPointerDown}
            className="relative flex h-[18px] flex-1 cursor-pointer items-center"
        >
            {/* Track background */}
            <div className="absolute inset-x-0 top-1/2 h-[4px] -translate-y-1/2 rounded-full bg-[#3d2b1f]/20 shadow-inner" />

            {/* Fill */}
            <div
                ref={fillRef}
                className="pointer-events-none absolute left-0 top-1/2 h-[4px] -translate-y-1/2 rounded-full bg-gradient-to-r from-[#8a6420] via-[#e8c96a] to-[#c9a84c] shadow-[0_0_10px_rgba(232,201,106,0.35)] will-change-[width]"
                style={{ width: '0%' }}
            />

            {/* Thumb */}
            <div
                ref={thumbRef}
                className="pointer-events-none absolute top-1/2 h-[12px] w-[12px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#e8c96a] bg-[#3d2b1f] shadow-[0_0_10px_rgba(232,201,106,0.55)] will-change-[left]"
                style={{ left: '0%' }}
            />
        </div>
    );
}

function CeremonyVideo({ src, poster }) {
    const videoRef = useRef(null);
    const [hasEntered, setHasEntered] = useState(false);
    const [videoError, setVideoError] = useState(false);
    const [isPlaying, setIsPlaying] = useState(false);

    const [ref, inView] = useInView({ threshold: 0.45, triggerOnce: false });

    useEffect(() => {
        if (inView && !hasEntered) setHasEntered(true);
    }, [inView]);

    useEffect(() => {
        const v = videoRef.current;
        if (!v || videoError || !hasEntered) return;
        if (inView) {
            v.play().then(() => setIsPlaying(true)).catch(() => setVideoError(true));
        } else {
            v.pause();
            setIsPlaying(false);
        }
    }, [inView, videoError, hasEntered]);

    const togglePlay = useCallback(() => {
        const v = videoRef.current;
        if (!v) return;
        v.paused ? v.play() : v.pause();
    }, []);

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 36, scale: 0.96 }}
            animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            className="relative rounded-2xl overflow-hidden w-full min-h-[200px] bg-[#0d0d0d] shadow-[0_24px_64px_rgba(0,0,0,0.24),0_0_0_1px_rgba(201,168,76,0.22)]"
        >
            {!hasEntered && (
                <img src={poster} alt="" className="w-full h-full object-contain block" />
            )}
            {hasEntered && !videoError && (
                <video
                    ref={videoRef}
                    src={src}
                    poster={poster}
                    muted
                    loop
                    playsInline
                    preload="none"
                    onError={() => setVideoError(true)}
                    onPlay={() => setIsPlaying(true)}
                    onPause={() => setIsPlaying(false)}
                    className="w-full h-full object-contain block"
                />
            )}
            {hasEntered && videoError && (
                <img src={poster} alt="" className="w-full h-full object-contain block" />
            )}

            {Array.from({ length: 10 }).map((_, i) => (
                <RosePetal key={i} left={6 + (i * 9) % 88} />
            ))}

            {/* Bottom gradient overlay */}
            {/* <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-black/65 to-transparent" /> */}

            {/* Controls */}
            {hasEntered && !videoError && (
                <div className="absolute bottom-0 left-0 right-0 flex items-center gap-2.5 px-3 pb-3">
                    <button
                        onClick={togglePlay}
                        className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full border border-[#e8c96a]/70 bg-[#3d2b1f]/75 shadow-[0_0_14px_rgba(232,201,106,0.28)] backdrop-blur-md transition-all duration-300 hover:scale-105 hover:bg-[#2a1b12]"
                    >
                        {isPlaying ? (
                            <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                                <rect x="1.5" y="1" width="2.5" height="8" rx="0.8" fill="#e8c96a" />
                                <rect x="6" y="1" width="2.5" height="8" rx="0.8" fill="#e8c96a" />
                            </svg>
                        ) : (
                            <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                                <path d="M2 1L9 5L2 9V1Z" fill="#e8c96a" />
                            </svg>
                        )}
                    </button>
                    <SmoothScrubber videoRef={videoRef} />
                </div>
            )}

            {/* Live pulse */}
            {inView && !videoError && hasEntered && isPlaying && (
                <motion.div
                    className="absolute top-3 right-3 w-2 h-2 rounded-full bg-[#e8c96a]"
                    animate={{ opacity: [1, 0.3, 1], scale: [1, 1.5, 1] }}
                    transition={{ duration: 1.6, repeat: Infinity }}
                />
            )}
        </motion.div>
    );
}

export default function SacredCeremoniesSection() {
    const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.08 });

    return (
        <section
            ref={ref}
            className="min-h-screen px-6 pt-50 pb-24 relative overflow-hidden -mt-40 bg-gradient-to-b from-[#fdf8f0] via-[#faf3e0] to-[#fdf8f0]"
        >
            {Array.from({ length: 8 }).map((_, i) => (
                <motion.span
                    key={i}
                    animate={{ opacity: [0.12, 0.55, 0.12], scale: [0.8, 1.2, 0.8] }}
                    transition={{ duration: 2.5 + i * 0.4, repeat: Infinity, delay: i * 0.35 }}
                    className="absolute pointer-events-none text-[#c9a84c]"
                    style={{
                        fontSize: 9 + (i % 3) * 3,
                        top: `${5 + ((i * 12) % 85)}%`,
                        left: `${3 + ((i * 11.3) % 93)}%`,
                    }}
                >
                    ✦
                </motion.span>
            ))}

            <div className="max-w-[400px] mx-auto relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.75 }}
                    className="text-center mb-8"
                >
                    <p className="font-cinzel text-[10px] tracking-[4px] uppercase mb-3 text-[#a07830]">
                        Moments to Cherish
                    </p>
                    <h2 className="font-greatvibes leading-[1.05] mb-1 text-[62px] text-[#3d2b1f] drop-shadow-[0_2px_10px_rgba(201,168,76,0.22)]">
                        You are invited
                    </h2>
                    <GoldDivider />
                </motion.div>
                <CalligraphicFlourish
                    variant="corner-tr"
                    position={{ top: 150, right: 0 }}
                    color={{ primary: '#b45309', secondary: '#d97706' }}
                    delay={0.2}
                />
                <CalligraphicFlourish
                    variant="corner-bl"
                    position={{ bottom: -90, left: 0 }}
                    size={0.85}
                    delay={0.4}
                />
                <div className="flex flex-col gap-8">
                    {VIDEOS.map((video, i) => (
                        <div key={i}>
                            <DateTitle
                                day={video.day}
                                date={video.date}
                                inView={inView}
                                delay={0.15 + i * 0.1}
                            />
                            <CeremonyVideo src={video.src} poster={video.poster} />
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}