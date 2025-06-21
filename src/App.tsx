import './App.css'
import TaskEntryForm from './components/TaskEntryForm.tsx'

function App() {
  return (
    <div>
      <p className='text-red-500'>Mini Time Tracker</p>
      <TaskEntryForm 
        onSubmit={(taskName, hours) => {
          console.log(`Task: ${taskName}, Hours: ${hours}`);
        }} />
    </div>
  )
}

export default App
