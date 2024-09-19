import { useContext, useState, useEffect } from 'react'
import { TasksContext } from "../../App";
import { Api } from "../../api/Api"
import todayIcon from '../../assets/icons/calendar_today.svg'
import sevenDayIcon from '../../assets/icons/date_range.svg'
import listIcon from '../../assets/icons/list.svg'
import doneIcon from '../../assets/icons/done_all.svg'
import editIcon from '../../assets/icons/edit.svg'
import './Aside.scss';

function Aside() {
    const { allTasks, setFilteredTasks, filterType, setFilterType } = useContext(TasksContext);
    const [lists, setLists] = useState([]);
    const [showList, setShowList] = useState(true)
    const api = new Api();

    const filterTasks = (allTasks, filterType) => {
        const today = new Date();
        const next7Days = new Date(today.getTime() + 7 * 24 * 60 * 60 * 1000);

        switch (filterType) {
            case "Today":
                return allTasks.filter((task) => new Date(task.start_date_and_time).toDateString() === today.toDateString());
            case "Next7Days":
                return allTasks.filter((task) => new Date(task.start_date_and_time) <= next7Days && new Date(task.start_date_and_time) > today);
            case "Complete":
                return allTasks.filter(task => task.status === "Complete")
            default:
                return allTasks.filter(task => task.status !== "Complete");
        }

    }

    const toggleList = () => {
        setShowList(!showList);
    }
    const getLists = async () => {
        const { data } = await api.getLists();
        setLists(data);
    }

    useEffect(() => {
        getLists()
    }, [])

    useEffect(() => {
        setFilteredTasks(filterTasks(allTasks, filterType));
    }, [filterType, allTasks])

    return (
        <aside className='custom-aside'>
            <section className='custom-aside__section mb-3 border-solid border-b-2 border-border-grey'>
                <button className='flex my-4' onClick={() => setFilterType("Today")}>
                    <img src={todayIcon} alt="calendar icon for today" className='icon' />
                    Today
                </button>
                <button className='flex my-4' onClick={() => setFilterType("Next7Days")}>
                    <img src={sevenDayIcon} alt="calendar icon for date range of 7 days" className='icon' />
                    Next 7 days
                </button>
            </section>
            <section className='custom-aside__section '>
                <button className='flex' onClick={toggleList}>
                    <img src={listIcon} alt="list icon" className='icon' />
                    Lists
                </button>
                <form>
                    <ul className={` ${showList ? "flex flex-col" : "hidden"}`}>
                        {lists.map((listItem) => {
                            return (
                                <li className='my-1.5 ml-4 flex items-center'>
                                    <input type="checkbox" className='border-solid border-2 border-border-grey rounded mx-2'></input>
                                    {listItem.list_name}</li>
                            )
                        })}
                    </ul>
                </form>
                <button className='flex my-5' onClick={() => setFilterType("Complete")}>
                    <img src={doneIcon} alt="done icon" className='icon' />
                    Completed
                </button>
                <button className='flex my-4'>
                    <img src={editIcon} alt="done icon" className='icon' />
                    Personalize
                </button>
            </section>
        </aside>
    )
}

export default Aside
