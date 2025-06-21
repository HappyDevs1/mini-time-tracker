import React, { useState } from 'react';
import TimeEntryItem from './TimeEntryItem';
import type { TimeEntry } from '../types';

// Properties for the TimeEntryList component
interface TimeEntryListProps {
  entries: TimeEntry[];
  onDelete: (id: string) => void;
  onUpdate: (id: string, updates: Partial<TimeEntry>) => void;
}

const TimeEntryList: React.FC<TimeEntryListProps> = ({ 
  entries, 
  onDelete, 
  onUpdate 
}) => {
  // State to manage which entry is currently being edited
  const [editingId, setEditingId] = useState<string | null>(null);

  // If there are no entries, display a message
  if (entries.length === 0) {
    return (
      <div className="p-6 bg-gray-100 rounded-lg text-center">
        <p className="text-gray-500">No time entries yet. Add your first entry!</p>
      </div>
    );
  }

  return (
    // List of time entries with options to edit or delete
    <div className="mb-8">
      <h2 className="text-2xl font-semibold mb-4">Time Entries</h2>
      <div className="space-y-3">
        {/* Map through each entry and render a TimeEntryItem component */}
        {entries.map(entry => (
          <TimeEntryItem
            key={entry.id}
            entry={entry}
            isEditing={editingId === entry.id}
            onEditToggle={() => setEditingId(editingId === entry.id ? null : entry.id)}
            onDelete={onDelete}
            onUpdate={onUpdate}
          />
        ))}
      </div>
    </div>
  );
};

export default TimeEntryList;