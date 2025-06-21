import React, { useState } from 'react';
import { PlusCircleIcon } from '@heroicons/react/24/solid';

interface TimeEntryFormProps {
  onSubmit: (taskName: string, hours: number) => void;
}

const TimeEntryForm: React.FC<TimeEntryFormProps> = ({ onSubmit }) => {
  const [taskName, setTaskName] = useState<string>('');
  const [hours, setHours] = useState<number | ''>('');
  const [errors, setErrors] = useState<{ taskName?: string; hours?: string }>({});

  // Function to handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    let hasError = false;
    const newErrors: { taskName?: string; hours?: string } = {};

    // Validate task name and hours
    if (!taskName.trim()) {
      newErrors.taskName = 'Task name is required';
      hasError = true;
    }
    // Check if hours is a valid number and greater than 0
    if (hours === '' || isNaN(Number(hours)) || Number(hours) <= 0) {
      newErrors.hours = 'Please enter a valid number of hours';
      hasError = true;
    }

    setErrors(newErrors); // Update the errors state

    // If there are no errors, call the onSubmit function and reset the form fields
    if (!hasError) {
      onSubmit(taskName.trim(), Number(hours));
      setTaskName('');
      setHours('');
      setErrors({});
    }
  };

  return (
    // Form for adding a new time entry
    <form onSubmit={handleSubmit} className="mb-10 bg-white rounded-xl shadow-md p-6">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-end">
        <div className="md:col-span-5">
          <label className="block text-sm font-medium text-gray-700 mb-1">Task Name</label>
          <div className="relative">
            <input
              type="text"
              value={taskName}
              onChange={(e) => setTaskName(e.target.value)}
              className={`w-full px-4 py-2 rounded-lg border ${
                errors.taskName ? 'border-red-500' : 'border-gray-300'
              } focus:ring-2 focus:ring-indigo-500 focus:border-transparent`}
              placeholder="What are you working on?"
            />
            {/* Display error message if task name is invalid */}
            {errors.taskName && (
              <p className="mt-1 text-sm text-red-500">{errors.taskName}</p>
            )}
          </div>
        </div>
        
        <div className="md:col-span-3">
          <label className="block text-sm font-medium text-gray-700 mb-1">Hours</label>
          <div className="relative">
            <input
              type="number"
              min="0"
              step="0.25"
              value={hours || ''}
              onChange={(e) => setHours(parseFloat(e.target.value))}
              className={`w-full px-4 py-2 rounded-lg border ${
                errors.hours ? 'border-red-500' : 'border-gray-300'
              } focus:ring-2 focus:ring-indigo-500 focus:border-transparent`}
              placeholder="0.00"
            />
            {/* Display error message if hours is invalid */}
            {errors.hours && (
              <p className="mt-1 text-sm text-red-500">{errors.hours}</p>
            )}
          </div>
        </div>
        
        <div className="md:col-span-4">
          <button 
            type="submit"
            className="w-full flex justify-center items-center bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 px-4 rounded-lg transition duration-200"
          >
            <PlusCircleIcon className="h-5 w-5 mr-2" />
            Add Entry
          </button>
        </div>
      </div>
    </form>
  );
};

export default TimeEntryForm;