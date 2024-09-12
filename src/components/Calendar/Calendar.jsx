import ReactCalendar from 'react-calendar';
import { Calendar, dateFnsLocalizer } from 'react-big-calendar';
import format from 'date-fns/format';
import parse from 'date-fns/parse';
import { startOfWeek } from 'date-fns/startOfWeek';
import getDay from 'date-fns/getDay';
import { useState } from 'react';
import DatePicker from 'react-datepicker';
import enUS from 'date-fns/locale/en-US'
import toastCalendar from '@toast-ui/calendar'
import '@toast-ui/calendar/dist/toastui-calendar.min.css'
import './Calendar.scss'

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

const events = [
  {
    title: "big project",
    allDay: true,
    start: new Date(2024,9,11),
    end: new Date(2024,9,22)
  },
  {
    title: "test",
    start: new Date(2024,9,13),
    end: new Date(2024,9,13)
  }
]
console.log(events)

function CalendarComponent() {
  const [newEvent, setNewEvent] = useState({ title: "", start: "", end: "" });
  const [allEvents, setAllEvents] = useState(events);

  const handleAddEvent = () => {
    setAllEvents([...allEvents, newEvent])
  }

  const calendar = new toastCalendar('#calendar', {
    defaultView: 'week',
    template: {
      time(event) {
        const { start, end, title } = event;

        return `<span style="color: white;">${formatTime(start)}~${formatTime(end)} ${title}</span>`;
      },
      allday(event) {
        return `<span style="color: gray;">${event.title}</span>`;
      },
    },
    calendars: [
      {
        id: 'cal1',
        name: 'Personal',
        backgroundColor: '#03bd9e',
      },
      {
        id: 'cal2',
        name: 'Work',
        backgroundColor: '#00a9ff',
      },
    ],
  });
  return (
    <div className='rounded border-2 border-blue'>
      {/* <h1>Calendar Component</h1>
      <ReactCalendar />
      <div className='custom-css'>


      </div> */}

      <Calendar localizer={localizer} events={events} startAccessor='start' endAccessor="end" style={{ height: 500, margin: "50px" }} />
    </div>
  )
}

export default CalendarComponent
