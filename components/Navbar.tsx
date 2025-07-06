
import Link from 'next/link';
import React from 'react';
import TaskMaster from './TaskMaster';

const HomeNavbar = () => {
    return (
        <>
            <div className='menu'>
                <TaskMaster/>
                <nav className='nav'>
                    
                    <Link href="/todo" >📝 To-Do-List</Link>
                    <Link href="/pomodoro">⏱ Pomodoro Timer</Link>
                    <Link href="/notes">🗒️ Notes</Link>
                    <Link href='/'><img src="/profilepic.jpeg" alt="" /></Link>
                </nav>
            </div>
        </>
    );
};

const PomodoroNavbar=()=>{
    return(
        <>
            <div className='menu'>
                <TaskMaster/>
                <nav className='nav'>
                    <Link href="/" >🏠 Home</Link>
                    <Link href="/todo" >📝 To-Do-List</Link>
                    
                    <Link href="/notes">🗒️ Notes</Link>
                    <Link href='/'><img src="/profilepic.jpeg" alt="" /></Link>
                </nav>
            </div>
        </>
    )
}

const TodoNavbar=()=>{
    return(
        <>
        <div className='menu'>
               <TaskMaster/>
                <nav className='nav'>
                    <Link href="/" >🏠 Home</Link>
                    <Link href="/pomodoro">⏱ Pomodoro Timer</Link>
                    <Link href="/notes">🗒️ Notes</Link>
                    <Link href='/'><img src="/profilepic.jpeg" alt="" /></Link>
                </nav>
            </div>
        </>
    )
}

const NoteNavbar = () => {
    return (
        <>
        <div className='menu'>
            <TaskMaster/>
            
                <nav className='nav'>
                    
                    <Link href="/" >🏠 Home</Link>
                    <Link href="/pomodoro">⏱ Pomodoro Timer</Link>
                    <Link href="/notes">🗒️ Notes</Link>
                    <Link href='/'><img src="/profilepic.jpeg" alt="" /></Link>
                </nav>
            </div>
        </>
    );
};

export {HomeNavbar,PomodoroNavbar,TodoNavbar,NoteNavbar};
