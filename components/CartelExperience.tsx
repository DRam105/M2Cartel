"use client";

import Image from "next/image";
import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type CSSProperties,
} from "react";
import {
  SCENES,
  NAV,
  SECRET_QUOTE,
  type Hotspot,
  type HotspotAction,
  type PanelId,
} from "@/content/scenes";
import { PANELS } from "@/content/panels";

const HOVER_SELECTOR = ".hot,a,button,.tick,.close,.x,.menu-x";

export default function CartelExperience() {
  const [activePanel, setActivePanel] = useState<PanelId | null>(null);
  const [secretOpen, setSecretOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [hintGone, setHintGone] = useState(false);

  const curRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const sceneEls = useRef<(HTMLElement | null)[]>([]);

  // ---- actions ----
  const gotoScene = useCallback((id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  }, []);

  const runAction = useCallback(
    (action: HotspotAction) => {
      setMenuOpen(false);
      if (action.type === "secret") setSecretOpen(true);
      else if (action.type === "goto") gotoScene(action.to);
      else if (action.type === "panel") setActivePanel(action.panel);
    },
    [gotoScene],
  );

  // ---- custom cursor ----
  useEffect(() => {
    const cur = curRef.current;
    const ring = ringRef.current;
    if (!cur || !ring) return;

    let cx = window.innerWidth / 2;
    let cy = window.innerHeight / 2;
    let rx = cx;
    let ry = cy;
    let raf = 0;

    const onMove = (e: PointerEvent) => {
      cx = e.clientX;
      cy = e.clientY;
      cur.style.transform = `translate(${cx}px,${cy}px) translate(-50%,-50%)`;
    };
    const loop = () => {
      rx += (cx - rx) * 0.18;
      ry += (cy - ry) * 0.18;
      ring.style.transform = `translate(${rx}px,${ry}px) translate(-50%,-50%)`;
      raf = requestAnimationFrame(loop);
    };
    const over = (e: Event) => {
      if ((e.target as Element).closest?.(HOVER_SELECTOR))
        ring.classList.add("hot");
    };
    const out = (e: Event) => {
      if ((e.target as Element).closest?.(HOVER_SELECTOR))
        ring.classList.remove("hot");
    };

    window.addEventListener("pointermove", onMove);
    document.addEventListener("pointerover", over);
    document.addEventListener("pointerout", out);
    raf = requestAnimationFrame(loop);
    return () => {
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerover", over);
      document.removeEventListener("pointerout", out);
      cancelAnimationFrame(raf);
    };
  }, []);

  // ---- scene reveal + active-scene tracking ----
  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((en) => {
          if (!en.isIntersecting) return;
          en.target.classList.add("in");
          const i = Number((en.target as HTMLElement).dataset.index);
          if (!Number.isNaN(i)) setActiveIndex(i);
        });
      },
      { threshold: 0.5 },
    );
    sceneEls.current.forEach((el) => el && io.observe(el));
    // Fallback: reveal the hero immediately so it can never stay hidden if the
    // observer is slow to fire or unsupported (`.scene.in .stage` gates opacity).
    sceneEls.current[0]?.classList.add("in");
    return () => io.disconnect();
  }, []);

  // ---- first-load hint ----
  useEffect(() => {
    const t = setTimeout(() => setHintGone(true), 5200);
    const onScroll = () => setHintGone(true);
    window.addEventListener("scroll", onScroll, { once: true });
    return () => {
      clearTimeout(t);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  // ---- escape closes everything ----
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setActivePanel(null);
        setMenuOpen(false);
        setSecretOpen(false);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  // ---- focus close button when a panel opens ----
  useEffect(() => {
    if (activePanel) closeRef.current?.focus();
  }, [activePanel]);

  const active = SCENES[activeIndex];
  const markerTop: CSSProperties = {
    top: `calc(6px + ${activeIndex / (SCENES.length - 1)} * (100% - 18px))`,
  };
  const panel = activePanel ? PANELS[activePanel] : null;

  return (
    <>
      <div className="cur" ref={curRef} aria-hidden />
      <div className="cur-ring" ref={ringRef} aria-hidden />

      <div className="brand">
        <b>M2</b> CARTEL
      </div>
      <button
        className="menu-btn"
        onClick={() => setMenuOpen(true)}
        aria-label="Open navigation menu"
      >
        Menu
      </button>

      {/* fallback accessible nav */}
      <nav className={`menu${menuOpen ? " open" : ""}`} aria-hidden={!menuOpen}>
        <span
          className="menu-x"
          role="button"
          tabIndex={0}
          aria-label="Close menu"
          onClick={() => setMenuOpen(false)}
          onKeyDown={(e) =>
            (e.key === "Enter" || e.key === " ") && setMenuOpen(false)
          }
        >
          ×
        </span>
        <h4>Navigate the Cartel</h4>
        {NAV.map((item) => (
          <a
            key={item.label}
            href={item.action.type === "goto" ? `#${item.action.to}` : "#"}
            onClick={(e) => {
              e.preventDefault();
              runAction(item.action);
            }}
          >
            {item.label} <small>{item.small}</small>
          </a>
        ))}
      </nav>

      {/* descent meter */}
      <div className="meter" aria-hidden>
        <div className="rail" />
        <div className="marker" style={markerTop} />
        {SCENES.map((sc, i) => (
          <button
            key={sc.id}
            className={`tick${i === activeIndex ? " active" : ""}`}
            aria-label={`Go to ${sc.name}`}
            onClick={() => gotoScene(sc.id)}
          >
            <span className="dot" />
            <span className="lbl">{sc.name}</span>
          </button>
        ))}
      </div>

      <div className="depth">
        Depth
        <br />
        <b>{active.depth}</b>
        <br />
        {active.place}
      </div>

      <main>
        {SCENES.map((sc, i) => {
          const sceneImage = sc.image;
          return (
            <section
              key={sc.id}
              id={sc.id}
              className="scene"
              data-index={i}
              ref={(el) => {
                sceneEls.current[i] = el;
              }}
            >
              <div
                className="stage"
                style={
                  sceneImage
                    ? ({ "--ar": sceneImage.ar } as CSSProperties)
                    : undefined
                }
              >
                {sceneImage ? (
                  <Image
                    src={sceneImage.src}
                    alt={sceneImage.alt}
                    fill
                    priority={sc.kind === "hero"}
                    sizes="(max-width: 900px) 96vw, 80vh"
                  />
                ) : sc.kind === "room" ? (
                  <div className={`room ${sc.theme}`}>
                    <span className="no">{sc.no}</span>
                    <h2>
                      {sc.title[0]}
                      <br />
                      {sc.title[1]}
                    </h2>
                    <div className="sub">{sc.sub}</div>
                    <div className="artcoming">
                      ◆ Art coming — hotspots pre-placed
                    </div>
                  </div>
                ) : null}

                <span className="tag">{sc.tag}</span>
                <span className="serial">{sc.serial}</span>

                {sc.hotspots.map((h, hi) => (
                  <HotspotButton
                    key={hi}
                    hotspot={h}
                    hero={!!sceneImage}
                    onRun={runAction}
                  />
                ))}

                {sc.kind === "hero" && (
                  <div className={`hint${hintGone ? " gone" : ""}`}>
                    <b>psst</b> — this world is clickable. hover the art, then
                    scroll to descend.
                  </div>
                )}
              </div>
            </section>
          );
        })}
      </main>

      {/* content drawer */}
      <div
        className={`scrim${activePanel ? " open" : ""}`}
        onClick={() => setActivePanel(null)}
      />
      <aside
        className={`drawer${activePanel ? " open" : ""}`}
        role="dialog"
        aria-modal="true"
        aria-label={panel?.eyebrow}
      >
        <div className="top">
          <span className="eyebrow">{panel?.eyebrow}</span>
          <button
            className="x"
            ref={closeRef}
            aria-label="Close"
            onClick={() => setActivePanel(null)}
          >
            ×
          </button>
        </div>
        <div className="body">{panel?.body}</div>
      </aside>

      {/* secret reveal */}
      <div className={`secret-overlay${secretOpen ? " open" : ""}`}>
        <div className="k">You found it</div>
        <blockquote>&ldquo;{SECRET_QUOTE}&rdquo;</blockquote>
        <div className="k" style={{ color: "var(--gold)" }}>
          [ your secret quote goes here ]
        </div>
        <button className="close" onClick={() => setSecretOpen(false)}>
          Close the vault
        </button>
      </div>
    </>
  );
}

function HotspotButton({
  hotspot,
  hero,
  onRun,
}: {
  hotspot: Hotspot;
  hero: boolean;
  onRun: (a: HotspotAction) => void;
}) {
  const cls = [
    "hot",
    hero ? "pulse" : "pin",
    hotspot.secret ? "secret" : "",
  ]
    .filter(Boolean)
    .join(" ");
  return (
    <button
      className={cls}
      style={hotspot.box}
      aria-label={hotspot.label}
      onClick={() => onRun(hotspot.action)}
    >
      <span className="halo" />
      <span className="tip">{hotspot.tip}</span>
    </button>
  );
}
