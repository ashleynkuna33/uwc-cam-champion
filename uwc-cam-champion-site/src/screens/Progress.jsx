import { useRef, useState, useCallback, useMemo, useEffect } from "react";
import SimulationPanel from "../components/SimulationPanel";
import NullModuleProgress from "../screens/NullModuleProgress";
import { getGrade, TONE_CLASSES } from "../utils/grade";
import {
  fetchDashboard,
  fetchUserTasksForModule,
  updateUserTaskMark,
  getCurrentUserId,
} from "../api";

const ProgressBar = ({ title, percentage }) => {
  const displayPercent = typeof percentage === "number" ? `${percentage}%` : percentage;

  return (
    <div className="bg-white border border-slate-100 shadow-sm hover:shadow-md hover:bg-indigo-600/5 transition-all duration-300 rounded-xl p-5 flex flex-col gap-3 w-full">
      <div className="flex flex-col md:flex-row items-baseline justify-between w-full">
        <p className="text-xs font-semibold tracking-wider text-slate-500 uppercase">
          {title}
        </p>
        <span className="text-lg font-bold text-indigo-600 tracking-tight">
          {displayPercent}
        </span>
      </div>

      <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
        <div
          style={{ width: displayPercent }}
          className="bg-indigo-600 h-full rounded-full transition-all duration-500 ease-out"
        ></div>
      </div>
    </div>
  );
};

const AssessmentSlider = ({ trackRef, title, weight, value, onChangeStart, onSeek }) => (
  <div className="flex flex-col gap-2">
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-2 flex-wrap">
        <h5 className="text-sm font-bold text-slate-800">{title}</h5>
        <span className="text-[11px] font-semibold text-cyan-700 bg-cyan-100 rounded-full px-2 py-0.5">
          {weight}% WEIGHT
        </span>
      </div>
      <span className="text-sm font-bold text-slate-800">{value}%</span>
    </div>

    <div
      ref={trackRef}
      onClick={onSeek}
      className="relative h-2 w-full rounded-full bg-slate-200 cursor-pointer select-none"
    >
      <span
        style={{ width: `${value}%` }}
        className="absolute inset-y-0 left-0 rounded-full bg-sky-400 pointer-events-none"
      ></span>
      <div
        style={{ left: `${value}%` }}
        onMouseDown={onChangeStart}
        onTouchStart={onChangeStart}
        className="absolute top-1/2 h-4 w-4 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white border-2 border-sky-500 shadow cursor-grab active:cursor-grabbing"
      ></div>
    </div>

    <div className="relative h-4 text-[11px] text-slate-400 font-medium">
      <span className="absolute left-0">0%</span>
      <span className="absolute left-1/2 -translate-x-1/2">Pass 50%</span>
      <span className="absolute left-3/4 -translate-x-1/2">Dist 75%</span>
      <span className="absolute right-0">100%</span>
    </div>
  </div>
);

const DEFAULT_PROJECTION = 65;

function Progress() {
  const userId = getCurrentUserId();

  // Module list (id, name) for the picker — comes from the dashboard's
  // module cards, since there's no dedicated "list my modules" endpoint yet.
  const [moduleList, setModuleList] = useState([]);
  const [selectedModuleId, setSelectedModuleId] = useState(null);

  // The actual task list (with real marks) for whichever module is selected.
  const [tasks, setTasks] = useState([]);

  const [loadingModules, setLoadingModules] = useState(true);
  const [loadingTasks, setLoadingTasks] = useState(false);
  const [error, setError] = useState(null);

  // Load the module list once on mount.
  useEffect(() => {
    if (!userId) {
      setError("Not logged in.");
      setLoadingModules(false);
      return;
    }

    let cancelled = false;

    async function loadModules() {
      try {
        setLoadingModules(true);
        setError(null);
        const dashboard = await fetchDashboard(userId);
        if (cancelled) return;
        const modules = dashboard?.moduleCards ?? dashboard?.modules ?? [];
        setModuleList(modules);
        if (modules.length > 0) {
          setSelectedModuleId((prev) => prev ?? modules[0].id);
        }
      } catch (err) {
        if (!cancelled) setError(err.message || "Failed to load modules");
      } finally {
        if (!cancelled) setLoadingModules(false);
      }
    }

    loadModules();
    return () => {
      cancelled = true;
    };
  }, [userId]);

  // Load this module's real tasks whenever the selection changes.
  useEffect(() => {
    if (!selectedModuleId || !userId) return;

    let cancelled = false;

    async function loadTasks() {
      try {
        setLoadingTasks(true);
        setError(null);
        const data = await fetchUserTasksForModule(selectedModuleId, userId);
        if (!cancelled) setTasks(data || []);
      } catch (err) {
        if (!cancelled) setError(err.message || "Failed to load tasks");
      } finally {
        if (!cancelled) setLoadingTasks(false);
      }
    }

    loadTasks();
    return () => {
      cancelled = true;
    };
  }, [selectedModuleId, userId]);

  const selectedModule = useMemo(
    () => moduleList.find((m) => m.id === selectedModuleId) ?? moduleList[0],
    [moduleList, selectedModuleId]
  );

  // One projected slider value per (module, task) pair, so switching
  // modules never clobbers another module's in-progress projections.
  const [projections, setProjections] = useState({});

  const setProjection = useCallback((moduleId, userTaskId, value) => {
    setProjections((prev) => ({
      ...prev,
      [moduleId]: { ...prev[moduleId], [userTaskId]: value },
    }));
  }, []);

  const getProjection = useCallback(
    (moduleId, userTaskId) => projections[moduleId]?.[userTaskId] ?? DEFAULT_PROJECTION,
    [projections]
  );

  // Track refs keyed by userTaskId — the slider list is dynamic.
  const trackRefs = useRef({});
  const getTrackRef = (userTaskId) => {
    if (!trackRefs.current[userTaskId]) trackRefs.current[userTaskId] = { current: null };
    return trackRefs.current[userTaskId];
  };

  const updateMark = useCallback(
    async (userTaskId, newMark) => {
      // Optimistic update.
      setTasks((prev) =>
        prev.map((t) =>
          t.userTaskId === userTaskId ? { ...t, mark: newMark, isCompleted: true } : t
        )
      );

      try {
        await updateUserTaskMark(userTaskId, newMark);
      } catch (err) {
        setError(err.message || "Failed to save mark");
        // Roll back to the server's source of truth on failure.
        if (selectedModuleId && userId) {
          const data = await fetchUserTasksForModule(selectedModuleId, userId).catch(() => null);
          if (data) setTasks(data);
        }
      }
    },
    [selectedModuleId, userId]
  );

  const pendingList = useMemo(() => tasks.filter((t) => !t.isCompleted), [tasks]);

  // "Current" comes from the backend's own module score — not recomputed
  // here — so it stays consistent with whatever the Dashboard shows for
  // this module. Only the projection (below) is legitimately frontend-owned,
  // since it's a live "what if" that has no reason to touch the server.
  const currentMark = selectedModule?.score ?? 0;

  // Builds directly on top of currentMark (the backend's number) instead of
  // recomputing the completed portion again from raw task marks — avoids
  // two independent calculations of "the same thing" ever drifting apart.
  // Just adds each pending task's projected contribution on top.
  const projectedFinal = useMemo(() => {
    const pendingContribution = pendingList.reduce((sum, t) => {
      const projectedMark = getProjection(selectedModuleId, t.userTaskId);
      return sum + (projectedMark / 100) * (t.taskWeight ?? 0);
    }, 0);
    return Math.round(currentMark + pendingContribution);
  }, [pendingList, currentMark, selectedModuleId, getProjection]);

  const remainingWeight = useMemo(
    () => pendingList.reduce((sum, t) => sum + (t.taskWeight ?? 0), 0),
    [pendingList]
  );

  const grade = useMemo(() => getGrade(projectedFinal), [projectedFinal]);
  const statusTone = TONE_CLASSES[grade.tone].text;

  const progressData = [
    { id: 1, title: "CURRENT MARK", percentage: currentMark },
    { id: 2, title: "PROJECTED FINAL", percentage: projectedFinal },
    { id: 3, title: "REMAINING WEIGHT", percentage: remainingWeight },
  ];

  const seekFromEvent = (event, trackRef, userTaskId) => {
    const bar = trackRef.current.getBoundingClientRect();
    const clientX = event.touches ? event.touches[0].clientX : event.clientX;
    const clickX = clientX - bar.left;
    const percent = Math.min(100, Math.max(0, (clickX / bar.width) * 100));
    setProjection(selectedModuleId, userTaskId, Math.round(percent));
  };

  const startDrag = (trackRef, userTaskId) => (event) => {
    event.preventDefault();
    const onMove = (e) => seekFromEvent(e, trackRef, userTaskId);
    const onEnd = () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseup", onEnd);
      window.removeEventListener("touchmove", onMove);
      window.removeEventListener("touchend", onEnd);
    };
    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseup", onEnd);
    window.addEventListener("touchmove", onMove);
    window.addEventListener("touchend", onEnd);
  };

  if (loadingModules) {
    return (
      <div className="flex items-center justify-center h-64 text-slate-500 font-medium">
        Loading your modules...
      </div>
    );
  }

  if (error && moduleList.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-64 gap-2 text-red-600 font-medium">
        <p>Couldn't load your modules.</p>
        <p className="text-sm text-slate-500">{error}</p>
      </div>
    );
  }

  if (moduleList.length === 0) {
    return <NullModuleProgress />;
  }

  return (
    <div className="flex flex-col">
      {/* header */}
      <div className="flex flex-col md:flex-row items-center justify-between rounded-2xl bg-white shadow-md px-6 h-24 md:h-18 gap-2">
        <div className="font-bold text-xl">2026 Calender Year</div>
        <select
          className="bg-white border border-gray-300 text-gray-700 py-2
         px-4 pr-8 rounded-2xl shadow-md hover:border-gray-600 transition-all duration-100 cursor-pointer 
         focus:outline-none focus:border-blue-500 font-medium my-4"
          value={selectedModuleId ?? ""}
          onChange={(e) => setSelectedModuleId(Number(e.target.value))}
        >
          {moduleList.map((module) => (
            <option value={module.id} key={module.id}>
              {module.name}
            </option>
          ))}
        </select>
      </div>

      {error && (
        <div className="text-sm text-amber-800 bg-amber-100 border border-amber-200 rounded-xl px-4 py-2 mt-2">
          {error}
        </div>
      )}

      {/* stat cards */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-2 my-6">
        {progressData.map((card) => (
          <ProgressBar key={card.id} title={card.title} percentage={card.percentage} />
        ))}
      </div>

      <div className="flex flex-col md:flex-row gap-4 items-stretch">
        {/* projection slider card */}
        <div className="bg-white rounded-2xl flex-1 shadow-md flex flex-col min-h-[600px]">
          <div className="flex flex-row justify-between items-center px-4 py-3">
            <p className="text-sm font-bold text-slate-800 tracking-wide">
              PROJECTION SLIDER — {selectedModule?.name}
            </p>
            <span className="text-xs font-semibold text-emerald-700 bg-emerald-100 rounded-full px-3 py-1">
              {loadingTasks ? "loading..." : `${pendingList.length} pending`}
            </span>
          </div>

          <div className="flex flex-col gap-8 px-4 pb-4 flex-1 overflow-y-auto">
            {loadingTasks ? (
              <p className="text-sm text-slate-400 italic">Loading tasks...</p>
            ) : pendingList.length === 0 ? (
              <p className="text-sm text-slate-400 italic">
                No pending assessments left for this module.
              </p>
            ) : (
              pendingList.map((t) => {
                const trackRef = getTrackRef(t.userTaskId);
                const value = getProjection(selectedModuleId, t.userTaskId);
                return (
                  <AssessmentSlider
                    key={t.userTaskId}
                    trackRef={trackRef}
                    title={(t.name ?? "").toUpperCase()}
                    weight={t.taskWeight}
                    value={value}
                    onSeek={(e) => seekFromEvent(e, trackRef, t.userTaskId)}
                    onChangeStart={startDrag(trackRef, t.userTaskId)}
                  />
                );
              })
            )}
          </div>

          <div className="grid grid-cols-3 divide-x divide-slate-300/60 bg-slate-200/80 rounded-bl-2xl rounded-br-2xl">
            <div className="flex flex-col items-center gap-1 py-4 px-2">
              <p className="text-[11px] font-semibold text-slate-500 uppercase">Current</p>
              <p className="font-bold text-slate-900">{currentMark}%</p>
            </div>
            <div className="flex flex-col items-center gap-1 py-4 px-2">
              <p className="text-[11px] font-semibold text-slate-500 uppercase">Projected</p>
              <p className="font-bold text-slate-900">{projectedFinal}%</p>
            </div>
            <div className="flex flex-col items-center gap-1 py-4 px-2">
              <p className="text-[11px] font-semibold text-slate-500 uppercase">Status</p>
              <p className={`font-bold capitalize ${statusTone}`}>{grade.label}</p>
            </div>
          </div>
        </div>

        <div className="flex-1 shadow-md rounded-2xl overflow-hidden min-h-[600px]">
          <SimulationPanel
            pendingAssessment={tasks}
            projections={projections[selectedModuleId] ?? {}}
            onUpdateMark={updateMark}
            currentMark={currentMark}
          />
        </div>
      </div>
    </div>
  );
}

export default Progress;