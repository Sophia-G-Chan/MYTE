import { Calendar, dateFnsLocalizer } from 'react-big-calendar';
import { editTask } from "../../utils/taskUtils";
import withDragAndDrop from 'react-big-calendar/lib/addons/dragAndDrop'
import 'react-big-calendar/lib/addons/dragAndDrop/styles.css'
import format from 'date-fns/format';
import parse from 'date-fns/parse';
import { startOfWeek } from 'date-fns/startOfWeek';
import getDay from 'date-fns/getDay';
import { useEffect, useState, useContext } from 'react';
import enUS from 'date-fns/locale/en-US'
import './Calendar.scss'
import 'react-datetime-picker/dist/DateTimePicker.css';
import 'react-calendar/dist/Calendar.css';
import 'react-clock/dist/Clock.css';
import { TasksContext } from "../../App";
import { Api } from "../../api/Api"

const DnDCalendar = withDragAndDrop(Calendar);

const locales = {
	'en-US': enUS,
}

const localizer = dateFnsLocalizer({
	format,
	parse,
	startOfWeek,
	getDay,
	locales
})

function CalendarComponent() {
	const api = new Api();
	const { defaultView, setDefaultView, allTasks, setAllTasks } = useContext(TasksContext)
	const [allEvents, setAllEvents] = useState([]);
	const storedCalendarData = localStorage.getItem('calendarData');

	useEffect(() => {
		const transformTasks = allTasks?.map((task) => ({
			id: task.task_id,
			title: task.task_name,
			start: new Date(task.start_date_and_time),
			end: new Date(task.end_date_and_time),
			type: 'task',
		}));

		if (storedCalendarData) {
			const parsedData = JSON.parse(storedCalendarData);
			console.log(parsedData)

			const transformGoogleEvents = parsedData?.filter(event => event.status === 'confirmed').map(event => (
				({
					title: event.summary,
					start: new Date(event.start.dateTime || event.start.date),
					end: new Date(event.end.dateTime || event.end.date),
					allDay: !event.start.dateTime,
					type: 'calendar'
				})
			))
			const combinedEvents = [...transformTasks, ...transformGoogleEvents]
			setAllEvents(combinedEvents);
		} else {
			setAllEvents(transformTasks);
		}
	}, [allTasks])

	const handleEventChange = async ({ event, start, end }) => {
		const updatedEvent = { ...event, start, end };
		const updatedEvents = allEvents.map(item => {
			if (item.id === event.id) {
				return updatedEvent
			}
			return item;
		})
		setAllEvents(updatedEvents)

		const taskToEdit = allTasks.find(task => task.task_id === event.id);
		if (taskToEdit) {
			const updatedTaskData = {
				...taskToEdit,
				start_date_and_time: start.toISOString(),
				end_date_and_time: end.toISOString(),
			}
			try {
				await api.editATask(taskToEdit.task_id, updatedTaskData);
			} catch (error) {
				console.error("Error updating drag and drop event")
			}
		}
	}

	return (
		<div className='rounded m-5 mb-16 custom-calendar'>
			<DnDCalendar
				localizer={localizer}
				events={allEvents}
				startAccessor='start'
				endAccessor="end"
				view={defaultView}
				onView={(newView) => setDefaultView(newView)}
				resizable
				onEventDrop={handleEventChange}
				onEventResize={handleEventChange}
				eventPropGetter={(event) => {
					let customStyle = {
						backgroundColor: event.type === 'task' ? 'lightblue' : 'var(--button-color)',
						color: "white",
						borderRadius: '.25rem',
						border: 'none',
						marginLeft: '0.25rem',
					};
					return {
						className: '',
						style: customStyle
					};
				}} />
		</div>
	)
}

export default CalendarComponent
