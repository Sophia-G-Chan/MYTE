import './DeleteModal.scss';
import { useState, useContext, useEffect } from 'react';
import { TasksContext } from "../../App";
import { Api } from "../../api/Api.js"
import CloseIcon from '../../assets/icons/close.svg';
import DeleteIcon from '../../assets/icons/delete.svg';
import ReactModal from 'react-modal';

ReactModal.setAppElement('#root')

function DeleteModal({ id, task_name, list_name, isTask  }) {
    const [isOpen, setIsOpen] = useState(false);
    const { getAllTasks, getLists } = useContext(TasksContext);
    const api = new Api();

    const openModal = () => setIsOpen(true);
    const closeModal = () => setIsOpen(false);

    const deleteItem = async () => {
        try {
            if (isTask) {
                await api.deleteATask(id);
                await getAllTasks();
            } else {
                console.log('else is getting there')
                await api.deleteAList(id);
                await getLists();
            }
            setIsOpen(false)
        } catch (error) {
            console.error("Failed to delete task")
        }
    }

    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset'
        }

        return () => {
            document.body.style.overflow = 'unset'
        }
    }, [isOpen])
    return (
        <div className='w-full'>
            <img className='cursor-pointer delete-icon w-8' src={DeleteIcon} onClick={openModal} />
            <div className='delete-modal'>
                <ReactModal isOpen={isOpen} onRequestClose={closeModal} contentLabel='Delete Task Modal' shouldCloseOnOverlayClick={true} shouldCloseOnEsc={true} >
                    <div className='delete-modal__top text-center'>
                        <img src={CloseIcon} alt='x to represent close' className='cursor-pointer' onClick={() => closeModal()} />
                    </div>
                    <p className='delete-modal__title'>
                        Please confirm that you'd like to delete {task_name ? task_name : list_name} from your task list. <span>You won't be able to undo this action.</span>
                    </p>
                    <div className='delete-modal__buttons'>
                        <button className='delete-modal__cancel btn' onClick={closeModal}>Cancel</button>
                        <button className='delete-modal__delete btn' onClick={deleteItem}>Delete</button>
                    </div>
                </ReactModal>
            </div>
        </div>
    )
}

export default DeleteModal
