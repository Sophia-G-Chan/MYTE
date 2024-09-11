
function ToDoList() {
  return (
    <div>
      <form className='flex'>
        <label className='flex-col'>
          Task
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
    </div>
  )
}

export default ToDoList
