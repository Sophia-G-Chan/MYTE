import { useState, useContext, useEffect } from 'react';
import editIcon from '../../assets/icons/edit.svg'
import backIcon from '../../assets/icons/arrow_back.svg';
import ReactModal from 'react-modal';
import './PersonalizeModal.scss'

function PersonalizeModal() {
    const [personalizeIsOpen, setPersonalizeIsOpen] = useState(false);

    const openModal = () => {
        return (
            setPersonalizeIsOpen(true))
    };
    const closeModal = () => {
        setPersonalizeIsOpen(false);
    }

    useEffect(() => {

        return () => {
            document.body.style.overflow = 'unset'
        }
    }, [personalizeIsOpen])

    return (
        <div className='w-full '>
            <button className='tablet:w-full flex bg-teal-100 tablet:my-4 custom-aside__button '
                onClick={openModal}>
                <img src={editIcon} alt="done icon" className='icon' />
                <span className='hidden tablet:block'>Personalize</span>
            </button>
            <ReactModal
                isOpen={personalizeIsOpen}
                onRequestClose={closeModal}
                contentLabel='Personalize Modal'
                shouldCloseOnOverlayClick={false}
                shouldCloseOnEsc={true}
                className={`personalize-modal ${personalizeIsOpen ? 'personalize-modal--open': ''}`}
                overlayClassName='personalize-modal__overlay  ReactModal__Overlay ReactModal__Overlay--after-open'
            >
                <div className='h-full flex flex-col justify-between'>
                    <div className='delete-modal__top text-center ' onClick={() => closeModal()}>
                        <img src={backIcon} alt='x to represent close' className='cursor-pointer' />
                    </div>
                    <div className='delete-modal__buttons flex justify-evenly w-full tablet:justify-end'>
                        <button className='delete-item__cancel-btn btn' onClick={closeModal}>Cancel</button>

                    </div>
                </div>
            </ReactModal>
        </div>

    )
}

export default PersonalizeModal
