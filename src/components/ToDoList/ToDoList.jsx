import { useContext, useEffect, useRef, useState } from "react";
import { Api } from "../../api/Api"
import { TasksContext } from "../../App";
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { editTask, handleCheck } from "../../utils/taskUtils";
import dayjs from "dayjs";
import DeleteModal from "../DeleteModal/DeleteModal";
import saveIcon from "../../assets/icons/save.svg"
import addIcon from '../../assets/icons/add.svg'
import './ToDoList.scss'

function ToDoList() {
	const formRef = useRef();
	const api = new Api();
	const { allTasks, setAllTasks, filteredTasks } = useContext(TasksContext);
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
							status: checked ? "Complete" : "In Progress"
						};
					} else {
						return { ...task, [name]: event.target.value }
					}
				}
				return task;
			})
		})
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
		<div className="box-border mt-6 mb-20">
			<form>
				<input type="text" placeholder="List Name"></input>
			</form>
			<div className="flex gap-32 ml-16">
				<h2>Task</h2>
				<h2>Start</h2>
				<h2>End</h2>
				<h2>Description</h2>
			</div>
			<form className='custom-form ml-5 mb-3' ref={formRef} key="form">
				<label className='h-1' htmlFor="task_name">
					Task
				</label>
				<input
					type='text'
					name="task_name"
					value={newTask.task_name}
					placeholder="Task Name"
					onChange={handleNewTaskInputChange}
					className="w-36 h-10 p-4">
				</input>
				<input
					type='text'
					name="description"
					value={newTask.description}
					placeholder="Description"
					onChange={handleNewTaskInputChange}
					className="w-full tablet:w-52 h-10 p-4">
				</input>
				<label className=' h-1 task__datetime'>
					Start
				</label>
				<DateTimePicker className='custom-date-picker' disableClock={false} selected={startDate || null} onChange={setStartDate} />
				<label className='h-1'>
					End
				</label>
				<DateTimePicker selected={endDate || null} onChange={setEndDate} />
				<label className='h-1 '>
					Description
				</label>
				<button onClick={handleSubmit} className="w-12 min-w-12 rounded-full h-12 px-2 mt-3 mr-1 custom-button animation-up">
					<img className="w-12 h-12 " src={addIcon} />
				</button>
			</form>
			<ul>
				{filteredTasks?.map((task) => {
					if (!task) return null;

					const startDate = task.start_date_and_time ? dayjs(task.start_date_and_time) : null;
					const endDate = task.end_date_and_time ? dayjs(task.end_date_and_time) : null;

					return (
						<li key={`list_${task.task_id}`} className="flex items-center rounded mb-3 w-full odd:bg-slate-100  even:bg-white ">
							<form className="flex items-center justify-center custom-form">
								<input type='checkbox' name="status" checked={task.status === "Complete"} onChange={(e) => handleCheck(task.task_id, e.target.checked, allTasks, setAllTasks)}
									className="custom-check"></input>
								<input className="bg-inherit" type='text' name="task_name" value={task.task_name || ""} onChange={(e) => handleExistingInputChange(e, task.task_id)} ></input>

								<input className="bg-inherit " type='text' name="description" placeholder="Description" value={task.description || ""} onChange={(e) => handleExistingInputChange(e, task.task_id)}></input>
								<div>
									<DateTimePicker
										value={startDate}
										onChange={(newValue) => setStartDate(newValue)}
									/>
									<DateTimePicker
										value={endDate}
										onChange={(newValue) => setEndDate(newValue)}
									/>
								</div>

								<div className="flex justify-center items-center w-28" key={`bottom_${task.task_id}`} >
									<div className="w-full">
										<img src={saveIcon} alt='save icon' onClick={() => editTask(task.task_id, allTasks, setAllTasks)} className="cursor-pointer filter save-effect save-icon w-8" />
									</div>
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
