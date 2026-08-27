import React from "react";
import { Link } from "react-router-dom";
 
function NullModuleProgress() {
  return (
    <div className="flex flex-col">
      {/* header */}
      <div className="flex flex-col md:flex-row items-center justify-between rounded-2xl bg-white shadow-md px-6 h-24 md:h-18 gap-2">
        <div className="font-bold text-xl">2026 Calendar Year</div>
        <select
          disabled
          className="bg-white border border-gray-300 text-gray-700 py-2 px-4 pr-8 rounded-2xl shadow-md font-medium my-4 cursor-not-allowed opacity-60"
        >
          <option value="">Module</option>
        </select>
      </div>
 
      {/* empty state */}
      <div className="flex flex-col items-center justify-center text-center gap-3 bg-white border border-slate-100 shadow-sm rounded-2xl px-6 py-20 mt-6">
        <div className="flex items-center justify-center h-14 w-14 rounded-full bg-indigo-50 mb-2">
          <svg
            className="h-7 w-7 text-indigo-600"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </div>
 
        <h1 className="text-xl font-bold text-slate-900">
          No modules added yet
        </h1>
        <p className="text-sm text-slate-500 max-w-sm">
          Add a module to start tracking assignments, tests, and your
          projected final mark for the year.
        </p>
 
        <Link
          to="/ModuleDetail/"
          className="mt-4 text-blue-600 font-semibold hover:underline"
        >
          Add Module
        </Link>
      </div>
    </div>
  );
}
 
export default NullModuleProgress;