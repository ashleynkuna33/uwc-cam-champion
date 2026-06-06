import { useMemo, useState } from "react";
import "./SimulationPanel.css";

const LOCKED_CONTRIBUTION = 0.63 * 70; // 44.1 — 63% CAM over 70% assessed weight

function getGrade(cam) {
  if (cam >= 75) return { label: "Distinction", cls: "sim-badge--distinction" };
  if (cam >= 60) return { label: "Merit",       cls: "sim-badge--merit" };
  if (cam >= 50) return { label: "Pass",        cls: "sim-badge--pass" };
  return           { label: "Fail",             cls: "sim-badge--fail" };
}

export default function SimulationPanel() {
  const [a2Score, setA2Score] = useState(83);

  const rows = useMemo(() => {
    const a2Contrib = (a2Score / 100) * 10;
    return [40, 50, 60, 70, 80, 90, 100].map(examScore => {
      const cam = Math.round(LOCKED_CONTRIBUTION + a2Contrib + (examScore / 100) * 20);
      return { examScore, cam, ...getGrade(cam) };
    });
  }, [a2Score]);

  const projectedCAM = useMemo(() => {
    const a2Contrib = (a2Score / 100) * 10;
    return Math.round(LOCKED_CONTRIBUTION + a2Contrib + (92 / 100) * 20);
  }, [a2Score]);

  const projGrade = getGrade(projectedCAM);

  return (
    <div className="sim-panel">
      <div className="sim-header-row">
        <span className="sim-title">What if I score…</span>
        <span className="sim-pill-sim">Simulation</span>
      </div>

      <p className="sim-subtitle">
        Final exam scenarios — Assignment 2 at <strong>{a2Score}%</strong>
      </p>

      <div className="sim-slider-label-row">
        <span>
          Assignment 2
          <span className="sim-weight-pill">10% WEIGHT</span>
        </span>
        <strong>{a2Score}%</strong>
      </div>

      <div className="sim-track-wrap">
        <input
          type="range"
          min={0}
          max={100}
          step={1}
          value={a2Score}
          className="sim-range"
          style={{ "--val": `${a2Score}%` }}
          onChange={e => setA2Score(Number(e.target.value))}
        />
        <div className="sim-track-labels">
          <span>0%</span>
          <span>Pass 50%</span>
          <span>Dist 75%</span>
          <span>100%</span>
        </div>
      </div>

      <div className="sim-table">
        {rows.map(r => (
          <div key={r.examScore} className="sim-row">
            <span className="sim-row-score">
              <strong>{r.examScore}%</strong> in final exam
            </span>
            <span className={`sim-row-cam ${r.cls}`}>{r.cam}% CAM</span>
            <span className={`sim-badge ${r.cls}`}>{r.label}</span>
          </div>
        ))}
      </div>

      <div className="sim-footer">
        <div className="sim-footer-item">
          <span className="sim-footer-label">CURRENT</span>
          <span className="sim-footer-val sim-val-blue">63%</span>
        </div>
        <div className="sim-footer-item">
          <span className="sim-footer-label">PROJECTED</span>
          <span className="sim-footer-val sim-val-pink">{projectedCAM}%</span>
        </div>
        <div className="sim-footer-item">
          <span className="sim-footer-label">STATUS</span>
          <span className={`sim-footer-val ${projGrade.cls}`}>{projGrade.label}</span>
        </div>
      </div>
    </div>
  );
}
