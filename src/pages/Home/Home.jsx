import ToDoList from '../../components/ToDoList/ToDoList';
import Calendar from '../../components/Calendar/Calendar';
import { useEffect } from 'react';
import Aside from '../../components/Aside/Aside';

function Home({ allTasks }) {

  useEffect(() => {
    document.title = "JourneyTask"
  }, [])
  return (
    <div className='flex'>
      <Aside />
      <main className='p-2 h-full flex-col gap-16 justify-center content-center'>
        <ToDoList allTasks={allTasks} />
        <Calendar allTasks={allTasks} />
      </main>
    </div>

  )
}

export default Home
