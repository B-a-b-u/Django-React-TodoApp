import React, { useState } from 'react'
import "./Todo.css"
import ViewTodo from './ViewTodo';
function Todo() {

    const [event,setEvent] = useState("");
    const [detail,setDetail] = useState("");
    const [completed,setCompleted] = useState(false);
    const [data,setData] = useState(null);
    const [isSubmit,setIsSubmit] = useState(false);

    

    // Function to handle submit
    const handleSubmit = (e) => {
        e.preventDefault();
        const todoEvent = {event, detail, completed}
        setData({...data, todoEvent});
        setIsSubmit(true);
        console.log("Todo Event : ",todoEvent);
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
        
        {
  isSubmit && data ? (
    <ViewTodo data={data} />
  ) : (
    isSubmit && <ViewTodo />
  )
}

        
        
    </div>
    </>
  )
}

export default Todo