import { useEffect, useState } from "react";
import { Api } from "../../api/Api"

function ToDoList() {
  const api = new Api();
  const [allTasks, setAllTasks] = useState([]);

  const getAllTasks = async () => {
    const { data } = await api.getAllTasks();
    setAllTasks(data);
  }

  useEffect(() => {
    getAllTasks()
  }, [])

  return (
    <div>
      <form className='flex min-h-auto'>
        <label className='flex-col h-01 '>
          Complete
          <input type='checkbox' ></input>
        </label>
        <label className='flex-col h-01' >
          Task
          <input type='text' placeholder="TEST 1" ></input>
        </label>
        <label className='flex-col h-01'>
          Start Date & Time
          <input type='text' placeholder="TEST 2"></input>
        </label>
        <label className='flex-col h-01'>
          Duration
          <input type='text' placeholder="TEST 3"></input>
        </label>
        <label className='flex-col h-01 '>
          Description
          <input type='text' placeholder="TEST 3" className="grow"></input>
        </label>
      </form>

      {allTasks?.map((task) => {
        return (
          <form>
            <input type='checkbox' ></input>
            <input type='text' key={task.task_id} value={task.task_name} onChange={() => console.log("TODO still")} ></input>
            <input type='text' key={task.start_date_and_time} value={task.start_date_and_time} onChange={() => console.log("TODO still")}></input>
            <input type='text'  placeholder="need to add calculation to calculate duration"></input>
            <input type='text' key={task.description}  value={task.description} onChange={() => console.log("TODO still")}></input>
          </form>
        )
      })}


    </div>
  )
}

export default ToDoList
