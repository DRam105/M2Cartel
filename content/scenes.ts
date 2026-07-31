/**
 * M2 CARTEL — scene, hotspot, and navigation data.
 *
 * The experience is a 7-scene vertical "descent". Scene 1 is the finished
 * hero art; the remaining scenes drop real art into a shared frame, with
 * hotspots positioned as percentages of the stage.
 */

export type PanelId =
  | "doctrine"
  | "about"
  | "notes"
  | "fed"
  | "creature"
  | "bill"
  | "ventures"
  | "realestate"
  | "vault"
  | "scorecard";

/** What a hotspot does when clicked. */
export type HotspotAction =
  | { type: "panel"; panel: PanelId }
  | { type: "goto"; to: string }
  | { type: "secret" };

export type Hotspot = {
  /** Position/size as percentages of the stage, e.g. { left: "67%", top: "6%" }. */
  box: { left: string; top: string; width: string; height: string };
  action: HotspotAction;
  /** Accessible label (announced to screen readers). */
  label: string;
  /** Visible tooltip on hover/focus. */
  tip: string;
  /** Renders the dotted/red "secret" styling. */
  secret?: boolean;
};

export type SceneImage = {
  src: string;
  alt: string;
  /**
   * Aspect ratio (width / height) of the source art. Drives the stage frame
   * so the whole image shows with no cropping (`--ar` in globals.css).
   */
  ar: number;
};

export type Scene = {
  id: string;
  /** Short label shown on the descent meter. */
  name: string;
  /** Depth readout value, e.g. "+30,000 ft". */
  depth: string;
  /** Depth readout place, e.g. "the sky". */
  place: string;
  /** Corner tag text, e.g. "SERIES 2026 · SCENE 01 / 07". */
  tag: string;
  /** Faux banknote serial. */
  serial: string;
} & (
  | { kind: "hero"; image: SceneImage; hotspots: Hotspot[] }
  | {
      kind: "room";
      /** Background tint class, e.g. "t-island". */
      theme: string;
      /** Scene label above the title, e.g. "Scene 02 / 07 — Island". */
      no: string;
      /** Two-line display title. */
      title: [string, string];
      sub: string;
      hotspots: Hotspot[];
      /**
       * Once real art exists for a scene, set this. When present, the image
       * fills the stage (like the hero) instead of the placeholder "room",
       * and its hotspots render in the subtle hover style.
       */
      image?: SceneImage;
    }
);

export const SECRET_QUOTE =
  "The money never sleeps. Neither does the cartel.";

export type NavItem = {
  label: string;
  small: string;
  action: HotspotAction;
};

export const NAV: NavItem[] = [
  { label: "The Doctrine", small: "M2 · CARTEL", action: { type: "panel", panel: "doctrine" } },
  { label: "Jekyll Island", small: "THE FED", action: { type: "goto", to: "s2" } },
  { label: "The Bill", small: "INFLATION", action: { type: "panel", panel: "bill" } },
  { label: "The Ventures", small: "BUSINESSES", action: { type: "panel", panel: "ventures" } },
  { label: "Hard Assets", small: "REAL ESTATE", action: { type: "panel", panel: "realestate" } },
  { label: "The Vault", small: "LEDGER · CONTACT", action: { type: "panel", panel: "vault" } },
  { label: "The Scorecard", small: "THE SCORE", action: { type: "panel", panel: "scorecard" } },
];

export const SCENES: Scene[] = [
  {
    id: "s1",
    kind: "hero",
    name: "Sky",
    depth: "+30,000 ft",
    place: "the sky",
    tag: "SERIES 2026 · SCENE 01 / 07",
    serial: "M2 74619283 C",
    image: {
      src: "/images/scene1-hero.jpg",
      alt: "M2 Cartel — the owner holding a fist of M2 cash in front of Jekyll Island and a money-printing lighthouse, with an M2 CARTEL graffiti tag in the sky.",
      ar: 1120 / 896, // 1.25
    },
    hotspots: [
      { box: { left: "67%", top: "6%", width: "31%", height: "29%" }, action: { type: "panel", panel: "doctrine" }, label: "Open The Doctrine", tip: "The Doctrine →" },
      { box: { left: "11%", top: "26%", width: "31%", height: "17%" }, action: { type: "goto", to: "s2" }, label: "Dive to Jekyll Island", tip: "Jekyll Island ↓" },
      { box: { left: "20%", top: "56%", width: "40%", height: "39%" }, action: { type: "goto", to: "s3" }, label: "Dive to The Bill", tip: "The Money ↓" },
      { box: { left: "73%", top: "61%", width: "9%", height: "10%" }, action: { type: "panel", panel: "about" }, label: "Open Background / About", tip: "Who I Am →" },
      { box: { left: "16%", top: "2%", width: "11%", height: "10%" }, action: { type: "panel", panel: "notes" }, label: "Open Personal Finance notes", tip: "Sound Money →" },
      { box: { left: "47%", top: "20%", width: "19%", height: "11%" }, action: { type: "secret" }, label: "Hidden easter egg", tip: "?", secret: true },
    ],
  },
  {
    id: "s2",
    kind: "room",
    name: "Isle",
    depth: "+9,000 ft",
    place: "jekyll island",
    tag: "SCENE 02 / 07",
    serial: "M2 19100913 C",
    theme: "t-island",
    no: "Scene 02 / 07 — Island",
    title: ["JEKYLL", "ISLAND"],
    sub: "Where the Fed was dreamed up in 1910",
    image: {
      src: "/images/scene2-jekyll-c.png",
      alt: "Jekyll Island as a moody purple comic scene at night — the historic Jekyll Island Club hotel and clock tower flying an M2 flag, a floating island carrying the White House, an M2 tower block, and PRIVATE KEEP OUT / DANGER DEEP WATER signs above dark flooded water with a skull and an XXX bottle.",
      ar: 1402 / 1122, // 1.25 — 5:4 art, matches the standard frame (no crop)
    },
    hotspots: [
      // On the historic hotel / clock tower flying the M2 flag (center-left).
      { box: { left: "24%", top: "10%", width: "16%", height: "48%" }, action: { type: "panel", panel: "fed" }, label: "Open How the Federal Reserve Works", tip: "The Federal Reserve →" },
      // Hidden: the floating island carrying the White House (upper-right).
      { box: { left: "60%", top: "8%", width: "33%", height: "34%" }, action: { type: "panel", panel: "creature" }, label: "Hidden: the creature", tip: "?", secret: true },
    ],
  },
  {
    id: "s3",
    kind: "room",
    name: "Bill",
    depth: "+2,000 ft",
    place: "the money",
    tag: "SCENE 03 / 07",
    serial: "M2 00000001 A",
    theme: "t-bill",
    no: "Scene 03 / 07 — The Bill",
    title: ["THE", "BILL"],
    sub: "A caricature president · inflation & the money supply",
    image: {
      src: "/images/scene3-bill-d.png",
      alt: "An ornate skull-framed cork board of caricatured US bills — $1 Washington, $5 Lincoln, $10 Hamilton, $20 Jackson, $50 Grant, a $2 with a Gorillaz character, and a central $100 Franklin marked 'RATM' — pinned among ephemera: a 'G CARTEL' crest, 'IN KAYO WE TRUST' and 'KAYO' tags, a 'Float like a butterfly, sting like a bee' Ali photo, a Muhammad Ali vs George Foreman fight ticket, a Federal Reserve 'EVOL EMPLOYEE' badge, a VAULT ACCESS LEVEL 7 card, VAULT 23 keys, and a 'CALL KADEN' note.",
      ar: 1402 / 1122, // 1.25 — resized to 5:4, matches the standard frame
    },
    hotspots: [
      // The central $100 bill (caricature Franklin / RATM).
      { box: { left: "35%", top: "52%", width: "25%", height: "13%" }, action: { type: "panel", panel: "bill" }, label: "Open Inflation and the Money Supply", tip: "Inflation & M2 →" },
    ],
  },
  {
    id: "s4",
    kind: "room",
    name: "Board",
    depth: "-40 ft",
    place: "the board",
    tag: "SCENE 04 / 07",
    serial: "M2 00000011 B",
    theme: "t-board",
    no: "Scene 04 / 07 — Pin Board",
    title: ["THE", "VENTURES"],
    sub: "A pin board of the businesses — a bullet keychain, a car, a sidecar…",
    image: {
      src: "/images/scene5-ventures.png",
      alt: "A neon sunset city block where the ventures are storefronts and billboards — OneShield Security Services, Mach1 Auto Detail, Cielo Properties, Suite VO, The Business Factory, My Guys Pest Control, Iron Wolf Coffee Roasters, a Marauders Protection Group patrol truck, a Third Wheel Tours motorcycle sidecar, and a construction crane — with a Gorillaz car and 'IN KAYO WE TRUST' / 'RATM' graffiti.",
      ar: 1402 / 1122, // 1.25 — 5:4, matches the standard frame
    },
    hotspots: [
      // Central "My Guys Pest Control" sign — entry to the ventures directory.
      { box: { left: "37%", top: "46%", width: "25%", height: "13%" }, action: { type: "panel", panel: "ventures" }, label: "Open The Ventures", tip: "The Ventures →" },
    ],
  },
  {
    id: "s5",
    kind: "room",
    name: "Block",
    depth: "-70 ft",
    place: "the block",
    tag: "SCENE 05 / 07",
    serial: "M2 00000024 D",
    theme: "t-block",
    no: "Scene 05 / 07 — The Block",
    title: ["HARD", "ASSETS"],
    sub: "A skyline of the real estate portfolio",
    image: {
      src: "/images/scene6-block.png",
      alt: "A Houston 'H-TOWN' neighborhood at sunset — a HOUSTON TEXAS water tower and downtown skyline behind rows of homes (the real estate portfolio), a Texas flag, a flagship house numbered 14603, a home under construction, a 'BUILDING LEGACIES' billboard, an 'H-TOWN BLVD 713' street sign, and a blue Jaguar with an M2CARTEL plate.",
      ar: 1402 / 1122, // 1.25 — 5:4, matches the standard frame
    },
    hotspots: [
      // The central flagship home (14603) — entry to the portfolio.
      { box: { left: "42%", top: "36%", width: "24%", height: "26%" }, action: { type: "panel", panel: "realestate" }, label: "Open the real estate portfolio", tip: "The Portfolio →" },
    ],
  },
  {
    id: "s6",
    kind: "room",
    name: "Vault",
    depth: "-100 ft",
    place: "the vault",
    tag: "SCENE 06 / 07",
    serial: "M2 99999999 Z",
    theme: "t-vault",
    no: "Scene 06 / 07 — The Vault",
    title: ["THE", "VAULT"],
    sub: "The ledger · the reveal · the signature line",
    image: {
      src: "/images/scene7-vault.png",
      alt: "The inside of an open crimson bank vault with 'M2 CARTEL', a skull and '760' on the door — holding a stack of gold bars and silver coins, an M2 cash duffel bag, a ring of keys tagged 'INVESTMENT HOMES', LLC / S CORPORATION 'CONFIDENTIAL' papers, a Gorillaz poster, a 'BUSINESS ENTITIES' ledger listing the companies, and a manifesto poster reading 'THE RICH DON'T WORK FOR MONEY — M2 CARTEL'.",
      ar: 1402 / 1122, // 1.25 — 5:4, matches the standard frame
    },
    hotspots: [
      // The "BUSINESS ENTITIES" ledger book (right) — the ledger & contact.
      { box: { left: "79%", top: "35%", width: "20%", height: "28%" }, action: { type: "panel", panel: "vault" }, label: "Open the ledger and contact", tip: "The Ledger →" },
      // Hidden: the skull graffiti on the vault door (left).
      { box: { left: "9%", top: "50%", width: "9%", height: "15%" }, action: { type: "secret" }, label: "Hidden easter egg", tip: "?", secret: true },
    ],
  },
  {
    id: "s7",
    kind: "room",
    name: "Score",
    depth: "-140 ft",
    place: "the scorecard",
    tag: "SCENE 07 / 07",
    serial: "M2 00000100 S",
    theme: "t-score",
    no: "Scene 07 / 07 — Scorecard",
    title: ["THE", "SCORECARD"],
    sub: "The tally — where the numbers land",
    image: {
      src: "/images/scene7-scorecard.png",
      alt: "The M2 Financial Scorecard — a green-on-black grunge worksheet with a Balance Sheet (Assets, Liabilities, Equity) and a P&L (Income, Expenses, Net Income), plus the slogans 'OWN THE GAME', 'THE RICH DON'T WORK FOR MONEY', 'BUILD ASSETS / CREATE FREEDOM / LEAVE A LEGACY', and 'your scorecard will show you if you are poor, middle class or rich'.",
      ar: 1402 / 1122, // 1.25 — 5:4, matches the standard frame
    },
    hotspots: [
      // The "FINANCIAL SCORECARD" title banner.
      { box: { left: "24%", top: "4%", width: "54%", height: "7%" }, action: { type: "panel", panel: "scorecard" }, label: "Open the Scorecard", tip: "The Scorecard →" },
    ],
  },
];
