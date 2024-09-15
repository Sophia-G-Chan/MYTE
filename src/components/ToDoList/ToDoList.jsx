import { useContext, useRef, useState } from "react";
import { Api } from "../../api/Api"
import DateTimePicker from 'react-datetime-picker';
import { TasksContext } from "../../App";

function ToDoList() {
  const formRef = useRef();
  const [allTasks, setAllTasks] = useContext(TasksContext);

  const handleAddChange = (event) => {
    event.preventDefault();
    console.log("button has been clicked")
    setAllTasks();
  }


  return (
    <div>
      <form className='flex min-h-auto' ref={formRef}>
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
          <DateTimePicker disableClock={false} placeholderText='Start Date' style={{ marginRight: "10px" }} selected={newEvent.start} onChange={(start) => setNewEvent({ ...newEvent, start })} />
          <DateTimePicker placeholderText='End Date' style={{ marginRight: "10px" }} selected={newEvent.end} onChange={(end) => setNewEvent({ ...newEvent, end })} />
        </label>
        <label className='flex-col h-01'>
          End Date & Time
          <input type='text' placeholder="TEST 3"></input>
        </label>
        <label className='flex-col h-01 '>
          Description
          <input type='text' placeholder="TEST 3" className="grow"></input>
        </label>
        <button onClick={handleAddChange}>Add task</button>
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
