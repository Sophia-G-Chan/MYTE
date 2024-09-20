import { Calendar, dateFnsLocalizer } from 'react-big-calendar';
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


function CalendarComponent({ allTasks }) {
	const { defaultView, setDefaultView } = useContext(TasksContext)
	const [allEvents, setAllEvents] = useState([]);
	const [googleEvents, setGoogleEvents] = useState([])
	const storedCalendarData = localStorage.getItem('calendarData');


	useEffect(() => {
		const transformTasks = allTasks?.map(task => ({
			title: task.task_name,
			start: new Date(task.start_date_and_time),
			end: new Date(task.end_date_and_time)
		}));
		setAllEvents(transformTasks);

		if (storedCalendarData) {
			const parsedData= JSON.parse(storedCalendarData);
			console.log(parsedData)

			const transformGoogleEvents = parsedData?.filter(event => event.status === 'confirmed').map(event => (
				({
					title: event.summary,
					start: new Date(event.start.dateTime || event.start.date ),
					end: new Date(event.end.dateTime || event.end.date),
					allDay: !event.start.dateTime,
				})
			))
			setGoogleEvents(transformGoogleEvents)
		}
	}, [allTasks])


	return (
		<div className='rounded mt-5 mb-10'>
			<DnDCalendar
				localizer={localizer}
				events={googleEvents}
				startAccessor='start'
				endAccessor="end"
				view={defaultView}
				onView={(newView) => setDefaultView(newView)}
				style={{ height: 500, margin: "50px" }} />
		</div>
	)
}

export default CalendarComponent
