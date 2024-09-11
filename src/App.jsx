import { BrowserRouter, Routes, Route } from "react-router-dom"
import Header from "./components/Header/Header"
import Footer from "./components/Footer/Footer"
import Home from "./pages/Home/Home"
import NotFound from "./pages/NotFound"
import Calendar from "./components/Calendar/Calendar"


function App() {


  return (
    <>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/calendar" element={<Calendar/>}/>
          <Route path="*" element={<NotFound/>}/>
        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  )
}

export default App
