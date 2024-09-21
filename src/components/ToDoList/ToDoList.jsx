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
		status: false,
		listId: null
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
		<div className="box-border mt-6 mb-20 w-full">
			<form>
				<input type="text" placeholder="List Name"></input>
			</form>

			<form className='custom-form ml-5 mb-3 mr-5 tablet:flex tablet:item-between tablet:justify-center tablet:gap-2 tablet:mx-0' ref={formRef} key="form">
				<input
					type='text'
					name="task_name"
					value={newTask.task_name}
					placeholder="Task Name"
					onChange={handleNewTaskInputChange}
					className="w-36 h-10 p-4">
				</input>
				<textarea
					name="description"
					value={newTask.description}
					placeholder="Description"
					onChange={handleNewTaskInputChange}
					className="w-full tablet:w-52 p-4 grow border-0 rounded h-auto mt-2 resize-none custom-textarea">
				</textarea>
				<label className=' custom-label'>
					Start
				</label>
				<DateTimePicker className='custom-date-picker' disableClock={false} selected={startDate || null} onChange={setStartDate} />
				<label className='custom-label'>
					End
				</label>
				<DateTimePicker selected={endDate || null} onChange={setEndDate} />
				<button onClick={handleSubmit} className="w-10 min-w-10 rounded-full h-10  mx-2 custom-button animation-up">
					<img className="w-10 h-10 " src={addIcon} />
				</button>
			</form>
			<div className="flex gap-28 ml-10 custom-title">
				<h2>Task</h2>
				<h2>Description</h2>
				<h2 className="ml-32">Start</h2>
				<h2>End</h2>
			</div>
			<ul className="w-full">
				{filteredTasks?.map((task) => {
					if (!task) return null;

					const startDate = task.start_date_and_time ? dayjs(task.start_date_and_time) : null;
					const endDate = task.end_date_and_time ? dayjs(task.end_date_and_time) : null;

					return (
						<li key={`list_${task.task_id}`} className="flex items-start rounded p-2 mb-3 w-full odd:bg-slate-100  even:bg-white box-border tablet:p-0">
							<form className="flex p-2 tablet:items-center tablet:p-0 custom-form">
								<button>Priority</button>
								<div>
									<input type='checkbox' name="status" checked={task.status === "Complete"} onChange={(e) => handleCheck(task.task_id, e.target.checked, allTasks, setAllTasks)}
										className="custom-check">
									</input>
								</div>
								<div className="w-9/12 grow tablet:flex ">
									<input className="bg-inherit" type='text' name="task_name" value={task.task_name || ""} onChange={(e) => handleExistingInputChange(e, task.task_id)} ></input>
									<div className="flex flex-col my-2">
										<label htmlFor="description" className="pl-2 custom-label">Description: </label>
										<textarea className="bg-inherit border-0 resize-none custom-textarea " type='text' name="description" placeholder="Description" value={task.description || ""} onChange={(e) => handleExistingInputChange(e, task.task_id)}></textarea>
									</div>
									<div className="pl-2 flex items-center w-9/12">
										<label className="custom-label">Start:</label>
										<DateTimePicker
											value={startDate}
											onChange={(newValue) => setStartDate(newValue)}
										/>

										<label className="pl-4 custom-label">End:</label>
										<DateTimePicker
											value={endDate}
											onChange={(newValue) => setEndDate(newValue)}
										/>
									</div>
								</div>

								<div className="flex flex-col justify-start tablet:flex-row tablet:items-center tablet:justify-center gap-6 w-28" key={`bottom_${task.task_id}`} >
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
