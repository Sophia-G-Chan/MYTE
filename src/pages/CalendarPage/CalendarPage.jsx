import { useEffect , useContext} from 'react'
import Calendar from '../../components/Calendar/Calendar'
import { TasksContext } from "../../App";

function CalendarPage() {
    const [allTasks, setAllTasks] = useContext(TasksContext);

    useEffect(() => {
        document.title = "JourneyTask - Calendar"
    }, [])
    return (
        <div>
            <Calendar allTasks={allTasks} />
        </div>
    )
}

export default CalendarPage
