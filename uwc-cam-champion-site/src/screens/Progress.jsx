import { useRef, useState, useCallback, useMemo } from "react";
import SimulationPanel from "../components/SimulationPanel";
import NullModuleProgress from "../screens/NullModuleProgress";
import { getGrade, TONE_CLASSES } from "../utils/grade";

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
  const [pendingAssessment, setPendingAssessment] = useState([
    {
      id: 1,
      moduleName: "MAT 311",
      assessment: [
        { id: 1, assessmentName: "Assignment 1", weight: 20, assessmentStatus: "pending", mark: 0 },
        { id: 2, assessmentName: "Tutorial 1", weight: 20, assessmentStatus: "pending", mark: 0 },
        { id: 3, assessmentName: "Assignment 2", weight: 20, assessmentStatus: "pending", mark: 0 },
        { id: 4, assessmentName: "Test 1", weight: 20, assessmentStatus: "pending", mark: 0 },
        { id: 5, assessmentName: "Tutorial 2", weight: 20, assessmentStatus: "pending", mark: 0 },
      ],
    },
    {
      id: 2,
      moduleName: "STA 311",
      assessment: [
        { id: 1, assessmentName: "Assignment 1", weight: 20, assessmentStatus: "pending", mark: 0 },
        { id: 2, assessmentName: "Tutorial 1", weight: 20, assessmentStatus: "pending", mark: 0 },
        { id: 3, assessmentName: "Assignment 2", weight: 20, assessmentStatus: "pending", mark: 0 },
        { id: 4, assessmentName: "Test 1", weight: 20, assessmentStatus: "pending", mark: 0 },
        { id: 5, assessmentName: "Tutorial 2", weight: 20, assessmentStatus: "pending", mark: 0 },
      ],
    },
    {
      id: 3,
      moduleName: "MAT 211",
      assessment: [
        { id: 1, assessmentName: "Assignment 1", weight: 20, assessmentStatus: "pending", mark: 0 },
        { id: 2, assessmentName: "Tutorial 1", weight: 20, assessmentStatus: "pending", mark: 0 },
        { id: 3, assessmentName: "Assignment 2", weight: 20, assessmentStatus: "pending", mark: 0 },
        { id: 4, assessmentName: "Test 1", weight: 20, assessmentStatus: "pending", mark: 0 },
        { id: 5, assessmentName: "Tutorial 2", weight: 20, assessmentStatus: "pending", mark: 0 },
      ],
    },
  ]);

  const [selectedModuleId, setSelectedModuleId] = useState(
    pendingAssessment[0]?.id ?? null
  );

  const selectedModule = useMemo(
    () => pendingAssessment.find((m) => m.id === selectedModuleId) ?? pendingAssessment[0],
    [pendingAssessment, selectedModuleId]
  );

  // One projected slider value per (module, assessment) pair, so switching
  // modules never clobbers another module's in-progress projections.
  const [projections, setProjections] = useState({});

  const setProjection = useCallback(
    (moduleId, assessmentId, value) => {
      setProjections((prev) => ({
        ...prev,
        [moduleId]: { ...prev[moduleId], [assessmentId]: value },
      }));
    },
    []
  );

  const getProjection = useCallback(
    (moduleId, assessmentId) => projections[moduleId]?.[assessmentId] ?? DEFAULT_PROJECTION,
    [projections]
  );

  // Track refs keyed by assessment id — the slider list is dynamic, so we can't
  // declare a fixed useRef per slider the way the old two-slider version did.
  const trackRefs = useRef({});
  const getTrackRef = (assessmentId) => {
    if (!trackRefs.current[assessmentId]) trackRefs.current[assessmentId] = { current: null };
    return trackRefs.current[assessmentId];
  };

  const updateMark = useCallback(
    (assessmentId, newMark) => {
      setPendingAssessment((prev) =>
        prev.map((module) =>
          module.id !== selectedModuleId
            ? module
            : {
                ...module,
                assessment: module.assessment.map((a) =>
                  a.id === assessmentId ? { ...a, mark: newMark } : a
                ),
              }
        )
      );
    },
    [selectedModuleId]
  );

  const pendingList = useMemo(
    () => selectedModule?.assessment.filter((a) => a.assessmentStatus === "pending") ?? [],
    [selectedModule]
  );

  // Weighted average across the whole module: graded assessments use their real
  // mark, pending ones use whatever the person has dragged the slider to.
  const projectedFinal = useMemo(() => {
    if (!selectedModule) return 0;
    const totalWeight = selectedModule.assessment.reduce((sum, a) => sum + a.weight, 0);
    if (totalWeight === 0) return 0;
    const weightedSum = selectedModule.assessment.reduce((sum, a) => {
      const mark = a.assessmentStatus === "pending"
        ? getProjection(selectedModule.id, a.id)
        : a.mark;
      return sum + mark * a.weight;
    }, 0);
    return Math.round(weightedSum / totalWeight);
  }, [selectedModule, getProjection]);

  const currentMark = useMemo(() => {
    if (!selectedModule) return 0;
    const graded = selectedModule.assessment.filter((a) => a.assessmentStatus !== "pending");
    if (graded.length === 0) return 0;
    const totalWeight = graded.reduce((sum, a) => sum + a.weight, 0);
    if (totalWeight === 0) return 0;
    const weightedSum = graded.reduce((sum, a) => sum + a.mark * a.weight, 0);
    return Math.round(weightedSum / totalWeight);
  }, [selectedModule]);

  const remainingWeight = useMemo(
    () => pendingList.reduce((sum, a) => sum + a.weight, 0),
    [pendingList]
  );

  const grade = useMemo(() => getGrade(projectedFinal), [projectedFinal]);
  const statusTone = TONE_CLASSES[grade.tone].text;

  const progressData = [
    { id: 1, title: "CURRENT MARK", percentage: currentMark },
    { id: 2, title: "PROJECTED FINAL", percentage: projectedFinal },
    { id: 3, title: "REMAINING WEIGHT", percentage: remainingWeight },
  ];

  const seekFromEvent = (event, trackRef, assessmentId) => {
    const bar = trackRef.current.getBoundingClientRect();
    const clientX = event.touches ? event.touches[0].clientX : event.clientX;
    const clickX = clientX - bar.left;
    const percent = Math.min(100, Math.max(0, (clickX / bar.width) * 100));
    setProjection(selectedModule.id, assessmentId, Math.round(percent));
  };

  const startDrag = (trackRef, assessmentId) => (event) => {
    event.preventDefault();
    const onMove = (e) => seekFromEvent(e, trackRef, assessmentId);
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

  const totalPending = pendingAssessment
    .flatMap((module) => module.assessment)
    .filter((a) => a.assessmentStatus === "pending").length;

  if (!totalPending) {
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
          {pendingAssessment.map((module) => (
            <option value={module.id} key={module.id}>
              {module.moduleName}
            </option>
          ))}
        </select>
      </div>

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
              PROJECTION SLIDER — {selectedModule?.moduleName}
            </p>
            <span className="text-xs font-semibold text-emerald-700 bg-emerald-100 rounded-full px-3 py-1">
              {pendingList.length} pending
            </span>
          </div>

          <div className="flex flex-col gap-8 px-4 pb-4 flex-1 overflow-y-auto">
            {pendingList.length === 0 ? (
              <p className="text-sm text-slate-400 italic">
                No pending assessments left for this module.
              </p>
            ) : (
              pendingList.map((a) => {
                const trackRef = getTrackRef(a.id);
                const value = getProjection(selectedModule.id, a.id);
                return (
                  <AssessmentSlider
                    key={a.id}
                    trackRef={trackRef}
                    title={a.assessmentName.toUpperCase()}
                    weight={a.weight}
                    value={value}
                    onSeek={(e) => seekFromEvent(e, trackRef, a.id)}
                    onChangeStart={startDrag(trackRef, a.id)}
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
            pendingAssessment={selectedModule ? [selectedModule] : []}
            projections={projections[selectedModule?.id] ?? {}}
            onUpdateMark={updateMark}
          />
        </div>
      </div>
    </div>
  );
}

export default Progress;