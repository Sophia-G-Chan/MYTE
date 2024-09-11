import ReactCalendar from 'react-calendar';
import {Calendar, dateFnsLocalizer} from 'react-big-calendar';
import format from 'date-fns/format';
import parse from 'date-fns/parse';
import { startOfWeek } from 'date-fns/startOfWeek';
import getDay from 'date-fns/getDay';
import {useState} from 'react';
import DatePicker from 'react-datepicker';
import enUS from 'date-fns/locale/en-US'

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
    end: new Date(2024, 9, 22)
  }
]
function CalendarComponent () {
  return (
    <div className='rounded border-2 border-blue'>
      <h1>Calendar Component</h1>
      <ReactCalendar />
      <div className='custom-css'>

      <Calendar localizer={localizer} events={events} startAccessor='start' endAccessor="end" style={{all: "unset", height: 500, margin:"50px"}}/>
      </div>
    </div>
  )
}

export default CalendarComponent
