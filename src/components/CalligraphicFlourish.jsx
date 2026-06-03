import { motion } from 'framer-motion';

/**
 * CalligraphicFlourish
 *
 * A decorative SVG corner / edge ornament that animates once on first visit.
 *
 * Props
 * ─────────────────────────────────────────────────────
 * position  {object}  Any CSS positioning values you want applied to the wrapper.
 *                     Defaults to top-left corner of nearest `relative` ancestor.
 *                     Examples:
 *                       { top: 0, left: 0 }
 *                       { bottom: 0, right: 0 }
 *                       { top: '30%', left: 0 }
 *
 * variant   {string}  Which ornament shape to render.
 *                     'corner-tl'  – sweeping corner curl (top-left)
 *                     'corner-tr'  – mirror of corner-tl (top-right)
 *                     'corner-bl'  – corner-tl flipped vertically (bottom-left)
 *                     'corner-br'  – fully mirrored (bottom-right)
 *                     'mid-left'   – tall S-curve for a mid-left edge
 *                     'mid-right'  – mirror S-curve for a mid-right edge
 *                     Default: 'corner-tl'
 *
 * color     {object}  Stroke / fill colours.
 *                     {
 *                       primary:   '#78350f',   // main sweep stroke
 *                       secondary: '#92400e',   // inner curl stroke
 *                       tertiary:  '#a16207',   // leaf-bud / S-curve variant
 *                     }
 *
 * size      {number}  Scale multiplier.  1 = default (160 × 160 for corners,
 *                     80 × 220 for mid variants).  0.75 = 75 % smaller, etc.
 *
 * opacity   {object}  Fine-tune final opacity per element.
 *                     {
 *                       sweep: 0.28,
 *                       curl:  0.20,
 *                       dots:  0.30,
 *                     }
 *
 * delay     {number}  Stagger offset in seconds added to every internal transition.
 *                     Useful when you render multiple flourishes and want them to
 *                     cascade one after another.  Default: 0.
 *
 * className {string}  Extra Tailwind / CSS classes for the wrapper <div>.
 *
 * style     {object}  Extra inline styles for the wrapper <div>.
 * ─────────────────────────────────────────────────────
 *
 * Usage examples
 * ─────────────────────────────────────────────────────
 * // 1. Basic – top-left corner of a relative parent
 * <CalligraphicFlourish />
 *
 * // 2. Bottom-right corner, amber palette
 * <CalligraphicFlourish
 *   variant="corner-br"
 *   position={{ bottom: 0, right: 0 }}
 *   color={{ primary: '#b45309', secondary: '#d97706', tertiary: '#f59e0b' }}
 * />
 *
 * // 3. Mid-right S-curve, 80 % size, delayed
 * <CalligraphicFlourish
 *   variant="mid-right"
 *   position={{ top: '40%', right: 0 }}
 *   size={0.8}
 *   delay={0.4}
 * />
 *
 * // 4. Anywhere on the page with fixed position
 * <CalligraphicFlourish
 *   variant="corner-tl"
 *   style={{ position: 'fixed', top: 20, left: 20, zIndex: 50 }}
 * />
 */

// ─── Internal variant definitions ────────────────────────────────────────────

const CORNER_W = 160;
const CORNER_H = 160;
const MID_W = 80;
const MID_H = 220;

/** Returns the CSS transform string for each variant */
function variantTransform(variant) {
    switch (variant) {
        case 'corner-tr': return 'scaleX(-1)';
        case 'corner-bl': return 'scaleY(-1)';
        case 'corner-br': return 'scale(-1,-1)';
        case 'mid-right': return 'scaleX(-1)';
        default: return undefined;
    }
}

// ─── Sub-renderers ────────────────────────────────────────────────────────────

function CornerPaths({ color, opacity, delay }) {
    return (
        <>
            {/* Main sweep */}
            <motion.path
                d="M0 40 C30 20 70 10 100 40 C125 65 115 105 80 120 C55 132 28 125 15 108"
                stroke={color.primary}
                strokeWidth="1.2"
                fill="none"
                strokeLinecap="round"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: opacity.sweep }}
                transition={{ duration: 1.8, ease: [0.22, 1, 0.36, 1], delay: 0.2 + delay }}
            />
            {/* Inner curl */}
            <motion.path
                d="M8 20 C25 8 55 4 75 22 C92 38 88 65 68 75"
                stroke={color.secondary}
                strokeWidth="0.8"
                fill="none"
                strokeLinecap="round"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: opacity.curl }}
                transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1], delay: 0.5 + delay }}
            />
            {/* Tip dots */}
            <motion.circle cx="15" cy="108" r="2.5" fill={color.primary}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: opacity.dots, scale: 1 }}
                transition={{ duration: 0.4, delay: 1.9 + delay }}
            />
            <motion.circle cx="68" cy="75" r="1.8" fill={color.secondary}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: opacity.dots * 0.85, scale: 1 }}
                transition={{ duration: 0.4, delay: 2.0 + delay }}
            />
        </>
    );
}

function MidPaths({ color, opacity, delay }) {
    const buds = [
        { cx: 30, cy: 55, r: 2.2 },
        { cx: 30, cy: 110, r: 3 },
        { cx: 22, cy: 165, r: 2 },
    ];
    return (
        <>
            <motion.path
                d="M10 0 C50 30 -10 80 30 110 C70 140 10 185 20 220"
                stroke={color.primary}
                strokeWidth="1"
                fill="none"
                strokeLinecap="round"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: opacity.sweep }}
                transition={{ duration: 2.2, ease: [0.22, 1, 0.36, 1], delay: 0.4 + delay }}
            />
            {buds.map((b, i) => (
                <motion.circle key={i} cx={b.cx} cy={b.cy} r={b.r} fill={color.secondary}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: opacity.dots, scale: 1 }}
                    transition={{ duration: 0.35, delay: 1.4 + delay + i * 0.15 }}
                />
            ))}
        </>
    );
}

// ─── Public component ─────────────────────────────────────────────────────────

export default function CalligraphicFlourish({
    variant = 'corner-tl',
    position = { top: 0, left: 0 },
    color = {},
    size = 1,
    opacity = {},
    delay = 0,
    className = '',
    style = {},
}) {
    const isMid = variant === 'mid-left' || variant === 'mid-right';
    const baseW = isMid ? MID_W : CORNER_W;
    const baseH = isMid ? MID_H : CORNER_H;
    const w = baseW * size;
    const h = baseH * size;
    const transform = variantTransform(variant);

    const resolvedColor = {
        primary: '#78350f',
        secondary: '#92400e',
        tertiary: '#a16207',
        ...color,
    };

    const resolvedOpacity = {
        sweep: 0.22,
        curl: 0.20,
        dots: 0.28,
        ...opacity,
    };

    const wrapperStyle = {
        position: 'absolute',
        pointerEvents: 'none',
        zIndex: 0,
        ...position,     // ← caller controls placement
        ...style,        // ← caller can override anything
    };

    return (
        <div className={className} style={wrapperStyle}>
            <motion.svg
                width={w}
                height={h}
                viewBox={`0 0 ${baseW} ${baseH}`}
                fill="none"
                style={transform ? { transform } : undefined}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1.2, ease: 'easeOut' }}
            >
                {isMid
                    ? <MidPaths color={resolvedColor} opacity={resolvedOpacity} delay={delay} />
                    : <CornerPaths color={resolvedColor} opacity={resolvedOpacity} delay={delay} />
                }
            </motion.svg>
        </div>
    );
}