import { useState, useEffect } from "react";
import { apiFetch } from "../api.js";
import { useUser } from "../context/UserContext.jsx";
import { MdCancel, MdSearch } from "react-icons/md";

function JoinModuleModal({ isOpen, onClose }) {
  const { user, setModules, modules } = useUser();

  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [searching, setSearching] = useState(false);
  const [joiningId, setJoiningId] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      setSearching(false);
      return;
    }

    setSearching(true);
    const timeout = setTimeout(async () => {
      try {
        const data = await apiFetch(`/modules/search?query=${encodeURIComponent(query)}`);
        setResults(data);
        setError(null);
      } catch (err) {
        console.error("Failed to search modules:", err);
        setError("Could not search modules. Please try again.");
      } finally {
        setSearching(false);
      }
    }, 400);

    return () => clearTimeout(timeout);
  }, [query]);

  const handleClose = () => {
    setQuery("");
    setResults([]);
    setError(null);
    onClose();
  };

  const handleJoin = async (moduleId) => {
    setJoiningId(moduleId);
    setError(null);

    try {
      const joinedModule = await apiFetch(`/modules/${moduleId}/join`, {
        method: "POST",
        body: { userId: user.id },
      });

      setModules([...modules, joinedModule]);
      handleClose();
    } catch (err) {
      console.error("Failed to join module:", err);
      setError("Could not join module. Please try again.");
    } finally {
      setJoiningId(null);
    }
  };

  if (!isOpen) return null;

  const alreadyJoinedIds = new Set(modules.map((m) => m.id));

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl p-6 w-full max-w-md shadow-lg max-h-[90vh] overflow-y-auto flex flex-col">
        <div className="flex flex-row justify-between items-center">
          <h1 className="font-bold text-xl mb-4">Join a Module</h1>
          <button
            type="button"
            onClick={handleClose}
            aria-label="Close"
            className="flex items-center"
          >
            <MdCancel size={34} className="text-red-500 transition-colors duration-100 hover:text-red-600 cursor-pointer"/>
          </button>
        </div>

        <div className="relative mb-3">
          <MdSearch size={20} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-gray-400"/>
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by module name, code, or lecturer"
            className="border border-gray-400 rounded-xl py-2 pl-9 pr-3 w-full"
          />
        </div>

        {error && <p className="text-red-500 text-sm mb-2">{error}</p>}

        <div className="flex flex-col gap-2 overflow-y-auto">
          {searching && (
            <p className="text-gray-500 text-sm text-center py-4">Searching...</p>
          )}

          {!searching && query.trim() && results.length === 0 && !error && (
            <p className="text-gray-500 text-sm text-center py-4">No modules found.</p>
          )}

          {!searching && results.map((module) => {
            const alreadyJoined = alreadyJoinedIds.has(module.id);
            return (
              <div
                key={module.id}
                className="border border-gray-300 rounded-xl p-3 flex justify-between items-center"
              >
                <div>
                  <p className="font-semibold">{module.moduleCode} — {module.moduleName}</p>
                  {module.lecturer && (
                    <p className="text-gray-500 text-sm">{module.lecturer}</p>
                  )}
                </div>
                <button
                  type="button"
                  onClick={() => handleJoin(module.id)}
                  disabled={alreadyJoined || joiningId === module.id}
                  className="px-3 py-1.5 rounded-xl bg-blue-500 text-white font-bold text-sm disabled:bg-gray-300"
                >
                  {alreadyJoined ? "Joined" : joiningId === module.id ? "Joining..." : "Join"}
                </button>
              </div>
            );
          })}
        </div>

        <div className="flex justify-end mt-4">
          <button
            type="button"
            onClick={handleClose}
            className="px-4 py-2 rounded-xl bg-gray-200"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

export default JoinModuleModal;
