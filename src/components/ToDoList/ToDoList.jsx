import { useContext, useEffect, useRef, useState } from "react";
import { Api } from "../../api/Api"
import { TasksContext } from "../../App";
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import dayjs from "dayjs";
import DeleteModal from "../DeleteModal/DeleteModal";
import saveIcon from "../../assets/icons/save.svg"
import './ToDoList.scss'

function ToDoList() {
	const formRef = useRef();
	const api = new Api();
	const { allTasks, setAllTasks } = useContext(TasksContext);
	const [startDate, setStartDate] = useState(new Date())
	const [endDate, setEndDate] = useState(new Date())

	const [newTask, setNewTask] = useState({
		task_name: "",
		description: "",
		start: startDate,
		end: endDate,
		status: false
	})

	const handleNewTaskInputChange = (event) => {
		const { name, value, type, checked } = event.target;
		setNewTask((previousState) => ({
			...previousState,
			[name]: type === 'checkbox' ? checked : value,
		}))

	}

	const handleExistingInputChange = (event, taskId) => {
		const { name, type, checked } = event.target;
		setAllTasks((previousTasks) => {
			if (!previousTasks) return previousTasks;

			return previousTasks.map((task) => {
				if (task.task_id === taskId) {
					if (type === 'checkbox') {
						return {
							...task,
							status: checked ? "Completed" : "In Progress"
						};
					} else {
						return { ...task, [name]: event.target.value }
					}
				}
				return task;
			})
		})
	}

	const editTask = async (task_id) => {
		const taskToEdit = allTasks.find(task => task.task_id === task_id)
		if (!taskToEdit) return;

		const startDate = taskToEdit.start_date_and_time instanceof Date ? taskToEdit.start_date_and_time : new Date(taskToEdit.start_date_and_time);
		const endDate = taskToEdit.end_date_and_time instanceof Date ? taskToEdit.end_date_and_time : new Date(taskToEdit.end_date_and_time);

		const taskData = {
			user_id: 1,
			task_name: taskToEdit.task_name,
			description: taskToEdit.description,
			start_date_and_time: startDate.toISOString(),
			end_date_and_time: endDate.toISOString(),
			status: taskToEdit.status ? "Complete" : "In Progress"
		}

		try {
			const response = await api.editATask(task_id, taskData);
			setAllTasks(prevTasks => prevTasks.map(task => task.task_id === task_id ? response : task));

		} catch (error) {
			console.log('there is an error getting the POST api', error)
		}
	}

	const handleSubmit = async (event) => {
		event.preventDefault();

		const taskData = {
			user_id: 1,
			task_name: newTask.task_name,
			description: newTask.description || "",
			start_date_and_time: newTask.start ? newTask.start.toISOString() : null,
			end_date_and_time: newTask.end ? newTask.end.toISOString() : null,
			status: "In Progress"
		}
		try {
			const response = await api.addATask(taskData);
			setAllTasks(prevTasks => [...prevTasks, response]);
			setNewTask({
				task_name: "",
				description: "",
				start: null,
				end: null,
				status: false
			})

			setStartDate(null);
			setEndDate(null);

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
	}, [startDate, endDate])



	return (
		<div className="box-border">
			<form className='custom-form mb-3' ref={formRef} key="form">
				<label className='flex-col h-01 '>
					Complete
					<input
						type='checkbox'
						name="status"
						checked={newTask.status}
						onChange={handleNewTaskInputChange}>
					</input>
				</label>
				<label className='flex-col h-01' >
					Task
					<input
						type='text'
						name="task_name"
						value={newTask.task_name}
						placeholder="Task Name"
						onChange={handleNewTaskInputChange}>
					</input>
				</label>
				<label className='flex-col h-01 task__datetime'>
					Start Date & Time
					<DateTimePicker className='custom-date-picker' disableClock={false} selected={startDate || null} onChange={setStartDate} />

				</label>
				<label className='flex-col h-01'>
					End Date & Time
					<DateTimePicker selected={endDate || null} onChange={setEndDate} />
				</label>
				<label className='flex-col h-01 '>
					Description
					<input
						type='text'
						name="description"
						value={newTask.description}
						placeholder="Description"
						onChange={handleNewTaskInputChange}>
					</input>
				</label>
				<button onClick={handleSubmit}>Add task</button>
			</form>
			<ul>
				{allTasks?.map((task) => {
					if (!task) return null;

					const startDate = task.start_date_and_time ? dayjs(task.start_date_and_time) : null;
					const endDate = task.end_date_and_time ? dayjs(task.end_date_and_time) : null;

					return (
						<li className="bg-slate-100 rounded mb-3 w-full">
							<form key={`form_${task.task_id}`} className="flex items-center custom-form">
								<input type='checkbox' name="status" checked={task.status === "Completed"} onChange={(e) => handleExistingInputChange(e, task.task_id)}
									className="border-2 border-blue"></input>
								<input type='text' name="task_name" value={task.task_name || ""} onChange={(e) => handleExistingInputChange(e, task.task_id)} ></input>
								<DateTimePicker
									value={startDate}
									onChange={(newValue) => setStartDate(newValue)}
								/>
								<DateTimePicker
									value={endDate}
									onChange={(newValue) => setEndDate(newValue)}
								/><input type='text' name="description" value={task.description || ""} onChange={(e) => handleExistingInputChange(e, task.task_id)}></input>
								<div className="flex" key={`bottom_${task.task_id}`}>
									<img src={saveIcon} alt='save icon' onClick={() => editTask(task.task_id)} className="cursor-pointer icon" />
									<DeleteModal taskId={task.task_id} task_name={task.task_name} />
								</div>
							</form>
						</li>
					)
				})}
			</ul>



		</div>
	)
}

export default ToDoList
