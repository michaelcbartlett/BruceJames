// ============================================================
// Single source of truth for the plugin catalog.
// LandingComponent, the downloads hub and the product deep-dive
// pages all bind to PRODUCTS so prices / URLs never drift.
//
// PRODUCTS = the catalog basics (name, slug, blurb, price, demo + buy URLs).
// DEEP_DIVES = the extra long-form content the deep-dive pages need
//   (tagline, plain-language explainer, per-control cards, specs, CTAs)
//   keyed by slug. Catalog basics are NOT duplicated here.
// ============================================================

export interface Product {
  slug: string;        // matches GA event names: buy_<slug>_click, dl_<slug>_<os>_click
  name: string;
  category: string;
  img: string;
  imgContain?: boolean;
  badge?: string;
  blurb: string;
  free?: boolean;
  freeNote?: string;
  price?: string;
  buyUrl?: string;
  demoWin: string;
  demoMac?: string;     // optional: not all builds ship for macOS yet
  demoLinux?: string;   // optional: only some plugins ship a Linux build
}

// Source of truth for the catalog cards. Order = display order.
export const PRODUCTS: Product[] = [
  {
    slug: 'deepperfection', name: 'DeepPerfection', category: 'Phase / Masking',
    img: '/plugin-deepperfection.png', badge: 'New',
    blurb: "Phase correction that just works, doesn't miss, and doesn't ruin your audio. It's as simple as that. It may sound too good to be true. Just try it.",
    price: '$49.99', buyUrl: 'https://brucejames.gumroad.com/l/deepperfection?wanted=true',
    demoWin: 'https://f005.backblazeb2.com/file/BruceJames-Marco/DeepPerfection_2.0.2.zip',
    demoMac: 'https://f005.backblazeb2.com/file/BruceJames-Marco/DeepPerfection-2.0.2-mac.pkg',
    demoLinux: 'https://f005.backblazeb2.com/file/BruceJames-Marco/DeepPerfection-2.0.1-linux.zip',
  },
  {
    slug: 'marco', name: 'Marco', category: 'Stereo / Space',
    img: '/plugin-marco.png',
    blurb: 'Place anything in the stereo field by hand. An XY space for width, depth and focus that feels real.',
    price: '$29.99', buyUrl: 'https://plugins.brucejames.studio?wanted=true',
    demoWin: 'https://f005.backblazeb2.com/file/BruceJames-Marco/Marco_1.1.15.zip',
    demoMac: 'https://f005.backblazeb2.com/file/BruceJames-Marco/Marco_1.1.15_mac.zip',
  },
  {
    slug: 'slushbus', name: 'SlushBus', category: 'Dynamics / Glue',
    img: '/plugin-slushbus.png',
    blurb: 'Bus glue with movement and more control than anything in its class. Dozens of parameters and live diagnostics that add tension and release.',
    price: '$14.99', buyUrl: 'https://brucejames.gumroad.com/l/slushbus?wanted=true',
    demoWin: 'https://f005.backblazeb2.com/file/BruceJames-Marco/SlushBus_1.1.4.zip',
    demoMac: 'https://f005.backblazeb2.com/file/BruceJames-Marco/SlushBus_1.1.4_mac.zip',
  },
  {
    slug: 'youarenotcrazy', name: 'YouAreNotCrazy', category: 'Utility / Diagnostics',
    img: '/plugin-youarenotcrazy.png', imgContain: true, badge: 'New',
    blurb: 'Something in your mix feels early? Late? Off? This measures the actual timing offset in milliseconds and shows you. Because you are not crazy, and now you can prove it.',
    free: true, freeNote: 'no demo nag, no account',
    demoWin: 'https://f005.backblazeb2.com/file/BruceJames-Marco/YouAreNotCrazy_1.0.0.zip',
    demoMac: 'https://f005.backblazeb2.com/file/BruceJames-Marco/YouAreNotCrazy_1.0.0_mac.zip',
  },
  {
    slug: 'longdivision', name: 'longDivision', category: 'Stereo / Width',
    img: '/plugin-longdivision.png', badge: 'New',
    blurb: 'A stereo widener that splits the spectrum into bands and widens only the correlation range you choose. Target the loud or the quiet, shape it with an LFO and envelopes, keep the rest untouched.',
    price: '$29.99', buyUrl: 'https://brucejames.gumroad.com/l/longDivision?wanted=true',
    demoWin: 'https://f005.backblazeb2.com/file/BruceJames-Marco/LongDivision_1.0.1.zip',
    demoMac: 'https://f005.backblazeb2.com/file/BruceJames-Marco/LongDivision_1.0.1_mac.zip',
  },
  {
    slug: 'planar', name: 'Planar', category: 'EQ / Spectral Balance',
    img: '/plugin-planar.png', badge: 'PC Early Access',
    blurb: 'Spectral balance correction that reads your mix against a target shape and corrects it in real time. Phase-coherent, band-by-band, with full dynamics control.',
    price: 'Coming soon',
    demoWin: 'https://f005.backblazeb2.com/file/BruceJames-Marco/Planar_1.0.0.zip',
  },
  {
    slug: 'slursh', name: 'Slursh', category: 'Saturator / Dynamics',
    img: '/plugin-slursh.png', badge: 'New',
    blurb: 'A clipper based on the depump section of SlushBus, plus a collapse section to make this plugin FEEL insane.',
    price: '$29.99', buyUrl: 'https://brucejames.gumroad.com/l/slursh?wanted=true',
    demoWin: 'https://f005.backblazeb2.com/file/BruceJames-Marco/Slursh_1.0.0.zip',
    demoMac: 'https://f005.backblazeb2.com/file/BruceJames-Marco/Slursh_1.0.0_mac.zip',
  },
];

// ---- The Everything Bundle (the whole catalog, one price) ----

export interface Bundle {
  name: string;
  price: string;        // bundle price
  retail: string;       // sum of buying every plugin separately
  saving: string;       // headline saving vs retail
  buyUrl: string;
  tagline: string;
  blurb: string;
  includes: string[];   // plugin names, in catalog order (free ones noted)
}

export const BUNDLE: Bundle = {
  name: 'The Everything Bundle',
  price: '$99',
  retail: '$154.95',
  saving: '$55',
  buyUrl: 'https://brucejames.gumroad.com/l/everything?wanted=true',
  tagline: 'Every BruceJames plugin. One price. Roughly the cost of two.',
  blurb: 'The whole catalog for $99. Buy them one at a time and it\'s $154.95, so really it\'s DeepPerfection and Marco, and the rest comes along for the ride. Full plugins, free updates for life, and every new release I add later drops your price even lower.',
  includes: ['DeepPerfection', 'Marco', 'longDivision', 'Slursh', 'SlushBus', 'YouAreNotCrazy (free)'],
};

// ---- A/B comparison stems (the "Hear it" player) ----
// Shared so the landing page (tabbed, all plugins) and each product deep-dive
// (single plugin) play from the exact same stem list.

export interface ComparisonTrack {
  label: string;
  src: string;
}

export interface ComparisonSet {
  slug: string;          // matches the product slug, so deep dives can look it up
  plugin: string;
  description: string;
  tag?: string;          // short "what it does" label, shown under the tab name
  note?: string;         // small helper line shown above the player
  tracks: ComparisonTrack[];
  sourceUrl?: string;
  sourceLabel?: string;
  downloadWin?: string;
  downloadMac?: string;
  downloadLinux?: string;
  buyUrl?: string;
  price?: string;
}

export const COMPARISONS: ComparisonSet[] = [
  {
    slug: 'deepperfection',
    plugin: 'DeepPerfection',
    description: 'Five stems from the same session. Switch between them and hear exactly what DeepPerfection puts back.',
    tag: 'Low end',
    note: 'Good headphones or speakers required to hear the difference.',
    sourceUrl: 'https://youtu.be/HeBwRGEeUCs?si=eHYd5mzpg2BISHll',
    sourceLabel: 'hear the full track',
    downloadWin: 'https://f005.backblazeb2.com/file/BruceJames-Marco/DeepPerfection_2.0.2.zip',
    downloadMac: 'https://f005.backblazeb2.com/file/BruceJames-Marco/DeepPerfection-2.0.2-mac.pkg',
    downloadLinux: 'https://f005.backblazeb2.com/file/BruceJames-Marco/DeepPerfection-2.0.1-linux.zip',
    buyUrl: 'https://brucejames.gumroad.com/l/deepperfection?wanted=true',
    price: '$49.99',
    tracks: [
      { label: 'Without DeepPerfection', src: '/deepPerfectionComparisons/without%20DeepPerfection.mp3' },
      { label: 'With DeepPerfection',    src: '/deepPerfectionComparisons/With%20DeepPerfection.mp3' },
      { label: "Null (what's added)",    src: '/deepPerfectionComparisons/DeepPerfection%20Null.mp3' },
      { label: 'Just Drums',             src: '/deepPerfectionComparisons/just%20drums.mp3' },
      { label: 'Just Instruments',       src: '/deepPerfectionComparisons/just%20inst.mp3' },
    ],
  },
  {
    slug: 'longdivision',
    plugin: 'longDivision',
    description: 'Same drum loop, five widths. Hear the stereo field open up — and the LFO put it in motion.',
    tag: 'Widening',
    downloadWin: 'https://f005.backblazeb2.com/file/BruceJames-Marco/LongDivision_1.0.1.zip',
    downloadMac: 'https://f005.backblazeb2.com/file/BruceJames-Marco/LongDivision_1.0.1_mac.zip',
    buyUrl: 'https://brucejames.gumroad.com/l/longDivision?wanted=true',
    price: '$29.99',
    tracks: [
      { label: 'Dry',                    src: '/longDivisionComparison/drums%20dry.mp3' },
      { label: 'Width 1',                src: '/longDivisionComparison/width%20at%201.mp3' },
      { label: 'Width 3',                src: '/longDivisionComparison/Width%20at%203.mp3' },
      { label: 'Width 3 + LFO',          src: '/longDivisionComparison/Width%20at%203%20with%20LFO.mp3' },
      { label: 'Width 3, Quiet Emphasis', src: '/longDivisionComparison/width%203%20quiet%20emphasis.mp3' },
    ],
  },
  {
    slug: 'slursh',
    plugin: 'Slursh',
    description: 'Same loop, five settings. Hear the drive and collapse stack up.',
    tag: 'Saturation',
    downloadWin: 'https://f005.backblazeb2.com/file/BruceJames-Marco/Slursh_1.0.0.zip',
    downloadMac: 'https://f005.backblazeb2.com/file/BruceJames-Marco/Slursh_1.0.0_mac.zip',
    buyUrl: 'https://brucejames.gumroad.com/l/slursh?wanted=true',
    price: '$29.99',
    tracks: [
      { label: 'No Slursh',                      src: '/SlurshComparisons/No%20Slursh%20Added.mp3' },
      { label: 'Full Drive',                      src: '/SlurshComparisons/Full%20Slush.mp3' },
      { label: 'Half Drive',                      src: '/SlurshComparisons/Half%20Slush.mp3' },
      { label: 'Full Drive + Collapse',           src: '/SlurshComparisons/Full%20Slush%20plus%20COLLAPSE.mp3' },
      { label: 'Little Drive + Little Collapse',  src: '/SlurshComparisons/Little%20bit%20of%20Slush%20Little%20bit%20of%20Collapse.mp3' },
    ],
  },
  {
    slug: 'slushbus',
    tag: 'Tension',
    plugin: 'SlushBus',
    description: 'A 2 track with SlushBus applied in strong and subtle amount.',
    downloadWin: 'https://f005.backblazeb2.com/file/BruceJames-Marco/SlushBus_1.1.4.zip',
    downloadMac: 'https://f005.backblazeb2.com/file/BruceJames-Marco/SlushBus_1.1.4_mac.zip',
    buyUrl: 'https://brucejames.gumroad.com/l/slushbus?wanted=true',
    price: '$14.99',
    tracks: [
      {
        label: 'No SlushBus',
        src: '/SlushBusComparisons/no%20slushbus.mp3'
      },
      {
        label: 'Subtle',
        src: '/SlushBusComparisons/Subtle%20slushbus.mp3'
      },
      {
        label: 'Null',
        src: '/SlushBusComparisons/null%20slushbus.mp3'
      },
      {
        label: 'Max',
        src: '/SlushBusComparisons/max%20slushbus.mp3'
      }
      ],
  },
];

export function getComparison(slug: string): ComparisonSet | undefined {
  return COMPARISONS.find(c => c.slug === slug);
}

// ---- Deep-dive long-form content (not part of the catalog basics) ----

export interface ControlCard {
  k: string;    // mono kicker: the control / section name from the real UI
  h4: string;   // plain-language label
  p: string;    // what it does
}

export interface HearBlock {
  heading: string;
  intro: string;
  youtubeUrl?: string;   // DeepPerfection links out to the full track
  youtubeLabel?: string;
}

// Q&A shown on the deep dive + emitted as FAQPage JSON-LD. Written plainly so
// answer engines (ChatGPT, Perplexity, Google AI Overviews) can extract them.
export interface FaqItem {
  q: string;
  a: string;
}

export interface DeepDive {
  // <head>
  title: string;
  metaDescription: string;
  // hub list card extras (not in PRODUCTS)
  hubBadge?: string;       // overrides catalog badge with the conversion-tuned hub badge
  hubBadgeFree?: boolean;  // green "free" badge variant
  dlFmt: string;           // the ".dl-fmt" line: "v1.3.0 · VST3 · AU · CLAP · ~14 MB"
  // hero
  promo?: string;          // overrides the default demo promo bar copy
  heroTagline: string;
  shotCaption: string;
  imgAlt: string;
  buyLineFree?: string;    // p-buyline copy for free plugins (no buy link)
  useMock?: boolean;       // render the CSS screen-mock instead of a screenshot
  mock?: { lbl: string; readout: string; readoutUnit: string; sub: string };
  // "what it actually does"
  whatHeading: string;
  whatParagraphs: string[];   // may contain <strong>, rendered as trusted HTML
  // "the interface, explained"
  controlsEyebrow: string;
  controlsIntro: string;
  controls: ControlCard[];
  // optional "hear it"
  hear?: HearBlock;
  // optional FAQ (rendered + emitted as FAQPage structured data)
  faq?: FaqItem[];
  // specs strip
  version: string;
  formats: string;
  systems: string;
  specPrice: string;
  // bottom CTA band
  ctaHeading: string;
  ctaSub: string;
  ctaFine: string;
}

export const DEEP_DIVES: Record<string, DeepDive> = {
  deepperfection: {
    title: 'DeepPerfection: phase correction that listens · BruceJames',
    metaDescription: 'DeepPerfection rebuilds the low end phase cancellation steals. Route your kick to the sidechain once; it additively restores what cancelled. Free full demo.',
    hubBadge: 'Most installed',
    dlFmt: 'v1.3.0 · VST3 · AU · CLAP · ~14 MB',
    heroTagline: 'Phase correction that actually listens, and shows you every collision before it fixes it.',
    shotCaption: 'The full interface · analyzer + 7 controls',
    imgAlt: 'DeepPerfection plugin interface, analyzer with priority, behavior and dry/wet knobs',
    whatHeading: 'It rebuilds the low end phase cancellation steals.',
    whatParagraphs: [
      'A kick and a bass both live in the sub frequencies. Down there their waveforms overlap, and wherever they oppose, they cancel. That energy doesn\'t move somewhere else; it\'s just <strong>gone</strong>. Your low end thins out and nothing on the channel strip explains why.',
      'Route the masking source, usually your kick, into DeepPerfection\'s sidechain once. It works out exactly what cancelled and <strong>additively rebuilds</strong> the low end you lost: no timing shifts, no pitch warping, zero new artifacts. The analyzer draws the collision in real time, and a live <strong>restore %</strong> tells you how much it\'s putting back, so you\'re mixing by eye and ear, not faith.',
      '“Fix your phase automatically” sounds like snake oil. Phase cancellation is real, measurable physics, and this is the only plugin that attacks it by rebuilding instead of nudging.',
    ],
    controlsEyebrow: 'Every knob, in plain language',
    controlsIntro: 'Nothing here is a black box. This is the whole panel. Here\'s what each control is for.',
    controls: [
      { k: 'Analyzer + Restore %', h4: 'See the collision', p: 'The spectrum shows your signal, the sidechain, and exactly where they fight. “Restore %” reads how much low end is being rebuilt right now.' },
      { k: 'Priority · Input / Sidechain', h4: 'Threshold', p: 'Sets how much cancellation has to be present before it acts, and whether it listens to the track or the sidechain source first.' },
      { k: 'Cutoff', h4: 'Where it works', p: 'Focuses the repair on the frequency range that actually matters. Keep it on the lows, or open it up.' },
      { k: 'More / Tighten', h4: 'How hard, how tight', p: 'More pushes the amount of restoration; Tighten controls how surgically it tracks the collision versus letting it breathe.' },
      { k: 'Saturate · Priority', h4: 'Glue the rebuild in', p: 'Adds harmonic weight so the restored energy sits with the original instead of sounding bolted on.' },
      { k: 'Behavior · Greater', h4: 'Level & Dry/Wet', p: 'Level trims the output; Dry/Wet blends the correction against the untouched signal. Null compares the two instantly.' },
    ],
    hear: {
      heading: 'Five stems from one session.',
      intro: 'Switch between the raw mix, the corrected mix, the null (what it added), and the isolated drums and instruments. Same gain, same everything, just phase fixed. Good headphones or speakers required.',
      youtubeUrl: 'https://youtu.be/HeBwRGEeUCs?si=eHYd5mzpg2BISHll',
      youtubeLabel: 'Hear the full track',
    },
    version: '1.3.0', formats: 'VST3 · AU · CLAP', systems: 'Windows · macOS · Linux', specPrice: '$49.99 · free demo',
    faq: [
      { q: 'What formats and systems does DeepPerfection support?', a: 'VST3, AU and CLAP, on Windows, macOS and Linux.' },
      { q: 'Does DeepPerfection add latency or shift my timing?', a: 'No. It additively rebuilds the cancelled low end with no timing shifts, no pitch warping and zero added artifacts.' },
      { q: 'How do I set it up?', a: 'Route the masking source — usually your kick — into DeepPerfection\'s sidechain once. The analyzer draws the collision in real time and a live restore % shows how much low end it\'s putting back.' },
      { q: 'Is the free demo limited?', a: 'No. The demo is the complete plugin — it just drops to silence briefly now and then until you buy it. No feature locks, no account, no card.' },
    ],
    ctaHeading: 'Put it on the mix that\'s thinning out right now.',
    ctaSub: 'The whole plugin, free. Most people who buy decide within a day of installing, because they can hear it.',
    ctaFine: 'VST3 · AU · CLAP · no account, no card',
  },

  marco: {
    title: 'Marco: place anything in the stereo field · BruceJames',
    metaDescription: 'Marco is an XY space for width, depth and focus that feels physical. Crossover, energy matching and pan-link. Free full demo for Windows & macOS.',
    dlFmt: 'v1.1.15 · VST3 · AU · CLAP · ~12 MB',
    heroTagline: 'Place anything in the stereo field by hand. Width, depth and focus that finally feel physical.',
    shotCaption: 'The full interface · XY pad + 4 controls',
    imgAlt: 'Marco plugin interface, a large XY pad over four knobs',
    whatHeading: 'An XY space you place sound into, by hand.',
    whatParagraphs: [
      'Most stereo tools give you one width knob and a prayer. Marco gives you a <strong>physical space</strong>: drag a source across the pad to set its position and how wide or focused it sits, and hear it move the way you\'d move a player in a room.',
      'A built-in <strong>crossover</strong> means the lows can stay centered and solid while the top half opens up, with no mud and no mono-compatibility surprises. <strong>Match Energy</strong> holds perceived loudness steady as you widen, so you\'re judging the image, not a volume jump. <strong>Pan-link</strong> ties the controls together when you want symmetry and frees them when you don\'t.',
      'It feels less like processing and more like placing, which is why people keep one on every group.',
    ],
    controlsEyebrow: 'Every control, in plain language',
    controlsIntro: 'This is the whole panel. Here\'s what each part does.',
    controls: [
      { k: 'The XY pad', h4: 'Position + spread', p: 'Drag to place the source. One axis sets where it sits across the field, the other how wide or focused it is. Pan Style changes the law it follows.' },
      { k: 'Crossover · Pan-Link', h4: 'Protect the lows', p: 'Sets the split point (e.g. 250 Hz) so bass stays centered while everything above it moves. Pan-link keeps the two halves coupled.' },
      { k: 'Match Energy', h4: 'Same loudness, wider image', p: 'Compensates level as you widen so you\'re comparing the stereo picture, not getting fooled by a volume change.' },
      { k: 'Profile · Color', h4: 'Shape the spread', p: 'Tilts how the widening is distributed across the field, with two Color voicings to warm or cool the result.' },
      { k: 'Mix · Pan-Link', h4: 'Blend it back', p: 'Dial the processed image against the dry signal for parallel placement instead of an all-or-nothing move.' },
      { k: 'In / Out meters', h4: 'Watch the gain', p: 'Input and output meters keep you honest about level through the whole chain.' },
    ],
    version: '1.1.15', formats: 'VST3 · AU · CLAP', systems: 'Windows + macOS', specPrice: '$29.99 · free demo',
    faq: [
      { q: 'What formats and systems does Marco support?', a: 'VST3, AU and CLAP, on both Windows and macOS.' },
      { q: 'Will widening with Marco break mono compatibility?', a: 'No. A built-in crossover keeps the lows centered while the top half opens up, and Match Energy holds perceived loudness steady as you widen.' },
      { q: 'Where should I use Marco?', a: 'On groups and buses, to place a source in the stereo field by hand — drag across the XY pad to set its position, width and focus.' },
      { q: 'Is the free demo limited?', a: 'No. The demo is the complete plugin — it just drops to silence briefly now and then until you buy it. No account, no card.' },
    ],
    ctaHeading: 'Drop it on a group and move something.',
    ctaSub: 'The whole plugin, free. The fastest way to get it is to place one source by hand. It clicks immediately.',
    ctaFine: 'VST3 · AU · CLAP · no account, no card',
  },

  slushbus: {
    title: 'SlushBus: bus glue with movement · BruceJames',
    metaDescription: 'SlushBus is a bus compressor that boosts and reduces, depumps, swells and reads transients, with a live reference scope. Free full demo, Windows & macOS.',
    dlFmt: 'v1.1.4 · VST3 · AU · CLAP · ~13 MB',
    heroTagline: 'Bus glue with movement, and more control than anything in its class.',
    shotCaption: 'The full interface · reference scope + full dynamics section',
    imgAlt: 'SlushBus plugin interface, a reference scope ringed by detection and dynamics knobs',
    whatHeading: 'A bus compressor that can give energy back, not just take it.',
    whatParagraphs: [
      'Most glue compressors do one thing: pull peaks down and hope it gels. SlushBus does that <strong>and the opposite</strong>. Max Reduce tames the loud, Max Boost lifts the quiet, so the mix tightens without flattening. A live <strong>reference scope</strong> shows you the movement instead of leaving you guessing at a gain-reduction needle.',
      'Then it goes further than its class has any right to: <strong>DePump</strong> undoes the breathing artifact a hard bus comp creates, <strong>Swell</strong> adds movement back where you want it, and <strong>transient-aware detection</strong> means it reacts to hits the way you\'d ride a fader. Four threshold modes and a sidechain HPF/LPF let you decide exactly what it listens to.',
      'It\'s the cheapest plugin in the catalog and quietly the deepest. Null Test lets you prove every bit of it.',
    ],
    controlsEyebrow: 'Every section, in plain language',
    controlsIntro: 'It looks busy because it gives you the controls others hide. Here\'s the map.',
    controls: [
      { k: 'Max Reduce / Max Boost', h4: 'Both directions', p: 'Cap how far it pulls the loud down and how far it lifts the quiet up. Glue that tightens instead of squashing.' },
      { k: 'Strength · Mix', h4: 'How much, parallel', p: 'Strength scales the whole effect; Mix blends it against the dry bus for parallel glue.' },
      { k: 'Attack (Knee) · Rel (Delay)', h4: 'Timing', p: 'Classic envelope control, plus a Knee for how gently it engages and a Delay on release for shaping the recovery.' },
      { k: 'DePump · Swell', h4: 'Take the pump out, or add it', p: 'DePump removes the breathing artifact of hard compression; Swell deliberately adds movement back where it feels good.' },
      { k: 'Transient Detection', h4: 'Reacts like a hand on the fader', p: 'Emphasis + Threshold tune how it hears hits, so it ducks musically instead of mechanically.' },
      { k: 'Modes + Reference scope', h4: 'See what it\'s doing', p: 'Fraction / Constant / Dual / Quadratic change the threshold behavior; the scope draws the result live so nothing is hidden.' },
    ],
    version: '1.1.4', formats: 'VST3 · AU · CLAP', systems: 'Windows + macOS', specPrice: '$14.99 · free demo',
    faq: [
      { q: 'What formats and systems does SlushBus support?', a: 'VST3, AU and CLAP, on both Windows and macOS.' },
      { q: 'How is SlushBus different from a normal bus compressor?', a: 'It can lift the quiet as well as pull the loud down, and adds DePump, Swell, transient-aware detection, four threshold modes and a live reference scope — more control than anything in its class.' },
      { q: 'How much does it cost?', a: 'SlushBus is $14.99, a one-time purchase with free updates. The free demo is the full plugin.' },
      { q: 'Is the free demo limited?', a: 'No. The demo is the complete plugin — it just drops to silence briefly now and then until you buy it. No account, no card.' },
    ],
    ctaHeading: 'Put it across your drum or mix bus.',
    ctaSub: 'The whole plugin, free. Watch the scope move and you\'ll understand it faster than any manual could explain.',
    ctaFine: 'VST3 · AU · CLAP · no account, no card',
  },

  youarenotcrazy: {
    title: 'YouAreNotCrazy: measure the timing offset · BruceJames',
    metaDescription: 'YouAreNotCrazy measures the actual timing offset in your mix in milliseconds and shows you. Free forever, no catch, no account. Windows & macOS.',
    hubBadge: '100% free', hubBadgeFree: true,
    dlFmt: 'v1.0.0 · VST3 · AU · CLAP · free forever',
    promo: 'This one\'s <b>free forever</b>. No catch, no account, no card. Just yours.',
    heroTagline: 'Something feels early? Late? Off? Measure the actual timing offset, in milliseconds, and prove it.',
    shotCaption: 'Reads the real offset between two signals',
    imgAlt: 'YouAreNotCrazy timing readout',
    buyLineFree: 'Free forever. No catch, no account. Keep it on your meter row and forget about it.',
    useMock: true,
    mock: { lbl: 'Measured timing offset', readout: '+3.7', readoutUnit: ' ms', sub: 'Track B lands 3.7 ms behind A. You weren\'t imagining it.' },
    whatHeading: 'It settles the argument with a number.',
    whatParagraphs: [
      'You hear it: the double of the guitar feels a hair late, the room mic is dragging, the re-amp came back shifted. Everyone tells you it\'s fine. <strong>It probably isn\'t.</strong>',
      'YouAreNotCrazy measures the actual timing offset between two signals and shows it to you in <strong>milliseconds</strong>. Now you know whether to nudge, and by exactly how much, instead of nudging blindly and hoping. It\'s the diagnostic that turns “something\'s off” into “Track B is 3.7 ms late,” which you can fix in two seconds.',
      'It\'s free because everyone should have it, and there\'s no catch because there\'s nothing to upsell. Install it once and leave it on your meter row.',
    ],
    controlsEyebrow: 'How you use it',
    controlsIntro: '',
    controls: [
      { k: 'Step 1', h4: 'Patch in the two signals', p: 'Put it where it can see the track and the reference you\'re comparing it against.' },
      { k: 'Step 2', h4: 'Read the offset', p: 'It shows the timing difference in milliseconds, with the direction: which one is early and which is late.' },
      { k: 'Step 3', h4: 'Nudge by exactly that', p: 'Slide the track by the number it gave you. Done. No guessing, no “close enough.”' },
      { k: 'Free forever', h4: 'No catch, no account', p: 'Nothing to unlock, nothing to expire. The only BruceJames plugin that never asks you for anything.' },
    ],
    version: '1.0.0', formats: 'VST3 · AU · CLAP', systems: 'Windows + macOS', specPrice: 'Free forever',
    faq: [
      { q: 'Is YouAreNotCrazy really free?', a: 'Yes — free forever, no catch, no account, no card. It never nags.' },
      { q: 'What does YouAreNotCrazy do?', a: 'It measures the actual timing offset between two signals in milliseconds and tells you which one is early and which is late, so you can nudge by exactly that amount.' },
      { q: 'How do I use it?', a: 'Patch in the two signals you\'re comparing, read the offset in milliseconds, then slide the track by that number. No guessing.' },
      { q: 'What formats and systems does it support?', a: 'VST3, AU and CLAP, on both Windows and macOS.' },
    ],
    ctaHeading: 'Grab it. There\'s literally no catch.',
    ctaSub: 'Free, full, no account, no catch. Install it once and stop second-guessing your ears.',
    ctaFine: 'VST3 · AU · CLAP · free forever',
  },

  longdivision: {
    title: 'longDivision: band-split stereo widening · BruceJames',
    metaDescription: 'longDivision splits the spectrum into bands and widens only the correlation range you choose. Target loud or quiet, move it with an LFO. Free full demo.',
    hubBadge: 'New',
    dlFmt: 'v1.0.0 · VST3 · AU · CLAP · ~12 MB',
    heroTagline: 'Split the spectrum, widen only the part you choose, and put it in motion.',
    shotCaption: 'The full interface · correlation map + four control banks',
    imgAlt: 'longDivision plugin interface, a correlation display flanked by width, shape, target and bias sections',
    whatHeading: 'Surgical widening that leaves the rest untouched.',
    whatParagraphs: [
      'A normal widener smears the whole signal and takes your phase coherence with it. longDivision splits the spectrum into bands by <strong>correlation</strong> and lets you widen only the slice you point it at. Set a <strong>target window</strong> from equal to opposite correlation, and a <strong>magnitude bias</strong> so it works on the loud material or the quiet material, not everything.',
      'Width and Resolution set how much and how finely; the <strong>SHAPE</strong> bank\'s LFO plus Attack/Release put the widening in motion instead of leaving it static; <strong>TARGET</strong> HPF/LPF/Tilt and <strong>BIAS</strong> emphasis/curve decide where on the spectrum it bites. Everything you don\'t target stays exactly where it was.',
      'It stays mono-compatible by design. Null it against the dry signal and the untouched bands cancel to silence.',
    ],
    controlsEyebrow: 'Every bank, in plain language',
    controlsIntro: 'The big map in the middle is the correlation view. Around it, four banks of control.',
    controls: [
      { k: 'Width · Resolution · Lock', h4: 'How much, how fine', p: 'Width sets the spread; Resolution sets how many bands it splits into; Lock To Window pins the effect to your chosen correlation slice.' },
      { k: 'Target Window · Magnitude Bias', h4: 'Choose what to widen', p: 'Slide from EQUAL to OPPOSITE correlation, then bias toward NONE / LOUD / QUIET so it only touches the material you mean.' },
      { k: 'Shape · LFO + Envelopes', h4: 'Put it in motion', p: 'LFO Amount and Rate sweep the widening over time; Attack and Release control how quickly it responds to the music.' },
      { k: 'Target · HPF / LPF / Tilt', h4: 'Where it acts', p: 'Constrain the processed range and tilt the balance so widening sits exactly where the mix needs it.' },
      { k: 'Bias · Emphasis / Curve', h4: 'Fine-tune the response', p: 'Shape how aggressively the effect ramps across the target window for a natural or dramatic spread.' },
      { k: 'Dry / Wet · Correlation map', h4: 'Blend & verify', p: 'Mix against the dry signal and watch the L/R correlation map confirm you stayed coherent.' },
    ],
    hear: {
      heading: 'One drum loop, five widths.',
      intro: 'From dry to Width 3 with the LFO moving, hear the field open up while the lows stay locked. “Massively impressed. More control than anything I\'ve used, and staying in phase while widening is super easy.” (TheSweetSpot, Gearspace).',
    },
    version: '1.0.0', formats: 'VST3 · AU · CLAP', systems: 'Windows + macOS', specPrice: '$29.99 · free demo',
    faq: [
      { q: 'What formats and systems does longDivision support?', a: 'VST3, AU and CLAP, on both Windows and macOS.' },
      { q: 'Does longDivision stay mono-compatible?', a: 'Yes, by design. Null it against the dry signal and the bands you didn\'t target cancel to silence.' },
      { q: 'What makes it different from a normal stereo widener?', a: 'It splits the spectrum by correlation and widens only the band you target — loud or quiet material — and can put that widening in motion with an LFO and envelopes.' },
      { q: 'Is the free demo limited?', a: 'No. The demo is the complete plugin — it just drops to silence briefly now and then until you buy it. No account, no card.' },
    ],
    ctaHeading: 'Widen a synth or drum bus without losing the mono.',
    ctaSub: 'The whole plugin, free. Point it at the loud band, add a little LFO, and check the correlation map.',
    ctaFine: 'VST3 · AU · CLAP · no account, no card',
  },

  planar: {
    title: 'Planar: spectral balance correction · BruceJames',
    metaDescription: 'Planar reads your mix against a target spectral shape and corrects it in real time. Phase-coherent, band-by-band. PC early access now available.',
    hubBadge: 'PC Early Access',
    dlFmt: 'v1.0.0 · VST3 · CLAP · Windows',
    promo: '<b>PC Early Access</b> — Windows build ready for testing. Mac coming soon.',
    heroTagline: 'Spectral balance correction that reads your mix against a target shape and corrects it in real time.',
    shotCaption: 'The full interface · spectral analyzer + dynamics section',
    imgAlt: 'Planar plugin interface showing spectral balance analyzer and correction controls',
    whatHeading: 'It corrects the spectral balance without touching what\'s working.',
    whatParagraphs: [
      'Most EQs ask you to guess. Planar shows you a <strong>target shape</strong> against your actual spectrum and corrects toward it band by band, so you\'re making decisions with data instead of instinct.',
      'The correction is <strong>phase-coherent</strong> and runs with full dynamics control — threshold, knee, transient handling — so it responds to the music rather than static-equalizing the whole mix. A dynamics section lets you set how aggressively it chases the target and how fast it reacts.',
      'PC Early Access is live now. Mac build coming soon.',
    ],
    controlsEyebrow: 'Every section, in plain language',
    controlsIntro: 'The analyzer is the center of the plugin. Everything else shapes how it corrects.',
    controls: [
      { k: 'Spectral Analyzer', h4: 'See the imbalance', p: 'Draws your signal against the target shape in real time so you know exactly where the correction is happening.' },
      { k: 'Window · Start / End', h4: 'Focus the analysis', p: 'Constrain the frequency range the correction acts on so you\'re not touching what already sounds right.' },
      { k: 'Global · Tilt / LR Link', h4: 'Shape the target', p: 'Tilt adjusts the overall slope of the target curve; LR Link ties the two channels together for mono-compatible correction.' },
      { k: 'Low Shelf · Freq / Boost', h4: 'Anchor the lows', p: 'A dedicated low-shelf lets you lock the bottom end independently of the mid correction.' },
      { k: 'Mid · Freq / Gain / Q', h4: 'Fine-tune the middle', p: 'Parametric mid band for surgical correction in the range that matters most.' },
      { k: 'Dynamics · Threshold / Knee / Clamp', h4: 'Control the response', p: 'Sets how much imbalance has to be present before it corrects, and how hard it clamps the result.' },
    ],
    version: '1.0.0', formats: 'VST3 · CLAP', systems: 'Windows (Mac coming soon)', specPrice: 'Coming soon · free early access',
    ctaHeading: 'Try the PC early access build.',
    ctaSub: 'Windows build is ready for testing. Download free and tell me what you think.',
    ctaFine: 'VST3 · CLAP · Windows · Mac coming soon',
  },

  slursh: {
    title: 'Slursh: a clipper with a collapse stage · BruceJames',
    metaDescription: 'Slursh is a clipper built on SlushBus\'s depump section, plus a collapse stage that ducks lows and highs independently. Free full demo, Windows & macOS.',
    hubBadge: 'New',
    dlFmt: 'v1.0.0 · VST3 · AU · CLAP · ~12 MB',
    heroTagline: 'A clipper built on SlushBus\'s depump, plus a collapse stage that makes it feel insane.',
    shotCaption: 'The full interface · Slush + Collapse sections',
    imgAlt: 'Slursh plugin interface, drive and collapse sections with a HI/LO timing display',
    whatHeading: 'A clipper that grabs the signal and shakes it.',
    whatParagraphs: [
      'The <strong>Slush</strong> section is the saturator: Drive, Threshold, Floor and Knee push the signal into clipping with the same depump character that made SlushBus feel alive. Controlled where you want it, unhinged where you don\'t.',
      'Then the <strong>Collapse</strong> stage is what makes it different. It ducks the lows and highs <strong>independently</strong>, each with its own attack and release, so you can crush the top while the low end stays planted, or the reverse. <strong>Squarify</strong> squares off the transients into something with real attitude, and the HI/LO timing display shows the duck happening in milliseconds.',
      'It\'s a saturator that behaves like a dynamics processor. Drop it on a drum bus and it stops being subtle.',
    ],
    controlsEyebrow: 'Both sections, in plain language',
    controlsIntro: 'Two halves: Slush drives, Collapse ducks. The screen in the corner shows the timing.',
    controls: [
      { k: 'Slush · Drive / Thresh', h4: 'The clip', p: 'Drive pushes the signal into saturation; Threshold sets where the clipping starts to bite.' },
      { k: 'Slush · Floor / Knee', h4: 'Shape the clip', p: 'Floor sets the bottom of the action and Knee how sharply it engages, from gentle warmth to hard edge.' },
      { k: 'Collapse · Amount / Xover', h4: 'The duck, split in two', p: 'Amount sets how hard it collapses; Xover is the frequency where “lows” end and “highs” begin.' },
      { k: 'Lo / Hi Duck · Atk · Rel', h4: 'Independent timing', p: 'Duck the low and high bands by different amounts, each with its own attack and release. The HI/LO screen shows the curves live.' },
      { k: 'Squarify', h4: 'Attitude', p: 'Squares off the transients for a harder, more aggressive edge when you want the effect to be obvious.' },
      { k: 'Global · Input / Dry-Wet / Output', h4: 'Stage & blend', p: 'Set drive into the section, blend the result against dry for parallel grit, and trim the output to match.' },
    ],
    hear: {
      heading: 'One loop, five settings.',
      intro: 'From no Slursh to full drive plus collapse, hear the drive and the duck stack up. A little of each goes a long way; all the way up goes somewhere else entirely.',
    },
    version: '1.0.0', formats: 'VST3 · AU · CLAP', systems: 'Windows + macOS', specPrice: '$29.99 · free demo',
    faq: [
      { q: 'What formats and systems does Slursh support?', a: 'VST3, AU and CLAP, on both Windows and macOS.' },
      { q: 'What is the Collapse stage?', a: 'It ducks the lows and highs independently, each with its own attack and release, so you can crush the top while the low end stays planted — or the reverse.' },
      { q: 'Where does Slursh shine?', a: 'On a drum bus. Drive the Slush saturation section and engage Collapse for an aggressive, dynamic character that stops being subtle.' },
      { q: 'Is the free demo limited?', a: 'No. The demo is the complete plugin — it just drops to silence briefly now and then until you buy it. No account, no card.' },
    ],
    ctaHeading: 'Throw it on a drum bus and turn it up.',
    ctaSub: 'The whole plugin, free. Drive the Slush section, engage Collapse, and feel the difference in one bar.',
    ctaFine: 'VST3 · AU · CLAP · no account, no card',
  },
};

export const DEFAULT_PROMO =
  'The demo <b>is</b> the full plugin. It just drops to silence now &amp; then. Free · no account · no card.';

export function getProduct(slug: string): Product | undefined {
  return PRODUCTS.find(p => p.slug === slug);
}
