import { useMemo, useState, useEffect } from "react";
import { projectCam, getGrade, TONE_CLASSES } from "../utils/grade";

const SCENARIO_SCORES = [40, 50, 60, 70, 80, 90, 100];

export default function SimulationPanel({ pendingAssessment = [], projections = {}, onUpdateMark }) {
  const module = pendingAssessment[0];
  const allAssessments = module?.assessment ?? [];
  const pendingList = allAssessments.filter((a) => a.assessmentStatus === "pending");

  // Which pending assessment the "what if" table is exploring. Defaults to
  // the first pending one, and re-syncs if the module/pending list changes
  // (e.g. switching modules in the dropdown).
  const [scenarioId, setScenarioId] = useState(pendingList[0]?.id ?? null);

  useEffect(() => {
    if (!pendingList.some((a) => a.id === scenarioId)) {
      setScenarioId(pendingList[0]?.id ?? null);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [module?.id]);

  const scenarioAssessment = pendingList.find((a) => a.id === scenarioId);

  // Baseline marks for every assessment in the module: graded ones use their
  // real mark, pending ones use their current slider projection.
  const baselineMarks = useMemo(() => {
    const marks = {};
    allAssessments.forEach((a) => {
      marks[a.id] = a.assessmentStatus === "pending" ? projections[a.id] ?? 65 : a.mark;
    });
    return marks;
  }, [allAssessments, projections]);

  const currentProjection = useMemo(
    () => projectCam(allAssessments, baselineMarks),
    [allAssessments, baselineMarks]
  );
  const currentGrade = getGrade(currentProjection);
  const currentTone = TONE_CLASSES[currentGrade.tone];

  // Vary only the scenario assessment across fixed test scores; every other
  // assessment (graded + other pending sliders) stays at its baseline value.
  const rows = useMemo(() => {
    if (!scenarioAssessment) return [];
    return SCENARIO_SCORES.map((scenarioScore) => {
      const marks = { ...baselineMarks, [scenarioAssessment.id]: scenarioScore };
      const cam = projectCam(allAssessments, marks);
      return { score: scenarioScore, cam, ...getGrade(cam) };
    });
  }, [scenarioAssessment, baselineMarks, allAssessments]);

  if (!module) {
    return (
      <div className="bg-white rounded-2xl h-full flex flex-col items-center justify-center text-sm text-slate-400">
        No module selected.
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl h-full flex flex-col">
      <div className="flex flex-row justify-between items-center px-4 py-3">
        <span className="text-sm font-bold text-slate-800 tracking-wide">
          What if I score…
        </span>
        <span className="text-xs font-semibold text-emerald-700 bg-emerald-100 rounded-full px-3 py-1">
          Simulation
        </span>
      </div>

      {pendingList.length === 0 ? (
        <div className="mx-4 mb-4 rounded-xl bg-slate-50 px-4 py-3 text-xs text-slate-500">
          Every assessment in this module is graded — nothing left to simulate.
        </div>
      ) : (
        <>
          {pendingList.length > 1 && (
            <div className="mx-4 mb-3 flex items-center gap-2">
              <span className="text-xs text-slate-500">Explore scenarios for:</span>
              <select
                className="text-xs font-semibold text-slate-700 border border-slate-200 rounded-lg px-2 py-1 focus:outline-none focus:border-sky-400"
                value={scenarioId ?? ""}
                onChange={(e) => setScenarioId(Number(e.target.value))}
              >
                {pendingList.map((a) => (
                  <option key={a.id} value={a.id}>
                    {a.assessmentName}
                  </option>
                ))}
              </select>
            </div>
          )}

          <div className="mx-4 mb-3 flex flex-wrap items-center justify-between gap-2 rounded-xl bg-slate-50 px-4 py-3">
            <p className="text-xs text-slate-500">
              Right now:{" "}
              {pendingList.map((a, i) => (
                <span key={a.id}>
                  <span className="font-semibold text-slate-800">
                    {baselineMarks[a.id]}%
                  </span>{" "}
                  on {a.assessmentName}
                  {i < pendingList.length - 1 ? ", " : ""}
                </span>
              ))}
            </p>
            <div className="flex items-center gap-2">
              <span className={`text-xs font-bold rounded-lg px-3 py-1.5 ${currentTone.bg} ${currentTone.text}`}>
                {currentProjection}% CAM
              </span>
              <span className={`text-xs font-bold rounded-full px-3 py-1.5 ${currentTone.bg} ${currentTone.text}`}>
                {currentGrade.label}
              </span>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto px-4 pb-4 flex flex-col gap-2">
            {rows.map((r) => {
              const tone = TONE_CLASSES[r.tone];
              const isCurrent = r.score === baselineMarks[scenarioAssessment?.id];
              return (
                <div
                  key={r.score}
                  className={`flex flex-wrap items-center justify-between gap-2 rounded-xl border px-4 py-3 ${
                    isCurrent ? "border-sky-300 bg-sky-50/50" : "border-slate-100"
                  }`}
                >
                  <span className="text-sm text-slate-700">
                    <strong className="text-slate-900">{r.score}%</strong> in {scenarioAssessment.assessmentName}
                  </span>
                  <div className="flex items-center gap-2">
                    <span className={`text-xs font-bold rounded-lg px-3 py-1.5 whitespace-nowrap ${tone.bg} ${tone.text}`}>
                      {r.cam}% CAM
                    </span>
                    <span className={`text-xs font-bold rounded-full px-3 py-1.5 whitespace-nowrap ${tone.bg} ${tone.text}`}>
                      {r.label}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
}