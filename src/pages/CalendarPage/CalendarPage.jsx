import { useEffect , useContext} from 'react'
import Calendar from '../../components/Calendar/Calendar'
import { TasksContext } from "../../App";

function CalendarPage() {
    const {allTasks} = useContext(TasksContext);

    useEffect(() => {
        document.title = "MYTE - Calendar"
    }, [])
    return (
        <div>
            <Calendar allTasks={allTasks} />
        </div>
    )
}

export default CalendarPage
