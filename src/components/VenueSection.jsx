import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import CalligraphicFlourish from './CalligraphicFlourish';

export function RosePetal({ left }) {
    const dur = 4.5 + Math.random() * 4;
    const delay = Math.random() * 7;
    return (
        <motion.div
            animate={{
                y: ['0vh', '102vh'],
                x: [0, 18, -14, 22, -8],
                rotate: [0, 60, -45, 120, 200],
                opacity: [0, 0.85, 0.85, 0],
            }}
            transition={{ duration: dur, repeat: Infinity, delay, ease: 'linear' }}
            className="absolute top-0 pointer-events-none z-[2]"
            style={{ left: `${left}%` }}
        >
            <svg width="18" height="22" viewBox="0 0 18 22" fill="none">
                <path d="M9 1 C2.5 5 1 12 4.5 17 C6.5 20 12 21 14 18 C17.5 13.5 17 5.5 9 1Z" fill="#e85d75" opacity="0.72" />
                <path d="M9 1 C13 5.5 14.5 12.5 12 17 C10 20 6 20 4.5 17 C7 13.5 9 7 9 1Z" fill="#c0364f" opacity="0.48" />
            </svg>
        </motion.div>
    );
}

export default function VenueSection() {
    const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.18 });

    return (
        <section
            ref={ref}
            className="min-h-[70vh] pt-5 pb-5 px-6 relative overflow-hidden"
        >
            {/* ── Base background color ── */}
            <div className="absolute inset-0 z-0" style={{ background: '#fdf5e8' }} />

            {/* ── Tiled texture.svg ── */}
            <div
                aria-hidden="true"
                className="absolute inset-0 pointer-events-none z-[1]"
                style={{
                    backgroundImage: 'url(/texture.svg)',
                    backgroundRepeat: 'repeat',
                    backgroundSize: 'auto',
                    opacity: 0.1,
                }}
            />

            {/* ── Top fade — blends into section above (#fdf7ee) ── */}
            <div
                aria-hidden="true"
                className="absolute top-0 left-0 right-0 pointer-events-none z-[2]"
                style={{
                    height: '140px',
                    background: 'linear-gradient(to bottom, #fdf7ee 0%, transparent 100%)',
                }}
            />

            {/* ── Bottom fade — blends into section below (#fcf4ec) ── */}
            <div
                aria-hidden="true"
                className="absolute bottom-0 left-0 right-0 pointer-events-none z-[2]"
                style={{
                    height: '140px',
                    background: 'linear-gradient(to top, #fcf4ec 0%, transparent 100%)',
                }}
            />

            <div className="max-w-105 mx-auto relative z-[3]">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 18 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.7 }}
                    className="text-center mb-9"
                >
                    <p className="font-cinzel text-xs tracking-widest uppercase text-gold-dark mb-5">Join Us At</p>
                    <h2 className="font-greatvibes text-[68px] text-brown leading-[1.1] mb-2.5">The Venue</h2>
                    <div className="flex items-center gap-2.5 justify-center">
                        <div className="flex-1 h-px" style={{ background: 'linear-gradient(to right,transparent,#c9a84c)' }} />
                        <span className="text-[14px]">🌹</span>
                        <div className="flex-1 h-px" style={{ background: 'linear-gradient(to left,transparent,#c9a84c)' }} />
                    </div>
                </motion.div>
                <CalligraphicFlourish
                    variant="mid-right"
                    position={{ top: '28%', right: 0 }}
                    delay={0.5}
                />
                {/* Card */}
                <motion.div
                    initial={{ opacity: 0, y: 28 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.85, delay: 0.18 }}
                    className="rounded-2xl overflow-hidden"
                    style={{
                        background: 'linear-gradient(135deg,#fff,#fffdf8)',
                        border: '1px solid rgba(201,168,76,0.28)',
                        // boxShadow: '0 18px 56px rgba(0,0,0,0.07)',
                    }}
                >
                    {/* Details */}
                    <div className="p-6">
                        <div className="flex items-start gap-3 mb-5">
                            <span className="text-xl mt-0.5">📍</span>
                            <div>
                                <p className="font-display text-[16px] font-semibold text-brown mb-[3px]">
                                    Jabalpur
                                </p>
                                <p className="font-body text-[12px] text-brown-muted leading-[1.5]">
                                    Jabalpur, Madhya Pradesh
                                </p>
                            </div>
                        </div>

                        {/* Map embed */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.97 }}
                            animate={inView ? { opacity: 1, scale: 1 } : {}}
                            transition={{ duration: 0.7, delay: 0.5 }}
                            className="rounded-[10px] overflow-hidden"
                            style={{ border: '1px solid rgba(201,168,76,0.2)' }}
                        >
                            <iframe
                                src="https://www.google.com/maps?q=Jabalpur,+Madhya+Pradesh&output=embed"
                                width="100%"
                                height="195"
                                className="block border-0"
                                allowFullScreen=""
                                loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade"
                                title="Jabalpur, Madhya Pradesh"
                            />
                        </motion.div>

                        <motion.a
                            href="https://www.google.com/maps/place/Jabalpur,+Madhya+Pradesh/@23.1768912,79.8830625,12.25z/data=!4m6!3m5!1s0x3981ae1a0fb6a97d:0x44020616bc43e3b9!8m2!3d23.1685786!4d79.9338798!16zL20vMDJkcm5r?entry=ttu&g_ep=EgoyMDI2MDUyNi4wIKXMDSoASAFQAw%3D%3D"
                            target="_blank"
                            rel="noopener noreferrer"
                            whileHover={{ scale: 1.025 }}
                            whileTap={{ scale: 0.975 }}
                            className="block mt-3.5 rounded-lg py-3 text-center text-white no-underline font-body text-[11px] tracking-[2px] uppercase font-semibold"
                            style={{
                                background: 'linear-gradient(135deg,#c9a84c,#a07830)',
                                boxShadow: '0 4px 16px rgba(201,168,76,0.32)',
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