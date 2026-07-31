import type { ReactNode } from "react";
import type { PanelId } from "./scenes";

/**
 * Drawer content for each hotspot panel. `eyebrow` is the small label above
 * the close button; `body` is the rich content. Placeholder slots use the
 * `.ph` chip so it's obvious what copy/art still needs to be supplied.
 */
export type Panel = { eyebrow: string; body: ReactNode };

export const PANELS: Record<PanelId, Panel> = {
  doctrine: {
    eyebrow: "Scene 01 · The Doctrine",
    body: (
      <>
        <h3>
          THE <span>DOCTRINE</span>
        </h3>
        <div className="def">
          <div className="term">M2</div>
          <div className="pos">noun · the broad money supply</div>
          <p>
            Every dollar that exists, plus every dollar pretending to. Cash,
            checking, savings, money-market — the near-money the whole system
            runs on. M2 is the tide; read it right and you move before the water
            does. Here it isn&apos;t a Fed statistic — it&apos;s a personal
            balance sheet you build, control, and answer to no one for.
          </p>
        </div>
        <div className="def">
          <div className="term">Cartel</div>
          <div className="pos">
            noun · a coalition that refuses to compete against itself
          </div>
          <p>
            Not a crime. A strategy. Independent operators who stop bidding each
            other down and start compounding together — a coalition of assets,
            cash flow, and conviction aligned toward one agenda: owning more of
            what matters and apologizing for none of it.
          </p>
        </div>
      </>
    ),
  },

  about: {
    eyebrow: "Scene 01 · Hoodie logo",
    body: (
      <>
        <h3>
          WHO <span>I AM</span>
        </h3>
        <p>
          The background section — your story, how you got into personal
          finance, and the philosophy behind the cartel.
        </p>
        <span className="ph">
          [ BIO — who you are, how you started, your money philosophy ]
        </span>
        <p className="note">
          In the full build this opens from the logo on the hoodie.
        </p>
      </>
    ),
  },

  notes: {
    eyebrow: "Scene 01 · US flag",
    body: (
      <>
        <h3>
          SOUND <span>MONEY</span>
        </h3>
        <p>
          Your personal-finance passion project — short field notes and takes on
          money, ownership, and staying ahead of the money supply.
        </p>
        <span className="ph">[ NOTES — title · date · your take ]</span>
      </>
    ),
  },

  fed: {
    eyebrow: "Scene 02 · Jekyll Island",
    body: (
      <>
        <h3>
          THE FEDERAL <span>RESERVE</span>
        </h3>
        <p>
          <b>The origin.</b> In 1910 a small group of bankers and officials met
          in secret on Jekyll Island, Georgia, and drafted the plan that became
          the Federal Reserve Act of 1913 — creating the U.S. central bank.
        </p>
        <p>
          <b>What it does.</b> The Fed runs on a dual mandate: maximum
          employment and stable prices.
        </p>
        <p>
          <b>How it steers the economy.</b> It sets a target for the federal
          funds rate, buys and sells government securities (open market
          operations), and expands or contracts money through tools like
          quantitative easing and tightening.
        </p>
        <p>
          <b>Where M2 fits.</b> When the Fed eases, the broad money supply (M2)
          tends to expand; when it tightens, it contracts.
        </p>
        <span className="ph">[ MY TAKE ON THE FED ]</span>
        <p className="note">
          Edgy art, straight facts — the explainer stays accurate.
        </p>
      </>
    ),
  },

  creature: {
    eyebrow: "Scene 02 · secret",
    body: (
      <>
        <h3>
          THE <span>CREATURE</span>
        </h3>
        <p>
          A wink to <i>The Creature from Jekyll Island</i> and the old
          &ldquo;central bank as a monster&rdquo; metaphor. In the full build a
          creature lurks by the money pipes — click it and you land here.
        </p>
        <p className="note">
          It&apos;s a bit of folklore for flavor. For the real mechanics, see
          the Federal Reserve panel — that content stays factual.
        </p>
      </>
    ),
  },

  bill: {
    eyebrow: "Scene 03 · The Bill",
    body: (
      <>
        <h3>
          INFLATION <span>&amp; M2</span>
        </h3>
        <p>
          More money chasing the same goods pushes prices up. When M2 grows
          faster than the economy produces, each dollar buys a little less —
          that&apos;s inflation.
        </p>
        <p>
          The scene: a giant bill with a satirical caricature of a president in
          the portrait oval (visual parody — art you supply), floating
          &ldquo;M2&rdquo; notes, color-shift ink.
        </p>
        <span className="ph">
          [ YOUR TAKE — protecting purchasing power with hard assets ]
        </span>
      </>
    ),
  },

  ventures: {
    eyebrow: "Scene 04 · Pin Board",
    body: (
      <>
        <h3>
          THE <span>VENTURES</span>
        </h3>
        <p>
          A pin board where each object is a business. Click the object, open
          the venture.
        </p>
        <ul>
          <li><span className="k">◆</span> Security company <i>bullet keychain</i></li>
          <li><span className="k">◆</span> Auto detailing <i>the car</i></li>
          <li><span className="k">◆</span> Construction <i>hard hat</i></li>
          <li><span className="k">◆</span> Window tinting <i>squeegee</i></li>
          <li><span className="k">◆</span> Pest control <i>canister</i></li>
          <li><span className="k">◆</span> Business incubator <i>the egg</i></li>
          <li><span className="k">◆</span> Wine tour business <i>sidecar</i></li>
          <li><span className="k">◆</span> Coffee roasting <i>roaster</i></li>
          <li><span className="k">◆</span> Business card mfg <i>the press</i></li>
          <li><span className="k">◆</span> Veterinary medical supply <i>vet cross</i></li>
          <li><span className="k">◆</span> Agent commission advancing <i>cash advance</i></li>
        </ul>
        <span className="ph">[ VENTURE ONE-LINERS ]</span>
      </>
    ),
  },

  realestate: {
    eyebrow: "Scene 05 · The Block",
    body: (
      <>
        <h3>
          HARD <span>ASSETS</span>
        </h3>
        <p>
          The real estate portfolio — 12 to 24 properties as a skyline you click
          into, each opening a deed-style card.
        </p>
        <div className="stats">
          <div className="stat">
            <div className="n">18</div>
            <div className="l">Properties (edit)</div>
          </div>
          <div className="stat">
            <div className="n">—</div>
            <div className="l">Markets</div>
          </div>
        </div>
        <span className="ph">
          [ PROPERTIES — image · name · location · type · stat ]
        </span>
      </>
    ),
  },

  vault: {
    eyebrow: "Scene 06 · The Vault",
    body: (
      <>
        <h3>
          THE <span>LEDGER</span>
        </h3>
        <div className="stats">
          <div className="stat">
            <div className="n">18</div>
            <div className="l">Properties</div>
          </div>
          <div className="stat">
            <div className="n">11</div>
            <div className="l">Ventures</div>
          </div>
          <div className="stat">
            <div className="n">9</div>
            <div className="l">Cartel partners</div>
          </div>
          <div className="stat">
            <div className="n">—</div>
            <div className="l">Years investing</div>
          </div>
        </div>
        <p>The signature line — how to reach you.</p>
        <span className="ph">[ EMAIL ]</span> &nbsp;{" "}
        <span className="ph">[ SOCIAL LINKS ]</span>
        <p className="note">
          Psst — there&apos;s a hidden brick down here too.
        </p>
      </>
    ),
  },

  scorecard: {
    eyebrow: "Scene 07 · Financial Scorecard",
    body: (
      <>
        <h3>
          THE <span>SCORECARD</span>
        </h3>
        <p>
          Own the game. The M2 Financial Scorecard is two halves — a{" "}
          <b>Balance Sheet</b> (assets, liabilities, equity) and a{" "}
          <b>P&amp;L</b> (income, expenses, net income). Fill it in and it tells
          you the truth: whether you&apos;re building assets or building someone
          else&apos;s.
        </p>
        <div className="def">
          <div className="term">The rule</div>
          <div className="pos">balance sheet</div>
          <p>
            Assets put money in your pocket; liabilities take it out. Liabilities
            + equity must equal total assets — that&apos;s the check.
          </p>
        </div>
        <p>
          Your scorecard shows you where you stand — poor, middle class, or rich
          — and where the next dollar should go.
        </p>
        <span className="ph">[ DOWNLOAD — blank scorecard (PDF) ]</span>
      </>
    ),
  },
};
