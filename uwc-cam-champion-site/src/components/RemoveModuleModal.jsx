import { useState } from "react";
import { apiFetch } from "../api.js";
import { useUser } from "../context/UserContext.jsx";

function RemoveModuleModal({ isOpen, onClose, moduleToRemove }) {
  const { setModules, modules } = useUser();

  const [deleting, setDeleting] = useState(false);
  const [error, setError] = useState(null);

  const handleDelete = async () => {
    setDeleting(true);
    setError(null);

    try {
      await apiFetch(`/modules/${moduleToRemove.id}`, {
        method: "DELETE",
      });

      setModules(modules.filter((m) => m.id !== moduleToRemove.id));
      onClose();
    } catch (err) {
      console.error("Failed to remove module:", err);
      setError("Could not remove module. Please try again.");
    } finally {
      setDeleting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl p-6 w-full max-w-md shadow-lg">
        <h1 className="font-bold text-xl mb-2">Remove Module</h1>

        <p className="text-gray-600 mb-4">
          Are you sure you want to remove{" "}
          <span className="font-semibold text-gray-900">
            {moduleToRemove?.moduleCode} {moduleToRemove?.moduleName}
          </span>
          ? This can't be undone.
        </p>

        {error && <p className="text-red-500 text-sm mb-2">{error}</p>}

        <div className="flex justify-end gap-2">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-gray-200"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleDelete}
            disabled={deleting}
            className="px-4 py-2 rounded-xl bg-red-500 text-white font-bold"
          >
            {deleting ? "Removing..." : "Remove"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default RemoveModuleModal;