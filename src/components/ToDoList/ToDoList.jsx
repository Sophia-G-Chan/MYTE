import { useContext, useEffect, useRef, useState } from "react";
import { Api } from "../../api/Api"
import { TasksContext } from "../../App";
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import DeleteModal from "../DeleteModal/DeleteModal";
import saveIcon from "../../assets/icons/save.svg"
import './ToDoList.scss'

function ToDoList() {
	const formRef = useRef();
	const api = new Api();
	const {allTasks, setAllTasks} = useContext(TasksContext);
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
	}

	const editTask = (task_id) => {
		console.log(`you want to edit ${task_id}`)
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
			status:  "In Progress"
		}
		console.log(taskData.start_date_and_time)
		console.log(taskData.end_date_and_time)
		try {
			const response  = await api.addATask(taskData);
			setAllTasks(prevTasks => [...prevTasks, response]);
			formRef.current.reset()
		} catch (error) {
			console.log('there is an error getting the POST api', error)
		}
	}

	useEffect(() => {
		setNewTask((previousState) => ({
			...previousState,
			start: startDate,
			end: endDate
		}))
	}, [allTasks, startDate, endDate])

	return (
		<div>
			<form className='flex min-h-auto' ref={formRef} key="form">
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
					<DateTimePicker className='custom-date-picker' disableClock={false} selected={startDate} onChange={setStartDate} />

				</label>
				<label className='flex-col h-01'>
					End Date & Time
					<DateTimePicker selected={endDate} onChange={setEndDate} />
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
					<form key={`form_${task.task_id}`}>
						<input type='checkbox' ></input>
						<input type='text' key={task.task_id} value={task.task_name} onChange={() => console.log("TODO still")} ></input>
						<input type='text' key={task.start_date_and_time} value={task.start_date_and_time} onChange={() => console.log("TODO still")}></input>
						<input type='text' placeholder="need to add calculation to calculate duration"></input>
						<input type='text' key={task.description} value={task.description} onChange={() => console.log("TODO still")}></input>
						<div>
							<img src={saveIcon} alt='save icon'  onClick={() => editTask(task.task_id)} />
							<DeleteModal key={`delete_${task.task_id}`} taskId={task.task_id} task_name={task.task_name} />
						</div>
					</form>
				)
			})}


		</div>
	)
}

export default ToDoList
