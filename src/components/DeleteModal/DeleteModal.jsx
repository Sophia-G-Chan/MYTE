import './DeleteModal.scss';
import { useState, useContext, useEffect } from 'react';
import { TasksContext } from "../../App";
import { Api } from "../../api/Api.js"
import CloseIcon from '../../assets/icons/close.svg';
import DeleteIcon from '../../assets/icons/delete.svg';
import ReactModal from 'react-modal';

ReactModal.setAppElement('#root')

function DeleteModal({ id, task_name, list_name, isTask }) {
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
                <ReactModal
                    isOpen={isOpen}
                    onRequestClose={closeModal}
                    contentLabel='Delete Task Modal'
                    shouldCloseOnOverlayClick={true}
                    shouldCloseOnEsc={true}
                    className='delete-item'
                    overlayClassName='delete-item__overlay ReactModal__Overlay ReactModal__Overlay--after-open'
                >
                    <div className='delete-modal__top text-center'>
                        <img src={CloseIcon} alt='x to represent close' className='cursor-pointer' onClick={() => closeModal()} />
                    </div>
                    <p className='delete-modal__title  pb-6 pt-8 text-lg'>
                        Please confirm that you'd like to delete "{task_name ? task_name : list_name}" from your {task_name ? "tasks" : "lists"}.
                    </p>
                    <p className='grow italic'>You won't be able to undo this action and this will be permanently deleted.</p>
                    <div className='delete-modal__buttons flex justify-evenly w-full tablet:justify-end'>
                        <button className='delete-item__cancel-btn btn' onClick={closeModal}>Cancel</button>
                        <button className='delete-item__delete-btn btn tablet:ml-4' onClick={deleteItem}>Delete</button>
                    </div>
                </ReactModal>
            </div>
        </div>
    )
}

export default DeleteModal
