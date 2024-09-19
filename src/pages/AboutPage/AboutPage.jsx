import logoInspo from '../../assets/images/logo_inspo.svg'

function AboutPage() {
    return (
        <div className='flex flex-col items-center m-10 h-lvh'>
            <h1 className='text-6xl'>MYTE</h1>
            <p className='text-base'> Manage Your Time Effectively</p>
            <ul>
                <li className='m-10 text-lg'>MYTE is a task management app that combines time planning with your to-do list. Unlike regular to-do lists, MYTE allows you to assign time estimates for tasks and seamlessly adds them to your calendar. The app emphasizes the importance of the process over the outcome, highlighting that every step is part of the journey.
                </li>
            </ul>

            <div className='m-10 text-lg flex '>
                <div>
                    <img src="/assets/logos/journeytask-logo.svg" className='w-28 h-28' />
                    <div  className='w-28 h-28 rounded-full relative'>
                        <img src={logoInspo} className=' w-full rounded-full' />
                    </div>

                </div>
                <div className='flex flex-col gap-6 m-4'>
                    <p>The logo is inspired from the Chinese characters for "Zhi Lu":</p>
                    <ul className='list-disc ml-6'>
                        <li>
                            "Zhi" (志): This character often means "will," "determination," or "aspiration," representing the focused intent to achieve something.
                        </li>
                        <li>
                            "Lu" (路): This character means "road" or "path," symbolizing the journey or process.
                        </li>
                    </ul>
                    <p>
                        Together, 志路 could imply a journey guided by determination and purpose, which symbolizes the idea of completing tasks with focus and intention.
                    </p>
                </div>

            </div>
        </div>
    )
}

export default AboutPage
