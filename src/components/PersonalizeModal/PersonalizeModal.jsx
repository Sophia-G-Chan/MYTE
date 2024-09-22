import { useState, useContext, useEffect } from 'react';
import { TasksContext } from "../../App";
import { Api } from "../../api/Api.js"
import ReactModal from 'react-modal';

function PersonalizeModal() {
    const [isOpen, setIsOpen] = useState(false);
    const { getAllTasks, getLists } = useContext(TasksContext);
    const api = new Api();

    const openModal = () => setIsOpen(true);
    const closeModal = () => setIsOpen(false);

    return (
        <div>

        </div>
    )
}

export default PersonalizeModal
