import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

export function RosePetal({ left }) {
    const dur = 4.5 + Math.random() * 4;
    const delay = Math.random() * 7;

    return (
        <motion.div
            animate={{
                y: ["0vh", "102vh"],
                x: [0, 18, -14, 22, -8],
                rotate: [0, 60, -45, 120, 200],
                opacity: [0, 0.85, 0.85, 0],
            }}
            transition={{ duration: dur, repeat: Infinity, delay, ease: "linear" }}
            className="absolute top-0 pointer-events-none z-[2]"
            style={{ left: `${left}%` }}
        >
            <svg width="18" height="22" viewBox="0 0 18 22" fill="none">
                <path
                    d="M9 1 C2.5 5 1 12 4.5 17 C6.5 20 12 21 14 18 C17.5 13.5 17 5.5 9 1Z"
                    fill="#e85d75"
                    opacity="0.72"
                />
                <path
                    d="M9 1 C13 5.5 14.5 12.5 12 17 C10 20 6 20 4.5 17 C7 13.5 9 7 9 1Z"
                    fill="#c0364f"
                    opacity="0.48"
                />
            </svg>
        </motion.div>
    );
}

export default function VenueSection() {
    const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.18 });

    const mapEmbedUrl =
        "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2861.7409777416915!2d79.86763927408006!3d23.128414612372485!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3981b36306ab629b%3A0x4abec8ac48e0dc29!2sSHAWN%20ELIZEY!5e1!3m2!1sen!2sin!4v1781182525172!5m2!1sen!2sin";

    const directionsUrl =
        "https://www.google.com/maps/search/?api=1&query=SHAWN%20ELIZEY%20Jabalpur%20Madhya%20Pradesh";

    return (
        <section
            ref={ref}
            className="relative min-h-[70vh] overflow-hidden px-6 pb-5 pt-5"
            style={{
                background:
                    "linear-gradient(180deg,#fdf8f0 0%,#fff5f7 55%,#fdf8f0 100%)",
            }}
        >
            {/* Soft background texture */}
            <div
                className="pointer-events-none absolute inset-0 z-0 opacity-70"
                style={{
                    backgroundImage: `
                        radial-gradient(circle at 18% 12%, rgba(201,168,76,0.14), transparent 28%),
                        radial-gradient(circle at 82% 28%, rgba(185,99,78,0.10), transparent 26%),
                        radial-gradient(circle at 50% 100%, rgba(201,168,76,0.10), transparent 34%)
                    `,
                }}
            />

            <div className="relative z-3 mx-auto max-w-105">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 18 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.7 }}
                    className="mb-9 text-center"
                >
                    <p className="font-cinzel mb-5 text-xs uppercase tracking-widest text-gold-dark">
                        Join Us At
                    </p>

                    <h2 className="font-greatvibes mb-2.5 text-[68px] leading-[1.1] text-brown">
                        The Venue
                    </h2>

                    <div className="flex items-center justify-center gap-2.5">
                        <div
                            className="h-px flex-1"
                            style={{
                                background:
                                    "linear-gradient(to right,transparent,#c9a84c)",
                            }}
                        />
                        <span className="text-[14px]">🌹</span>
                        <div
                            className="h-px flex-1"
                            style={{
                                background:
                                    "linear-gradient(to left,transparent,#c9a84c)",
                            }}
                        />
                    </div>
                </motion.div>

                {/* Main Card */}
                <motion.div
                    initial={{ opacity: 0, y: 28 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.85, delay: 0.18 }}
                    className="overflow-hidden rounded-[26px]"
                    style={{
                        background: "linear-gradient(135deg,#fff,#fffdf8)",
                        border: "1px solid rgba(201,168,76,0.32)",
                        boxShadow:
                            "0 24px 70px rgba(88,54,30,0.12), inset 0 0 0 1px rgba(255,255,255,0.65)",
                    }}
                >
                    {/* Venue Info */}
                    <div className="px-6 pb-5 pt-6 text-center">
                        {/* <p className="font-cinzel mb-2 text-[10px] uppercase tracking-[3px] text-[#a07830]">
                            Wedding Destination
                        </p> */}

                        <h3 className="font-display text-[23px] font-semibold leading-tight text-brown">
                            Shawn Elizey
                        </h3>

                        <p className="font-body mt-1 text-[12px] leading-[1.6] text-brown-muted">
                            Jabalpur, Madhya Pradesh
                        </p>
                    </div>

                    {/* Beautiful Map Frame */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.97 }}
                        animate={inView ? { opacity: 1, scale: 1 } : {}}
                        transition={{ duration: 0.7, delay: 0.45 }}
                        className="relative mx-5 mb-5 overflow-hidden rounded-[22px]"
                        style={{
                            border: "1px solid rgba(201,168,76,0.32)",
                            boxShadow:
                                "0 18px 42px rgba(88,54,30,0.14), 0 0 0 8px rgba(201,168,76,0.07)",
                        }}
                    >
                        {/* Decorative top label */}
                        <div className="absolute left-1/2 top-3 z-[3] -translate-x-1/2 rounded-full border border-white/55 bg-white/85 px-4 py-2 shadow-lg backdrop-blur-md">
                            <p className="font-cinzel whitespace-nowrap text-[9px] font-semibold uppercase tracking-[2px] text-[#8a6429]">
                                Find Our Celebration Here
                            </p>
                        </div>

                        {/* Map */}
                        <iframe
                            src={mapEmbedUrl}
                            width="100%"
                            height="245"
                            className="block border-0"
                            allowFullScreen
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                            title="Shawn Elizey, Jabalpur"
                        />

                        {/* Soft golden overlay so map does not look basic */}
                        <div
                            className="pointer-events-none absolute inset-0 z-[2]"
                            style={{
                                background:
                                    "linear-gradient(180deg,rgba(255,250,239,0.16) 0%,transparent 34%,rgba(92,54,31,0.18) 100%)",
                            }}
                        />

                        {/* Floating bottom venue chip */}
                        <div className="absolute bottom-3 left-3 right-3 z-[3] rounded-2xl border border-white/45 bg-white/88 px-4 py-3 shadow-xl backdrop-blur-md">
                            <div className="flex items-center gap-3">
                                <div
                                    className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-[17px]"
                                    style={{
                                        background:
                                            "linear-gradient(135deg,#f4dfaa,#c9a84c)",
                                        color: "#5b351f",
                                    }}
                                >
                                    📍
                                </div>

                                <div className="min-w-0 text-left">
                                    <p className="font-display truncate text-[14px] font-semibold text-brown">
                                        Shawn Elizey
                                    </p>
                                    <p className="font-body truncate text-[11px] text-brown-muted">
                                        Jabalpur, Madhya Pradesh
                                    </p>
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    {/* Button */}
                    <div className="px-6 pb-6">
                        <motion.a
                            href={directionsUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            whileHover={{ scale: 1.025 }}
                            whileTap={{ scale: 0.975 }}
                            className="block rounded-xl py-3.5 text-center font-body text-[11px] font-semibold uppercase tracking-[2px] text-white no-underline"
                            style={{
                                background:
                                    "linear-gradient(135deg,#c9a84c,#a07830)",
                                boxShadow: "0 8px 22px rgba(201,168,76,0.34)",
                            }}
                        >
                            📍 Get Directions
                        </motion.a>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}