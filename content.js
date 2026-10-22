(() => {
  if (window.__fontSizeChecker) return; // already injected

  let active = false;
  let locked = false;
  let currentEl = null;

  const tip = document.createElement("div");
  tip.id = "__fsc_tooltip";
  Object.assign(tip.style, {
    position: "fixed",
    zIndex: "2147483647",
    pointerEvents: "none",
    background: "#111827",
    color: "#fff",
    font: "12px/1.4 system-ui, sans-serif",
    padding: "8px 10px",
    borderRadius: "6px",
    boxShadow: "0 4px 14px rgba(0,0,0,.35)",
    maxWidth: "280px",
    display: "none",
    whiteSpace: "nowrap"
  });

  const outline = document.createElement("div");
  Object.assign(outline.style, {
    position: "fixed",
    zIndex: "2147483646",
    pointerEvents: "none",
    border: "2px solid #3b82f6",
    background: "rgba(59,130,246,.12)",
    display: "none"
  });

  // Always-visible Stop button (bottom-right) while the checker is on.
  const stopBtn = document.createElement("button");
  stopBtn.type = "button";
  stopBtn.textContent = "Press Esc or click to stop";
  stopBtn.title = "Stop FontPeek (Esc)";
  Object.assign(stopBtn.style, {
    position: "fixed",
    right: "16px",
    top: "16px",
    zIndex: "2147483647",
    background: "#111827",
    color: "#fff",
    border: "1px solid #374151",
    borderRadius: "6px",
    padding: "10px 14px",
    font: "600 13px/1 system-ui, sans-serif",
    cursor: "pointer",
    boxShadow: "0 4px 14px rgba(0,0,0,.35)"
  });
  stopBtn.addEventListener("click", (e) => {
    e.preventDefault();
    e.stopPropagation();
    disable();
  });

  function ownElement(el) {
    return el === tip || el === outline || el === stopBtn;
  }

  function describe(el) {
    const cs = getComputedStyle(el);
    const px = parseFloat(cs.fontSize);
    const pt = (px * 0.75).toFixed(1).replace(/\.0$/, "");
    const rem = (px / parseFloat(getComputedStyle(document.documentElement).fontSize)).toFixed(2).replace(/\.?0+$/, "");
    const family = cs.fontFamily.split(",")[0].replace(/["']/g, "").trim();
    return (
      `<div style="font-size:16px;font-weight:700;margin-bottom:4px">${px}px</div>` +
      `<div>${pt}pt &middot; ${rem}rem</div>` +
      `<div>Weight: ${cs.fontWeight}</div>` +
      `<div>Line height: ${cs.lineHeight}</div>` +
      `<div>Font: ${family}</div>` +
      `<div style="opacity:.6;margin-top:4px">&lt;${el.tagName.toLowerCase()}&gt;${locked ? " &middot; locked (click to unlock)" : " &middot; click to lock"}</div>`
    );
  }

  function render(el, x, y) {
    const r = el.getBoundingClientRect();
    Object.assign(outline.style, {
      display: "block",
      left: r.left + "px",
      top: r.top + "px",
      width: r.width + "px",
      height: r.height + "px"
    });

    tip.innerHTML = describe(el);
    tip.style.display = "block";

    const pad = 14;
    const tw = tip.offsetWidth;
    const th = tip.offsetHeight;
    let left = x + pad;
    let top = y + pad;
    if (left + tw > window.innerWidth) left = x - tw - pad;
    if (top + th > window.innerHeight) top = y - th - pad;
    tip.style.left = Math.max(4, left) + "px";
    tip.style.top = Math.max(4, top) + "px";
  }

  function onMove(e) {
    if (locked) return;
    const el = e.target;
    if (!(el instanceof Element) || ownElement(el)) return;
    currentEl = el;
    render(el, e.clientX, e.clientY);
  }

  function onClick(e) {
    if (!(e.target instanceof Element) || ownElement(e.target)) return;
    e.preventDefault();
    e.stopPropagation();
    locked = !locked;
    if (currentEl) render(currentEl, e.clientX, e.clientY);
  }

  function onKey(e) {
    if (e.key === "Escape") disable();
  }

  function enable() {
    active = true;
    locked = false;
    document.documentElement.append(outline, tip, stopBtn);
    document.addEventListener("mousemove", onMove, true);
    document.addEventListener("click", onClick, true);
    document.addEventListener("keydown", onKey, true);
    document.documentElement.style.cursor = "crosshair";
  }

  function disable() {
    active = false;
    locked = false;
    currentEl = null;
    tip.remove();
    outline.remove();
    stopBtn.remove();
    document.removeEventListener("mousemove", onMove, true);
    document.removeEventListener("click", onClick, true);
    document.removeEventListener("keydown", onKey, true);
    document.documentElement.style.cursor = "";
  }

  window.__fontSizeChecker = {
    toggle() {
      active ? disable() : enable();
    }
  };
})();
