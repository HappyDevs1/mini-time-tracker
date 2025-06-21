import React, { useState, useEffect, useRef } from 'react';
import { format } from 'date-fns';
import type { TimeEntry } from '../types';

interface TimerProps {
  entries: TimeEntry[];
  updateEntry: (id: string, updates: Partial<TimeEntry>) => void;
  addEntry: (entry: TimeEntry) => void;
}

const Timer: React.FC<TimerProps> = ({ entries, updateEntry, addEntry }) => {
  // State to manage elapsed time and interval reference
  const [elapsed, setElapsed] = useState(0);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  
  // Find active timer
  const activeEntry = entries.find(entry => entry.isRunning);
  
  // Timer effect
  useEffect(() => {
    if (activeEntry) {
      const startTime = activeEntry.startTime ? new Date(activeEntry.startTime).getTime() : Date.now();
      
      // Update immediately first
      setElapsed((Date.now() - startTime) / 1000);
      
      // Then set interval
      intervalRef.current = setInterval(() => {
        setElapsed((Date.now() - startTime) / 1000);
      }, 1000);
    } else {
      // If no active entry, clear interval and reset elapsed time
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
      setElapsed(0);
    }
    
    return () => {
      // Cleanup interval on unmount or when activeEntry changes
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [activeEntry]);

  // Format seconds into HH:MM:SS
  const formatTime = (seconds: number) => {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = Math.floor(seconds % 60);
    return `${hrs.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  // Start and stop timer functions
  const startTimer = () => {
    const newId = Date.now().toString();
    const now = new Date(); // Current time for startTime
    
    // Create a new entry
    addEntry({
      id: newId,
      taskName: `Task ${entries.length + 1}`,
      hours: 0,
      startTime: now,
      isRunning: true
    });
  };

  const stopTimer = () => {
    if (activeEntry) {
      updateEntry(activeEntry.id, {
        hours: elapsed / 3600,
        isRunning: false
      });
    }
  };

  return (
    <div className="mb-8 p-6 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-xl shadow-lg text-white">
      <h2 className="text-xl font-semibold mb-4">Active Timer</h2>
      
      <div className="flex flex-col sm:flex-row items-center justify-between">
        <div className="text-4xl font-mono font-bold mb-4 sm:mb-0">
          {formatTime(elapsed)}
        </div>
        
        <div>
          {!activeEntry ? (
            <button
              onClick={startTimer}
              className="flex items-center bg-white text-indigo-600 font-medium py-3 px-6 rounded-lg shadow-md hover:bg-gray-100 transition duration-200"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
              </svg>
              Start Timer
            </button>
          ) : (
            <button
              onClick={stopTimer}
              className="flex items-center bg-red-500 text-white font-medium py-3 px-6 rounded-lg shadow-md hover:bg-red-600 transition duration-200"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8 7a1 1 0 00-1 1v4a1 1 0 001 1h4a1 1 0 001-1V8a1 1 0 00-1-1H8z" clipRule="evenodd" />
              </svg>
              Stop Timer
            </button>
          )}
        </div>
      </div>
      
      {activeEntry && (
        <div className="mt-4 text-sm bg-white/20 rounded-lg p-2">
          Tracking: <span className="font-medium">{activeEntry.taskName}</span> 
          {activeEntry.startTime && (
            <> (started at {format(new Date(activeEntry.startTime), 'HH:mm:ss')})</>
          )}
        </div>
      )}
    </div>
  );
};

export default Timer;