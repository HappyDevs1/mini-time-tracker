import './App.css'
import TaskEntryForm from './components/TaskEntryForm.tsx';
import TimeEntryItem from './components/TimeEntryItem.tsx';
import TimeEntryList from './components/TimeEntryList.tsx';

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
      <TimeEntryList
        entries={[
          {
            id: '1',
            taskName: 'Sample Task',
            hours: 2.5,
            startTime: new Date(),
            isRunning: false
          },
          {
            id: '2',
            taskName: 'Another Task',
            hours: 1.5,
            startTime: new Date(),
            isRunning: true
          }
        ]}
        onDelete={(id) => console.log(`Delete entry with id: ${id}`)}
        onUpdate={(id, updates) => console.log(`Update entry with id: ${id}`, updates)} />
    </div>
  )
}

export default App
