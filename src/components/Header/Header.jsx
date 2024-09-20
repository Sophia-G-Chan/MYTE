import { Link } from 'react-router-dom'
import { TasksContext } from "../../App";
import { useContext, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import './Header.scss'
import calendarIcon from '../../assets/icons/calendar_month.svg'
import taskIcon from '../../assets/icons/task.svg'
import { useSession, useSupabaseClient, useSessionContext } from "@supabase/auth-helpers-react"
import axios from "axios"
import aboutIcon from '../../assets/icons/info.svg'

function Header() {
	const navigate = useNavigate();
	const {setDefaultView} = useContext(TasksContext)
	const session = useSession();
	const supabase = useSupabaseClient();
	const { isLoading } = useSessionContext();
	const { setFilterType } = useContext(TasksContext);

	useEffect(() => {
		if(session){
			const accessToken = session.provider_token;
			if (accessToken) {
				fetchCalendarEvents(accessToken)
			}
		}
	}, [session])

	const fetchCalendarEvents = async (accessToken) => {
		const response = await axios.get(
			'https://www.googleapis.com/calendar/v3/calendars/primary/events',
			{
				headers: {
					Authorization: `Bearer ${accessToken}`,
				},
			}
		);
		console.log(response);
	};

	const googleSignIn = async () => {
		const { data, error } = await supabase.auth.signInWithOAuth({
			provider: "google",
			options: {
				scopes: "https://www.googleapis.com/auth/calendar https://www.googleapis.com/auth/calendar.readonly",
				redirectTo: window.location.origin
			}
		});

		if (error) {
			alert('Error logging in with Google provider with Supabase')
			console.log(error)
		} else {
			const accessToken = data?.provider_token;
			if (accessToken) {
				fetchCalendarEvents(accessToken)
			}
		}
	}

	const googleSignOut = async () => {
		await supabase.auth.signOut();
	}

	const handleAllTasksClick = () => {
		setFilterType("All")
		setDefaultView("month")
		navigate('/')
	}

	if (isLoading) {
		return <></>
	}
	return (
		<header className='custom-header '>
			<Link to='/' className='flex items-center '>
				<img src="/assets/logos/journeytask-logo.svg" className='w-20 h-20' />
				<h2 className=' text-3xl'>MYTE</h2>
			</Link>
			<nav className='flex'>
				<ul className='flex gap-4 w-full items-end'>
					<li className='p-2 flex '>
						<Link to='/calendar' className='flex items-center justify-end animation-up custom-shadow'>
							<img src={calendarIcon} alt="icon image of calendar" className='icon' />
							<span className='hidden tablet:block'>Calendar</span>
						</Link>
					</li>
					<li className='p-2 flex cursor-pointer'>
						<a onClick={handleAllTasksClick} className='flex items-center justify-end animation-up custom-shadow'>
							<img src={taskIcon} alt="icon image of calendar" className='icon' />
							<span className='hidden tablet:block'>All Tasks</span>
						</a>
					</li>
					<li className='p-2 flex justify-end '>
						<Link to='/about' className='flex items-center justify-end animation-up custom-shadow'>
							<img src={aboutIcon} alt="icon of i to signify information when clicking here" className='icon custom-shadow' />
							<span className='hidden tablet:block'>About</span>
						</Link>
					</li>
					<li className='flex items-center'>
						{session ?
							<div className='flex flex-col items-center w-281' >
								<img className="rounded-full w-8 h-8" src={session?.user.user_metadata.picture} />
								<button onClick={() => googleSignOut()}>Sign Out</button>
							</div>
							:
							<>
								<button onClick={() => googleSignIn()}>Sign In</button>
							</>
						}
						{/* <button
						onClick={(e) => handleItemClick(e, 'sign-in')}>
						sign-in
					</button>
					<button
						onClick={(e) => handleItemClick(e, 'sign-out')}>
						sign-out
					</button> */}
					</li>
				</ul>
			</nav>

		</header>
	)
}

export default Header
