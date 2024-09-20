
import { Api } from "../api/Api"
const api = new Api();

const handleCheck = async (taskId, allTasks, newStatus, setAllTasks) => {
    setAllTasks((prevTasks) => {
        return prevTasks.map(task => task.task_id === taskId ? { ...task, status: newStatus ? "Complete" : "In Progress" } : task)
    });
    try {
        const taskToEdit = allTasks.find(task => task.task_id === taskId)
        if (!taskToEdit) {
            return;
        } else {
            const updatedTask = {
                ...taskToEdit,
                status: newStatus ? "Complete" : "In Progress"
            }
            await api.editATask(taskId, updatedTask)
        }

    } catch (err) {
        console.error('Error updating task status', error)
    }
}

const editTask = async (task_id, allTasks, setAllTasks) => {
    const taskToEdit = allTasks.find(task => task.task_id === task_id)
    if (!taskToEdit) return;

    const startDate = taskToEdit.start_date_and_time instanceof Date ? taskToEdit.start_date_and_time : new Date(taskToEdit.start_date_and_time);
    const endDate = taskToEdit.end_date_and_time instanceof Date ? taskToEdit.end_date_and_time : new Date(taskToEdit.end_date_and_time);

    console.log("Start Date: ", startDate, "End Date: ", endDate);
    const taskData = {
        user_id: 1,
        task_name: taskToEdit.task_name,
        description: taskToEdit.description,
        start_date_and_time: startDate.toISOString(),
        end_date_and_time: endDate.toISOString(),
        status: taskToEdit.status ? "In Progress" : "Complete"
    }

    try {
        const response = await api.editATask(task_id, taskData);
        setAllTasks(prevTasks => prevTasks.map(task => task.task_id === task_id ? response : task));

    } catch (error) {
        console.log('there is an error getting the POST api', error)
    }
}

export{
    handleCheck,
    editTask
}
