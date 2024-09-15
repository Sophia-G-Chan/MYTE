import { useContext, useRef, useState } from "react";
import { Api } from "../../api/Api"
import DateTimePicker from 'react-datetime-picker';
import { TasksContext } from "../../App";


function ToDoList() {
	const formRef = useRef();
	const api = new Api();
	const [allTasks, setAllTasks] = useContext(TasksContext);
	const [startDate, setStartDate] = useState(new Date())
	const [endDate, setEndDate] = useState(new Date())

	const [newTask, setNewTask] = useState({
		task_name: "",
		description: "",
		start: startDate,
		end: endDate,
		status: false
	})

	const handleInputChange = (event) => {
		const { name, value, type, checked } = event.target;
		setNewTask((previousState) => ({
			...previousState,
			[name]: type === 'checkbox' ? checked : value,
		}))
		console.log(newTask)
	}

	const handleSubmit = async (event) => {
		event.preventDefault();
		console.log("button has been clicked")

		const taskData = {
			user_id: 1,
			task_name: newTask.task_name,
			description: newTask.description,
			start_date_and_time: newTask.start.toISOString(),
			end_date_and_time: newTask.end.toISOString(),
			status: newTask.status ? "Complete" : "In Progress"
		}
		try {
			const { data } = await api.addATask(taskData);
			setAllTasks(data);
		} catch (error) {
			console.log('there is an error getting the POST api', error)
		}
	}

	return (
		<div>
			<form className='flex min-h-auto' ref={formRef}>
				<label className='flex-col h-01 '>
					Complete
					<input
						type='checkbox'
						name="status"
						checked={newTask.status}
						onChange={handleInputChange}>
					</input>
				</label>
				<label className='flex-col h-01' >
					Task
					<input
						type='text'
						name="task_name"
						value={newTask.task_name}
						placeholder="Task Name"
						onChange={handleInputChange}>
					</input>
				</label>
				<label className='flex-col h-01'>
					Start Date & Time
					<DateTimePicker disableClock={false} selected={newTask.start} onChange={setStartDate} />

				</label>
				<label className='flex-col h-01'>
					End Date & Time
					<DateTimePicker disableClock={false} selected={newTask.end} onChange={setEndDate} />
				</label>
				<label className='flex-col h-01 '>
					Description
					<input
						type='text'
						name="description"
						value={newTask.description}
						placeholder="Description"
						className="grow"
						onChange={handleInputChange}>
					</input>
				</label>
				<button onClick={handleSubmit}>Add task</button>
			</form>

			{allTasks?.map((task) => {
				return (
					<form>
						<input type='checkbox' ></input>
						<input type='text' key={task.task_id} value={task.task_name} onChange={() => console.log("TODO still")} ></input>
						<input type='text' key={task.start_date_and_time} value={task.start_date_and_time} onChange={() => console.log("TODO still")}></input>
						<input type='text' placeholder="need to add calculation to calculate duration"></input>
						<input type='text' key={task.description} value={task.description} onChange={() => console.log("TODO still")}></input>
					</form>
				)
			})}


		</div>
	)
}

export default ToDoList
