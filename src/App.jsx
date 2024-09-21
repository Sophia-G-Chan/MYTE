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
import { Api } from "./api/Api.js"
import AboutPage from './pages/AboutPage/AboutPage.jsx';

export const TasksContext = createContext();

function App() {
  const api = new Api();
  const [allTasks, setAllTasks] = useState([]);
  const [filteredTasks, setFilteredTasks] = useState([]);
  const [filterType, setFilterType] = useState('All')
  const [defaultView, setDefaultView] = useState('month');
  const [lists, setLists] = useState([]);
  const [selectedListId, setSelectedListId] = useState(null);
  const [listTasks, setlistTasks] = useState([]);

  const getLists = async () => {
    const { data } = await api.getLists();
    setLists(data);
  }

  const getAllTasks = async () => {
    const { data } = await api.getAllTasks();
    setAllTasks(data);
  }

  const getListTasks = async () => {
      const {data} = await api.getListTask();
      setlistTasks(data);
  }

  useEffect(() => {
    getLists();
    getAllTasks();
    getListTasks();
  }, [])

  return (
    <TasksContext.Provider value={{
      allTasks, setAllTasks,
      getAllTasks,
      filteredTasks, setFilteredTasks,
      filterType, setFilterType,
      defaultView, setDefaultView,
      lists, setLists,
      selectedListId, setSelectedListId,
      listTasks, setlistTasks}}>
      <ThemeProvider theme={fontTheme}>
        <BrowserRouter>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <Header />
            <Routes>
              <Route path="/" element={<Home allTasks={allTasks} />} />
              <Route path="/calendar" element={<CalendarPage />} />
              <Route path="/about" element={<AboutPage />} />
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
