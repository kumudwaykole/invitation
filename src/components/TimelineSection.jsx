import { motion, useScroll, useTransform } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useRef } from 'react';

const fontStyle = `
  @import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@400;500;600&family=Cormorant+Garamond:ital,wght@0,400;1,400&family=Great+Vibes&display=swap');
  .tl-cinzel { font-family: 'Cinzel', serif; }
  .tl-vibes { font-family: 'Great Vibes', cursive; }
`;

const CLOUD_IMAGE = '/clouds-images.webp';

const EVENTS = [
    { day: 'Pre-Wedding · 28 May', title: 'Sufi Night', time: '16:30', icon: '🎵' },
    { day: 'Day 2 · 30 May', title: 'Sangeet', time: '17:00', icon: '✨' },
    { day: 'Day 3 · 3 July', title: 'Barat & Sangeet', time: '07:30', icon: '🎺' },
    { day: 'Day 4 · 4 July', title: 'Samayak & Procession', time: '07:00', icon: '🌅' },
    { day: 'Day 4 · 4 July', title: 'Vermalla & Lunch', time: '13:00', icon: '📸' },
    { day: 'Day 4 · 4 July', title: 'Musical Fera', time: '18:00', icon: '💍' },
    { day: 'Day 4 · 4 July', title: 'Bidhai', time: '21:30', icon: '🌹' },
];

function CloudBackground({ sectionRef }) {
    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ['start end', 'end start'],
    });

    const leftCloudX = useTransform(scrollYProgress, [0, 0.45], ['0px', '-220px']);
    const rightCloudX = useTransform(scrollYProgress, [0, 0.45], ['0px', '220px']);
    const cloudOpacity = useTransform(scrollYProgress, [0, 0.4, 0.7], [1, 0.9, 0.45]);

    return (
        <>
            <motion.img
                src={CLOUD_IMAGE}
                alt=""
                aria-hidden="true"
                style={{
                    x: leftCloudX,
                    opacity: cloudOpacity,
                    position: 'absolute',
                    left: '-150px',
                    top: '6%',
                    width: 760,
                    height: 460,
                    objectFit: 'cover',
                    zIndex: 8,
                    pointerEvents: 'none',
                    filter: 'drop-shadow(0 18px 45px rgba(90,70,50,0.16))',
                }}
            />

            <motion.img
                src={CLOUD_IMAGE}
                alt=""
                aria-hidden="true"
                style={{
                    x: rightCloudX,
                    opacity: cloudOpacity,
                    position: 'absolute',
                    right: '-180px',
                    top: '8%',
                    width: 540,
                    height: 540,
                    objectFit: 'cover',
                    zIndex: 8,
                    pointerEvents: 'none',
                    filter: 'drop-shadow(0 18px 45px rgba(90,70,50,0.16))',
                }}
            />
        </>
    );
}
function TimelineItem({ ev, index }) {
    const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.25 });
    const leftSide = index % 2 === 0;

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 22 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.65, delay: index * 0.08 }}
            style={{
                display: 'grid',
                gridTemplateColumns: '1fr 42px 1fr',
                alignItems: 'center',
                minHeight: 92,
                position: 'relative',
                zIndex: 5,
            }}
        >
            <div style={{ textAlign: 'right', paddingRight: 18 }}>
                {leftSide && (
                    <>
                        <p className="tl-cinzel" style={{ fontSize: 28, color: '#3d2117', lineHeight: 1 }}>{ev.time}</p>
                        <p className="tl-cinzel" style={{ fontSize: 9, letterSpacing: 2, color: '#b98524', textTransform: 'uppercase', marginTop: 8 }}>{ev.day}</p>
                        <p className="tl-vibes" style={{ fontSize: 25, color: '#3d2117', marginTop: 8 }}>{ev.title}</p>
                    </>
                )}
            </div>

            <div style={{ display: 'flex', justifyContent: 'center', zIndex: 6 }}>
                <div style={{
                    width: 38,
                    height: 38,
                    borderRadius: '50%',
                    background: '#fffaf0',
                    border: '1px solid rgba(201,168,76,0.45)',
                    boxShadow: '0 5px 18px rgba(133,95,27,0.18)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: 17,
                }}>
                    {ev.icon}
                </div>
            </div>

            <div style={{ textAlign: 'left', paddingLeft: 18 }}>
                {!leftSide && (
                    <>
                        <p className="tl-cinzel" style={{ fontSize: 28, color: '#3d2117', lineHeight: 1 }}>{ev.time}</p>
                        <p className="tl-cinzel" style={{ fontSize: 9, letterSpacing: 2, color: '#b98524', textTransform: 'uppercase', marginTop: 8 }}>{ev.day}</p>
                        <p className="tl-vibes" style={{ fontSize: 25, color: '#3d2117', marginTop: 8 }}>{ev.title}</p>
                    </>
                )}
            </div>
        </motion.div>
    );
}

export default function TimelineSection() {
    const sectionRef = useRef(null);

    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ['start end', 'end start'],
    });

    const timelineOpacity = useTransform(scrollYProgress, [0, 0.22, 0.38], [0, 0.35, 1]);
    const timelineY = useTransform(scrollYProgress, [0, 0.38], [45, 0]);

    return (
        <>
            <style>{fontStyle}</style>

            <section
                ref={sectionRef}
                style={{
                    position: 'relative',
                    overflow: 'hidden',
                    minHeight: '100vh',
                    background: 'linear-gradient(180deg,#fffaf1 0%,#fff7ec 40%,#f8ecdf 100%)',
                    backgroundImage: `linear-gradient(
            180deg,
            rgba(255,250,241,0.55) 0%,
            rgba(255,247,236,0.45) 45%,
            rgba(248,236,223,0.55) 100%
          ), url('/cloudbackground-image.webp')`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat',
                    padding: '72px 18px 140px',
                }}
            >
                <CloudBackground sectionRef={sectionRef} />

                <motion.div
                    style={{
                        opacity: timelineOpacity,
                        y: timelineY,
                        position: 'relative',
                        zIndex: 4,
                        maxWidth: 430,
                        margin: '0 auto',
                    }}
                >
                    <motion.div
                        initial={{ opacity: 0, y: 16 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.7 }}
                        style={{ textAlign: 'center', marginBottom: 42 }}
                    >
                        <h2 className="tl-vibes" style={{ fontSize: 58, color: '#3d2117', lineHeight: 1 }}>
                            Schedule of Events
                        </h2>

                        <div style={{ display: 'flex', alignItems: 'center', gap: 8, justifyContent: 'center', marginTop: 16 }}>
                            <div style={{ width: 72, height: 1, background: 'linear-gradient(to right,transparent,#b98524)' }} />
                            <span style={{ color: '#b98524', fontSize: 15 }}>✦</span>
                            <div style={{ width: 72, height: 1, background: 'linear-gradient(to left,transparent,#b98524)' }} />
                        </div>
                    </motion.div>

                    <div style={{ position: 'relative' }}>
                        <div
                            aria-hidden="true"
                            style={{
                                position: 'absolute',
                                top: 0,
                                bottom: 0,
                                left: '50%',
                                width: 1,
                                transform: 'translateX(-50%)',
                                background: 'linear-gradient(to bottom,rgba(185,133,36,0.15),rgba(185,133,36,0.75),rgba(185,133,36,0.15))',
                                zIndex: 3,
                            }}
                        />

                        {EVENTS.map((ev, index) => (
                            <TimelineItem key={index} ev={ev} index={index} />
                        ))}
                    </div>
                </motion.div>
            </section>
        </>
    );
}