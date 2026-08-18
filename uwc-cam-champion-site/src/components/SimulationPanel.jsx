
import { useMemo } from "react";
import { projectCam, getGrade, TONE_CLASSES } from "../utils/grade";
 
export default function SimulationPanel({ assignment2Score = 90, examScore = 65 }) {
  
  const rows = useMemo(
    () =>
      [40, 50, 60, 70, 80, 90, 100].map((scenarioExamScore) => {
        const cam = projectCam(assignment2Score, scenarioExamScore);
        return { examScore: scenarioExamScore, cam, ...getGrade(cam) };
      }),
    [assignment2Score]
  );
 

  const currentProjection = useMemo(
    () => projectCam(assignment2Score, examScore),
    [assignment2Score, examScore]
  );
  const currentGrade = getGrade(currentProjection);
  const currentTone = TONE_CLASSES[currentGrade.tone];
 
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
 
      <div className="mx-4 mb-3 flex flex-wrap items-center justify-between gap-2 rounded-xl bg-slate-50 px-4 py-3">
        <p className="text-xs text-slate-500">
          Right now: <span className="font-semibold text-slate-800">{assignment2Score}%</span> on
          Assignment 2, <span className="font-semibold text-slate-800">{examScore}%</span> on the
          final exam
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
          const isCurrent = r.examScore === examScore;
          return (
            <div
              key={r.examScore}
              className={`flex flex-wrap items-center justify-between gap-2 rounded-xl border px-4 py-3 ${
                isCurrent ? "border-sky-300 bg-sky-50/50" : "border-slate-100"
              }`}
            >
              <span className="text-sm text-slate-700">
                <strong className="text-slate-900">{r.examScore}%</strong> in final exam
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
    </div>
  );
}