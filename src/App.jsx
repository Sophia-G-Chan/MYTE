import './App.scss'
import { BrowserRouter, Routes, Route } from "react-router-dom"
import { useEffect, useState, createContext } from "react";
import Header from "./components/Header/Header"
import Footer from "./components/Footer/Footer"
import Home from "./pages/HomePage/HomePage.jsx"
import NotFound from "./pages/NotFound"
import CalendarPage from "./pages/CalendarPage/CalendarPage.jsx"
import * as React from 'react';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider/LocalizationProvider.js';
import { fontTheme } from "./utils/utility";
import { ThemeProvider } from "@mui/material";
import axios from "axios"
import { Api } from "./api/Api.js"
import AboutPage from './pages/AboutPage/AboutPage.jsx';

export const TasksContext = createContext();

function App() {
  const api = new Api();
  const [allTasks, setAllTasks] = useState([]);
  const [filteredTasks, setFilteredTasks] = useState([]);
  const [filterType, setFilterType] = useState('All')

  const getAllTasks = async () => {
    const { data } = await api.getAllTasks();
    setAllTasks(data);
  }

  useEffect(() => {
    getAllTasks()
  }, [])

  return (
    <TasksContext.Provider value={{ allTasks, setAllTasks, getAllTasks, filteredTasks, setFilteredTasks, filterType, setFilterType }}>
      <ThemeProvider theme={fontTheme}>
        <BrowserRouter>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <Header />
            <Routes>
              <Route path="/" element={<Home allTasks={allTasks} />} />
              <Route path="/calendar" element={<CalendarPage allTasks={allTasks} />} />
              <Route path="/about" element={<AboutPage/>} />
              <Route path="*" element={<NotFound />} />
            </Routes>
            <Footer />
          </LocalizationProvider>
        </BrowserRouter>
      </ThemeProvider>
    </TasksContext.Provider>
  )
}

export default App
