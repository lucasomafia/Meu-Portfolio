import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { skills, skillIcon } from "../../data/skills";
import "./SkillsGlobe.css";

// Fibonacci placement inspired by João Paulo Aramuni's SkillsGlobe (MIT).
// https://github.com/joaopauloaramuni/desenvolvimento-e-integracao-de-aplicacoes-web/tree/main/PROJETOS/React/SkillsGlobe
export default function SkillsGlobe() {
  const { t } = useTranslation();
  const stageRef = useRef(null);
  const canvasRef = useRef(null);
  const itemsRef = useRef([]);
  const [selected, setSelected] = useState("");
  useEffect(() => {
    const stage = stageRef.current, canvas = canvasRef.current, ctx = canvas.getContext("2d");
    const points = skills.map((_, i) => {
      const y = 1 - 2 * (i + .5) / skills.length, r = Math.sqrt(1 - y * y), theta = Math.PI * (3 - Math.sqrt(5)) * i;
      return { x: Math.cos(theta) * r, y, z: Math.sin(theta) * r };
    });
    const grid = [];
    for (let m = 0; m < 6; m++) {
      const lon = m / 6 * Math.PI;
      grid.push(Array.from({ length: 65 }, (_, i) => { const a = i / 64 * Math.PI * 2; return { x: Math.cos(a) * Math.cos(lon), y: Math.sin(a), z: Math.cos(a) * Math.sin(lon) }; }));
    }
    for (const lat of [-60, -30, 0, 30, 60]) {
      const phi = lat * Math.PI / 180;
      grid.push(Array.from({ length: 65 }, (_, i) => { const a = i / 64 * Math.PI * 2; return { x: Math.cos(phi) * Math.cos(a), y: Math.sin(phi), z: Math.cos(phi) * Math.sin(a) }; }));
    }
    const reduced = matchMedia("(prefers-reduced-motion: reduce)");
    let rx = -.3, ry = 0, dragging = null, frame = 0, visible = true, lastTime = 0, moved = false;
    function draw(now) {
      frame = 0;
      const dt = Math.min((now - lastTime) / 1000, .05); lastTime = now;
      if (!dragging && !reduced.matches) ry += .15 * dt;
      const width = stage.clientWidth, height = stage.clientHeight;
      const radius = Math.min(width, height) * .38, camera = radius * 4.2;
      if (!width || !height) return;
      const project = p => {
        const x = p.x * Math.cos(ry) - p.z * Math.sin(ry), z1 = p.x * Math.sin(ry) + p.z * Math.cos(ry);
        const y = p.y * Math.cos(rx) - z1 * Math.sin(rx), z = p.y * Math.sin(rx) + z1 * Math.cos(rx), scale = camera / (camera - z * radius);
        return { x: width / 2 + x * radius * scale, y: height / 2 + y * radius * scale, z, scale };
      };
      const dpr = Math.min(devicePixelRatio || 1, 2);
      if (canvas.width !== Math.round(width * dpr) || canvas.height !== Math.round(height * dpr)) { canvas.width = Math.round(width * dpr); canvas.height = Math.round(height * dpr); }
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0); ctx.clearRect(0, 0, width, height); ctx.strokeStyle = "#73b7ff"; ctx.lineWidth = 1;
      for (const line of grid) {
        let prev = project(line[0]);
        for (const point of line.slice(1)) { const cur = project(point); ctx.globalAlpha = (prev.z + cur.z) / 2 > 0 ? .28 : .07; ctx.beginPath(); ctx.moveTo(prev.x, prev.y); ctx.lineTo(cur.x, cur.y); ctx.stroke(); prev = cur; }
      }
      ctx.globalAlpha = 1;
      points.forEach((p, i) => { const { x, y, z, scale } = project(p), depth = (z + 1) / 2, el = itemsRef.current[i]; if (!el) return; el.style.transform = `translate(${x}px,${y}px) translate(-50%,-50%) scale(${(.62 + .38 * depth) * scale})`; el.style.opacity = .2 + .8 * depth ** 1.5; el.style.zIndex = Math.round(depth * 100); });
      if (visible && !document.hidden && !reduced.matches) frame = requestAnimationFrame(draw);
    }
    const schedule = () => { if (!frame && visible && !document.hidden) { lastTime = performance.now(); frame = requestAnimationFrame(draw); } };
    const controller = new AbortController(), options = { signal: controller.signal };
    stage.addEventListener("pointerdown", e => { dragging = { x: e.clientX, y: e.clientY }; moved = false; }, options);
    stage.addEventListener("pointermove", e => { if (!dragging) return; const dx = e.clientX - dragging.x, dy = e.clientY - dragging.y; if (Math.abs(dx) + Math.abs(dy) > 3) { moved = true; stage.setPointerCapture(e.pointerId); } ry += dx * .006; rx = Math.max(-1.1, Math.min(1.1, rx - dy * .006)); dragging = { x: e.clientX, y: e.clientY }; schedule(); }, options);
    const end = () => { dragging = null; };
    stage.addEventListener("pointerup", end, options); stage.addEventListener("pointercancel", end, options);
    stage.addEventListener("click", e => { if (moved) { e.preventDefault(); e.stopPropagation(); } }, { ...options, capture: true });
    document.addEventListener("visibilitychange", () => { cancelAnimationFrame(frame); frame = 0; schedule(); }, options);
    reduced.addEventListener("change", () => { cancelAnimationFrame(frame); frame = 0; schedule(); }, options);
    const resize = new ResizeObserver(schedule); resize.observe(stage);
    const observer = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; if (!visible) { cancelAnimationFrame(frame); frame = 0; } else schedule(); }); observer.observe(stage);
    schedule();
    return () => { controller.abort(); resize.disconnect(); observer.disconnect(); cancelAnimationFrame(frame); };
  }, []);
  return <><div className="skills-globe" ref={stageRef} role="group" aria-label={t("about.globeLabel")}><canvas ref={canvasRef} aria-hidden="true" />{skills.map(([name, icon], i) => <button key={name} type="button" ref={el => { itemsRef.current[i] = el; }} className="skills-globe-item" aria-label={name} onClick={() => setSelected(name)}><img src={skillIcon(icon)} alt="" draggable="false" /><span>{name}</span></button>)}</div><div className="skills-globe-selected" aria-live="polite">{selected}</div></>;
}
