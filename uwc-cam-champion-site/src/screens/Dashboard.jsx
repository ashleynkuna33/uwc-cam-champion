import { Plus } from "lucide-react";
import { useEffect } from "react";
import { useUser } from "../context/UserContext";
import "./Dashboard.css";

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

// formats date string like "2026-06-10" into "Jun 10"
function formatDeadlineDate(isoDateString){
  const[, month, day] = isoDateString.split("-").map(Number);
  return `${MONTHS[month-1]} ${day}`;
}
function priorityColor(priority){
  switch (priority){
    case "High":
      return "#ef4444"
    case "Low":
      return "#22c55e"
    default:
      return "#f59e0b" // Medium or anything else unexpected
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
      id: module.id,
      code: module.moduleCode ?? module.code ?? "",
      name: module.moduleName ?? module.name ?? module.title ?? module.moduleInfo?.name ?? module.moduleInfo?.title ?? module.moduleCode ?? module.code ?? "Unnamed module",
      score,
      progress: Math.min(Math.max(Number.isFinite(progress) ? progress : 0, 0), 100),
      status: getStatusLabel(status),
      statusColor: module.statusColor ?? getStatusColor(status),
    };
  });

  // const deadlines = [
  //   {
  //     date: "Jun 10",
  //     title: "Database Systems - Assignment 1",
  //     due: "Due in 3 days",
  //     priority: "High Priority",
  //     color: "#ef4444",
  //   },
  //   {
  //     date: "Jun 12",
  //     title: "Database Systems - Assignment 2",
  //     due: "Due in 5 days",
  //     priority: "Medium Priority",
  //     color: "#f59e0b",
  //   },
  //   {
  //     date: "Sep 15",
  //     title: "Software Engineering - Project ",
  //     due: "Due in 2 months",
  //     priority: "Medium Priority",
  //     color: "#f59e0b",
  //   },
  //   {
  //     date: "Jun 18",
  //     title: "Artificial Intelligence - Quiz 2",
  //     due: "Due in 11 days",
  //     priority: "Low Priority",
  //     color: "#22c55e",
  //   },
  // ];

  return (
    <div className="dashboard-layout">
      <main className="dashboard-main">
        <section className="dashboard-header">
          <div>
            <h3 className="small-label">Dashboard</h3>
            <p>Welcome back, {user?.name || "UWC Champion"}!</p>
          </div>
        </section>
        <section className="top-cards">
          <article className="dashboard-card overview-card">
            <div className="card-header">
              <h3>Module Overview</h3>
              <button aria-label="Open module overview" onClick={() => onSomeAction("Module Detail")}>↗</button>
            </div>

            <div className="module-chart">
              <svg
                className="donut-chart"
                viewBox="0 0 120 120"
                role="img"
                aria-label={`${rawStats.inProgress} in progress, ${rawStats.completed} completed, ${rawStats.notStarted} not started`}
              > 
                <circle className = "donut-track" cx ="60" cy="60" r={chartRadius} fill="none" stroke="#e5e7eb" strokeWidth="16" />
                {chartSegments.map((segment) => (
                  <circle
                    key={segment.label}
                    className="donut-segment"
                    cx="60"
                    cy="60"
                    r={chartRadius}
                    fill="none"
                    stroke={segment.color}
                    strokeWidth="16"
                    strokeLinecap="butt"
                    strokeDasharray={`${segment.length} ${chartCircumference}`}
                    strokeDashoffset={-segment.offset}
                  />
                ))}
              </svg>
            </div>

            <ul className="legend-list">
              {stats.map((item) => (
                <li key={item.label}>
                  <span className="legend-dot" style={{ background: item.color }} />
                  <div>
                    <p>{item.label}</p>
                    <strong>{item.value}</strong>
                  </div>
                </li>
              ))}
            </ul>

            <p className="overview-footer">Total Modules: {totalModuleCount}</p>
          </article>

          <article className="dashboard-card progress-card">
            <div className="card-header">
              <h3>Overall CAM Progress</h3>
              <button aria-label="Open overall CAM progress" onClick={() => onSomeAction("Progress & Projections")} >↗</button>
            </div>

            <div className="progress-circle">
              <div
                className="progress-ring"
                style={{
                  background: `conic-gradient(#1e9bff 0deg ${cam * 3.6}deg, #e5e7eb ${cam * 3.6}deg 360deg)`,
                }}
              >
                <span>{cam}%</span>
                
              </div>
            </div>

            <p className="card-description">Your overall CAM progress across all modules is {cam}%.</p>
            <span className={`status-pill ${cam > 0 ? "good" : "no-data"}`}>
              {cam > 0 ? "Good Standing" : "No Data"}
            </span>
          </article>

          <article className="dashboard-card quick-add-card">
            <div className="card-header">
              <h3>Quick Add</h3>
              <button aria-label="Open quick add" onClick={() => onSomeAction("Assessments")} >↗</button>
            </div>

            <button type="button" className="quick-add-circle" aria-label="Add module" onClick={() => onSomeAction("Module Detail")}>
              <Plus size={40}/>
            </button>

            <p className="card-description">Quickly add a new module or update your progress.</p>
            <button type="button" className="primary-button" onClick={() =>onSomeAction("Module Detail")}>
              Add Module
            </button>
          </article>
        </section>

        <section className="modules-section">
          <div className="section-header">
            <h2>My Modules</h2>
            <button onClick={() => onSomeAction("Module Detail")} className="font-bold text-blue-600 hover:underline transition-all duration-200 cursor-pointer">
              View all modules
            </button>
          </div>

          <div className="modules-slider">
            <div className="modules-grid">
              {moduleCards.map((module) => (
                <article className="module-summary-card" key={module.id}>
                  <div className="module-summary-top">
                    <span className="module-chip">{module.code}</span>
                    <span className="status-pill" style={{ background: module.statusColor }}>
                      {module.status}
                    </span>
                  </div>
                  <h3>{module.name}</h3>
                  <p className="module-score">{module.score.toFixed(2)}%</p>
                  <div className="progress-bar">
                    <div
                      className="progress-fill"
                      style={{ width: `${module.progress}%` }}
                    />
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
      </main>

      <aside className="summary-panel">
        <article className="summary-card">
          <h3>Top Summary</h3>
          <p>Quick snapshot of your academic progress helps you know your overall status at a glance.</p>
        </article>

        <article className="summary-card">
          <div className="summary-card-header">
            <h3>Upcoming Deadlines</h3>
            <button onClick={() => onSomeAction("Reminders")} className="font-bold text-blue-600 hover:underline transition-all duration-200 cursor-pointer">View calendar</button>
          </div>
          {deadlines.map((deadline) => (
            <div className="deadline-item" key={deadline.date + deadline.title}>
              <span className="deadline-date">{formatDeadlineDate(deadline.date)}</span>
              <p className="deadline-task">{deadline.title}</p>
              <small className="deadline-module">
                {deadline.moduleCode ? `${deadline.moduleCode} - ` : ""}{deadline.moduleName}
              </small>
              <small className="deadline-status">{deadline.dueInfo}</small>
              <span className="deadline-pill" style={{ background: priorityColor(deadline.priority)}}>
                {deadline.priority} Priority
              </span>
            </div>
          ))}
        </article>
      </aside>
    </div>
  );
}
