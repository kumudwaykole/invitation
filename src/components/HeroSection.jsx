import { motion } from 'framer-motion';

const DOOR_DURATION = 1.5;
const DOOR_DELAY = 0.4;
const CONTENT_OFFSET = DOOR_DELAY + DOOR_DURATION - 0.3; // content starts while doors finishing

const fadeUp = (delay = 0) => ({
    initial: { opacity: 0, y: 28 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.9, delay: CONTENT_OFFSET + delay, ease: [0.22, 1, 0.36, 1] },
});

const fontStyle = `
  @import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@600;700;800&display=swap');
  .name-cinzel {
    font-family: 'Cinzel', serif;
    font-weight: 700;
    letter-spacing: 0.08em;
  }
`;

// ─── Replace these with your own image URLs ───────────────────────────────────
const LEFT_IMAGE_URL = '/left.webp';
const RIGHT_IMAGE_URL = '/right.webp';
const BG_IMAGE_URL = 'https://images.unsplash.com/photo-1607190074257-dd4b7af0309f?w=1600&q=80';
// ─────────────────────────────────────────────────────────────────────────────

const doorEase = [0.76, 0, 0.24, 1];

export default function HeroSection() {
    return (
        <>
            <style>{fontStyle}</style>

            {/*
             * Outer wrapper: full viewport height, clips both door panels
             * so they slide off-screen cleanly.
             */}
            <div className="relative w-full overflow-hidden" style={{ height: '100dvh', minHeight: '100vh' }}>

                {/* ── Background image ──────────────────────────────────────── */}
                <div
                    className="absolute inset-0 z-0"
                    style={{
                        backgroundImage: `url('${BG_IMAGE_URL}')`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        backgroundRepeat: 'no-repeat',
                    }}
                />
                {/* warm overlay over BG */}
                <div
                    className="absolute inset-0 z-0"
                    style={{
                        background: `
                          radial-gradient(circle at top, rgba(255,248,220,0.72) 0%, transparent 40%),
                          radial-gradient(circle at bottom, rgba(201,168,76,0.18) 0%, transparent 35%),
                          linear-gradient(180deg,rgba(252,247,239,0.82) 0%,rgba(246,236,220,0.75) 45%,rgba(253,248,240,0.82) 100%)
                        `,
                    }}
                />

                {/* ── Main section (scrollable content area) ────────────────── */}
                <section
                    className="relative z-10 flex flex-col items-center justify-center px-2 py-7"
                    style={{ height: '100%' }}
                >
                    {/* Decorative corner frames */}
                    {[
                        { top: 16, left: 16, borderTop: true, borderLeft: true },
                        { top: 16, right: 16, borderTop: true, borderRight: true },
                        { bottom: 16, left: 16, borderBottom: true, borderLeft: true },
                        { bottom: 16, right: 16, borderBottom: true, borderRight: true },
                    ].map((pos, i) => (
                        <div
                            key={i}
                            className="pointer-events-none absolute w-14 h-14 z-10"
                            style={{
                                top: pos.top, right: pos.right, bottom: pos.bottom, left: pos.left,
                                borderTop: pos.borderTop ? '1.5px solid rgba(201,168,76,0.9)' : undefined,
                                borderLeft: pos.borderLeft ? '1.5px solid rgba(201,168,76,0.9)' : undefined,
                                borderRight: pos.borderRight ? '1.5px solid rgba(201,168,76,0.9)' : undefined,
                                borderBottom: pos.borderBottom ? '1.5px solid rgba(201,168,76,0.9)' : undefined,
                            }}
                        />
                    ))}

                    {/* Outer glow orb */}
                    <motion.div
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ duration: 2.5, delay: CONTENT_OFFSET, ease: 'easeOut' }}
                        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-130 h-130 rounded-full pointer-events-none z-0"
                        style={{ background: 'radial-gradient(circle,rgba(255,253,200,0.95) 0%,rgba(255,248,168,0.65) 35%,rgba(253,248,240,0.18) 70%,transparent 85%)' }}
                    />
                    {/* Inner glow orb */}
                    <motion.div
                        initial={{ scale: 0.6, opacity: 0 }}
                        animate={{ scale: [0.6, 1.08, 1], opacity: 1 }}
                        transition={{ duration: 3.2, delay: CONTENT_OFFSET, ease: 'easeOut' }}
                        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-65 h-65 rounded-full blur-[22px] pointer-events-none z-0"
                        style={{ background: 'radial-gradient(circle,rgba(255,255,220,1) 0%,rgba(255,252,180,0.85) 45%,transparent 78%)' }}
                    />

                    {/* ── Content ─────────────────────────────────────────────── */}
                    <div className="relative z-10 text-center max-w-90 w-full">

                        <motion.div
                            {...fadeUp(0)}
                            className="text-base font-dancing text-gold mb-5 font-serif text-amber-950 leading-loose"
                            style={{ filter: 'drop-shadow(0 2px 8px rgba(201,168,76,0.4))' }}
                        >
                            <div>|| श्री महावीराय नमः ||</div>
                            <div>|| श्री गणेशाय नमः ||</div>
                        </motion.div>

                        <motion.blockquote
                            {...fadeUp(0.2)}
                            className="font-serif italic text-[24px] text-brown-light leading-9 mb-5 px-2"
                        >
                            "We cordially invite you to join us
                            for Wedding of "
                        </motion.blockquote>

                        <motion.div {...fadeUp(0.5)} className="flex items-center gap-2.5 mb-7">
                            <div className="flex-1 h-px" style={{ background: 'linear-gradient(to right,transparent,#c9a84c)' }} />
                            <span className="text-gold text-[13px]">✦</span>
                            <div className="flex-1 h-px" style={{ background: 'linear-gradient(to left,transparent,#c9a84c)' }} />
                        </motion.div>

                        {/* Groom */}
                        <motion.h1
                            {...fadeUp(0.6)}
                            className="name-cinzel text-[52px] text-brown leading-[1.1] mb-1 uppercase"
                            style={{ filter: 'drop-shadow(0 2px 10px rgba(201,168,76,0.18))' }}
                        >
                            Pranav
                        </motion.h1>
                        <motion.p {...fadeUp(0.65)} className="font-body text-xs tracking-wide font-bold text-amber-950 uppercase mb-1.5 whitespace-nowrap">
                            Grand S/O Sau Sharda &amp; Shri Kantilalji Kothari
                        </motion.p>
                        <motion.p {...fadeUp(0.65)} className="font-body text-[10px] tracking-widest font-bold text-amber-950 uppercase mb-1.5">
                            (Pirgal)
                        </motion.p>
                        <motion.p {...fadeUp(0.65)} className="font-body text-xs tracking-widest font-bold text-amber-950 uppercase mb-5.5">
                            S/O of Anamika &amp; Hemant Kothari
                        </motion.p>

                        <motion.div
                            {...fadeUp(0.75)}
                            className="font-cormorant text-xl tracking-[4px] font-bold text-brown-muted uppercase leading-none my-3"
                        >
                            and
                        </motion.div>

                        {/* Bride */}
                        <motion.h1
                            {...fadeUp(0.85)}
                            className="name-cinzel text-[52px] text-brown leading-[1.1] mb-1 uppercase"
                            style={{ filter: 'drop-shadow(0 2px 10px rgba(201,168,76,0.18))' }}
                        >
                            Tejaswi
                        </motion.h1>
                        <motion.p {...fadeUp(0.65)} className="font-body text-xs tracking-wide font-bold text-amber-950 uppercase mb-1.5 whitespace-nowrap">
                            Grand D/O Late. Jatan Devi &amp; Shri Jagat SinghJi Kothari
                        </motion.p>
                        <motion.p {...fadeUp(0.65)} className="font-body text-[10px] tracking-widest font-bold text-amber-950 uppercase mb-1.5">
                            (Chopra)
                        </motion.p>
                        <motion.p {...fadeUp(1.0)} className="font-body text-xs tracking-widest font-bold text-amber-950 uppercase mb-11">
                            D/O of Priyanka &amp; Sandeepji Kothari
                        </motion.p>

                        {/* Scroll hint */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: CONTENT_OFFSET + 1.3 }}
                            className="flex flex-col items-center gap-3 pt-5"
                        >
                            {/* <div
                                className="relative overflow-hidden px-4 py-1.5 rounded-full"
                                style={{
                                    background: 'linear-gradient(135deg, #b8922a 0%, #e8c96a 40%, #c9a84c 60%, #8a6420 100%)',
                                    border: '1px solid rgba(255,220,100,0.6)',
                                    boxShadow: '0 2px 12px rgba(201,168,76,0.45), inset 0 1px 0 rgba(255,255,200,0.3)',
                                }}
                            >
                                <motion.div
                                    animate={{ x: ['-120%', '220%'] }}
                                    transition={{ duration: 2.2, repeat: Infinity, repeatDelay: 1.5, ease: 'easeInOut' }}
                                    className="absolute inset-0 pointer-events-none"
                                    style={{
                                        background: 'linear-gradient(105deg, transparent 30%, rgba(255,255,220,0.55) 50%, transparent 70%)',
                                        width: '60%',
                                    }}
                                />
                                <span
                                    className="relative z-10 font-body text-[10px] font-bold italic tracking-[3px] uppercase"
                                    style={{ color: '#3d2200', textShadow: '0 1px 2px rgba(255,220,100,0.4)' }}
                                >
                                    Scroll down
                                </span>
                            </div> */}
                            {/* <div
                                className="relative flex items-start justify-center"
                                style={{
                                    width: 28, height: 44, borderRadius: 14,
                                    border: '1.5px solid #c9a84c',
                                    background: 'linear-gradient(180deg, rgba(201,168,76,0.18) 0%, rgba(201,168,76,0.04) 100%)',
                                    boxShadow: '0 0 10px rgba(201,168,76,0.25), inset 0 1px 0 rgba(255,220,100,0.2)',
                                }}
                            >
                                <motion.div
                                    animate={{ y: [4, 20, 4], opacity: [1, 0.2, 1] }}
                                    transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
                                    style={{
                                        width: 5, height: 5, marginTop: 5, borderRadius: '50%',
                                        background: 'radial-gradient(circle, #ffe680 0%, #c9a84c 100%)',
                                        boxShadow: '0 0 6px rgba(201,168,76,0.8)',
                                    }}
                                />
                            </div> */}
                        </motion.div>
                    </div>
                </section>

                {/* ── LEFT DOOR ──────────────────────────────────────────────── */}
                <motion.div
                    className="absolute top-0 left-0 z-20"
                    style={{ width: '50%', height: '100%' }}
                    initial={{ x: 0 }}
                    animate={{ x: '-100%' }}
                    transition={{ duration: DOOR_DURATION, delay: DOOR_DELAY, ease: doorEase }}
                >
                    {/* image */}
                    <div
                        style={{
                            width: '100%', height: '100%',
                            backgroundImage: `url('${LEFT_IMAGE_URL}')`,
                            backgroundSize: 'cover',
                            backgroundPosition: 'center right',
                        }}
                    />
                    {/* golden inner edge glow */}
                    <div
                        style={{
                            position: 'absolute', top: 0, right: 0, width: 60, height: '100%',
                            background: 'linear-gradient(to left, rgba(201,168,76,0.0), rgba(201,168,76,0.35))',
                            pointerEvents: 'none',
                        }}
                    />
                    {/* thin gold seam on right edge */}
                    <div
                        style={{
                            position: 'absolute', top: 0, right: 0, width: 2, height: '100%',
                            background: 'linear-gradient(to bottom, transparent, #c9a84c 20%, #e8c96a 50%, #c9a84c 80%, transparent)',
                            pointerEvents: 'none',
                        }}
                    />
                    {/* warm overlay */}
                    <div
                        style={{
                            position: 'absolute', inset: 0,
                            background: 'rgba(252,244,228,0.22)',
                            pointerEvents: 'none',
                        }}
                    />
                </motion.div>

                {/* ── RIGHT DOOR ─────────────────────────────────────────────── */}
                <motion.div
                    className="absolute top-0 right-0 z-20"
                    style={{ width: '50%', height: '100%' }}
                    initial={{ x: 0 }}
                    animate={{ x: '100%' }}
                    transition={{ duration: DOOR_DURATION, delay: DOOR_DELAY, ease: doorEase }}
                >
                    {/* image */}
                    <div
                        style={{
                            width: '100%', height: '100%',
                            backgroundImage: `url('${RIGHT_IMAGE_URL}')`,
                            backgroundSize: 'cover',
                            backgroundPosition: 'center left',
                        }}
                    />
                    {/* golden inner edge glow */}
                    <div
                        style={{
                            position: 'absolute', top: 0, left: 0, width: 60, height: '100%',
                            background: 'linear-gradient(to right, rgba(201,168,76,0.0), rgba(201,168,76,0.35))',
                            pointerEvents: 'none',
                        }}
                    />
                    {/* thin gold seam on left edge */}
                    <div
                        style={{
                            position: 'absolute', top: 0, left: 0, width: 2, height: '100%',
                            background: 'linear-gradient(to bottom, transparent, #c9a84c 20%, #e8c96a 50%, #c9a84c 80%, transparent)',
                            pointerEvents: 'none',
                        }}
                    />
                    {/* warm overlay */}
                    <div
                        style={{
                            position: 'absolute', inset: 0,
                            background: 'rgba(252,244,228,0.22)',
                            pointerEvents: 'none',
                        }}
                    />
                </motion.div>

            </div>
        </>
    );
}