import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

const CARDS = [
    {
        caption: "How it started…",
        src: "/whenitstarted.jpeg",
        rotation: -5,
        tape: true,
        tapeAngle: -12,
        tag: "first spark",
    },
    {
        caption: "When we knew…",
        src: "/engagement-1.jpg",
        rotation: 3,
        tape: true,
        tapeAngle: 8,
        tag: "soft smiles",
    },
    {
        caption: "Made it official…",
        src: "/engagement.jpg",
        rotation: -2,
        tape: true,
        tapeAngle: -6,
        tag: "forever begins",
    },
];

const fontStyle = `
  @import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@600;700&family=Cormorant+Garamond:ital,wght@0,400;1,400;1,600&family=Dancing+Script:wght@600;700&family=Great+Vibes&display=swap');

  .story-cinzel { font-family: 'Cinzel', serif; }
  .story-script { font-family: 'Dancing Script', cursive; }
  .story-great { font-family: 'Great Vibes', cursive; }
  .story-cormorant { font-family: 'Cormorant Garamond', serif; }

  @keyframes floatY {
    0%, 100% { transform: translateY(0) scale(0.9); opacity: 0.18; }
    50% { transform: translateY(-10px) scale(1.15); opacity: 0.78; }
  }

  @keyframes blobFloat1 {
    0%, 100% { transform: translateY(0) scale(1); }
    50% { transform: translateY(20px) scale(1.08); }
  }

  @keyframes blobFloat2 {
    0%, 100% { transform: translateY(0) scale(1); }
    50% { transform: translateY(-18px) scale(1.1); }
  }

  @keyframes spinHeart {
    0%, 100% { transform: translateX(-50%) translateY(-50%) rotate(0deg); }
    25% { transform: translateX(-50%) translateY(-50%) rotate(8deg); }
    75% { transform: translateX(-50%) translateY(-50%) rotate(-8deg); }
  }

  @keyframes stickerBob {
    0%, 100% { transform: translateY(0) rotate(12deg); }
    50% { transform: translateY(-5px) rotate(17deg); }
  }

  .story-blob-1 {
    animation: blobFloat1 7s ease-in-out infinite;
  }
  .story-blob-2 {
    animation: blobFloat2 8s ease-in-out infinite;
  }
  .story-heart-spin {
    animation: spinHeart 4s ease-in-out infinite;
    position: absolute;
    left: 50%;
    top: 50%;
  }
  .story-sticker {
    animation: stickerBob 3.4s ease-in-out infinite;
  }

  .polaroid-card {
    transition: transform 0.3s ease, z-index 0s;
    will-change: transform;
  }
  .polaroid-card:hover {
    transform: scale(1.045) rotate(0deg) translateY(-8px) !important;
    z-index: 30;
  }
`;

function Tape({ angle }) {
    return (
        <div
            className="pointer-events-none absolute -top-[15px] left-1/2 z-20"
            style={{
                transform: `translateX(-50%) rotate(${angle}deg)`,
                width: 62,
                height: 24,
                borderRadius: 4,
                background:
                    "repeating-linear-gradient(45deg, rgba(255,244,214,0.88) 0 7px, rgba(244,205,175,0.72) 7px 14px)",
                boxShadow: "0 4px 12px rgba(55, 28, 15, 0.14)",
                border: "1px solid rgba(255,236,198,0.45)",
            }}
        />
    );
}

function FloatingRomanticElements() {
    const items = [
        { text: "♡", top: "9%", left: "8%", size: 18, delay: 0 },
        { text: "✦", top: "15%", left: "86%", size: 13, delay: 0.4 },
        { text: "love", top: "26%", left: "4%", size: 15, delay: 0.8 },
        { text: "♡", top: "38%", left: "91%", size: 20, delay: 1.1 },
        { text: "✧", top: "55%", left: "7%", size: 14, delay: 1.4 },
        { text: "∞", top: "67%", left: "88%", size: 20, delay: 1.8 },
        { text: "♡", top: "82%", left: "12%", size: 16, delay: 2.2 },
        { text: "✦", top: "88%", left: "78%", size: 13, delay: 2.5 },
    ];

    return (
        <>
            {items.map((item, i) => (
                <span
                    key={i}
                    className="pointer-events-none absolute z-[2] select-none"
                    style={{
                        top: item.top,
                        left: item.left,
                        fontSize: item.size,
                        color: i % 2 === 0 ? "#f6d7c5" : "#d8b86a",
                        fontFamily: item.text === "love" ? "'Dancing Script', cursive" : "serif",
                        textShadow: "0 6px 18px rgba(0,0,0,0.18)",
                        animation: `floatY ${3.2 + i * 0.22}s ease-in-out infinite`,
                        animationDelay: `${item.delay}s`,
                    }}
                >
                    {item.text}
                </span>
            ))}
        </>
    );
}

function RibbonLine({ inView }) {
    return (
        <motion.div
            className="relative mx-auto mb-9 mt-2 h-[34px] w-full max-w-[260px]"
            initial={{ opacity: 0, scaleX: 0.65 }}
            animate={inView ? { opacity: 1, scaleX: 1 } : {}}
            transition={{ duration: 0.9, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
        >
            <div className="absolute left-0 top-1/2 h-px w-full -translate-y-1/2 bg-gradient-to-r from-transparent via-[#d9b777] to-transparent" />
            <div className="absolute left-1/2 top-1/2 flex h-9 w-9 items-center justify-center rounded-full border border-[#f6d7c5]/60 bg-[#5a351f]/90 shadow-[0_8px_26px_rgba(31,14,8,0.25)]">
                <span className="story-heart-spin text-[16px] text-[#ffd8c6]">♡</span>
            </div>
        </motion.div>
    );
}

function LoveNote({ inView }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 26, rotate: -3 }}
            animate={inView ? { opacity: 1, y: 0, rotate: -2 } : {}}
            transition={{ duration: 0.8, delay: 0.48, ease: [0.22, 1, 0.36, 1] }}
            className="relative mx-auto mb-12 max-w-[310px] rounded-[24px] border border-[#f4d7c8]/25 bg-[#fff4e8]/10 px-5 py-4 text-center shadow-[0_16px_42px_rgba(31,14,8,0.18)] backdrop-blur-sm"
        >
            <div className="absolute -left-3 -top-3 flex h-8 w-8 rotate-[-12deg] items-center justify-center rounded-full bg-[#f6d7c5] text-[#6b3d24] shadow-md">
                ♡
            </div>
            <div className="absolute -right-2 -top-2 h-8 w-8 rounded-full border border-[#d8b86a]/40 bg-[#6a3d23] shadow-md">
                <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-[54%] text-[15px] text-[#f7ddb3]">
                    ✦
                </span>
            </div>
            <p className="story-cormorant text-[15px] italic leading-[1.65] text-[#ffe9d7]">
                From little smiles to forever promises, every moment became a page of our
                sweetest story.
            </p>
        </motion.div>
    );
}

function Polaroid({ card, index }) {
    const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.12 });

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 95 + index * 18, rotate: card.rotation * 2, scale: 0.88 }}
            animate={inView ? { opacity: 1, y: 0, rotate: card.rotation, scale: 1 } : {}}
            transition={{ duration: 0.9, delay: index * 0.16, ease: [0.22, 1, 0.36, 1] }}
            className="polaroid-card relative mx-auto cursor-default"
            style={{ width: 262, zIndex: 10 + index, rotate: `${card.rotation}deg` }}
        >
            {card.tape && <Tape angle={card.tapeAngle} />}

            {/* Floating sticker — CSS animation */}
            <div
                className="story-sticker absolute -right-4 top-8 z-40 flex h-10 w-10 items-center justify-center rounded-full bg-[#f6d7c5] text-[#6a3d23] shadow-[0_8px_22px_rgba(35,15,8,0.2)]"
            >
                ♡
            </div>

            {/* Polaroid body */}
            <div
                className="relative overflow-visible rounded-[8px] bg-[#fffaf4]"
                style={{
                    padding: "13px 13px 48px",
                    boxShadow:
                        "0 18px 48px rgba(22, 10, 5, 0.28), 0 3px 10px rgba(0,0,0,0.10)",
                    outline: "1px solid rgba(255,232,202,0.65)",
                }}
            >
                {/* Tag */}
                <div className="absolute left-4 top-4 z-10 rounded-full bg-[#4d2d1d]/75 px-2.5 py-1 backdrop-blur-sm">
                    <p className="story-cinzel text-[7px] uppercase tracking-[1.8px] text-[#ffe1cc]">
                        {card.tag}
                    </p>
                </div>

                {/* Photo */}
                <div className="relative h-[224px] w-full overflow-hidden rounded-[5px] bg-[#f7eadb]">
                    <img
                        src={card.src}
                        alt={card.caption}
                        className="h-full w-full object-cover"
                        style={{ display: "block" }}
                        onError={(e) => {
                            e.currentTarget.style.display = "none";
                            e.currentTarget.parentElement.style.background =
                                "linear-gradient(135deg,#fff1e4,#ead0bd,#f9e7d4)";
                            if (!e.currentTarget.parentElement.querySelector(".ph-label")) {
                                const el = document.createElement("div");
                                el.className = "ph-label";
                                el.style.cssText =
                                    "position:absolute;inset:0;display:flex;align-items:center;justify-content:center;font-family:Great Vibes,cursive;font-size:26px;color:rgba(92,61,30,0.72);";
                                el.textContent = "Pranav ♥ Tejaswi";
                                e.currentTarget.parentElement.appendChild(el);
                            }
                        }}
                    />
                    {/* Single vignette — replaced the two radial-gradient layers */}
                    <div
                        className="pointer-events-none absolute inset-0"
                        style={{
                            background: "radial-gradient(ellipse at center, transparent 55%, rgba(55,25,12,0.22) 100%)",
                        }}
                    />
                    <div className="pointer-events-none absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-[#2b1309]/35 to-transparent" />
                </div>

                {/* Caption */}
                <p
                    className="story-script mt-3 text-center leading-none"
                    style={{ fontSize: 23, color: "#5c3d1e" }}
                >
                    {card.caption}
                </p>

                <div className="absolute bottom-3 left-4 text-[13px] text-[#d7a487]">♡</div>
                <div className="absolute bottom-3 right-4 text-[12px] text-[#c9a84c]">✦</div>
            </div>
        </motion.div>
    );
}

export default function OurStorySection() {
    const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.06 });

    return (
        <>
            <style>{fontStyle}</style>

            <section
                ref={ref}
                className="relative z-20 -mt-40 min-h-screen overflow-hidden rounded-[3.5rem] bg-amber-950 px-7 pb-[5.5rem] pt-[5.5rem]"
            >
                {/* Texture */}
                <div
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-0"
                    style={{
                        backgroundImage: "url(/texture.svg)",
                        backgroundRepeat: "repeat",
                        backgroundSize: "auto",
                        opacity: 0.12,
                    }}
                />

                {/* Single subtle color wash — replaced 4-layer radial stack */}
                <div
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-0"
                    style={{
                        background:
                            "radial-gradient(circle at 18% 12%, rgba(246,215,197,0.18), transparent 28%)",
                    }}
                />

                {/* Blobs — CSS animations, no JS */}
                <div
                    aria-hidden="true"
                    className="story-blob-1 absolute -left-20 top-24 h-44 w-44 rounded-full bg-[#f6d7c5]/20 blur-3xl"
                />
                <div
                    aria-hidden="true"
                    className="story-blob-2 absolute -right-24 bottom-28 h-52 w-52 rounded-full bg-[#d8b86a]/15 blur-3xl"
                />

                <FloatingRomanticElements />

                <div className="relative z-10 mx-auto max-w-[400px]">
                    {/* Header */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={inView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.75 }}
                        className="mb-8 text-center"
                    >
                        <motion.p
                            initial={{ opacity: 0, y: 8 }}
                            animate={inView ? { opacity: 1, y: 0 } : {}}
                            transition={{ duration: 0.7, delay: 0.08 }}
                            className="story-cinzel mb-3 text-[10px] uppercase tracking-[4px] text-amber-200"
                        >
                            A Journey of Two Hearts
                        </motion.p>

                        <motion.h2
                            initial={{ opacity: 0, scale: 0.94 }}
                            animate={inView ? { opacity: 1, scale: 1 } : {}}
                            transition={{ duration: 0.75, delay: 0.12 }}
                            className="story-great mb-2 text-[68px] leading-[0.95] text-amber-50"
                            style={{
                                textShadow:
                                    "0 8px 24px rgba(31,14,8,0.35), 0 0 28px rgba(246,215,197,0.14)",
                            }}
                        >
                            Our Story
                        </motion.h2>

                        <motion.div
                            initial={{ opacity: 0, y: 8 }}
                            animate={inView ? { opacity: 1, y: 0 } : {}}
                            transition={{ duration: 0.7, delay: 0.2 }}
                            className="mx-auto mb-4 inline-flex items-center gap-2 rounded-full border border-[#f6d7c5]/25 bg-[#fff3e6]/10 px-4 py-1.5 backdrop-blur-sm"
                        >
                            <span className="text-[12px] text-[#f6d7c5]">♡</span>
                            <span className="story-cormorant text-[13px] italic tracking-wide text-[#ffe5d0]">
                                cute moments, forever memories
                            </span>
                            <span className="text-[12px] text-[#f6d7c5]">♡</span>
                        </motion.div>

                        <motion.p
                            initial={{ opacity: 0 }}
                            animate={inView ? { opacity: 1 } : {}}
                            transition={{ duration: 0.7, delay: 0.28 }}
                            className="story-cormorant mt-3 text-base italic leading-[1.7] text-amber-100"
                        >
                            Two strangers, one moment in time — and suddenly the world felt a
                            little warmer, softer, and full of magic.
                        </motion.p>
                    </motion.div>

                    <RibbonLine inView={inView} />
                    <LoveNote inView={inView} />

                    <div className="flex flex-col items-center gap-[46px]">
                        {CARDS.map((card, index) => (
                            <Polaroid key={index} card={card} index={index} />
                        ))}
                    </div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={inView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.8, delay: 0.75 }}
                        className="mx-auto mt-14 max-w-[300px] text-center"
                    >
                        <p className="story-script text-[30px] leading-none text-[#ffd6c2]">
                            and this is just the beginning…
                        </p>
                        <p className="story-cormorant mt-3 text-[14px] italic leading-[1.6] text-[#f5d9c3]">
                            With every laugh, every little surprise, and every promise — our
                            forever found its way.
                        </p>
                    </motion.div>
                </div>
            </section>
        </>
    );
}