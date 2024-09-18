import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { createClient } from "@supabase/supabase-js"
import { SessionContextProvider } from "@supabase/auth-helpers-react"

const supabase = createClient(
  "https://ghwfpbrvrpswbniwceta.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imdod2ZwYnJ2cnBzd2JuaXdjZXRhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjYwODYzMjYsImV4cCI6MjA0MTY2MjMyNn0.KAD4L0LDSzqbItLCgN__uJakqRpBLjZFetmutc_gr4o"
)

createRoot(document.getElementById('root')).render(
  <SessionContextProvider supabaseClient={supabase}>
  <StrictMode>
    <App />
  </StrictMode>
  </SessionContextProvider>,
)
