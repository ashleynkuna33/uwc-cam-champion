import { Plus } from "lucide-react";
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


export default function Dashboard({ onSomeAction }) {
  const { user, modules = [], tasks = [], cam: contextCam, setCam } = useUser();

  const moduleAverageCam = modules.length
    ? Math.round(
        modules.reduce((total, module) => {
          const score = Number(module.score ?? module.currentCam ?? module.cam ?? 0);
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
    inProgress: modules.filter((module) => {
      const status = String(module.status ?? "").toLowerCase();
      return status.includes("active") || status.includes("in progress") || status.includes("ongoing");
    }).length,
    completed: modules.filter((module) => {
      const status = String(module.status ?? "").toLowerCase();
      return status.includes("completed") || status.includes("done");
    }).length,
    notStarted: modules.filter((module) => {
      const status = String(module.status ?? "").toLowerCase();
      return status.includes("not started") || status.includes("pending");
    }).length,
  };

  const stats = [
    { label: "In Progress", value: rawStats.inProgress, color: "#ff9f1c" },
    { label: "Completed", value: rawStats.completed, color: "#1e9bff" },
    { label: "Not Started", value: rawStats.notStarted, color: "#e5e7eb" },
  ];

  const deadlines = tasks
    .filter((task) => task?.dueDate)
    .slice(0, 4)
    .map((task) => ({
      date: task.dueDate,
      title: task.title,
      dueInfo: task.status ?? "Due soon",
      priority: task.priority ?? (task.status?.includes("Past Due") ? "High" : "Medium"),
    }));

  const moduleCards = modules.map((module) => ({
    id: module.id,
    code: module.moduleCode ?? module.code ?? "",
    name: module.moduleName ?? module.name ?? "",
    score: Number(module.score ?? module.currentCam ?? module.cam ?? 0),
    progress: Number(module.progress ?? 0),
    status: module.status ?? "Not Started",
    statusColor: module.statusColor ?? "#e5e7eb",
  }));

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
              <div className="donut-chart" />
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

            <p className="overview-footer">Total Modules: {modules.length}</p>
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
              <div>
                <p>{deadline.title}</p>
                <small>{deadline.dueInfo}</small>
              </div>
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
