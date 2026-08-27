import { useState } from "react";
import { useUser } from "../context/UserContext";
// icons
import { MdOutlineQuiz, MdAssignment, MdOutlineScience, MdHistoryEdu } from "react-icons/md";
import { CiSearch, CiCalendar, CiFolderOn } from "react-icons/ci";

export const AssessmentItem = ({ item, Icon }) => {
  const config = getTypeConfig(item.type);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[1.5fr_1.2fr_1.2fr_1fr] items-center gap-6 p-5 border border-gray-200 rounded-2xl bg-white hover:shadow-md transition-shadow">
      
      {/* 1 */}
      <div className="flex gap-4 items-start">
        <div className={`p-3 rounded-xl shrink-0 ${config.bg} ${config.color}`}>
          <Icon size={24} />
        </div>
        <div>
          <span className={`text-xs font-bold uppercase tracking-wider ${config.color}`}>
            {item.type}
          </span>
          <h3 className="font-bold text-gray-900 text-base mt-0.5 leading-snug">
            {item.title}
          </h3>
          <p className="text-gray-400 text-xs mt-1 leading-normal max-w-sm">
            {item.description}
          </p>
        </div>
      </div>

      {/* 2 */}
      <div className="space-y-1.5">
        <span className="text-xs font-semibold text-gray-400 block uppercase tracking-wider">Due Date</span>
        <div className="flex flex-wrap items-center gap-2">
          <div className="flex items-center gap-1.5 text-gray-700 font-bold text-sm">
            <CiCalendar size={18} className="text-gray-400" />
            {item.dueDate}
          </div>
          <span className={`text-[10px] px-2 py-0.5 rounded-md font-bold uppercase tracking-wide ${getStatusBadgeStyle(item.status)}`}>
            {item.status}
          </span>
        </div>
      </div>

      {/* 3 */}
      <div className="space-y-1">
        <span className="text-xs font-semibold text-gray-400 block uppercase tracking-wider">Module</span>
        <div className="flex items-center gap-1.5 text-gray-800 font-bold text-sm">
          <CiFolderOn size={18} className="text-gray-400 shrink-0" />
          <span>{item.moduleCode} <span className="text-gray-500 font-medium font-mono text-xs">({item.moduleName})</span></span>
        </div>
        <p className="text-[11px] text-gray-400 font-medium">
          Task weight: <span className="font-bold text-gray-600">{item.weight}</span> of total module mark.
        </p>
      </div>

      {/* 4 */}
      <div className="flex flex-col sm:flex-row lg:flex-col items-stretch lg:items-end justify-center gap-2 w-full lg:w-auto ml-auto">
        <div className="text-right lg:mb-1 px-1">
          <span className="text-[11px] text-gray-400 font-medium block">
            Category Component Weight
          </span>
          <span className="text-xs font-extrabold text-blue-600 bg-blue-50 px-2 py-0.5 rounded-md mt-0.5 inline-block">
            {item.categoryWeight} Course Total
          </span>
        </div>
        <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold shadow-sm transition-colors cursor-pointer text-center">
          Action Details
        </button>
      </div>

    </div>
  );
};

const SearchBar = ({ placeholder = "Search Module" }) => {
  return (
    <div className="flex flex-row items-center border border-gray-300 rounded-2xl px-3 w-full max-w-[320px] min-w-0 mx-4 mb-2 bg-white shadow-sm focus-within:border-blue-500 transition-colors">
      <input 
        type="text"
        placeholder={placeholder} 
        className="bg-transparent outline-none border-none text-sm text-gray-700 w-full min-w-0 py-2"
      />
      <div className="flex items-center justify-center text-gray-400 shrink">
        <CiSearch size={20} />
      </div>
    </div>
  );
};

const getTypeConfig = (type) => {
  switch (type) {
    case 'Quiz': 
      return { icon: MdOutlineQuiz, color: 'text-sky-500', bg: 'bg-sky-500/10' };
    case 'Assignment': 
      return { icon: MdAssignment, color: 'text-amber-500', bg: 'bg-amber-500/10' };
    case 'Practical': 
      return { icon: MdOutlineScience, color: 'text-emerald-500', bg: 'bg-emerald-500/10' };
    case 'Test': 
      return { icon: MdHistoryEdu, color: 'text-indigo-500', bg: 'bg-indigo-500/10' };
    default: 
      return { icon: MdAssignment, color: 'text-gray-500', bg: 'bg-gray-500/10' };
  }
};

const getStatusBadgeStyle = (status) => {
  if (status?.includes('Past Due')) return 'bg-red-500 text-white';
  if (status?.includes('days')) return 'bg-amber-500 text-white';
  return 'bg-blue-500 text-white';
};

function Tasks({ onAddModuleClick }) {
  const { tasks } = useUser();
  const [activeFilter, setActiveFilter] = useState('All');
  const categories = ['All', 'Assignments', 'Quizzes', 'Practicals', 'Tests'];

  const userTasks = tasks || [];

  const filteredAssessments = userTasks.filter(item => {
    if (activeFilter === 'All') return true;
    if (activeFilter === 'Assignments') return item.type === 'Assignment';
    if (activeFilter === 'Quizzes') return item.type === 'Quiz';
    if (activeFilter === 'Practicals') return item.type === 'Practical';
    if (activeFilter === 'Tests') return item.type === 'Test';
    return true;
  });

  return (
    <div className="flex flex-col">
      
      {/* Header */}
      <div className="bg-white/70 backdrop-blur-sm flex flex-col md:flex-row items-center justify-between px-6 h-[88px] md:h-18 rounded-2xl shadow-md">
        <h1 className="font-bold text-2xl text-gray-900 mr-4">Modules</h1>
        <SearchBar />
      </div>

      <h1 className="text-gray-500 my-2">
        Please note that the assessments shown here are intended to help you track your progress. Your lecturer's assessments, instructions, and deadlines remain the official source of information. Always double-check with your lecturer or course outline.
      </h1>

      <div className="flex flex-wrap items-center justify-between gap-4 mb-6 bg-gray-50/60 p-1.5 rounded-2xl border border-gray-100">
        <div className="flex flex-wrap gap-1">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveFilter(cat)}
              className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all cursor-pointer ${
                activeFilter === cat
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'text-gray-600 hover:bg-gray-200/50'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
        <div className="text-sm font-medium text-gray-500 px-2">
          Total Filtered: <span className="font-bold text-gray-800">{filteredAssessments.length}</span>
        </div>
      </div>

      {/* Assessment List / Empty State */}
      <div className="space-y-4">
        {filteredAssessments.length > 0 ? (
          filteredAssessments.map((item) => {
            const config = getTypeConfig(item.type);

            return (
              <AssessmentItem key={item.id} item={item} Icon={config.icon} />
            );
          })
        ) : (
          <div className="text-center p-12 bg-gray-50/50 rounded-2xl border border-dashed border-gray-200">
            <p className="text-gray-500 font-medium text-sm">
              No task to show here,{" "}
              <button 
                onClick={onAddModuleClick}
                className="text-blue-600 font-bold hover:underline cursor-pointer"
              >
                click here to add a module
              </button>
            </p>
          </div>
        )}
      </div>

    </div>
  );
}

export default Tasks;