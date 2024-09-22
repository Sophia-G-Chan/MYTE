import { useEffect } from 'react'

function AboutPage() {
    useEffect(() => {
        document.title = "MYTE - About"
    }, [])

    return (
        <div className='flex flex-col items-center h-full w-full box-border'>
            <section className='flex flex-col items-center m-10 h-svh w-10/12 desktop:w-9/12'>
                <h1 className='text-6xl'>MYTE</h1>
                <p className='text-base'> Manage Your Time Effectively</p>
                <ul>
                    <li className='m-10 text-lg'>MYTE is a task management app that combines time planning with your to-do list. Unlike regular to-do lists, MYTE allows you to assign time estimates for tasks and seamlessly adds them to your calendar. The app emphasizes the importance of the process over the outcome, highlighting that every step is part of the journey.
                    </li>
                </ul>

                <img src="/assets/logos/journeytask-logo.svg" className='w-28 h-28 ' />
                <div className='m-10 text-lg flex '>

                    <div className='flex flex-col gap-6 m-4'>
                        <p>The logo is inspired from the Chinese characters for "Zhi Lu", which symbolizes the idea of completing tasks with focus and intention:</p>
                        <ul className='list-disc ml-6'>
                            <li>
                                "Zhi" (志): This character often means "will," "determination," or "aspiration," representing the focused intent to achieve something.
                            </li>
                            <li>
                                "Lu" (路): This character means "road" or "path," symbolizing the journey or process.
                            </li>
                        </ul>

                    </div>
                </div>

            </section>

        </div>
    )
}

export default AboutPage
