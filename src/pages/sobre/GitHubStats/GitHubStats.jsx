import ContributionSkyline from "../../../components/3d/ContributionSkyline";
import WakaTimeStats from "./WakaTimeStats";
import "./GitHubStats.css";

export default function GitHubStats() {
  return <section id="github-stats" className="github-stats" aria-labelledby="github-stats-title">
    <div className="stats-heading"><div><span className="section-kicker">GitHub & WakaTime</span><h2 id="github-stats-title">GitHub Stats<span className="about-dot">.</span></h2></div><span className="stats-demo">GitHub · @lucasomafia</span></div>
    <ContributionSkyline />
    <WakaTimeStats />
  </section>;
}
