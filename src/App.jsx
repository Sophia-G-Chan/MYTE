import { BrowserRouter, Routes, Route } from "react-router-dom"
import Header from "./components/Header/Header"
import Footer from "./components/Footer/Footer"
import Home from "./pages/Home/Home"
import NotFound from "./pages/NotFound"
import Calendar from "./components/Calendar/Calendar"
import { useSession, useSupabaseClient, useSessionContext } from "@supabase/auth-helpers-react"
import DateTimePicker from "react-datetime-picker"
import { useState } from 'react'
import axios from "axios"

function App() {
  const [start, setStart] = useState(new Date());
  const [end, setEnd] = useState(new Date());

  const [eventName, setEventName] = useState("");
  const [eventDescription, setEventDescription] = useState("");

  const session = useSession();

  console.log(session)
  const supabase = useSupabaseClient();
  const { isLoading } = useSessionContext();

  if (isLoading) {
    return <></>
  }

  const createCalendarEvent = async () => {
    console.log("creating calendar event");
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
      console.log(response.data)
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
console.log(start)
return (
  <>
    <div style={{ width: "400px", margin: "30px auto" }}>
      {session ?
        <>
          <h3>Hey there {session.user.email}</h3>
          <p>Start of your task</p>
          <div>

          <DateTimePicker style={{width: 'auto'}} onChange={setStart} value={start} />
          </div>
          <p>End date and time of your task</p>
          <DateTimePicker onChange={setEnd} value={end} />
          <p>Task</p>
          <input type='text' onChange={(event) => setEventName(event.target.value)} />
          <p>Description</p>
          <input type='text' onChange={(event) => setEventDescription(event.target.value)} />
          <br></br>
          <button onClick={() => createCalendarEvent()}> Create Calendar Event</button>
          <br></br>
          <button onClick={() => googleSignOut()}>Sign Out</button>
        </>
        :
        <>
          <button onClick={() => googleSignIn()}>Sign In with Google</button>
        </>
      }
    </div>
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/calendar" element={<Calendar />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
    </BrowserRouter>

  </>
)
}

export default App
