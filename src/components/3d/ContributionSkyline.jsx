import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { loadContributions } from "../../services/githubService";
import { drawSkyline } from "./drawSkyline";

export default function ContributionSkyline() {
  const { t } = useTranslation();
  const [activity, setActivity] = useState(null);
  const [failed, setFailed] = useState(false);
  useEffect(() => {
    const controller = new AbortController();
    loadContributions(controller.signal).then(setActivity).catch(() => { if (!controller.signal.aborted) setFailed(true); });
    return () => controller.abort();
  }, []);
  const svgRef = useRef(null);
  const drag = useRef(null);
  const [mode, setMode] = useState("skyline");
  const [camera, setCamera] = useState({ yaw: -.34, pitch: .78 });
  useEffect(() => {
    const svg = svgRef.current;
    const draw = () => { if (activity) drawSkyline(svg, { mode, ...camera, days: activity.days }); };
    const resize = new ResizeObserver(draw); resize.observe(svg); draw();
    return () => resize.disconnect();
  }, [mode, camera, activity]);
  function move(event) {
    if (!drag.current) return;
    const { x, y, yaw, pitch } = drag.current;
    setCamera({ yaw: yaw + (event.clientX - x) * .005, pitch: Math.max(.35, Math.min(1.25, pitch - (event.clientY - y) * .004)) });
  }
  return <>
    <div className="github-skyline-header"><a href="https://github.com/lucasomafia" target="_blank" rel="noreferrer" style={{ color: "inherit" }}>@lucasomafia</a><div className="stats-toggle" role="group" aria-label={t("stats.view")}>
      {[['flat', '2D'], ['skyline', '3D']].map(([value, label]) => <button key={value} type="button" aria-pressed={mode === value} onClick={() => setMode(value)}>{label}</button>)}
    </div></div>
    <div className="contribution-summary" aria-live="polite">{activity ? <><strong>{t("stats.contributionTotal", { count: activity.total })}</strong><span>{activity.days[0].date} — {activity.days.at(-1).date}</span>{activity.snapshot && <span>{t("stats.snapshot", { date: new Date(activity.updatedAt).toLocaleDateString() })}</span>}</> : t(failed ? "stats.error" : "stats.loading")}</div>
    <svg ref={svgRef} className="contribution-skyline" role="img" aria-label={t("stats.skylineRealLabel")} onPointerDown={event => { if (mode !== "skyline") return; drag.current = { x: event.clientX, y: event.clientY, ...camera }; event.currentTarget.setPointerCapture(event.pointerId); }} onPointerMove={move} onPointerUp={() => { drag.current = null; }} onPointerCancel={() => { drag.current = null; }} onDoubleClick={() => setCamera({ yaw: -.34, pitch: .78 })} />
    <div className="github-skyline-footer"><span>{t(mode === "skyline" ? "stats.drag" : "stats.flatReal")}</span><span className="contribution-intensity"><span>{t("stats.less")}</span>{[0, 1, 2, 3, 4].map(level => <b key={level} />)}<span>{t("stats.more")}</span></span></div>
  </>;
}
