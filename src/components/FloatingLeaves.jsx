// import { useEffect, useRef } from 'react';

// const LEAF_SVGS = [
//     `<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 30 40'><path d='M15 2 C5 10 2 25 15 38 C28 25 25 10 15 2Z' fill='%234a7c59' opacity='0.55'/><line x1='15' y1='38' x2='15' y2='8' stroke='%236fa882' stroke-width='0.8' opacity='0.6'/></svg>`,
//     `<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 25 35'><path d='M12 2 C3 8 1 20 12 33 C23 20 21 8 12 2Z' fill='%236fa882' opacity='0.45'/></svg>`,
//     `<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 20 30'><path d='M10 1 C2 7 1 18 10 29 C19 18 18 7 10 1Z' fill='%23c9a84c' opacity='0.38'/></svg>`,
//     `<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 35 25'><path d='M2 12 C10 2 25 1 33 12 C25 23 10 23 2 12Z' fill='%234a7c59' opacity='0.42'/></svg>`,
//     `<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 22 32'><path d='M11 1 C4 6 2 16 11 31 C20 16 18 6 11 1Z' fill='%238bc34a' opacity='0.35'/><path d='M11 1 L11 31' stroke='%23558b2f' stroke-width='0.6' opacity='0.5'/></svg>`,
// ];

// export default function FloatingLeaves({ children }) {
//     const containerRef = useRef(null);

//     useEffect(() => {
//         const style = document.createElement('style');
//         style.id = 'leaves-style';
//         style.textContent = `
//       @keyframes leafDrift {
//         0%   { transform: translateY(-60px) translateX(0px) rotate(0deg);   opacity: 0; }
//         5%   { opacity: 1; }
//         25%  { transform: translateY(25vh)  translateX(30px)  rotate(90deg); }
//         50%  { transform: translateY(50vh)  translateX(-20px) rotate(180deg); }
//         75%  { transform: translateY(75vh)  translateX(40px)  rotate(270deg); }
//         95%  { opacity: 0.7; }
//         100% { transform: translateY(108vh) translateX(10px)  rotate(360deg); opacity: 0; }
//       }
//       @keyframes leafDriftAlt {
//         0%   { transform: translateY(-60px) translateX(0px)   rotate(20deg);  opacity: 0; }
//         5%   { opacity: 0.9; }
//         30%  { transform: translateY(30vh)  translateX(-35px) rotate(120deg); }
//         60%  { transform: translateY(60vh)  translateX(25px)  rotate(240deg); }
//         95%  { opacity: 0.6; }
//         100% { transform: translateY(108vh) translateX(-15px) rotate(400deg); opacity: 0; }
//       }
//       .floating-leaf {
//         position: fixed;
//         pointer-events: none;
//         z-index: 9000;
//         will-change: transform;
//       }
//     `;
//         document.head.appendChild(style);

//         const wrapper = document.createElement('div');
//         wrapper.id = 'leaves-wrapper';
//         wrapper.style.cssText = 'position:fixed;inset:0;pointer-events:none;z-index:9000;overflow:hidden;';
//         document.body.appendChild(wrapper);

//         const count = 18;
//         for (let i = 0; i < count; i++) {
//             const leaf = document.createElement('div');
//             leaf.className = 'floating-leaf';
//             const svgIndex = i % LEAF_SVGS.length;
//             const size = 10 + Math.random() * 18;
//             const startX = 2 + Math.random() * 96;
//             const duration = 9 + Math.random() * 11;
//             const delay = -(Math.random() * duration);
//             const anim = i % 2 === 0 ? 'leafDrift' : 'leafDriftAlt';
//             leaf.style.cssText = `
//         left: ${startX}vw;
//         top: 0;
//         width: ${size}px;
//         height: ${size * 1.4}px;
//         animation: ${anim} ${duration}s ${delay}s linear infinite;
//       `;
//             const img = document.createElement('img');
//             img.src = `data:image/svg+xml,${LEAF_SVGS[svgIndex]}`;
//             img.style.cssText = 'width:100%;height:100%;object-fit:contain;display:block;';
//             img.setAttribute('aria-hidden', 'true');
//             leaf.appendChild(img);
//             wrapper.appendChild(leaf);
//         }

//         return () => {
//             document.getElementById('leaves-style')?.remove();
//             document.getElementById('leaves-wrapper')?.remove();
//         };
//     }, []);

//     return <div ref={containerRef}>{children}</div>;
// }

import { useEffect, useRef } from 'react';

const FLOWER_SVGS = [
  // Classic 5-petal white flower
  `<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 40 40'>
    <g transform='translate(20,20)'>
      <ellipse cx='0' cy='-8' rx='4' ry='7' fill='%23ffffff' opacity='0.88' transform='rotate(0)'/>
      <ellipse cx='0' cy='-8' rx='4' ry='7' fill='%23f5f0ff' opacity='0.82' transform='rotate(72)'/>
      <ellipse cx='0' cy='-8' rx='4' ry='7' fill='%23ffffff' opacity='0.85' transform='rotate(144)'/>
      <ellipse cx='0' cy='-8' rx='4' ry='7' fill='%23f8f5ff' opacity='0.80' transform='rotate(216)'/>
      <ellipse cx='0' cy='-8' rx='4' ry='7' fill='%23ffffff' opacity='0.86' transform='rotate(288)'/>
      <circle cx='0' cy='0' r='3.5' fill='%23fff8dc' opacity='0.95'/>
      <circle cx='0' cy='0' r='1.8' fill='%23f5d76e' opacity='0.7'/>
    </g>
  </svg>`,

  // Delicate 6-petal blossom
  `<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 40 40'>
    <g transform='translate(20,20)'>
      <ellipse cx='0' cy='-7' rx='3' ry='6.5' fill='%23ffffff' opacity='0.80' transform='rotate(0)'/>
      <ellipse cx='0' cy='-7' rx='3' ry='6.5' fill='%23fdf6ff' opacity='0.75' transform='rotate(60)'/>
      <ellipse cx='0' cy='-7' rx='3' ry='6.5' fill='%23ffffff' opacity='0.82' transform='rotate(120)'/>
      <ellipse cx='0' cy='-7' rx='3' ry='6.5' fill='%23f0eeff' opacity='0.78' transform='rotate(180)'/>
      <ellipse cx='0' cy='-7' rx='3' ry='6.5' fill='%23ffffff' opacity='0.80' transform='rotate(240)'/>
      <ellipse cx='0' cy='-7' rx='3' ry='6.5' fill='%23fdf6ff' opacity='0.76' transform='rotate(300)'/>
      <circle cx='0' cy='0' r='3' fill='%23fffbe6' opacity='0.95'/>
      <circle cx='0' cy='0' r='1.5' fill='%23ffd700' opacity='0.6'/>
    </g>
  </svg>`,

  // Cherry blossom style — rounded petals with pink blush
  `<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 44 44'>
    <g transform='translate(22,22)'>
      <ellipse cx='0' cy='-9' rx='5' ry='8' fill='%23fff0f4' opacity='0.85' transform='rotate(0)'/>
      <ellipse cx='0' cy='-9' rx='5' ry='8' fill='%23ffe8ef' opacity='0.80' transform='rotate(72)'/>
      <ellipse cx='0' cy='-9' rx='5' ry='8' fill='%23fff0f4' opacity='0.83' transform='rotate(144)'/>
      <ellipse cx='0' cy='-9' rx='5' ry='8' fill='%23fdeef3' opacity='0.78' transform='rotate(216)'/>
      <ellipse cx='0' cy='-9' rx='5' ry='8' fill='%23fff0f4' opacity='0.84' transform='rotate(288)'/>
      <circle cx='0' cy='0' r='4' fill='%23fff5f7' opacity='0.98'/>
      <circle cx='0' cy='0' r='2' fill='%23ffb7c5' opacity='0.75'/>
      <circle cx='0' cy='-1.5' r='0.7' fill='%23ff9aad' opacity='0.6'/>
    </g>
  </svg>`,

  // Tiny daisy — thin pointed petals
  `<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 36 36'>
    <g transform='translate(18,18)'>
      <ellipse cx='0' cy='-7' rx='2' ry='6' fill='%23ffffff' opacity='0.90' transform='rotate(0)'/>
      <ellipse cx='0' cy='-7' rx='2' ry='6' fill='%23f8f8ff' opacity='0.85' transform='rotate(40)'/>
      <ellipse cx='0' cy='-7' rx='2' ry='6' fill='%23ffffff' opacity='0.88' transform='rotate(80)'/>
      <ellipse cx='0' cy='-7' rx='2' ry='6' fill='%23f8f8ff' opacity='0.86' transform='rotate(120)'/>
      <ellipse cx='0' cy='-7' rx='2' ry='6' fill='%23ffffff' opacity='0.90' transform='rotate(160)'/>
      <ellipse cx='0' cy='-7' rx='2' ry='6' fill='%23f8f8ff' opacity='0.85' transform='rotate(200)'/>
      <ellipse cx='0' cy='-7' rx='2' ry='6' fill='%23ffffff' opacity='0.88' transform='rotate(240)'/>
      <ellipse cx='0' cy='-7' rx='2' ry='6' fill='%23f8f8ff' opacity='0.86' transform='rotate(280)'/>
      <ellipse cx='0' cy='-7' rx='2' ry='6' fill='%23ffffff' opacity='0.90' transform='rotate(320)'/>
      <circle cx='0' cy='0' r='3.2' fill='%23fff3b0' opacity='0.95'/>
      <circle cx='0' cy='0' r='1.6' fill='%23ffc107' opacity='0.65'/>
    </g>
  </svg>`,

  // Magnolia — large cupped petals
  `<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 48 48'>
    <g transform='translate(24,24)'>
      <ellipse cx='0' cy='-10' rx='6' ry='10' fill='%23fffefa' opacity='0.78' transform='rotate(0)'/>
      <ellipse cx='0' cy='-10' rx='6' ry='10' fill='%23fff8f0' opacity='0.72' transform='rotate(60)'/>
      <ellipse cx='0' cy='-10' rx='6' ry='10' fill='%23fffefa' opacity='0.76' transform='rotate(120)'/>
      <ellipse cx='0' cy='-10' rx='6' ry='10' fill='%23fff4ec' opacity='0.70' transform='rotate(180)'/>
      <ellipse cx='0' cy='-10' rx='6' ry='10' fill='%23fffefa' opacity='0.78' transform='rotate(240)'/>
      <ellipse cx='0' cy='-10' rx='6' ry='10' fill='%23fff8f0' opacity='0.73' transform='rotate(300)'/>
      <circle cx='0' cy='0' r='4.5' fill='%23fffde7' opacity='0.96'/>
      <circle cx='0' cy='0' r='2.2' fill='%23ffe082' opacity='0.65'/>
    </g>
  </svg>`,

  // Loose jasmine — asymmetric organic petals
  `<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 38 38'>
    <g transform='translate(19,19)'>
      <path d='M0,-12 C-3,-8 -4,-2 0,0 C4,-2 3,-8 0,-12Z' fill='%23ffffff' opacity='0.88'/>
      <path d='M0,-12 C-3,-8 -4,-2 0,0 C4,-2 3,-8 0,-12Z' fill='%23f5f5ff' opacity='0.82' transform='rotate(72)'/>
      <path d='M0,-12 C-3,-8 -4,-2 0,0 C4,-2 3,-8 0,-12Z' fill='%23ffffff' opacity='0.85' transform='rotate(144)'/>
      <path d='M0,-12 C-3,-8 -4,-2 0,0 C4,-2 3,-8 0,-12Z' fill='%23f8f8ff' opacity='0.80' transform='rotate(216)'/>
      <path d='M0,-12 C-3,-8 -4,-2 0,0 C4,-2 3,-8 0,-12Z' fill='%23ffffff' opacity='0.86' transform='rotate(288)'/>
      <circle cx='0' cy='0' r='2.8' fill='%23fffde7' opacity='0.97'/>
      <circle cx='0' cy='0' r='1.2' fill='%23ffd54f' opacity='0.6'/>
    </g>
  </svg>`,
];

export default function FloatingFlowers({ children }) {
  const containerRef = useRef(null);

  useEffect(() => {
    const style = document.createElement('style');
    style.id = 'flowers-style';
    style.textContent = `
      @keyframes flowerDrift {
        0%   { transform: translateY(-70px) translateX(0px)   rotate(0deg);   opacity: 0; }
        6%   { opacity: 1; }
        25%  { transform: translateY(25vh)  translateX(22px)  rotate(60deg); }
        50%  { transform: translateY(50vh)  translateX(-18px) rotate(140deg); }
        75%  { transform: translateY(75vh)  translateX(28px)  rotate(220deg); }
        94%  { opacity: 0.75; }
        100% { transform: translateY(108vh) translateX(8px)   rotate(300deg); opacity: 0; }
      }
      @keyframes flowerDriftAlt {
        0%   { transform: translateY(-70px) translateX(0px)   rotate(15deg);  opacity: 0; }
        6%   { opacity: 0.9; }
        30%  { transform: translateY(30vh)  translateX(-28px) rotate(100deg); }
        55%  { transform: translateY(55vh)  translateX(20px)  rotate(200deg); }
        80%  { transform: translateY(80vh)  translateX(-12px) rotate(280deg); }
        94%  { opacity: 0.65; }
        100% { transform: translateY(108vh) translateX(14px)  rotate(360deg); opacity: 0; }
      }
      @keyframes flowerDriftSway {
        0%   { transform: translateY(-70px) translateX(0px)   rotate(-10deg); opacity: 0; }
        6%   { opacity: 0.85; }
        20%  { transform: translateY(20vh)  translateX(35px)  rotate(30deg); }
        40%  { transform: translateY(40vh)  translateX(-10px) rotate(90deg); }
        65%  { transform: translateY(65vh)  translateX(30px)  rotate(180deg); }
        94%  { opacity: 0.6; }
        100% { transform: translateY(108vh) translateX(-5px)  rotate(260deg); opacity: 0; }
      }
      .floating-flower {
        position: fixed;
        pointer-events: none;
        z-index: 9000;
        will-change: transform;
        filter: drop-shadow(0 1px 3px rgba(255,255,255,0.4));
      }
    `;
    document.head.appendChild(style);

    const wrapper = document.createElement('div');
    wrapper.id = 'flowers-wrapper';
    wrapper.style.cssText =
      'position:fixed;inset:0;pointer-events:none;z-index:9000;overflow:hidden;';
    document.body.appendChild(wrapper);

    const anims = ['flowerDrift', 'flowerDriftAlt', 'flowerDriftSway'];
    const count = 22;

    for (let i = 0; i < count; i++) {
      const flower = document.createElement('div');
      flower.className = 'floating-flower';

      const svgIndex = i % FLOWER_SVGS.length;
      const size = 12 + Math.random() * 20;      // 12–32 px
      const startX = 1 + Math.random() * 97;       // 1–98 vw
      const duration = 10 + Math.random() * 12;      // 10–22 s
      const delay = -(Math.random() * duration);  // stagger via negative delay
      const anim = anims[i % anims.length];

      flower.style.cssText = `
        left: ${startX}vw;
        top: 0;
        width: ${size}px;
        height: ${size}px;
        animation: ${anim} ${duration}s ${delay}s linear infinite;
      `;

      const img = document.createElement('img');
      img.src = `data:image/svg+xml,${FLOWER_SVGS[svgIndex].replace(/\n\s*/g, ' ')}`;
      img.style.cssText = 'width:100%;height:100%;object-fit:contain;display:block;';
      img.setAttribute('aria-hidden', 'true');

      flower.appendChild(img);
      wrapper.appendChild(flower);
    }

    return () => {
      document.getElementById('flowers-style')?.remove();
      document.getElementById('flowers-wrapper')?.remove();
    };
  }, []);

  return <div ref={containerRef}>{children}</div>;
}