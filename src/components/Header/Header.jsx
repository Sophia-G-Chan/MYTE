import { Link } from 'react-router-dom'
import './Header.scss'
import logo from '../../../public/assets/logos/journeytask-logo.svg'
// import calendarIcon from '../../assets/icons/'

function Header() {
  return (
    <header className='flex border-b-2 border-neutral-700'>
      <Link to='/' className='flex grow items-center'>
        <img src={logo} className='w-10 h-10 blue' />
        <h2 className='align-middle'>JourneyTask</h2>
      </Link>

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
