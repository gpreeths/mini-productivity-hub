import Link from 'next/link';
import React from 'react';
import {HomeNavbar} from '../../components/Navbar';

function HomePage() {
  return (
    <>
    <HomeNavbar/>
    <div className="maincontainerHomePage">
      <h1>Welcome to Mini Productivity Hub</h1>
      <p>
        Your all-in-one solution for streamlined productivity — manage tasks, focus with the Pomodoro technique, and jot down ideas effortlessly.
      </p>

      <div className="itemsHomePage">
             <div className="itemBlock">
          <div className="textContent">
            <h2>📝 To-Do List</h2>
            <p><strong>Organize your day</strong><br />
              Manage your tasks and stay on top of your priorities.</p>
            <Link href="/todo"><button>Go to To-Do List</button></Link>
          </div>
          <div className="imgBlock">
            <img src="/todo.jpg" alt="To-Do List" />
          </div>
        </div>

        
        <div className="itemBlock">
          <div className="textContent">
            <h2>⏱ Pomodoro Timer</h2>
            <p><strong>Boost your focus:</strong><br />
              Work in focused intervals with short breaks to maximize productivity.</p>
            <Link href="/pomodoro"><button>Go to Pomodoro Timer</button></Link>
          </div>
          <div className="imgBlock">
            <img src="/pomodoro.jpg" alt="Pomodoro Timer" />
          </div>
        </div>

      
        <div className="itemBlock">
          <div className="textContent">
            <h2>🗒️ Notes Pad</h2>
            <p><strong>Capture your ideas:</strong><br />
              Quickly jot down notes, ideas, and reminders.</p>
            <Link href="/notes"><button>Go to Notes Pad</button></Link>
          </div>
          <div className="imgBlock">
            <img src="/notes.jpg" alt="Notes Pad" />
          </div>
        </div>
      </div>
    </div>
    </>
  );
}

export default HomePage;
