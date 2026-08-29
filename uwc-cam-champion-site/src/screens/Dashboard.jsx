import { Plus } from "lucide-react";
import {useEffect, useState} from "react";
import "./Dashboard.css";
const TEMP_USER_ID = 1;

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
  // const stats = [
  //   { label: "In Progress", value: 0, color: "#ff9f1c" },
  //   { label: "Completed", value: 0, color: "#1e9bff" },
  //   { label: "Not Started", value: 0, color: "#e5e7eb" },
  // ];

  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:8080/api/dashboard/${TEMP_USER_ID}`)
        .then((res) => {
          if (!res.ok) throw new Error(`Server responded with ${res.status}`);
          return res.json();
        })
        .then((data) => {
          setDashboardData(data);
          setLoading(false);
        })
        .catch((error) => {
          setError(error.message);
          setLoading(false);
        });
  }, []);
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

  if (loading) {
    return <div className= "dashboard-layout">Loading dashboard...</div>;
  }

  if (error) {
    return (
        <div className= "dashboard-layout">
          Couldn't load dashboard: {error}
        </div>
    )
  }
  const cam = dashboardData.actualCam;
  const modules = dashboardData.modulesCards ?? [];
  const rawStats = dashboardData.stats;
  const stats = [
    { label: "In Progress", value: rawStats?.inProgress ?? 0, color: "#ff9f1c" },
    { label: "Completed", value: rawStats?.completed ?? 0, color: "#1e9bff" },
    { label: "Not Started", value:rawStats?.notStarted ?? 0, color: "#e5e7eb" },
  ];

  const deadlines = dashboardData.deadlines ??[];

  return (
    <div className="dashboard-layout">
      <main className="dashboard-main">
        <section className="dashboard-header">
          <div>
            <h3 className="small-label">Dashboard</h3>
            <p>Welcome back, UWC Champion!</p>
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

            <p className="overview-footer">Total Modules: {dashboardData.modulesAdded}</p>
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
            <span className="status-pill good">Good Standing</span>
          </article>

          <article className="dashboard-card quick-add-card">
            <div className="card-header">
              <h3>Quick Add</h3>
              <button aria-label="Open quick add" onClick={() => onSomeAction("Assessments")} >↗</button>
            </div>

            <button type="button" className="quick-add-circle" aria-label="Add module">
              <Plus size={40} />
            </button>

            <p className="card-description">Quickly add a new module or update your progress.</p>
            <button type="button" className="primary-button">
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
            {modules.map((module) => (
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
