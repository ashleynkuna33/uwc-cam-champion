import { Plus } from "lucide-react";
import "./Dashboard.css";

export default function Dashboard({ onSomeAction }) {

  const stats = [
    { label: "In Progress", value: 14, color: "#ff9f1c" },
    { label: "Completed", value: 32, color: "#1e9bff" },
    { label: "Not Started", value: 54, color: "#e5e7eb" },
  ];
  
  // const cam = (stats[1].value / stats.reduce((sum, item) => sum + item.value, 0)) * 100;
  const cam = 67.45; // Placeholder CAM value for demonstration 
  const modules = [
    {
      id: 1,
      name: "Networking",
      code: "COS311 S1",
      score: 78.5,
      progress: 78,
      status: "On Track",
      statusColor: "#10b981",
    },
    {
      id: 2,
      name: "Operating Systems",
      code: "COS311 S1",
      score: 64.2,
      progress: 64,
      status: "On Track",
      statusColor: "#10b981",
    },
    {
      id: 3,
      name: "Statistics",
      code: "STA331",
      score: 55.1,
      progress: 55,
      status: "At Risk",
      statusColor: "#f97316",
    },
    {
      id: 4,
      name: "Statistics",
      code: "STA332 S2",
      score: 72.3,
      progress: 72,
      status: "On Track",
      statusColor: "#10b981",
    },
    {
      id: 5,
      name: "Databases",
      code: "COS312 S2",
      score: 81.6,
      progress: 82,
      status: "On Track",
      statusColor: "#10b981",
    },
    {
      id: 6,
      name: "Machine Learning",
      code: "COS312 S2",
      score: 90.0,
      progress: 90,
      status: "Excellent",
      statusColor: "#0ea5e9",
    },
  ];

  const deadlines = [
    {
      date: "Jun 10",
      title: "Database Systems - Assignment 1",
      due: "Due in 3 days",
      priority: "High Priority",
      color: "#ef4444",
    },
    {
      date: "Jun 12",
      title: "Database Systems - Assignment 2",
      due: "Due in 5 days",
      priority: "Medium Priority",
      color: "#f59e0b",
    },
    {
      date: "Sep 15",
      title: "Software Engineering - Project ",
      due: "Due in 2 months",
      priority: "Medium Priority",
      color: "#f59e0b",
    },
    {
      date: "Jun 18",
      title: "Artificial Intelligence - Quiz 2",
      due: "Due in 11 days",
      priority: "Low Priority",
      color: "#22c55e",
    },
  ];

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

            <p className="overview-footer">Total Modules: 100</p>
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
              <span className="deadline-date">{deadline.date}</span>
              <div>
                <p>{deadline.title}</p>
                <small>{deadline.due}</small>
              </div>
              <span className="deadline-pill" style={{ background: deadline.color }}>
                {deadline.priority}
              </span>
            </div>
          ))}
        </article>
      </aside>
    </div>
  );
}
