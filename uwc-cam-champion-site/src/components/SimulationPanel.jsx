import { useMemo, useState, useEffect } from "react";
import { getGrade, TONE_CLASSES } from "../utils/grade";

const SCENARIO_SCORES = [40, 50, 60, 70, 80, 90, 100];

// Same additive model as Progress.jsx's projectedFinal: currentMark
// (backend, already covers completed tasks) + each pending task's
// contribution (mark% * taskWeight / 100). Deliberately kept as one
// function so there's a single place to update if that formula changes,
// rather than two independent copies of the same math.
function projectFromBaseline(currentMark, pendingList, marksByTaskId) {
  const pendingContribution = pendingList.reduce((sum, t) => {
    const mark = marksByTaskId[t.userTaskId] ?? 0;
    return sum + (mark / 100) * (t.taskWeight ?? 0);
  }, 0);
  return Math.round(currentMark + pendingContribution);
}

// NOTE: pendingAssessment is the flat task list for the selected module
// (Progress.jsx now passes `tasks` directly — not `[module]` like before).
// currentMark comes from the backend (selectedModule.score in Progress.jsx)
// so this panel never recomputes the completed portion on its own.
export default function SimulationPanel({
  pendingAssessment = [],
  projections = {},
  onUpdateMark,
  currentMark = 0,
}) {
  const allTasks = pendingAssessment;
  const pendingList = allTasks.filter((t) => !t.isCompleted);

  // Which pending task the "what if" table is exploring. Defaults to the
  // first pending one, and re-syncs if the pending list changes (e.g.
  // switching modules, or a task getting marked complete).
  const [scenarioId, setScenarioId] = useState(pendingList[0]?.userTaskId ?? null);

  useEffect(() => {
    if (!pendingList.some((t) => t.userTaskId === scenarioId)) {
      setScenarioId(pendingList[0]?.userTaskId ?? null);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pendingList.map((t) => t.userTaskId).join(",")]);

  const scenarioTask = pendingList.find((t) => t.userTaskId === scenarioId);

  // Baseline marks for every pending task: whatever the slider on the main
  // page currently has it set to.
  const baselineMarks = useMemo(() => {
    const marks = {};
    pendingList.forEach((t) => {
      marks[t.userTaskId] = projections[t.userTaskId] ?? 65;
    });
    return marks;
  }, [pendingList, projections]);

  const currentProjection = useMemo(
    () => projectFromBaseline(currentMark, pendingList, baselineMarks),
    [currentMark, pendingList, baselineMarks]
  );
  const currentGrade = getGrade(currentProjection);
  const currentTone = TONE_CLASSES[currentGrade.tone];

  // Vary only the scenario task across fixed test scores; every other
  // pending task stays at its baseline slider value.
  const rows = useMemo(() => {
    if (!scenarioTask) return [];
    return SCENARIO_SCORES.map((scenarioScore) => {
      const marks = { ...baselineMarks, [scenarioTask.userTaskId]: scenarioScore };
      const cam = projectFromBaseline(currentMark, pendingList, marks);
      return { score: scenarioScore, cam, ...getGrade(cam) };
    });
  }, [scenarioTask, baselineMarks, pendingList, currentMark]);

  if (allTasks.length === 0) {
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
                {pendingList.map((t) => (
                  <option key={t.userTaskId} value={t.userTaskId}>
                    {t.name}
                  </option>
                ))}
              </select>
            </div>
          )}

          <div className="mx-4 mb-3 flex flex-wrap items-center justify-between gap-2 rounded-xl bg-slate-50 px-4 py-3">
            <p className="text-xs text-slate-500">
              Right now:{" "}
              {pendingList.map((t, i) => (
                <span key={t.userTaskId}>
                  <span className="font-semibold text-slate-800">
                    {baselineMarks[t.userTaskId]}%
                  </span>{" "}
                  on {t.name}
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
              const isCurrent = r.score === baselineMarks[scenarioTask?.userTaskId];
              return (
                <div
                  key={r.score}
                  className={`flex flex-wrap items-center justify-between gap-2 rounded-xl border px-4 py-3 ${
                    isCurrent ? "border-sky-300 bg-sky-50/50" : "border-slate-100"
                  }`}
                >
                  <span className="text-sm text-slate-700">
                    <strong className="text-slate-900">{r.score}%</strong> in {scenarioTask.name}
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