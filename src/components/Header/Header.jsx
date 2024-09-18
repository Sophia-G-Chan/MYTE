import { Link } from 'react-router-dom'
import { useState, ReactNode, SyntheticEvent } from "react";
import './Header.scss'
import calendarIcon from '../../assets/icons/calendar_month.svg'
import taskIcon from '../../assets/icons/task.svg'
import { useSession, useSupabaseClient, useSessionContext } from "@supabase/auth-helpers-react"
import axios from "axios"
import { Api } from "../../api/Api.js"
import ApiCalendar from 'react-google-calendar-api'


const config = {
	clientId: import.meta.env.VITE_CLIENT_ID,
	apiKey: import.meta.env.VITE_API_KEY,
	scope: "https://www.googleapis.com/auth/calendar",
	discoveryDocs: [
		"https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest",
	],
};

function Header() {
	const api = new Api();
	const [start, setStart] = useState(new Date());
	const [end, setEnd] = useState(new Date());
	const [eventName, setEventName] = useState("");
	const [eventDescription, setEventDescription] = useState("");
	const apiCalendar = new ApiCalendar(config)
	const session = useSession();
	const supabase = useSupabaseClient();
	const { isLoading } = useSessionContext();
	console.log(config.clientId)
	console.log(config.apiKey)
	console.log(import.meta.env.VITE_API_URL)
	if (isLoading) {
		return <></>
	}

	const createCalendarEvent = async () => {
		const event = {
			'summary': eventName,
			'description': eventDescription,
			'start': {
				'dateTime': start.toISOString(),
				'timeZone': Intl.DateTimeFormat().resolvedOptions().timeZone
			},
			'end': {
				'dateTime': end.toISOString(),
				'timeZone': Intl.DateTimeFormat().resolvedOptions().timeZone
			}
		}
		try {
			const response = await axios.post(`https://www.googleapis.com/calendar/v3/calendars/primary/events`, event,
				{
					headers: {
						'Authorization': "Bearer " + session.access_token,
						"Content-Type": "application/json"
					}
				},
			)
		} catch (error) {
			console.error("there was an error posting your task", error)
		}
	}
	const googleSignIn = async () => {
		const { error } = await supabase.auth.signInWithOAuth({
			provider: "google",
			options: {
				scopes: "https://www.googleapis.com/auth/calendar",

			}
		});
		if (error) {
			alert('Error logging in with Google provider with Supabase')
			console.log(error)
		}
	}

	const googleSignOut = async () => {
		await supabase.auth.signOut();
	}

    const handleItemClick = (event, name) => {
		if(name === 'sign-in') {
		apiCalendar.handleAuthClick()
	} else if (name === 'sign-out') {
		apiCalendar.handleSignoutClick();
	}
}

return (
	<header className='custom-header'>
		<Link to='/' className='flex items-center'>
			<img src="/assets/logos/journeytask-logo.svg" className='w-20 h-20' />
			<h2 className=' text-3xl'>JourneyTask</h2>
		</Link>
		<nav className='flex'>
			<ul className='flex gap-4'>
				<li className='p-2 '>
					<Link to='/calendar' className='flex items-center'>
						<img src={calendarIcon} alt="icon image of calendar" className='icon' />
						Calendar
					</Link>
				</li>
				<li className='p-2'>
					<Link to='/' className='flex items-center'>
						<img src={taskIcon} alt="icon image of calendar" className='icon' />
						To Do List
					</Link>
				</li>
				<li className='flex items-center'>
					{/* {session ?
						<>
							<h3>Hey there {session.user.email}</h3>
							<button onClick={() => googleSignOut()}>Sign Out</button>
						</>
						:
						<>
							<button onClick={() => googleSignIn()}>Sign In</button>
						</>
					} */}
					<button
						onClick={(e) => handleItemClick(e, 'sign-in')}>
						sign-in
					</button>
					<button
						onClick={(e) => handleItemClick(e, 'sign-out')}>
						sign-out
					</button>
				</li>
			</ul>
		</nav>

	</header>
)
}

export default Header
