import React, { useState } from 'react';
import type { TimeEntry } from '../types';

interface TimeEntryItemProps {
  entry: TimeEntry;
  isEditing: boolean;
  onEditToggle: () => void;
  onDelete: (id: string) => void;
  onUpdate: (id: string, updates: Partial<TimeEntry>) => void;
}

const TimeEntryItem: React.FC<TimeEntryItemProps> = ({
  entry,
  isEditing,
  onEditToggle,
  onDelete,
  onUpdate
}) => {
  // State to manage the edited task name and hours
  const [editTask, setEditTask] = useState(entry.taskName);
  const [editHours, setEditHours] = useState(entry.hours);
  
  // Function to handle saving the edited entry
  const handleSave = () => {
    onUpdate(entry.id, {
      taskName: editTask,
      hours: editHours
    });
    onEditToggle(); // Toggle off editing mode
  };

  return (
    // Time entry item component for displaying and editing time entries
    <div className="p-4 bg-white rounded-lg shadow flex justify-between items-center">
      {isEditing ? (
        <div className="flex-1 grid grid-cols-2 gap-4">
          <input
            type="text"
            value={editTask}
            onChange={(e) => setEditTask(e.target.value)}
            className="p-2 border rounded"
          />
          <input
            type="number"
            min="0"
            step="0.25"
            value={editHours}
            onChange={(e) => setEditHours(parseFloat(e.target.value))}
            className="p-2 border rounded"
          />
        </div>
      ) : (
        <div className="flex-1">
          <h3 className="font-medium">{entry.taskName}</h3>
          <p className="text-gray-600">{entry.hours.toFixed(2)} hours</p>
        </div>
      )}
      
      <div className="flex space-x-2">
        {isEditing ? (
          <>
            <button 
              onClick={handleSave}
              className="px-3 py-1 bg-green-600 text-white rounded"
            >
              Save
            </button>
            <button 
              onClick={onEditToggle}
              className="px-3 py-1 bg-gray-500 text-white rounded"
            >
              Cancel
            </button>
          </>
        ) : (
          <>
            <button 
              onClick={onEditToggle}
              className="px-3 py-1 bg-blue-600 text-white rounded"
            >
              Edit
            </button>
            <button 
              onClick={() => onDelete(entry.id)}
              className="px-3 py-1 bg-red-600 text-white rounded"
            >
              Delete
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default TimeEntryItem;