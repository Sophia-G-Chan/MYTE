import { Link } from 'react-router-dom'
import './Header.scss'
import calendarIcon from '../../assets/icons/calendar_month.svg'

function Header() {
  return (
    <header className='flex border-b-2 border-neutral-700 items-center'>
      <img src="/assets/logos/journeytask-logo.svg" className='w-20 h-20 blue' />
      <h2 className='grow text-3xl'>JourneyTask</h2>
      <nav>
        <ul className='flex'>
          <li className='p-2'>
            <Link to='/calendar'>
              Calendar
            </Link>
          </li>
          <li className='p-2'>
            <Link to='/'>
              To Do List
            </Link>
          </li>
        </ul>

      </nav>

    </header>
  )
}

export default Header
