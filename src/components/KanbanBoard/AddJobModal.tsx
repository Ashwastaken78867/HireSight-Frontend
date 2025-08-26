// src/components/KanbanBoard/AddJobModal.tsx
import React, { useState } from "react";
import { createApplication } from "../../services/api";
import { type IJobApplication } from "../../types";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (newApp: IJobApplication) => void;
}

const STATUSES: IJobApplication["status"][] = [
  "Applied",
  "Interview",
  "Offer",
  "Rejected",
];

const AddJobModal: React.FC<Props> = ({ isOpen, onClose, onAdd }) => {
  const [candidateName, setCandidateName] = useState("");
  const [role, setRole] = useState("");
  const [experience, setExperience] = useState<number>(0);
  const [resumeLink, setResumeLink] = useState("");
  const [status, setStatus] = useState<IJobApplication["status"]>("Applied");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const newApp = await createApplication({ candidateName, role, experience, resumeLink, status });
      onAdd(newApp);
      setCandidateName("");
      setRole("");
      setExperience(0);
      setResumeLink("");
      setStatus("Applied");
      onClose();
    } catch (error) {
      console.error("Error creating application:", error);
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={onClose} />
      <div className="relative bg-white w-full max-w-md rounded-2xl shadow-2xl border border-gray-100 p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Add Job Application</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Candidate Name</label>
            <input
              type="text"
              placeholder="Jane Doe"
              className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              value={candidateName}
              onChange={(e) => setCandidateName(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Role</label>
            <input
              type="text"
              placeholder="Frontend Developer"
              className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Experience (years)</label>
            <input
              type="number"
              placeholder="3"
              className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              value={experience}
              onChange={(e) => setExperience(Number(e.target.value))}
              required
              min={0}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Resume Link</label>
            <input
              type="text"
              placeholder="https://..."
              className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              value={resumeLink}
              onChange={(e) => setResumeLink(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Status</label>
            <select
              className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              value={status}
              onChange={(e) => setStatus(e.target.value as IJobApplication["status"])}
            >
              {STATUSES.map((s) => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
          </div>
          <div className="flex justify-end gap-2 pt-2">
            <button
              type="button"
              className="px-4 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50"
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 rounded-lg bg-indigo-600 text-white hover:bg-indigo-700 shadow-sm"
              disabled={loading}
            >
              {loading ? "Adding..." : "Add"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddJobModal;
