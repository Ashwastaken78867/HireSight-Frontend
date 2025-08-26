import React from "react";
import type { IJobApplication } from "../../types";
import { Draggable } from "@hello-pangea/dnd";
import { deleteApplication } from "../../services/api";

interface Props {
  application: IJobApplication;
  index: number;
  onDelete: (id: string) => void;
}

const ApplicationCard: React.FC<Props> = ({ application, index, onDelete }) => {
  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this application?")) {
      await deleteApplication(application._id);
      onDelete(application._id);
    }
  };

  return (
    <Draggable draggableId={application._id} index={index}>
      {(provided) => (
        <div
          className="bg-white border border-gray-200 shadow-sm rounded-xl p-4 cursor-grab active:cursor-grabbing hover:shadow-md transition"
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          <div className="flex items-start justify-between gap-3">
            <div>
              <h3 className="font-semibold text-gray-900">{application.candidateName}</h3>
              <p className="text-sm text-gray-600">{application.role}</p>
              <p className="text-xs text-gray-500 mt-1">Experience: {application.experience} yrs</p>
            </div>
            <a
              href={application.resumeLink}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs font-medium text-indigo-600 hover:text-indigo-700"
            >
              Resume
            </a>
          </div>

          {/* Actions */}
          <div className="flex justify-end gap-2 mt-3">
            <button
              className="px-2.5 py-1.5 text-xs bg-rose-600 text-white rounded-md hover:bg-rose-700 shadow-sm"
              onClick={handleDelete}
            >
              Delete
            </button>
            {/* Later we’ll add Edit here */}
          </div>
        </div>
      )}
    </Draggable>
  );
};

export default ApplicationCard;
