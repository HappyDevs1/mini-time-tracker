import './App.css'
import TaskEntryForm from './components/TaskEntryForm.tsx';
import TimeEntryItem from './components/TimeEntryItem.tsx';

function App() {
  return (
    <div>
      <p className='text-red-500'>Mini Time Tracker</p>
      <TaskEntryForm 
        onSubmit={(taskName, hours) => {
          console.log(`Task: ${taskName}, Hours: ${hours}`);
        }} />
        {/* Temporary task entry item to test */}
      <TimeEntryItem 
        entry={{
          id: '1',
          taskName: 'Sample Task',
          hours: 2.5,
          startTime: new Date(),
          isRunning: false
        }}
        isEditing={false}
        onUpdate={(updatedEntry) => console.log('Updated entry:', updatedEntry)}
        onEditToggle={() => console.log('Edit toggled')}
        onDelete={(id) => console.log(`Delete entry with id: ${id}`)} />
    </div>
  )
}

export default App
