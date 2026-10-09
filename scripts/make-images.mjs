// Generates a distinct illustration per place (public/places/<id>.svg).
// To use a real photo, save it as public/places/<id>.jpg - the app prefers it automatically.
import { readFileSync, writeFileSync } from 'node:fs'
const src = readFileSync('src/data/places.ts', 'utf8')
const range = (a, b, s) => {
  const r = []
  for (let i = a; i < b; i += s) r.push(i)
  return r
}
const win = (xs, y, w = 10, h = 14, c = '#fff8') =>
  xs.map((x) => `<rect x="${x}" y="${y}" width="${w}" height="${h}" fill="${c}"/>`).join('')
const S = {
  rathaus:
    '<rect x="90" y="85" width="220" height="75" fill="#c9a27e"/><rect x="180" y="40" width="40" height="45" fill="#b88a64"/><polygon points="175,40 225,40 200,12" fill="#8a3b2e"/><circle cx="200" cy="58" r="9" fill="#fff"/>' +
    win([105, 130, 155, 235, 260, 285], 100) +
    '<rect x="190" y="125" width="20" height="35" fill="#5b3a29"/>',
  lorenzkirche:
    '<rect x="95" y="105" width="160" height="55" fill="#b08968"/><polygon points="90,105 175,70 260,105" fill="#7a4a3a"/><rect x="265" y="45" width="42" height="115" fill="#a67c5b"/><polygon points="260,45 312,45 286,2" fill="#5c6b73"/>' +
    win([115, 145, 200, 225], 120, 12, 24, '#f6e3a8') +
    '<rect x="278" y="120" width="16" height="40" fill="#5b3a29"/>',
  michaeliskirche:
    '<rect x="100" y="108" width="170" height="52" fill="#d8c3a5"/><polygon points="95,108 185,78 275,108" fill="#8a5a44"/><rect x="62" y="68" width="34" height="92" fill="#c7ae8c"/><polygon points="58,68 100,68 79,30" fill="#6b4c3b"/><circle cx="185" cy="118" r="11" fill="#7aa7c7"/>' +
    win([120, 150, 215, 240], 130, 10, 22, '#4b6b88'),
  museum:
    '<polygon points="75,92 325,92 200,52" fill="#8f7a66"/><rect x="90" y="92" width="220" height="68" fill="#e3d2b4"/>' +
    [110, 150, 190, 230, 270]
      .map((x) => `<rect x="${x}" y="96" width="12" height="64" fill="#fff9"/>`)
      .join('') +
    '<rect x="75" y="160" width="250" height="8" fill="#b9a688"/>',
  theresienstein:
    '<polygon points="0,160 120,95 240,160" fill="#7fae7a"/><polygon points="160,160 290,85 400,160" fill="#6a9b6a"/>' +
    [40, 150, 265]
      .map(
        (x) =>
          `<rect x="${x + 9}" y="130" width="8" height="35" fill="#5b3a29"/><circle cx="${x + 13}" cy="115" r="30" fill="#2f7d4f"/>`,
      )
      .join('') +
    '<path d="M200 200 Q215 175 250 165" stroke="#e8dcc0" stroke-width="10" fill="none"/>',
  tierpark:
    '<rect x="0" y="150" width="400" height="6" fill="#8a6a4a"/>' +
    range(5, 400, 30)
      .map((x) => `<rect x="${x}" y="138" width="5" height="30" fill="#8a6a4a"/>`)
      .join('') +
    '<ellipse cx="190" cy="125" rx="42" ry="22" fill="#e9b949"/><rect x="224" y="55" width="12" height="75" fill="#e9b949"/><ellipse cx="238" cy="52" rx="16" ry="9" fill="#e9b949"/>' +
    [160, 175, 205, 220]
      .map((x) => `<rect x="${x}" y="138" width="8" height="30" fill="#c99a2e"/>`)
      .join('') +
    [
      [175, 118],
      [195, 128],
      [210, 115],
      [185, 135],
    ]
      .map(([x, y]) => `<circle cx="${x}" cy="${y}" r="5" fill="#8a5a2b"/>`)
      .join(''),
  untreusee:
    '<circle cx="320" cy="55" r="24" fill="#ffe28a"/><polygon points="0,115 100,70 200,115" fill="#7fae7a"/><polygon points="150,115 290,60 400,115" fill="#6a9b6a"/><rect x="0" y="115" width="400" height="85" fill="#4f9fd1"/>' +
    [
      [40, 140],
      [190, 150],
      [300, 135],
      [120, 175],
      [260, 180],
    ]
      .map(
        ([x, y]) =>
          `<path d="M${x} ${y} q10 -7 20 0 t20 0" stroke="#fff9" stroke-width="3" fill="none"/>`,
      )
      .join('') +
    '<polygon points="180,128 215,128 205,142 190,142" fill="#8a3b2e"/><polygon points="198,100 198,127 218,127" fill="#fff"/>',
  freiheitshalle:
    '<rect x="70" y="90" width="260" height="70" fill="#8f9bb3"/><path d="M60 92 Q200 20 340 92 Z" fill="#5d6b8a"/>' +
    win([95, 125, 155, 235, 265, 295], 108, 16, 30, '#f6e3a8') +
    '<circle cx="195" cy="135" r="7" fill="#fff"/><rect x="200" y="105" width="3" height="30" fill="#fff"/><path d="M203 105 q14 4 12 16" stroke="#fff" stroke-width="3" fill="none"/>',
  filmtage:
    '<rect x="85" y="75" width="230" height="85" fill="#3d3a4f"/><rect x="105" y="92" width="190" height="28" fill="#f2c94c"/>' +
    range(95, 310, 22)
      .map((x) => `<rect x="${x}" y="80" width="10" height="7" fill="#f2c94c"/>`)
      .join('') +
    '<rect x="180" y="128" width="40" height="32" fill="#1f1d2b"/><text x="200" y="112" font-family="sans-serif" font-size="16" font-weight="700" fill="#3d3a4f" text-anchor="middle">SCALA</text>',
  hochschule:
    '<rect x="95" y="62" width="210" height="98" fill="#9fb4c7"/>' +
    range(110, 290, 32)
      .flatMap((x) =>
        [75, 100, 125].map((y) => `<rect x="${x}" y="${y}" width="18" height="14" fill="#fff9"/>`),
      )
      .join('') +
    '<rect x="185" y="135" width="30" height="25" fill="#35506b"/><rect x="318" y="45" width="3" height="115" fill="#444"/><rect x="321" y="48" width="30" height="18" fill="#2f7d4f"/>',
  saale:
    '<rect x="0" y="125" width="400" height="75" fill="#4f9fd1"/><polygon points="0,125 130,80 260,125" fill="#7fae7a"/><polygon points="200,125 330,75 400,125" fill="#6a9b6a"/>' +
    [30, 320]
      .map(
        (x) =>
          `<rect x="${x + 9}" y="100" width="8" height="28" fill="#5b3a29"/><circle cx="${x + 13}" cy="88" r="24" fill="#2f7d4f"/>`,
      )
      .join('') +
    [
      [60, 150],
      [230, 165],
      [300, 145],
    ]
      .map(
        ([x, y]) =>
          `<path d="M${x} ${y} q10 -7 20 0 t20 0" stroke="#fff9" stroke-width="3" fill="none"/>`,
      )
      .join(''),
  altstadt: [
    [50, 95, '#d9a066'],
    [130, 80, '#c97b63'],
    [210, 90, '#e3c27a'],
    [290, 100, '#9fb4c7'],
  ]
    .map(
      ([x, y, c]) =>
        `<rect x="${x}" y="${y}" width="70" height="${160 - y}" fill="${c}"/><polygon points="${x - 5},${y} ${x + 35},${y - 28} ${x + 75},${y}" fill="#7a4a3a"/>` +
        win([x + 12, x + 42], y + 20, 14, 18),
    )
    .join(''),
}
const skies = {
  history: ['#cfe3f2', '#f6ead3'],
  nature: ['#bfe0f5', '#e9f5df'],
  culture: ['#d6d3f0', '#f6e3ee'],
}
const times = [
  ['', null],
  ['-2', ['#f6a97a', '#fde3b5']],
  ['-3', ['#2d3a6b', '#9a86b8']],
] // gallery: day, sunset, dusk
for (const [, id, name, cat] of src.matchAll(/id: '(\w+)', name: '([^']+)', cat: '(\w+)'/g)) {
  for (const [suffix, tone] of times) {
    const [a, b] = tone ?? skies[cat],
      ground = cat === 'nature' ? '#9bc48b' : '#a8b0a0'
    const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 200"><defs><linearGradient id="g" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${a}"/><stop offset="1" stop-color="${b}"/></linearGradient></defs><rect width="400" height="200" fill="url(#g)"/>${['untreusee', 'saale'].includes(id) ? '' : `<rect y="160" width="400" height="40" fill="${ground}"/>`}${S[id]}<rect y="172" width="400" height="28" fill="#0007"/><text x="14" y="191" font-family="sans-serif" font-size="15" fill="#fff" font-weight="700">${name}</text></svg>`
    writeFileSync(`public/places/${id}${suffix}.svg`, svg)
  }
}
console.log('place images written to public/places/')
