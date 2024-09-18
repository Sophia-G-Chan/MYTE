import './DeleteModal.scss';
import { useState, useContext, useEffect } from 'react';
import { TasksContext } from "../../App";
import { Api } from "../../api/Api.js"
import CloseIcon from '../../assets/icons/close.svg';
import DeleteIcon from '../../assets/icons/delete.svg';
import ReactModal from 'react-modal';

ReactModal.setAppElement('#root')

function DeleteModal({ taskId, task_name }) {
    const [isOpen, setIsOpen] = useState(false);
    const { setAllTasks, getAllTasks } = useContext(TasksContext);
    const api = new Api();

    const openModal = () => setIsOpen(true);

    const closeModal = () => setIsOpen(false);

    const deleteTask = async () => {
        try {
            await api.deleteATask(taskId);
            await getAllTasks();
            setIsOpen(false)
        } catch (error) {
            console.error("Failed to delete task")
        }
    }

    useEffect(() => {
        if (isOpen){
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset'
        }

        return () => {
            document.body.style.overflow = 'unset'
        }
    }, [isOpen])
    return (
        <div className='w-d'>
            <img className='cursor-pointer icon' src={DeleteIcon} onClick={openModal} />
            <div className='delete-modal'>
                <ReactModal isOpen={isOpen} onRequestClose={closeModal} contentLabel='Delete Task Modal' shouldCloseOnOverlayClick={true} shouldCloseOnEsc={true} >
                    <div className='delete-modal__top'>
                        <img src={CloseIcon} alt='x to represent close' className='cursor-pointer' onClick={() => closeModal()} />
                    </div>
                    <p className='delete-modal__title'>
                        Please confirm that you'd like to delete {task_name} from your task list. <span>You won't be able to undo this action.</span>
                    </p>
                    <div className='delete-modal__buttons'>
                        <button className='delete-modal__cancel btn' onClick={() => closeModal()}>Cancel</button>
                        <button className='delete-modal__delete btn' onClick={() => deleteTask()}>Delete</button>
                    </div>
                </ReactModal>
            </div>
        </div>
    )
}

export default DeleteModal
