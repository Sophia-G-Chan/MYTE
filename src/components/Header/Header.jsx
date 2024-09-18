import { Link } from 'react-router-dom'
import './Header.scss'
import calendarIcon from '../../assets/icons/calendar_month.svg'
import taskIcon from '../../assets/icons/task.svg'

function Header() {
	return (
		<header className='custom-header'>
			<div className='flex items-center '>
				<img src="/assets/logos/journeytask-logo.svg" className='w-20 h-20' />
				<h2 className=' text-3xl'>JourneyTask</h2>
			</div>
			<nav className='flex'>
				<ul className='flex'>
					<li className='p-2 '>
						<Link to='/calendar' className='flex items-center'>
							<img src={calendarIcon} alt="icon image of calendar" className='icon'/>
							Calendar
						</Link>
					</li>
					<li className='p-2'>
						<Link to='/' className='flex items-center'>
							<img src={taskIcon} alt="icon image of calendar" className='icon' />
							To Do List
						</Link>
					</li>
				</ul>
			</nav>

		</header>
	)
}

export default Header
