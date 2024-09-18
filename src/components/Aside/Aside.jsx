import todayIcon from '../../assets/icons/calendar_today.svg'
import sevenDayIcon from '../../assets/icons/date_range.svg'
import listIcon from '../../assets/icons/list.svg'
import doneIcon from '../../assets/icons/done_all.svg'
import editIcon from '../../assets/icons/edit.svg'
import './Aside.scss';

function Aside() {
    return (
        <aside className='custom-aside'>
            <section className='custom-aside__section'>
                <button className='flex'>
                    <img src={todayIcon} alt="calendar icon for today" className='icon' />
                    Today
                </button>
                <button className='flex'>
                    <img src={sevenDayIcon} alt="calendar icon for date range of 7 days" className='icon' />
                    Next 7 days
                </button>
            </section>
            <section>
                <button className='flex'>
                    <img src={listIcon} alt="list icon" className='icon' />
                    Lists
                </button>
                {/* TODO: load the goal data and map it here there should be an empty list for the current goal */}
                <button className='flex'>
                    <img src={doneIcon} alt="done icon" className='icon' />
                    Completed
                </button>
                <button className='flex'>
                    <img src={editIcon} alt="done icon" className='icon' />
                    Personalize
                </button>
            </section>
        </aside>
    )
}

export default Aside
