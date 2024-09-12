import { BrowserRouter, Routes, Route } from "react-router-dom"
import Header from "./components/Header/Header"
import Footer from "./components/Footer/Footer"
import Home from "./pages/Home/Home"
import NotFound from "./pages/NotFound"
import Calendar from "./components/Calendar/Calendar"
import { useSession, useSupabaseClient, useSessionContext } from "@supabase/auth-helpers-react"
import DateTimePicker from "react-datetime-picker"
import {useState} from 'react'

function App() {
  const [start, setStart] = useState(new Date());
  const [end, setEnd ] = useState(new Date());

  const session = useSession();
  console.log(session)
  const supabase = useSupabaseClient();
  const {isLoading} = useSessionContext();

  if(isLoading){
    return <></>
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
            <DateTimePicker onChange={setStart} value={start} />
            <p>End date and time of your task</p>
            <DateTimePicker onChange={setEnd} value={end} />
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
