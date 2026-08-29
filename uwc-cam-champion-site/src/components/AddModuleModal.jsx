import { useState } from "react";
import { apiFetch } from "../api.js";
import { useUser } from "../context/UserContext";

function AddModuleModal({ isOpen, onClose }) {
  const { user, setModules, modules } = useUser();

  const [form, setForm] = useState({
    moduleCode: "",
    moduleName: "",
    lecturer: "",
    credits: "",
    status: "Active",
    description: "",
    finalExamDate: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);

    try {
      const newModule = await apiFetch("/modules", {
        method: "POST",
        body: { ...form, userId: user.id },
      });

      setModules([...modules, newModule]);
      onClose();
    } catch (err) {
      console.error("Failed to add module:", err);
      setError("Could not add module. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl p-6 w-full max-w-md shadow-lg">
        <h1 className="font-bold text-xl mb-4">Add Module</h1>

        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <input
            name="moduleCode"
            value={form.moduleCode}
            onChange={handleChange}
            placeholder="Module Code (e.g. CS101)"
            required
            className="border rounded-lg p-2"
          />

          <input
            name="moduleName"
            value={form.moduleName}
            onChange={handleChange}
            placeholder="Module Name"
            required
            className="border rounded-lg p-2"
          />

          <input
            name="lecturer"
            value={form.lecturer}
            onChange={handleChange}
            placeholder="Lecturer"
            className="border rounded-lg p-2"
          />

          <input
            name="credits"
            type="number"
            value={form.credits}
            onChange={handleChange}
            placeholder="Credits"
            className="border rounded-lg p-2"
          />

          <select
            name="status"
            value={form.status}
            onChange={handleChange}
            className="border rounded-lg p-2"
          >
            <option value="Active">Active</option>
            <option value="Completed">Completed</option>
            <option value="Not Started">Not Started</option>
          </select>

          <input
            name="finalExamDate"
            type="date"
            value={form.finalExamDate}
            onChange={handleChange}
            className="border rounded-lg p-2"
          />

          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            placeholder="Description"
            rows={3}
            className="border rounded-lg p-2"
          />

          {error && <p className="text-red-500 text-sm">{error}</p>}

          <div className="flex justify-end gap-2 mt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl bg-gray-200"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={submitting}
              className="px-4 py-2 rounded-xl bg-blue-500 text-white font-bold"
            >
              {submitting ? "Adding..." : "Add Module"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddModuleModal;