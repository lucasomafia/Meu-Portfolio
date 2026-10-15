import { useEffect, useState } from "react";
import { WAKATIME_DEMO } from "../../../config/wakatimeConfig";
import { wakatimeDemo } from "../../../data/wakatimeDemo";
import { useTranslation } from "react-i18next";
import { loadWakaTimeStats, formatCodingTime } from "../../../services/wakatimeService";

export default function WakaTimeStats() {
  const { t } = useTranslation();
  const [range, setRange] = useState(7);
  const [result, setResult] = useState({ range: null, data: null, error: null });
  const [attempt, setAttempt] = useState(0);
  const [refreshing, setRefreshing] = useState(false);
  const current = result.range === range;
  const data = WAKATIME_DEMO ? wakatimeDemo[range] : current ? result.data : null;
  const error = !WAKATIME_DEMO && current ? result.error : null;
  const loading = !WAKATIME_DEMO && (!current || refreshing);
  useEffect(() => {
    if (WAKATIME_DEMO) return;
    const controller = new AbortController();
    loadWakaTimeStats(range, controller.signal)
      .then(data => { setResult({ range, data, error: null }); setRefreshing(false); })
      .catch(error => { if (!controller.signal.aborted) { setResult({ range, data: null, error: error.message }); setRefreshing(false); } });
    return () => controller.abort();
  }, [range, attempt]);
  const status = error === 'not_configured' ? 'notConnected' : error === 'authorization_required' ? 'authorization' : error === 'calculating' ? 'calculating' : 'error';
  return <>
    <div className="waka-header"><div><h3>WakaTime</h3><span>{t("stats.timeCoding")}{WAKATIME_DEMO && <> · {t("stats.sample")}</>}</span></div><div className="stats-toggle" role="group" aria-label={t("stats.period")}>
      {[7, 30].map(days => <button key={days} type="button" aria-pressed={range === days} onClick={() => { if (days !== range) setRange(days); }}>{days}d</button>)}
    </div></div>
    {loading ? <p className="waka-status" role="status">{t("waka.loading")}</p> : error ? <div className="waka-status" role="status"><p>{t(`waka.${status}`)}</p><button className="waka-retry" type="button" onClick={() => { setRefreshing(true); setAttempt(value => value + 1); }}>{t("waka.retry")}</button></div> : data && <>
      {data.updating && <p className="waka-status" role="status">{t("waka.updating")}</p>}
      <div className="waka-layout"><div className="waka-total"><strong>{formatCodingTime(data.totalSeconds)}</strong><span>{t("waka.coding")}</span>{data.editors.length > 0 && <div className="waka-editor">{data.editors.map(editor => editor.name).join(' · ')}</div>}</div><div className="waka-languages">{data.languages.length ? data.languages.map(language => <div className="waka-row" key={language.name}><div className="waka-row-label"><span>{language.name}</span><span>{formatCodingTime(language.seconds)} · {language.percent.toFixed(1)}%</span></div><div className="waka-track"><span style={{ width: `${language.percent}%` }} /></div></div>) : <p className="waka-status">{t("waka.empty")}</p>}</div></div>
    </>}
  </>;
}
