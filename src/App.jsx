import { BrowserRouter, Routes, Route } from "react-router-dom"
import { useEffect, useState, createContext } from "react";
import Header from "./components/Header/Header"
import Footer from "./components/Footer/Footer"
import Home from "./pages/Home/Home"
import NotFound from "./pages/NotFound"
import CalendarPage from "./pages/CalendarPage/CalendarPage.jsx"
import { useSession, useSupabaseClient, useSessionContext } from "@supabase/auth-helpers-react"
import * as React from 'react';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider/LocalizationProvider.js';

import axios from "axios"
import { Api } from "./api/Api.js"


export const TasksContext = createContext();


function App() {
  const api = new Api();
  const [allTasks, setAllTasks] = useState([]);

  const getAllTasks = async () => {
    const { data } = await api.getAllTasks();
    console.log(data)
    setAllTasks(data);
  }

  useEffect(() => {
    getAllTasks()
  }, [])

  const [start, setStart] = useState(new Date());
  const [end, setEnd] = useState(new Date());

  const [eventName, setEventName] = useState("");
  const [eventDescription, setEventDescription] = useState("");

  const session = useSession();
  const supabase = useSupabaseClient();
  const { isLoading } = useSessionContext();

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
  return (
    <TasksContext.Provider value={[allTasks, setAllTasks]}>


      <BrowserRouter>
        <LocalizationProvider dateAdapter={AdapterDayjs}>

          <Header />
          <div style={{ width: "400px", margin: "30px auto" }}>
            {session ?
              <>
                <h3>Hey there {session.user.email}</h3>
                <button onClick={() => googleSignOut()}>Sign Out</button>
              </>
              :
              <>
                <button onClick={() => googleSignIn()}>Sign In with Google</button>
              </>
            }
          </div>
          <Routes>
            <Route path="/" element={<Home allTasks={allTasks} />} />
            <Route path="/calendar" element={<CalendarPage allTasks={allTasks} />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
          <Footer />
        </LocalizationProvider>
      </BrowserRouter>

    </TasksContext.Provider>
  )
}

export default App
