import ToDoList from '../../components/ToDoList/ToDoList';
import Calendar from '../../components/Calendar/Calendar';

function Home({allTasks}) {
  return (
    <div className='p-2 h-full flex-col gap-16 justify-center content-center'>
      <h1 className='text-blue-700 flex'>Home Page</h1>
      <ToDoList allTasks={allTasks}/>
      <Calendar allTasks={allTasks} />
    </div>
  )
}

export default Home
