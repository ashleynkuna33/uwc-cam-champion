import { Plus } from "lucide-react";
import { useEffect } from "react";
import { useUser } from "../context/UserContext";

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

// formats date string like "2026-06-10" into "Jun 10"
function formatDeadlineDate(isoDateString) {
  const [, month, day] = isoDateString.split("-").map(Number);
  return `${MONTHS[month - 1]} ${day}`;
}

function priorityColor(priority) {
  switch (priority) {
    case "High":
      return "#ef4444";
    case "Low":
      return "#22c55e";
    default:
      return "#f59e0b"; // Medium or anything else unexpected
  }
}

function getPriorityForDueDate(isoDateString) {
  const [year, month, day] = String(isoDateString).split("-").map(Number);
  const dueDate = Date.UTC(year, month - 1, day);
  const today = new Date();
  const todayDate = Date.UTC(today.getFullYear(), today.getMonth(), today.getDate());
  const daysUntilDue = Math.ceil((dueDate - todayDate) / (1000 * 60 * 60 * 24));

  if (!Number.isFinite(daysUntilDue)) {
    return "Medium";
  }

  if (daysUntilDue <= 3) {
    return "High";
  }

  if (daysUntilDue <= 7) {
    return "Medium";
  }

  return "Low";
}

function getStatusColor(status) {
  const normalized = String(status ?? "Not Started").trim().toLowerCase();

  if (normalized.includes("completed") || normalized.includes("done")) {
    return "#10b981";
  }

  if (normalized.includes("in progress") || normalized.includes("active") || normalized.includes("ongoing")) {
    return "#ff9f1c";
  }

  if (normalized.includes("not started") || normalized.includes("pending")) {
    return "#1e9bff";
  }

  return "#1e9bff";
}

function getModuleStatus(module) {
  const completedValue = module.is_completed ?? module.isCompleted;
  const isCompleted = completedValue === true || completedValue === 1 ||
    String(completedValue).trim().toLowerCase() === "true" ||
    String(completedValue).trim() === "1";

  if (isCompleted) {
    return "completed";
  }

  const currentCam = Number(module.current_cam ?? module.currentCam ?? module.score ?? module.cam);
  if (Number.isFinite(currentCam)) {
    return currentCam > 0 ? "inProgress" : "notStarted";
  }

  const normalized = String(module.status ?? "").trim().toLowerCase().replace(/[_-]+/g, " ");

  if (normalized.includes("completed") || normalized.includes("done")) {
    return "completed";
  }

  if (normalized.includes("in progress") || normalized.includes("active") || normalized.includes("ongoing")) {
    return "inProgress";
  }

  return "notStarted";
}

function getStatusLabel(status) {
  if (status === "completed") return "Completed";
  if (status === "inProgress") return "In Progress";
  return "Not Started";
}

export default function Dashboard({ onSomeAction }) {
  const { user, modules = [], tasks = [], cam: contextCam, setCam } = useUser();

  const moduleAverageCam = modules.length
    ? Math.round(
        modules.reduce((total, module) => {
          const score = Number(module.score ?? module.current_cam ?? module.currentCam ?? module.cam ?? 0);
          return total + (Number.isFinite(score) ? score : 0);
        }, 0) / modules.length
      )
    : 0;

  const cam = Number(contextCam ?? moduleAverageCam ?? 0);

  useEffect(() => {
    if (!contextCam && moduleAverageCam > 0) {
      setCam(moduleAverageCam);
    }
  }, [contextCam, moduleAverageCam, setCam]);

  const rawStats = {
    inProgress: modules.filter((module) => getModuleStatus(module) === "inProgress").length,
    completed: modules.filter((module) => getModuleStatus(module) === "completed").length,
    notStarted: modules.filter((module) => getModuleStatus(module) === "notStarted").length,
  };

  const stats = [
    { label: "In Progress", value: rawStats.inProgress, color: "#ff9f1c" },
    { label: "Completed", value: rawStats.completed, color: "#1e9bff" },
    { label: "Not Started", value: rawStats.notStarted, color: "#0F766E" },
  ];

  const totalModuleCount = stats.reduce((total, item) => total + item.value, 0);
  const chartRadius = 50;
  const chartCircumference = 2 * Math.PI * chartRadius;

  let chartOffset = 0;
  const chartSegments = stats.map((item) => {
    const segmentLength = totalModuleCount
      ? (item.value / totalModuleCount) * chartCircumference
      : 0;
    const segment = {
      ...item,
      length: segmentLength,
      offset: chartOffset,
    };
    chartOffset += segmentLength;
    return segment;
  });

  const deadlines = tasks
    .filter((task) => task?.dueDate)
    .slice(0, 4)
    .map((task) => {
      const module = modules.find((item) =>
        item.moduleCode === task.moduleCode || item.code === task.moduleCode
      );
      const moduleInfo = task.moduleInfo ?? {};

      return {
        date: task.dueDate,
        title: task.title ?? task.name ?? task.subName ?? task.type ?? "Untitled task",
        moduleCode: task.moduleCode ?? moduleInfo.moduleCode ?? module?.moduleCode ?? module?.code ?? "",
        moduleName: task.moduleName ?? moduleInfo.moduleName ?? moduleInfo.name ?? module?.moduleName ?? module?.name ?? "Module",
        dueInfo: task.status ?? "Due soon",
        priority: getPriorityForDueDate(task.dueDate),
      };
    });

  const moduleCards = modules.map((module) => {
    const score = Number(module.score ?? module.current_cam ?? module.currentCam ?? module.cam ?? 0);
    const storedProgress = Number(module.progress);
    const progress = storedProgress > 0 ? storedProgress : score;
    const status = getModuleStatus(module);

    return {
      id: module.id ?? module.moduleCode ?? module.code ?? `${module.moduleName ?? module.name ?? "module"}-${Math.random().toString(36).slice(2)}`,
      code: module.moduleCode ?? module.code ?? "",
      name: module.moduleName ?? module.name ?? module.title ?? module.moduleInfo?.name ?? module.moduleInfo?.title ?? module.moduleCode ?? module.code ?? "Unnamed module",
      score,
      progress: Math.min(Math.max(Number.isFinite(progress) ? progress : 0, 0), 100),
      status: getStatusLabel(status),
      statusColor: module.statusColor ?? getStatusColor(status),
    };
  });

  return (
    <div className="min-h-screen flex flex-col gap-6 p-6 bg-[#eef4ff] text-gray-900 box-border">
      <div className="flex flex-col gap-6 min-w-0">
        <section className="p-6 bg-white rounded-[28px] border border-gray-200 shadow-[0_16px_40px_rgba(15,23,42,0.08)]">
          <h3 className="m-0 mb-2 text-sm text-blue-600 font-bold">Dashboard</h3>
          <p className="m-0 text-[32px] leading-tight">Welcome back, {user?.name || "UWC Champion"}!</p>
        </section>

        <section className="grid grid-cols-1 md:grid-cols-3 gap-6 min-w-0">
          {/* Module Overview */}
          <article className="p-6 flex flex-col gap-5 bg-white rounded-[28px] border border-gray-200 shadow-[0_16px_40px_rgba(15,23,42,0.08)]">
            <div className="flex items-center justify-between gap-3">
              <h3 className="m-0 text-lg">Module Overview</h3>
              <button
                aria-label="Open module overview"
                onClick={() => onSomeAction("Module Detail")}
                className="w-[34px] h-[34px] border border-[#d1dbf1] rounded-full bg-[#f8fafc] cursor-pointer text-[#1e3ed4]"
              >
                ↗
              </button>
            </div>

            <div className="flex justify-center items-center">
              <svg
                className="w-[140px] h-[140px] rounded-full overflow-visible"
                viewBox="0 0 120 120"
                role="img"
                aria-label={`${rawStats.inProgress} in progress, ${rawStats.completed} completed, ${rawStats.notStarted} not started`}
              >
                <circle cx="60" cy="60" r={chartRadius} fill="none" stroke="#e5e7eb" strokeWidth="16" />
                {chartSegments.map((segment) => (
                  <circle
                    key={segment.label}
                    cx="60"
                    cy="60"
                    r={chartRadius}
                    fill="none"
                    stroke={segment.color}
                    strokeWidth="16"
                    strokeLinecap="butt"
                    strokeDasharray={`${segment.length} ${chartCircumference}`}
                    strokeDashoffset={-segment.offset}
                    style={{
                      transform: "rotate(-90deg)",
                      transformOrigin: "60px 60px",
                      transition: "stroke-dasharray 500ms ease, stroke-dashoffset 500ms ease",
                    }}
                  />
                ))}
              </svg>
            </div>

            <ul className="list-none m-0 p-0 grid gap-3.5">
              {stats.map((item) => (
                <li key={item.label} className="flex items-center gap-3">
                  <span className="w-2.5 h-2.5 rounded-full" style={{ background: item.color }} />
                  <div>
                    <p className="m-0">{item.label}</p>
                    <strong className="m-0">{item.value}</strong>
                  </div>
                </li>
              ))}
            </ul>

            <p className="m-0 text-[13px] text-gray-500">Total Modules: {totalModuleCount}</p>
          </article>

          {/* Overall CAM Progress */}
          <article className="p-6 flex flex-col gap-5 bg-white rounded-[28px] border border-gray-200 shadow-[0_16px_40px_rgba(15,23,42,0.08)]">
            <div className="flex items-center justify-between gap-3">
              <h3 className="m-0 text-lg">Overall CAM Progress</h3>
              <button
                aria-label="Open overall CAM progress"
                onClick={() => onSomeAction("Progress & Projections")}
                className="w-[34px] h-[34px] border border-[#d1dbf1] rounded-full bg-[#f8fafc] cursor-pointer text-[#1e3ed4]"
              >
                ↗
              </button>
            </div>

            <div className="flex justify-center items-center">
              <div
                className="relative w-[140px] h-[140px] rounded-full bg-gray-200"
                style={{
                  background: `conic-gradient(#1e9bff 0deg ${cam * 3.6}deg, #e5e7eb ${cam * 3.6}deg 360deg)`,
                }}
              >
                <span className="absolute inset-[34px] grid place-items-center rounded-full bg-white font-bold text-gray-900">
                  {cam}%
                </span>
              </div>
            </div>

            <p className="m-0 text-gray-600 leading-relaxed">
              Your overall CAM progress across all modules is {cam}%.
            </p>
            <span
              className={`inline-flex items-center justify-center px-3.5 py-1.5 rounded-full text-xs font-bold text-white w-fit ${
                cam > 0 ? "bg-emerald-500" : "bg-[#84a09a]"
              }`}
            >
              {cam > 0 ? "Good Standing" : "No Data"}
            </span>
          </article>

          {/* Quick Add */}
          <article className="p-6 flex flex-col gap-5 items-center text-center bg-white rounded-[28px] border border-gray-200 shadow-[0_16px_40px_rgba(15,23,42,0.08)]">
            <div className="flex items-center justify-between gap-3 w-full">
              <h3 className="m-0 text-lg">Quick Add</h3>
              <button
                aria-label="Open quick add"
                onClick={() => onSomeAction("Assessments")}
                className="w-[34px] h-[34px] border border-[#d1dbf1] rounded-full bg-[#f8fafc] cursor-pointer text-[#1e3ed4]"
              >
                ↗
              </button>
            </div>

            <button
              type="button"
              aria-label="Add module"
              onClick={() => onSomeAction("Module Detail")}
              className="w-[120px] h-[120px] rounded-3xl border-2 border-dashed border-[#d1dbf1] bg-[#f8fafc] text-[#1e3ed4] cursor-pointer flex items-center justify-center transition-all duration-200 hover:bg-[#eff6ff] hover:border-[#1e3ed4] hover:scale-105 hover:shadow-[0_4px_12px_rgba(30,62,212,0.15)] active:scale-[0.98] focus:outline-none focus:shadow-[0_0_0_3px_rgba(30,62,212,0.1),0_4px_12px_rgba(30,62,212,0.15)]"
            >
              <Plus size={40} />
            </button>

            <p className="m-0 text-gray-600 leading-relaxed">
              Quickly add a new module or update your progress.
            </p>
            <button
              type="button"
              onClick={() => onSomeAction("Module Detail")}
              className="w-full py-3.5 px-4.5 border-none rounded-2xl bg-[#1e9bff] text-white font-bold cursor-pointer"
            >
              Add Module
            </button>
          </article>
        </section>

        <section className="flex flex-col gap-4.5">
          <div className="flex items-center justify-between gap-4">
            <h2 className="m-0 text-[22px]">My Modules</h2>
            <button
              onClick={() => onSomeAction("Module Detail")}
              className="font-bold text-blue-600 hover:underline transition-all duration-200 cursor-pointer"
            >
              View all modules
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4.5">
            {moduleCards.map((module) => (
              <article
                key={module.id}
                className="w-full p-5.5 rounded-3xl bg-[#f8fbff] flex flex-col gap-4.5"
              >
                <div className="flex items-center justify-between gap-3">
                  <span className="px-3 py-2 rounded-2xl bg-[#eff6ff] text-[#1e3ed4] text-xs font-bold">
                    {module.code}
                  </span>
                  <span
                    className="inline-flex items-center justify-center px-3.5 py-1.5 rounded-full text-xs font-bold text-white"
                    style={{ background: module.statusColor }}
                  >
                    {module.status}
                  </span>
                </div>
                <h3 className="m-0 text-lg">{module.name}</h3>
                <p className="m-0 font-bold text-[#1e3ed4]">{module.score.toFixed(2)}%</p>
                <div className="w-full h-2.5 bg-gray-200 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-[#1897ff]"
                    style={{ width: `${module.progress}%` }}
                  />
                </div>
              </article>
            ))}
          </div>
        </section>
      </div>

      <article className="p-6 flex flex-col gap-3.5 bg-white rounded-[28px] border border-gray-200 shadow-[0_16px_40px_rgba(15,23,42,0.08)]">
        <h3 className="m-0 text-lg">Top Summary</h3>
        <p className="m-0 text-gray-600 leading-relaxed">
          Quick snapshot of your academic progress helps you know your overall status at a glance.
        </p>
      </article>

      <article className="p-6 flex flex-col gap-3.5 bg-white rounded-[28px] border border-gray-200 shadow-[0_16px_40px_rgba(15,23,42,0.08)]">
        <div className="flex items-center justify-between gap-3">
          <h3 className="m-0 text-lg">Upcoming Deadlines</h3>
          <button
            onClick={() => onSomeAction("Reminders")}
            className="font-bold text-blue-600 hover:underline transition-all duration-200 cursor-pointer"
          >
            View calendar
          </button>
        </div>
        {deadlines.map((deadline) => (
          <div
            key={deadline.date + deadline.title}
            className="grid grid-cols-[72px_minmax(180px,1.8fr)_minmax(100px,0.6fr)_minmax(100px,0.6fr)_auto] gap-4 items-center py-3.5 border-t border-[#eef2ff] first:border-t-0"
          >
            <span className="text-[13px] font-bold text-[#1e3ed4]">
              {formatDeadlineDate(deadline.date)}
            </span>
            <p className="m-0 text-sm">{deadline.title}</p>
            <span className="text-sm text-gray-800">
              {deadline.moduleCode}
            </span>
            <span className="text-sm text-gray-500">
              {deadline.dueInfo}
            </span>
            <span
              className="inline-flex px-3.5 py-1.5 rounded-full text-white text-xs font-bold whitespace-nowrap"
              style={{ background: priorityColor(deadline.priority) }}
            >
              {deadline.priority} Priority
            </span>
          </div>
        ))}
      </article>
    </div>
  );
}