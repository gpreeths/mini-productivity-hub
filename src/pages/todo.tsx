import React, { useEffect, useState } from 'react'
import { TodoNavbar } from '../../components/Navbar'

const Todo=()=> {
    const [taskInput,setTaskInput]=useState('')

    type Task={
        text: string,
        completed:boolean
    }
    const[tasks,setTasks]=useState<Task[]>([]);


    // string[] ---generic type annotation in TypeScript.
    // It tells TypeScript that tasks will be an array of strings

    useEffect(()=>{
        const stored=localStorage.getItem('tasks')
        if(stored){
            setTasks(JSON.parse(stored))
        }
    },[])
 useEffect(()=>{
localStorage.setItem('tasks',JSON.stringify(tasks))
 },[tasks])

    const handleAddTask=()=>{
        if(taskInput.trim()==='')return;

        // guard clause to prevent empty tasks from being added.
        // .trim() removes whitespace from both ends of the string.
const newTask:Task={
    text:taskInput.trim(),
    completed:false
}
            setTasks(prevTasks=>[...prevTasks,newTask])
            setTaskInput('')
        
    }

    const handleDeleteTask=(indexToBeDeleted:number)=>{
const updatedTasks = tasks.filter((_, index) => index !== indexToBeDeleted);
setTasks(updatedTasks)
    }
    const handleCheckBox=(indexToBeChecked:number)=>{
const presentTasks=[...tasks]
presentTasks[indexToBeChecked].completed=!presentTasks[indexToBeChecked].completed;
setTasks(presentTasks)
    }
  return (
    <>
    <TodoNavbar/>
    <div className='todomaincontainer'>
        <h1>My Tasks</h1>
        <div className='addtask'>
            <input type="text" 
            value={taskInput}
            onChange={(e)=>setTaskInput(e.target.value)}
            placeholder='Add a task..'/>
            <button onClick={handleAddTask}>Add</button>
        </div>
        <div className='tasklist'>
            <ul>
                {tasks.map((task, index) => (
              <li key={index}>
                <span className={task.completed?'completed-task':''}>{task.text}</span>
                <div className={`checkbox ${task.completed?'checked':''}`} onClick={()=>handleCheckBox(index)}></div>
                <button onClick={()=>handleDeleteTask(index)}>Delete</button>
                
              </li>
            ))}
                
            </ul>
        </div>
    </div>
    </>
  )
}

export default Todo