// Ботанічна ілюстрація сировини (SVG). Заглушка замість фото, поки нема справжніх знімків.
import type { CSSProperties, ReactNode } from "react";
import { herbById, type ArtKind } from "@/data/herbs";

function rng(seed: string) {
  let h = 2166136261;
  for (let i = 0; i < seed.length; i++) h = Math.imul(h ^ seed.charCodeAt(i), 16777619);
  return () => {
    h = Math.imul(h ^ (h >>> 15), 2246822507);
    h = Math.imul(h ^ (h >>> 13), 3266489909);
    return ((h ^= h >>> 16) >>> 0) / 4294967296;
  };
}

/** Листок вздовж осі X довжиною len; serrate — зубчастий край (кропива, м'ята) */
function leafPath(len: number, wid: number, serrate: number) {
  const top: string[] = [], bot: string[] = [];
  const n = serrate ? 14 : 6;
  for (let i = 0; i <= n; i++) {
    const t = i / n;
    const w = Math.sin(Math.PI * Math.pow(t, 0.8)) * wid;
    const z = serrate && i % 2 ? serrate : 0;
    top.push(`${(t * len).toFixed(1)},${(-(w + z)).toFixed(1)}`);
    bot.unshift(`${(t * len).toFixed(1)},${(w + z).toFixed(1)}`);
  }
  return `M0,0 L${top.join(" L")} L${bot.join(" L")} Z`;
}

function Leaf({ x, y, a, len, wid, serrate = 0 }: { x: number; y: number; a: number; len: number; wid: number; serrate?: number }) {
  return (
    <g transform={`translate(${x} ${y}) rotate(${a})`}>
      <path d={leafPath(len, wid, serrate)} fill="currentColor" fillOpacity={0.22} stroke="currentColor" strokeWidth={1.4} strokeLinejoin="round" />
      <path d={`M2,0 L${len * 0.92},0`} stroke="currentColor" strokeWidth={1} strokeOpacity={0.7} />
      {[0.3, 0.5, 0.7].map((t) => (
        <g key={t} stroke="currentColor" strokeWidth={0.8} strokeOpacity={0.5}>
          <path d={`M${len * t},0 L${len * (t + 0.12)},${-wid * 0.55}`} />
          <path d={`M${len * t},0 L${len * (t + 0.12)},${wid * 0.55}`} />
        </g>
      ))}
    </g>
  );
}

function Roots({ x, y, depth, r }: { x: number; y: number; depth: number; r: () => number }) {
  const out: ReactNode[] = [];
  const grow = (sx: number, sy: number, ang: number, len: number, w: number, d: number) => {
    const ex = sx + Math.cos(ang) * len, ey = sy + Math.sin(ang) * len;
    const cx = sx + Math.cos(ang + (r() - 0.5)) * len * 0.5, cy = sy + Math.sin(ang) * len * 0.5;
    out.push(<path key={out.length} d={`M${sx},${sy} Q${cx},${cy} ${ex},${ey}`} stroke="currentColor" strokeWidth={w} fill="none" strokeLinecap="round" />);
    if (d > 0) {
      const k = 2 + Math.floor(r() * 2);
      for (let i = 0; i < k; i++) grow(ex, ey, ang + (r() - 0.5) * 1.3, len * (0.55 + r() * 0.25), w * 0.62, d - 1);
    }
  };
  for (let i = 0; i < 3; i++) grow(x, y, Math.PI / 2 + (i - 1) * 0.45, 52 + r() * 18, 5.5, depth);
  return <g strokeOpacity={0.85}>{out}</g>;
}

function Blossom({ x, y, r: rad, petals = 5 }: { x: number; y: number; r: number; petals?: number }) {
  return (
    <g transform={`translate(${x} ${y})`}>
      {Array.from({ length: petals }, (_, i) => (
        <ellipse key={i} cx={0} cy={-rad} rx={rad * 0.55} ry={rad * 0.9} transform={`rotate(${(360 / petals) * i})`} fill="currentColor" fillOpacity={0.28} stroke="currentColor" strokeWidth={0.9} />
      ))}
      <circle r={rad * 0.45} fill="currentColor" fillOpacity={0.75} />
    </g>
  );
}

function Daisy({ x, y, s }: { x: number; y: number; s: number }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      {Array.from({ length: 16 }, (_, i) => (
        <ellipse key={i} cx={0} cy={-17} rx={4.2} ry={11} transform={`rotate(${i * 22.5})`} fill="#fffdf6" stroke="currentColor" strokeOpacity={0.35} strokeWidth={0.8} />
      ))}
      <circle r={9} fill="#f2b21b" />
      <circle r={9} fill="url(#dot)" />
    </g>
  );
}

function Scene({ kind, r }: { kind: ArtKind; r: () => number }) {
  switch (kind) {
    case "leaf": {
      const serr = 3.2;
      return (
        <g>
          <path d="M200,290 C196,220 206,150 200,40" stroke="currentColor" strokeWidth={3} fill="none" strokeLinecap="round" />
          {[250, 200, 152, 108, 70].map((y, i) => {
            const len = 92 - i * 12;
            return (
              <g key={y}>
                <Leaf x={200} y={y} a={-28 - r() * 10} len={len} wid={len * 0.32} serrate={serr} />
                <Leaf x={200} y={y - 14} a={-152 + r() * 10} len={len} wid={len * 0.32} serrate={serr} />
              </g>
            );
          })}
        </g>
      );
    }
    case "root":
      return (
        <g>
          <path d="M120,118 L280,118" stroke="currentColor" strokeOpacity={0.35} strokeDasharray="3 6" />
          <path d="M200,118 C198,90 202,70 200,40" stroke="currentColor" strokeWidth={3} fill="none" />
          <Leaf x={200} y={70} a={-40} len={58} wid={18} serrate={2.4} />
          <Leaf x={200} y={84} a={-140} len={58} wid={18} serrate={2.4} />
          <Leaf x={200} y={50} a={-70} len={44} wid={14} serrate={2} />
          <Leaf x={200} y={56} a={-110} len={44} wid={14} serrate={2} />
          <Roots x={200} y={120} depth={3} r={r} />
        </g>
      );
    case "rhizome":
      return (
        <g>
          {[-18, -6, 6, 18].map((d, i) => (
            <path key={i} d={`M${170 + d * 2},150 C${168 + d * 2.6},100 ${176 + d * 3.4},60 ${178 + d * 4.2},${18 + i * 6}`} stroke="currentColor" strokeWidth={9} strokeOpacity={0.35} fill="none" strokeLinecap="round" />
          ))}
          <rect x={70} y={150} width={260} height={46} rx={23} fill="currentColor" fillOpacity={0.3} stroke="currentColor" strokeWidth={2} />
          {[110, 150, 190, 230, 270, 300].map((x) => (
            <path key={x} d={`M${x},152 C${x - 6},165 ${x - 6},182 ${x},194`} stroke="currentColor" strokeWidth={1.4} strokeOpacity={0.6} fill="none" />
          ))}
          {Array.from({ length: 22 }, (_, i) => {
            const x = 84 + i * 11 + r() * 4;
            const l = 30 + r() * 50;
            return <path key={i} d={`M${x},196 q${(r() - 0.5) * 20},${l / 2} ${(r() - 0.5) * 26},${l}`} stroke="currentColor" strokeWidth={1.1} strokeOpacity={0.6} fill="none" />;
          })}
        </g>
      );
    case "flower":
      return (
        <g>
          <path d="M120,280 C150,200 190,150 250,60" stroke="currentColor" strokeWidth={2.4} fill="none" />
          <Leaf x={180} y={170} a={-58} len={120} wid={20} />
          {Array.from({ length: 7 }, (_, i) => {
            const bx = 205 + Math.cos(i * 0.9) * 60 + r() * 20, by = 85 + Math.sin(i * 1.3) * 34 + r() * 12;
            return (
              <g key={i}>
                <path d={`M230,120 Q${(230 + bx) / 2},${by + 20} ${bx},${by}`} stroke="currentColor" strokeWidth={1} fill="none" strokeOpacity={0.7} />
                <Blossom x={bx} y={by} r={9 + r() * 4} />
              </g>
            );
          })}
          <Leaf x={140} y={250} a={-150} len={70} wid={30} />
        </g>
      );
    case "daisy":
      return (
        <g>
          <defs>
            <pattern id="dot" width="3" height="3" patternUnits="userSpaceOnUse"><circle cx="1.5" cy="1.5" r="0.7" fill="#c98a07" /></pattern>
          </defs>
          {[[140, 140, 1.25], [235, 95, 1.0], [270, 185, 0.85], [175, 215, 0.7]].map(([x, y, s], i) => (
            <g key={i}>
              <path d={`M${x},${y} C${x + 10},${y + 60} ${x - 10},${y + 120} ${x + 5},300`} stroke="currentColor" strokeWidth={2} fill="none" />
              <Daisy x={x} y={y} s={s} />
            </g>
          ))}
        </g>
      );
    case "berry":
      return (
        <g>
          <path d="M60,90 C140,110 220,140 340,230" stroke="currentColor" strokeWidth={3} fill="none" />
          <Leaf x={120} y={104} a={-50} len={60} wid={18} serrate={1.8} />
          <Leaf x={250} y={168} a={60} len={60} wid={18} serrate={1.8} />
          {[[150, 160], [190, 150], [215, 200], [270, 235], [300, 205]].map(([x, y], i) => (
            <g key={i} transform={`translate(${x} ${y}) rotate(${(r() - 0.5) * 40})`}>
              <path d={`M0,-30 L0,-46`} stroke="currentColor" strokeWidth={1.6} />
              <ellipse rx={15} ry={22} fill="#d2462a" fillOpacity={0.9} />
              <ellipse rx={5} ry={8} cx={-5} cy={-6} fill="#fff" fillOpacity={0.35} />
              <path d="M-6,20 L0,30 L6,20" stroke="currentColor" strokeWidth={1.4} fill="none" />
            </g>
          ))}
        </g>
      );
    case "umbel":
      return (
        <g>
          <path d="M200,295 L200,150" stroke="currentColor" strokeWidth={3} />
          <Leaf x={200} y={240} a={-30} len={80} wid={10} serrate={2} />
          <Leaf x={200} y={210} a={-150} len={80} wid={10} serrate={2} />
          {Array.from({ length: 13 }, (_, i) => {
            const ang = Math.PI + (i / 12) * Math.PI;
            const ex = 200 + Math.cos(ang) * 95, ey = 150 + Math.sin(ang) * 70;
            return (
              <g key={i}>
                <path d={`M200,150 L${ex},${ey}`} stroke="currentColor" strokeWidth={1} strokeOpacity={0.6} />
                {Array.from({ length: 6 }, (_, j) => (
                  <circle key={j} cx={ex + (r() - 0.5) * 22} cy={ey + (r() - 0.5) * 16} r={3.6 + r() * 1.6} fill="#fffaf0" stroke="currentColor" strokeWidth={0.8} />
                ))}
              </g>
            );
          })}
        </g>
      );
  }
}

export function HerbArt({ herbId, className = "", label = true }: { herbId: string; className?: string; label?: boolean }) {
  const herb = herbById(herbId);
  const r = rng(herb.id);
  return (
    <div className={`herb-art relative overflow-hidden ${className}`} style={{ "--h": herb.hue } as CSSProperties}>
      <svg viewBox="0 0 400 300" preserveAspectRatio="xMidYMid slice" className="absolute inset-0 h-full w-full" role="img" aria-label={herb.name}>
        <Scene kind={herb.art} r={r} />
      </svg>
      {label && (
        <span className="absolute bottom-2 left-2 rounded-full bg-black/25 px-2 py-0.5 text-[10px] font-medium italic tracking-wide text-white backdrop-blur-md">
          {herb.latin}
        </span>
      )}
    </div>
  );
}
