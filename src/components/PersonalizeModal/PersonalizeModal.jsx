import { useState, useContext, useEffect } from 'react';
import { TasksContext } from '../../App';
import editIcon from '../../assets/icons/edit.svg'
import lightIcon from '../../assets/icons/light_mode.svg'
import darkIcon from '../../assets/icons/dark_mode.svg'
import backIcon from '../../assets/icons/arrow_back.svg';
import ReactModal from 'react-modal';
import './PersonalizeModal.scss'

function PersonalizeModal() {
    const [personalizeIsOpen, setPersonalizeIsOpen] = useState(false);
    const { theme, setTheme } = useContext(TasksContext);
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
            <button className='mr-4 h-full justify-center items-center w-16 tablet:w-full flex bg-teal-100 tablet:my-4 custom-aside__button personalize-btn '
                onClick={openModal}>
                <img src={editIcon} alt="done icon" className='icon' />
                <span className='hidden tablet:block'>Personalize</span>
            </button>
            <ReactModal
                isOpen={personalizeIsOpen}
                onRequestClose={closeModal}
                contentLabel='Personalize Modal'
                shouldCloseOnOverlayClick={true}
                shouldCloseOnEsc={true}
                className={`personalize-modal ${personalizeIsOpen ? 'personalize-modal--open' : ''}`}
                overlayClassName='personalize-modal__overlay  ReactModal__Overlay ReactModal__Overlay--after-open'
            >
                <div className='h-full flex flex-col justify-between'>
                    <div className='delete-modal__top text-center ' onClick={() => closeModal()}>
                        <img src={backIcon} alt='x to represent close' className='cursor-pointer' />
                    </div>
                    <div className='dark-light-toggle grow p-4'>
                        <div className={`dark-light-toggle__container${theme === 'light' ? '' : '--hide'}`}>
                            <p>Dark mode:</p>
                            <img
                                className={` cursor-pointer icon`}
                                title='Click here to change to dark mode'
                                alt='Sun for light mode, click the sun to change the theme'
                                src={lightIcon}
                                onClick={() => setTheme('dark')} />
                        </div>
                        <div className={`dark-light-toggle__container${theme === 'dark' ? '' : '--hide'}`}>
                            <p>Light mode:</p>
                            <img
                                className={`cursor-pointer icon`}
                                title='Click here to change to dark mode'
                                alt='Moon for dark mode, click the moon to change the theme'
                                src={darkIcon}
                                onClick={() => setTheme('light')} />
                        </div>
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
