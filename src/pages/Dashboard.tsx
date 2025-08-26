import React, { useEffect, useState } from "react";
import { DragDropContext, type DropResult } from "@hello-pangea/dnd";
import BoardColumn from "../components/KanbanBoard/BoardColumn";
import { getApplications, updateApplicationStatus } from "../services/api";
import type { IJobApplication } from "../types";
import AddJobModal from "../components/KanbanBoard/AddJobModal";

const STATUSES: Array<IJobApplication["status"]> = [
  "Applied",
  "Interview",
  "Offer",
  "Rejected",
];

const Dashboard: React.FC = () => {
  const [applications, setApplications] = useState<IJobApplication[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Filter states
  const [searchTerm, setSearchTerm] = useState("");
  const [roleFilter, setRoleFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState<"All" | IJobApplication["status"]>("All");
  const [experienceFilter, setExperienceFilter] = useState<number | "">("");

  useEffect(() => {
    fetchApplications();
  }, []);

  const fetchApplications = async () => {
    try {
      setLoading(true);
      const data = await getApplications();
      setApplications(data);
    } catch (error) {
      console.error("Error fetching applications:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddApplication = (newApp: IJobApplication) => {
    setApplications((prev) => [newApp, ...prev]);
  };

  const onDragEnd = async (result: DropResult) => {
    const { destination, source, draggableId } = result;
    if (!destination) return;
    if (destination.droppableId === source.droppableId) return;

    try {
      await updateApplicationStatus(
        draggableId,
        destination.droppableId as IJobApplication["status"]
      );

      setApplications((prev) =>
        prev.map((app) =>
          app._id === draggableId
            ? { ...app, status: destination.droppableId as IJobApplication["status"] }
            : app
        )
      );
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };

  // Filter applications
  const filteredApplications = applications.filter((app) => {
    return (
      (searchTerm === "" || app.candidateName.toLowerCase().includes(searchTerm.toLowerCase())) &&
      (roleFilter === "" || app.role.toLowerCase().includes(roleFilter.toLowerCase())) &&
      (statusFilter === "All" || app.status === statusFilter) &&
      (experienceFilter === "" || app.experience === experienceFilter)
    );
  });

  if (loading) {
    return (
      <div className="p-6">
        <div className="animate-pulse space-y-4">
          <div className="h-8 w-56 bg-gray-200 rounded" />
          <div className="h-10 w-40 bg-gray-200 rounded" />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-4">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="h-64 bg-gray-100 rounded-xl" />
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between gap-4 items-start sm:items-center">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-gray-900">Job Applications</h1>
          <p className="text-sm text-gray-600">Track candidates across each stage of your hiring pipeline.</p>
        </div>
        <button
          className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-indigo-600 text-white hover:bg-indigo-700 shadow-sm"
          onClick={() => setIsModalOpen(true)}
        >
          + Add Application
        </button>
      </div>

      {/* Add Application Modal */}
      <AddJobModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onAdd={handleAddApplication}
      />

      {/* Filters */}
      <div className="flex flex-wrap gap-3 items-center">
        <input
          type="text"
          placeholder="Search by candidate..."
          className="p-2 border rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 flex-1 min-w-[200px]"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        <input
          type="text"
          placeholder="Filter by role..."
          className="p-2 border rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 flex-1 min-w-[200px]"
          value={roleFilter}
          onChange={(e) => setRoleFilter(e.target.value)}
        />

        <select
          className="p-2 border rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 min-w-[160px]"
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value as any)}
        >
          <option value="All">All Status</option>
          {STATUSES.map((s) => (
            <option key={s} value={s}>{s}</option>
          ))}
        </select>

        <input
          type="number"
          placeholder="Filter by experience..."
          className="p-2 border rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 min-w-[160px]"
          value={experienceFilter}
          onChange={(e) => setExperienceFilter(e.target.value === "" ? "" : Number(e.target.value))}
        />
      </div>

      {/* Kanban Board */}
      <DragDropContext onDragEnd={onDragEnd}>
        <div className="flex gap-6 overflow-x-auto pb-4">
          {STATUSES.map((status) => (
            <BoardColumn
              key={status}
              status={status}
              applications={filteredApplications.filter((app) => app.status === status)}
              onDelete={(id) =>
                setApplications((prev) => prev.filter((a) => a._id !== id))
              }
            />
          ))}
        </div>
      </DragDropContext>
    </div>
  );
};

export default Dashboard;
