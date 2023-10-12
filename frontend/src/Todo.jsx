import React, { useState } from 'react'
import "./Todo.css"
import ViewTodo from './ViewTodo';
import { Link } from 'react-router-dom';
function Todo() {

    const [event,setEvent] = useState("");
    const [detail,setDetail] = useState("");
    const [completed,setCompleted] = useState(false);
    const [data,setData] = useState({});
    const [isSubmit,setIsSubmit] = useState(false);

    

    // Function to handle submit
    const handleSubmit = (e) => {
        e.preventDefault();
        setData({...data, ["event"]:event, ["detail"]: detail, ["completed"]:completed});
        setIsSubmit(!isSubmit);
        // console.log("Todo Event : ",todoEvent);
    }
  return (
    <>
    
    <div className='todo-form'>
        
        <input type='text' name='event' placeholder='Event' onChange={ (e) => {
            let temp = e.target.value;
            setEvent(temp);
        }}/>
        <br/><br/>
        <input type='text' name='detail' placeholder='Description' onChange={ (e) => {
            let temp = e.target.value;
            setDetail(temp);
        }}/>
        <br/><br/>
        <input type='checkbox' checked = {completed} onChange={ () => { setCompleted(!completed) }} />

        <button onClick={handleSubmit} >Create</button>
        
        
        <ViewTodo data = {data}/>
        
    </div>
    </>
  )
}

export default Todo