// src/components/KanbanBoard/BoardColumn.tsx
import React from "react";
import { Droppable, type DroppableProvided } from "@hello-pangea/dnd";
import ApplicationCard from "./ApplicationCard";
import type { IJobApplication } from "../../types";

interface Props {
  status: string;
  applications: IJobApplication[];
  onDelete: (id: string) => void;  // ✅ receive from parent
}

const BoardColumn: React.FC<Props> = ({ status, applications, onDelete }) => {
  return (
    <div className="bg-white/70 backdrop-blur-sm border border-gray-200 rounded-xl p-4 w-80 flex-shrink-0 shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <h2 className="font-semibold text-gray-800 tracking-tight">{status}</h2>
        <span className="text-xs px-2 py-0.5 rounded-full bg-gray-100 text-gray-700 border border-gray-200">{applications.length}</span>
      </div>
      <Droppable droppableId={status}>
        {(provided: DroppableProvided) => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            className="min-h-[200px] space-y-3"
          >
            {applications.map((app, index) => (
              <ApplicationCard
                key={app._id} 
                application={app}
                index={index}
                onDelete={onDelete}   // ✅ pass real handler
              />
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  );
};

export default BoardColumn;
