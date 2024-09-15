import ToDoList from '../../components/ToDoList/ToDoList';
import Calendar from '../../components/Calendar/Calendar';
import { useEffect } from 'react';

function Home({allTasks}) {

  useEffect(() => {
    document.title = "JourneyTask"
  }, [])
  return (
    <div className='p-2 h-full flex-col gap-16 justify-center content-center'>
      <ToDoList allTasks={allTasks}/>
      <Calendar allTasks={allTasks} />
    </div>
  )
}

export default Home
