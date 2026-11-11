/**
 * Room objects for the game map. Each object is a small SVG drawing (trusted, static strings).
 * The same drawing is shown two ways:
 *   - built:     normal colours
 *   - blueprint: the `.bp` class in globals.css turns every shape into a dashed blue outline
 */

export type ObjectKind =
  | "poster" | "whiteboard" | "shelf" | "flag" | "monitor"
  | "desk" | "workbench" | "robot" | "computer" | "controller" | "trophy" | "toolbox"
  | "gearMachine" | "lamp" | "robotArm" | "printer3d" | "plant" | "chair" | "serverRack" | "field";

export interface Art {
  /** viewBox width and height */
  w: number;
  h: number;
  svg: string;
}

const INK = "#2A1A20";
const wrap = (inner: string) =>
  `<g stroke="${INK}" stroke-width="2.5" stroke-linejoin="round" stroke-linecap="round" fill="none">${inner}</g>`;

const rack = Array.from({ length: 6 }, (_, i) => {
  const y = 16 + i * 24;
  return `<rect x="16" y="${y}" width="58" height="18" rx="2" fill="#4A0E25"/><circle cx="66" cy="${y + 9}" r="2.5" fill="#C39A60"/><path d="M22 ${y + 9}h24" stroke="#A71950"/>`;
}).join("");

export const ART: Record<ObjectKind, Art> = {
  poster: {
    w: 80, h: 100,
    svg: wrap(`<rect x="4" y="4" width="72" height="92" rx="4" fill="#F8F5F0"/><path d="M40 30V22"/><circle cx="40" cy="18" r="4" fill="#C39A60"/><rect x="22" y="30" width="36" height="28" rx="6" fill="#A71950"/><circle cx="33" cy="43" r="4" fill="#F8F5F0"/><circle cx="47" cy="43" r="4" fill="#F8F5F0"/><rect x="26" y="60" width="28" height="18" rx="3" fill="#701637"/><path d="M16 88h48" stroke="#C39A60"/>`),
  },
  whiteboard: {
    w: 160, h: 100,
    svg: wrap(`<path d="M24 82l-10 16M136 82l10 16"/><rect x="6" y="6" width="148" height="76" rx="5" fill="#FFFFFF"/><path d="M22 28h50M22 42h66M22 56h40" stroke="#701637"/><circle cx="120" cy="42" r="16" stroke="#A71950"/><path d="M112 42l6 6 10-12" stroke="#A71950"/><rect x="44" y="82" width="72" height="6" rx="2" fill="#C39A60"/>`),
  },
  shelf: {
    w: 140, h: 110,
    svg: wrap(`<rect x="6" y="8" width="128" height="96" rx="4" fill="#B98A5E"/><path d="M6 40h128M6 72h128"/><rect x="16" y="18" width="30" height="22" fill="#A71950"/><rect x="52" y="22" width="22" height="18" fill="#C39A60"/><rect x="90" y="16" width="34" height="24" fill="#F8F5F0"/><rect x="18" y="50" width="40" height="22" fill="#701637"/><circle cx="84" cy="61" r="10" fill="#C39A60"/><rect x="100" y="52" width="24" height="20" fill="#A71950"/><rect x="16" y="82" width="56" height="22" fill="#F8F5F0"/><rect x="82" y="86" width="40" height="18" fill="#C39A60"/>`),
  },
  flag: {
    w: 80, h: 110,
    svg: wrap(`<path d="M14 4v102"/><circle cx="14" cy="4" r="3" fill="#C39A60"/><path d="M14 10h56l-12 18 12 18H14z" fill="#A71950"/><path d="M30 23l2.5 5 5.5.8-4 3.9.9 5.5-4.9-2.6-4.9 2.6.9-5.5-4-3.9 5.5-.8z" fill="#F8F5F0" stroke-width="1.5"/>`),
  },
  monitor: {
    w: 150, h: 100,
    svg: wrap(`<path d="M60 88l-6 10h42l-6-10"/><rect x="4" y="4" width="142" height="84" rx="6" fill="${INK}"/><rect x="12" y="12" width="126" height="68" rx="3" fill="#4A0E25"/><path d="M62 30v32l26-16z" fill="#F8F5F0"/>`),
  },
  desk: {
    w: 180, h: 110,
    svg: wrap(`<path d="M20 52v54M160 52v54"/><rect x="110" y="52" width="44" height="40" fill="#A0714A"/><path d="M120 72h24"/><rect x="6" y="40" width="168" height="12" rx="3" fill="#B98A5E"/><rect x="24" y="24" width="44" height="16" rx="2" fill="#F8F5F0"/><path d="M32 30h26M32 35h18" stroke="#A71950"/><path d="M128 40l8-24"/><path d="M124 12h24l-6 10h-12z" fill="#C39A60"/>`),
  },
  workbench: {
    w: 200, h: 120,
    svg: wrap(`<path d="M18 60v56M182 60v56M18 98h164"/><rect x="6" y="46" width="188" height="14" rx="3" fill="#B98A5E"/><rect x="28" y="34" width="40" height="12" rx="2" fill="#9AA3AE"/><path d="M48 34v-8"/><rect x="118" y="24" width="54" height="22" rx="3" fill="#A71950"/><path d="M130 24v-6h30v6"/><path d="M82 44l22-16" stroke-width="4"/><circle cx="106" cy="26" r="4" fill="#9AA3AE"/>`),
  },
  robot: {
    w: 120, h: 140,
    svg: wrap(`<rect x="50" y="22" width="20" height="44" fill="#9AA3AE"/><path d="M60 30l34-14" stroke="#C39A60" stroke-width="7"/><path d="M94 16l12-7M94 16l12 6"/><rect x="18" y="62" width="84" height="44" rx="6" fill="#A71950"/><rect x="28" y="70" width="30" height="18" rx="2" fill="#F8F5F0"/><circle cx="78" cy="79" r="7" fill="#C39A60"/><circle cx="32" cy="112" r="14" fill="${INK}"/><circle cx="88" cy="112" r="14" fill="${INK}"/><circle cx="32" cy="112" r="5" fill="#9AA3AE"/><circle cx="88" cy="112" r="5" fill="#9AA3AE"/>`),
  },
  computer: {
    w: 160, h: 130,
    svg: wrap(`<path d="M16 90v38M144 90v38"/><rect x="6" y="80" width="148" height="10" rx="2" fill="#B98A5E"/><path d="M76 72v8M84 72v8"/><rect x="34" y="14" width="92" height="58" rx="5" fill="${INK}"/><rect x="40" y="20" width="80" height="46" rx="2" fill="#2E3A55"/><path d="M48 30h22M56 38h30M56 46h18M48 56h26" stroke="#C39A60"/><rect x="48" y="72" width="64" height="7" rx="2" fill="#9AA3AE"/>`),
  },
  controller: {
    w: 110, h: 120,
    svg: wrap(`<path d="M24 60v50M86 60v50"/><circle cx="24" cy="112" r="5" fill="${INK}"/><circle cx="86" cy="112" r="5" fill="${INK}"/><rect x="10" y="52" width="90" height="10" rx="2" fill="#9AA3AE"/><rect x="40" y="4" width="30" height="18" rx="2" fill="${INK}"/><path d="M22 36c0-8 7-12 16-12h34c9 0 16 4 16 12l4 10c2 6-6 9-10 4l-6-7H34l-6 7c-4 5-12 2-10-4z" fill="#701637"/><circle cx="38" cy="34" r="5" fill="#F8F5F0"/><circle cx="70" cy="32" r="3" fill="#C39A60"/><circle cx="78" cy="38" r="3" fill="#A71950"/>`),
  },
  trophy: {
    w: 90, h: 140,
    svg: wrap(`<rect x="20" y="96" width="50" height="40" fill="#701637"/><rect x="14" y="90" width="62" height="8" rx="2" fill="#4A0E25"/><path d="M28 26h-8c0 12 6 16 10 16M62 26h8c0 12-6 16-10 16"/><path d="M45 60v16"/><rect x="32" y="76" width="26" height="14" rx="2" fill="#C39A60"/><path d="M28 20h34v18c0 14-8 22-17 22s-17-8-17-22z" fill="#C39A60"/><path d="M45 28l3 6 6.5 1-4.7 4.5 1.1 6.5L45 43l-5.9 3 1.1-6.5L35.5 35l6.5-1z" fill="#F8F5F0" stroke-width="1.5"/>`),
  },
  toolbox: {
    w: 120, h: 90,
    svg: wrap(`<path d="M40 34V20h40v14"/><path d="M26 34l-8-18"/><circle cx="16" cy="12" r="5"/><rect x="8" y="34" width="104" height="50" rx="5" fill="#A71950"/><path d="M8 52h104"/><rect x="52" y="46" width="16" height="11" rx="2" fill="#C39A60"/>`),
  },
  gearMachine: {
    w: 140, h: 130,
    svg: wrap(`<path d="M74.4 52.4 L81.7 53.5 L81.7 62.5 L74.4 63.6 L73.0 67.8 L78.3 73.0 L73.0 80.3 L66.4 76.9 L62.9 79.4 L64.1 86.7 L55.5 89.5 L52.2 82.9 L47.8 82.9 L44.5 89.5 L35.9 86.7 L37.1 79.4 L33.6 76.9 L27.0 80.3 L21.7 73.0 L27.0 67.8 L25.6 63.6 L18.3 62.5 L18.3 53.5 L25.6 52.4 L27.0 48.2 L21.7 43.0 L27.0 35.7 L33.6 39.1 L37.1 36.6 L35.9 29.3 L44.5 26.5 L47.8 33.1 L52.2 33.1 L55.5 26.5 L64.1 29.3 L62.9 36.6 L66.4 39.1 L73.0 35.7 L78.3 43.0 L73.0 48.2Z" fill="#C39A60"/><circle cx="50" cy="58" r="8" fill="#701637"/><path d="M114.4 37.8 L120.7 38.3 L120.7 45.7 L114.4 46.2 L113.1 49.2 L117.2 54.0 L112.0 59.2 L107.2 55.1 L104.2 56.4 L103.7 62.7 L96.3 62.7 L95.8 56.4 L92.8 55.1 L88.0 59.2 L82.8 54.0 L86.9 49.2 L85.6 46.2 L79.3 45.7 L79.3 38.3 L85.6 37.8 L86.9 34.8 L82.8 30.0 L88.0 24.8 L92.8 28.9 L95.8 27.6 L96.3 21.3 L103.7 21.3 L104.2 27.6 L107.2 28.9 L112.0 24.8 L117.2 30.0 L113.1 34.8Z" fill="#A71950"/><circle cx="100" cy="42" r="6" fill="#F8F5F0"/><path d="M50 66v32M100 48v26"/><rect x="84" y="74" width="36" height="22" rx="3" fill="#9AA3AE"/><rect x="10" y="96" width="120" height="28" rx="4" fill="#701637"/>`),
  },
  lamp: {
    w: 60, h: 160,
    svg: wrap(`<path d="M30 40v112"/><path d="M14 154h32" stroke-width="5"/><path d="M12 40l8-30h20l8 30z" fill="#C39A60"/><circle cx="30" cy="46" r="5" fill="#F8F5F0"/>`),
  },
  robotArm: {
    w: 140, h: 150,
    svg: wrap(`<path d="M70 120L46 66" stroke="#C39A60" stroke-width="12"/><path d="M46 66L100 34" stroke="#C39A60" stroke-width="10"/><path d="M100 34l18-4M100 34l14 12" stroke-width="4"/><circle cx="46" cy="66" r="9" fill="#A71950"/><circle cx="100" cy="34" r="7" fill="#A71950"/><circle cx="70" cy="122" r="12" fill="#9AA3AE"/><rect x="30" y="126" width="80" height="18" rx="4" fill="#701637"/>`),
  },
  printer3d: {
    w: 120, h: 130,
    svg: wrap(`<rect x="12" y="10" width="96" height="112" rx="4" fill="${INK}"/><rect x="20" y="18" width="80" height="80" fill="#F8F5F0"/><path d="M20 34h80" stroke="#9AA3AE" stroke-width="4"/><path d="M60 42v8"/><rect x="52" y="30" width="16" height="12" fill="#A71950"/><rect x="48" y="70" width="24" height="22" fill="#C39A60"/><rect x="28" y="92" width="64" height="6" fill="#9AA3AE"/><rect x="40" y="104" width="40" height="10" rx="2" fill="#2E3A55"/>`),
  },
  plant: {
    w: 70, h: 110,
    svg: wrap(`<path d="M35 72V24"/><path d="M35 72c-2-20-14-30-24-32 2 14 10 26 24 32z" fill="#5E8C5A"/><path d="M35 72c2-24 12-38 26-40-2 18-12 32-26 40z" fill="#5E8C5A"/><path d="M35 42c-6-8-8-16-6-24 6 6 8 14 6 24z" fill="#7BA872"/><path d="M16 70h38l-6 36H22z" fill="#A71950"/>`),
  },
  chair: {
    w: 80, h: 110,
    svg: wrap(`<path d="M40 70v24M20 104l20-10 20 10"/><circle cx="20" cy="104" r="3.5" fill="${INK}"/><circle cx="60" cy="104" r="3.5" fill="${INK}"/><rect x="16" y="6" width="48" height="50" rx="10" fill="#701637"/><rect x="10" y="58" width="60" height="12" rx="4" fill="#A71950"/>`),
  },
  serverRack: {
    w: 90, h: 170,
    svg: wrap(`<rect x="8" y="6" width="74" height="158" rx="4" fill="${INK}"/>${rack}`),
  },
  field: {
    w: 260, h: 70,
    svg: wrap(`<path d="M30 6h200l26 58H4z" fill="#C9CED6"/><path d="M130 6v58M17 35h226" stroke="#F8F5F0"/><path d="M30 6L4 64" stroke="#A71950" stroke-width="5"/><path d="M230 6l26 58" stroke="#2E4A6B" stroke-width="5"/><rect x="112" y="22" width="36" height="22" rx="3" fill="#C39A60"/>`),
  },
};

export interface RoomTheme {
  wall: string;
  wallDark: string;
  floor: string;
  floorLine: string;
}

/** Background of a room: wall, a window into space (it's a station!) and a floor. 1000×560 units. */
export function roomBackground(th: RoomTheme): string {
  const stars = [
    [452, 82, 2], [540, 74, 1.5], [508, 120, 1.5], [470, 140, 1], [556, 136, 2], [432, 110, 1],
  ].map(([x, y, r]) => `<circle cx="${x}" cy="${y}" r="${r}" fill="#F8F5F0"/>`).join("");
  return `
  <rect width="1000" height="330" fill="${th.wall}"/>
  <rect y="262" width="1000" height="68" fill="${th.wallDark}"/>
  <path d="M0 262h1000" stroke="#2A1A20" stroke-opacity=".15" stroke-width="3"/>
  <g>
    <rect x="410" y="44" width="180" height="128" rx="64" fill="#2A1A20"/>
    <rect x="418" y="52" width="164" height="112" rx="56" fill="#1B2440"/>
    ${stars}
    <circle cx="540" cy="104" r="18" fill="#C39A60"/>
    <ellipse cx="540" cy="104" rx="30" ry="8" fill="none" stroke="#F1DDE5" stroke-width="2" transform="rotate(-18 540 104)"/>
    <rect x="410" y="44" width="180" height="128" rx="64" fill="none" stroke="#9AA3AE" stroke-width="8"/>
  </g>
  <path d="M0 330h1000v230H0z" fill="${th.floor}"/>
  <path d="M0 330h1000" stroke="#2A1A20" stroke-opacity=".25" stroke-width="3"/>
  <g stroke="${th.floorLine}" stroke-width="2">
    <path d="M0 380h1000M0 445h1000M0 520h1000"/>
    <path d="M500 330L380 560M500 330L620 560M500 330L140 560M500 330L860 560M500 330L-100 560M500 330L1100 560"/>
  </g>`;
}
