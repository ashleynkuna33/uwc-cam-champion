import { useState } from "react";
import { IoMdAdd } from "react-icons/io";
import "../components/Reminders.css";

import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { useUser } from "../context/UserContext";



const DAY_NAMES = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

function getCurrentWeek() {
  const today = new Date();
  const currentDayIdx = today.getDay();

  const sunday = new Date(today);
  sunday.setDate(today.getDate() - currentDayIdx);

  const week = [];
  for (let i = 0; i < 7; i++) {
    const d = new Date(sunday);
    d.setDate(sunday.getDate() + i);
    week.push(d.getDate());
  }

  return { dates: week, todayIdx: currentDayIdx };
}

function ReminderCard({ reminder }) {
  const [checked, setChecked] = useState(
    Object.fromEntries(reminder.checklist.map((item) => [item, false]))
  );
  const [completed, setCompleted] = useState(false);
  const [remindMe, setRemindMe] = useState(false);

  const pct = Math.min((reminder.daysLeft / reminder.daysTotal) * 100, 100);

  return (
    <div className="flex flex-row gap-2 items-center my-2 border-b border-slate-200 pb-4">
      {/* Date */}
      <div className="reminder-date">
        <span className="reminder-date__month">{reminder.date.month}</span>
        <span className="reminder-date__day">{reminder.date.day}</span>
      </div>

      {/* Icon */}
      <div className="reminder-icon-col">
        <div className="reminder-icon">{reminder.icon}</div>
        <span className="reminder-icon__label">{reminder.iconLabel}</span>
      </div>

      {/* Body */}
      <div className="reminder-body">
        <div className="reminder-body__top">
          <span className="reminder-body__title">{reminder.title}</span>
          <div className="reminder-body__actions">
            <span className={`priority-badge priority-badge--${reminder.priorityType}`}>
              {reminder.priority}
            </span>
            <button className="add-btn">+</button>
          </div>
        </div>

        <p className="reminder-body__due">{reminder.dueIn}</p>

        {reminder.note && <p className="reminder-body__note">{reminder.note}</p>}

        {reminder.checklist.length > 0 && (
          <div className="checklist">
            {reminder.checklist.map((item) => (
              <label key={item} className="checklist__item">
                <input
                  type="checkbox"
                  checked={checked[item]}
                  onChange={() =>
                    setChecked((prev) => ({ ...prev, [item]: !prev[item] }))
                  }
                  className="checklist__checkbox"
                />
                <span>{item}</span>
              </label>
            ))}
          </div>
        )}

        <div className="days-left">
          <span className="days-left__label">Days Left</span>
          <div className="days-left__bar">
            <div className="days-left__fill" style={{ width: `${pct}%` }} />
          </div>
          <span className="days-left__count">{reminder.daysLeft} days</span>
        </div>

        <div className="reminder-footer">
          <label className="footer-check">
            <input
              type="checkbox"
              checked={completed}
              onChange={() => setCompleted(!completed)}
            />
            <span>Completed</span>
          </label>
          <label className="footer-check">
            <input
              type="checkbox"
              checked={remindMe}
              onChange={() => setRemindMe(!remindMe)}
            />
            <span>Remind me 1 day before</span>
          </label>
        </div>
      </div>
    </div>
  );
}

export default function Reminders() {
  const { dates, todayIdx } = getCurrentWeek();
  const [selectedDay, setSelectedDay] = useState(todayIdx);
  const { tasks } = useUser();

  return (
    <div>

      {/* Header */}
      <div className="bg-white flex flex-col md:flex-row items-center justify-between rounded-2xl p-4 shadow-md mb-4">
        <h1 className="font-bold text-2xl">Reminders</h1>
        <button className="flex flex-row p-2 bg-blue-400 rounded-2xl gap-2 transition-all duration-300 hover:bg-blue-600">
          <IoMdAdd size={24} className="text-white"/>
          <h1 className="font-bold text-white">Quick Add Task</h1>
        </button>
      </div>

      {/* Deadline Hub Card */}
      <div className="p-4 bg-white rounded-2xl">
        <div className="flex flex-row items-center justify-between mb-4">
          <h2 className="font-bold text-xl">Interactive Deadline Hub</h2>
          <div className="flex flex-row gap-2">
            <button className="p-2 rounded-xl bg-gray-300 transition-all duration-200 hover:bg-gray-400">
              <IoIosArrowBack size={20}/>
            </button>
            <button className="p-2 rounded-xl bg-gray-300 transition-all duration-200 hover:bg-gray-400">
              <IoIosArrowForward size={20}/>
            </button>
          </div>
        </div>

        {/* Week strip */}
        <div className="week-strip">
          {DAY_NAMES.map((day, i) => (
            <button
              key={day}
              className={`week-day ${selectedDay === i ? "week-day--active" : ""}`}
              onClick={() => setSelectedDay(i)}
            >
              <span className="week-day__name">{day}</span>
              <span className="week-day__date">{dates[i]}</span>
            </button>
          ))}
        </div>

        {/* Cards */}
        <div className="reminders-list">
          {tasks.map((r) => (
            <ReminderCard key={r.id} reminder={r} />
          ))}
        </div>
      </div>

    </div>
  );
}

