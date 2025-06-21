import React, { useState, useEffect } from 'react';
import TimeEntryForm from './components/TaskEntryForm';
import TimeEntryList from './components/TimeEntryList';
import type { TimeEntry } from './types';
import Timer from './components/Timer';

const App: React.FC = () => {
  // State to manage time entries, initialized from localStorage
  const [entries, setEntries] = useState<TimeEntry[]>(() => {
    // Load saved entries from localStorage or return an empty array
    const saved = localStorage.getItem('timeEntries');
    return saved ? JSON.parse(saved) : [];
  });

  // Save to localStorage on change
  useEffect(() => {
    localStorage.setItem('timeEntries', JSON.stringify(entries));
  }, [entries]);

  // Calculate total hours from entries
  const totalHours = entries.reduce((sum, entry) => sum + entry.hours, 0);

  // Functions to add, delete, and update time entries
  const addEntry = (entry: TimeEntry | string, hours?: number) => {
  if (typeof entry === 'string') {
    // Called from form (taskName: string, hours: number)
    setEntries([...entries, {
      id: Date.now().toString(),
      taskName: entry,
      hours: hours!,
      startTime: null,
      isRunning: false
    }]);
  } else {
    // Called from timer (full TimeEntry object)
    setEntries([...entries, entry]);
  }
};

  const deleteEntry = (id: string) => {
    // Filter out the entry with the given id
    setEntries(entries.filter(entry => entry.id !== id));
  };

  const updateEntry = (id: string, updates: Partial<TimeEntry>) => {
    // Update the entry with the given id
    setEntries(entries.map(entry => 
      entry.id === id ? {...entry, ...updates} : entry
    ));
  };

  return (
    <div className="container mx-auto p-4 max-w-2xl">
      <h1 className="text-3xl font-bold mb-6">Mini Time Tracker</h1>
      
      <Timer 
      entries={entries} 
      updateEntry={updateEntry} 
      addEntry={addEntry}
    />

      <TimeEntryForm onSubmit={addEntry} />
      
      <TimeEntryList 
        entries={entries} 
        onDelete={deleteEntry} 
        onUpdate={updateEntry}
      />
      
      <div className="mt-6 p-4 bg-gray-100 rounded-lg">
        <h2 className="text-xl font-semibold">
          Total Hours: {totalHours.toFixed(2)}
        </h2>
      </div>
    </div>
  );
};

export default App;