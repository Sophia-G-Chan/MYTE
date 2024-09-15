import './Header.scss'
import { Link } from 'react-router-dom'

function Header() {
  return (
    <header className='flex border-b-2 border-neutral-700'>
      <img src="/assets/logos/journeytask-logo.svg" className='w-10 h-10 blue' />
      <h2 className='grow'>JourneyTask</h2>
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
