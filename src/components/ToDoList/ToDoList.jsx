import { useEffect } from "react";
import { Api } from "../../api/Api"

function ToDoList() {
  const api = new Api();

  const getAllTasks = async () => {
    const data = await api.getAllTasks();
    console.log(data)
    console.log('getAllTask function is running')
  }
  useEffect(() => {
    getAllTasks
  }, [])
  return (
    <div>
      <form className='flex min-h-96'>
        <label className='flex-col'>
          Task Name
          <input type='text' placeholder="TEST 1"></input>
        </label>
        <label>
          Start Date
          <input type='text' placeholder="TEST 2"></input>
        </label>
        <label>
          Start Time
          <input type='text' placeholder="TEST 3"></input>
        </label>
        <label>
          Duration
          <input type='text' placeholder="TEST 3"></input>
        </label>
        <label>
          Description
          <input type='text' placeholder="TEST 3"></input>
        </label>
      </form>
      {/* {data.map((task) => {
        return (
          <p>{task.task_name}</p>
        )
      })} */}
    </div>
  )
}

export default ToDoList
