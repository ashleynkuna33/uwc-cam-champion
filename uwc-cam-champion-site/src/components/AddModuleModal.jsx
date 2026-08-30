import { useState } from "react";
import { apiFetch } from "../api.js";
import { useUser } from "../context/UserContext.jsx";
import { MdCancel } from "react-icons/md";

const initialForm = {
  moduleCode: "",
  moduleName: "",
  lecturer: "",
  credits: "",
  status: "Active",
  description: "",
  finalExamDate: "",
};

function AddModuleModal({ isOpen, onClose }) {
  const { user, setModules, modules } = useUser();

  const [form, setForm] = useState(initialForm);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleClose = () => {
    setForm(initialForm);
    setError(null);
    onClose();
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
      handleClose();
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
      <div className="bg-white rounded-2xl p-6 w-full max-w-md shadow-lg max-h-[90vh] overflow-y-auto">
        <div className="flex flex-row justify-between items-center">
          <h1 className="font-bold text-xl mb-4">Create New Module</h1>
          <button
            type="button"
            onClick={handleClose}
            aria-label="Close"
            className="flex items-center"
          >
            <MdCancel size={34} className="text-red-500 transition-colors duration-100 hover:text-red-600 cursor-pointer"/>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-1">
          <label htmlFor="moduleCode" className="text-black font-semibold mt-4">Module Code</label>
          <input id="moduleCode" name="moduleCode" value={form.moduleCode} onChange={handleChange} placeholder="Module Code (e.g. CS101)" required className="border border-gray-400 rounded-xl py-2 px-1.5 mb-2"/>

          <label htmlFor="moduleName" className="font-semibold">Name</label>
          <input id="moduleName" name="moduleName" value={form.moduleName} onChange={handleChange} placeholder="Module Name" required className="border border-gray-400 rounded-xl py-2 px-1.5 mb-2"/>

          <label htmlFor="lecturer" className="font-semibold">Lecturer</label>
          <input id="lecturer" name="lecturer" value={form.lecturer} onChange={handleChange} placeholder="Lecturer Name" className="border border-gray-400 rounded-xl py-2 px-1.5 mb-2"/>

          <label htmlFor="credits" className="font-semibold mt-4">Credits</label>
          <input
            id="credits"
            name="credits"
            type="number"
            value={form.credits}
            onChange={handleChange}
            placeholder="Credits"
            className="border border-gray-400 rounded-xl py-2 px-1.5 mb-2"
          />

          <label htmlFor="status" className="font-semibold">Status</label>
          <select
            id="status"
            name="status"
            value={form.status}
            onChange={handleChange}
            className="border border-gray-400 rounded-xl py-2 px-1.5 mb-2"
          >
            <option value="Active">Active</option>
            <option value="Completed">Completed</option>
            <option value="Not Started">Not Started</option>
          </select>

          <label htmlFor="finalExamDate" className="font-semibold">Final Exam Date</label>
          <input
            id="finalExamDate"
            name="finalExamDate"
            type="date"
            value={form.finalExamDate}
            onChange={handleChange}
            className="border border-gray-400 rounded-xl py-2 px-1.5 mb-2"
          />

          <label htmlFor="description" className="font-semibold">Description</label>
          <textarea
            id="description"
            name="description"
            value={form.description}
            onChange={handleChange}
            placeholder="Description"
            rows={3}
            className="border border-gray-400 rounded-xl py-2 px-1.5 mb-2"
          />

          {error && <p className="text-red-500 text-sm">{error}</p>}

          <div className="flex justify-end gap-2 mt-2">
            <button
              type="button"
              onClick={handleClose}
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
