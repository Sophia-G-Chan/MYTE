import todayIcon from '../../assets/icons/calendar_today.svg'

function Aside() {
    return (
        <aside className='w-52 bg-slate-100'>
            <section>
                <button className='flex'>
                    <img src={todayIcon} alt="calendar icon for today" />
                    Filter by Today
                    </button>
                <button>Filter by next 7 days</button>
            </section>
            <section>
                <h3>Lists</h3>
                {/* TODO: load the goal data and map it here there should be an empty list for the current goal */}
            </section>

        </aside>
    )
}

export default Aside
