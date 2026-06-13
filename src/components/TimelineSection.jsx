"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

const itemVariants = {
    hidden: { opacity: 0, y: 35, scale: 0.96 },
    visible: {
        opacity: 1,
        y: 0,
        scale: 1,
        transition: { duration: 0.6, ease: "easeOut" },
    },
};

const events = [
    { time: "11:30 AM", title: "Carnival X Haldi", side: "right", day: "3rd July" },
    { time: "3:00 – 5:00 PM", title: "Marya Royalty", side: "left" },
    { time: "7:00 PM Onwards", title: "Sangeet", side: "right" },
    { time: "7:00 – 7:48 AM", title: "Samayik", side: "left", day: "4th July" },
    { time: "12:30 PM", title: "Barat Swagat", side: "right" },
    { time: "12:30 PM", title: "Varmala", side: "left" },
    { time: "1:30 – 3:00 PM", title: "Sajan Goth", side: "right" },
    { time: "5:30 PM Onwards", title: "Musical Phera", side: "left" },
];

export default function TimelineSection() {
    const sectionRef = useRef(null);

    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ["start 60%", "start -10%"],
    });

    const leftCloudX = useTransform(scrollYProgress, [0, 1], ["0%", "-115%"]);
    const rightCloudX = useTransform(scrollYProgress, [0, 1], ["0%", "115%"]);
    const cloudOpacity = useTransform(scrollYProgress, [0, 0.8, 1], [1, 1, 0.85]);
    const timelineOpacity = useTransform(scrollYProgress, [0.25, 1], [0, 1]);
    const timelineY = useTransform(scrollYProgress, [0.25, 1], [70, 0]);

    return (
        <section
            ref={sectionRef}
            className="relative overflow-hidden bg-[#fcf7ef] py-28 md:py-36"
        >
            {/* Background Image */}
            <div
                className="absolute inset-0 bg-cover bg-center md:bg-[length:135%_auto]"
                style={{
                    backgroundImage: "url('/cloudbackground-image1.webp')",
                }}
            />

            {/* Left Cloud */}
            <motion.img
                src="/cloudsimage.webp"
                alt="Left Cloud"
                style={{ x: leftCloudX, opacity: cloudOpacity }}
                className="pointer-events-none absolute left-[-35%] top-6 z-30 w-[120vw] max-w-[720px] md:left-[-5%] md:top-8 md:w-[55vw]"
            />

            {/* Right Cloud */}
            <motion.img
                src="/cloudsimage.webp"
                alt="Right Cloud"
                style={{ x: rightCloudX, opacity: cloudOpacity }}
                className="pointer-events-none absolute right-[-35%] top-10 z-30 w-[120vw] max-w-[720px] md:right-[-5%] md:top-8 md:w-[55vw]"
            />

            {/* Timeline */}
            <motion.div
                style={{ opacity: timelineOpacity, y: timelineY }}
                className="relative z-20 mx-auto w-full max-w-[520px] px-5"
            >
                <h2 className="font-greatvibes mb-14 text-center text-6xl leading-none text-[#2e2e2e] md:text-7xl">
                    Schedule of Events
                </h2>

                <div className="font-cormorant relative mx-auto w-full">
                    <div className="absolute left-1/2 top-2 h-[calc(100%-16px)] w-px -translate-x-1/2 bg-[#7f93a8]" />

                    {events.map((event, index) => (
                        <motion.div
                            key={index}
                            variants={itemVariants}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, amount: 0.35 }}
                            transition={{ delay: index * 0.06 }}
                        >
                            {event.day && (
                                <div className="relative z-10 my-6 flex justify-center">
                                    <span className="bg-[#fcf7ef] px-4 text-base uppercase tracking-[0.22em] text-[#7f93a8]">
                                        {event.day}
                                    </span>
                                </div>
                            )}

                            <div className="relative grid min-h-[86px] grid-cols-2 items-center">
                                <motion.span
                                    initial={{ scale: 0, rotate: 45 }}
                                    whileInView={{ scale: 1, rotate: 45 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.4, delay: 0.15 }}
                                    className="absolute left-1/2 top-1/2 z-10 h-3 w-3 -translate-x-1/2 -translate-y-1/2 bg-[#7f93a8]"
                                />

                                {event.side === "left" ? (
                                    <>
                                        <div className="pr-9 text-right">
                                            <p className="font-playfair text-2xl font-medium leading-none text-[#2f2f2f] md:text-[28px]">
                                                {event.time}
                                            </p>
                                            <p className="mt-2 text-xl font-normal leading-[20px] text-[#4f4f4f] md:text-[18px] md:leading-[22px]">
                                                {event.title}
                                            </p>
                                        </div>
                                        <div />
                                    </>
                                ) : (
                                    <>
                                        <div />
                                        <div className="pl-9 text-left">
                                            <p className="font-playfair text-2xl font-medium leading-none text-[#2f2f2f] md:text-[28px]">
                                                {event.time}
                                            </p>
                                            <p className="mt-2 text-xl font-normal leading-[20px] text-[#4f4f4f] md:text-[18px] md:leading-[22px]">
                                                {event.title}
                                            </p>
                                        </div>
                                    </>
                                )}
                            </div>
                        </motion.div>
                    ))}
                </div>
            </motion.div>
        </section>
    );
}