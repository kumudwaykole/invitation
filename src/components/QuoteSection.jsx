import { useEffect, useRef, useState } from "react";

export default function QuoteSection() {
    const [visible, setVisible] = useState(false);
    const ref = useRef(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) setVisible(true);
            },
            { threshold: 0.12 }
        );

        if (ref.current) observer.observe(ref.current);
        return () => observer.disconnect();
    }, []);

    return (
        <section
            ref={ref}
            className="relative flex min-h-[82vh] w-full items-center justify-center overflow-hidden bg-[#f5debc] bg-[url('/bgimg2.webp')] bg-cover bg-center px-3.5 py-9 md:hidden"
        >
            <div className="absolute inset-0 z-0 bg-[radial-gradient(circle_at_top,rgba(255,248,220,0.30)_0%,transparent_38%),radial-gradient(circle_at_bottom,rgba(201,168,76,0.07)_0%,transparent_32%),linear-gradient(180deg,rgba(252,247,239,0.35)_0%,rgba(246,236,220,0.28)_45%,rgba(253,248,240,0.35)_100%)]" />

            {/* Transparent flower/cloud image over card text */}
            {/* <img
                src="/clouds images (5).png"
                alt="Flower bouquet"
                className="pointer-events-none absolute right-0 top-1/2 z-20 w-[120px] -translate-y-1/2 object-contain sm:w-[150px]"
            /> */}

            <div
                className={`relative z-10 w-full shadow-sm max-w-[300px] overflow-hidden rounded-xl bg-[#fae4c3]/60 pb-5 backdrop-blur-[7px] transition-all duration-700 ease-out ${visible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
                    }`}
            >
                <blockquote className="relative z-10 mx-0 mb-6 mt-8 px-8 pt-10 text-center text-[#3b1f0a]">
                    <p className="mb-3.5 text-base font-medium italic leading-[1.65]">
                        "Your presence and blessings mean the world to us."
                    </p>

                    <cite className="not-italic text-md font-semibold tracking-[0.08em] text-[#6b3318]">
                        With Love & Gratitude
                    </cite>
                </blockquote>

                <div className="aspect-[16/10] w-full overflow-hidden">
                    <img
                        src="/pranav-tejaswi (1).webp"
                        alt="Pranav & Tejaswi"
                        className="block h-full w-full object-cover object-top"
                    />
                </div>
            </div>
        </section>
    );
}