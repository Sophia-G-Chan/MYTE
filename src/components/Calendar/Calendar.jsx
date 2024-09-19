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

	useEffect(() => {
		const transformTasks = allTasks?.map(task => ({
			title: task.task_name,
			start: new Date(task.start_date_and_time),
			end: new Date(task.end_date_and_time)
		}));
		setAllEvents(transformTasks);
	}, [allTasks])


	return (
		<div className='rounded mt-5 mb-10'>
			<DnDCalendar
				localizer={localizer}
				events={allEvents}
				startAccessor='start'
				endAccessor="end"
				view={defaultView}
				onView={(newView) => setDefaultView(newView)}
				style={{ height: 500, margin: "50px" }} />
		</div>
	)
}

export default CalendarComponent
