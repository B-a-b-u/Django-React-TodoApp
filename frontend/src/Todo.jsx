import React, { useState } from 'react'
import ViewTodo from './ViewTodo'; // ViewTodo on same page 
import 'bootstrap/dist/css/bootstrap.css';  // Using bootstrap for styling

// Todo function
function Todo() {

    // Required State variables
    const [event,setEvent] = useState("");
    const [detail,setDetail] = useState("");
    const [completed,setCompleted] = useState(false);
    const [data,setData] = useState([]);
    const [isSubmit,setIsSubmit] = useState(false);

    

    // Function to handle submit
    const handleSubmit = (e) => {
        e.preventDefault();

        // New event => type - object
        const todoEvent = {event, detail, completed}

        // Adding new event on array
        setData([...data, todoEvent]);

        // Resetting the inputfields
        setEvent(() => "");
        setDetail(() => "");
        setCompleted(() => false);
        // Changing statevariable for 
        setIsSubmit(true);
        
        console.log("Todo Event : ",todoEvent);
    }

return (
    <>
    <div className="container" style ={ {"border" : "2px solid black"}}>
    <div className='todo-form'>
        
        <input class="input-group input-group-lg p-2 mt-4" type='text' value={event} name='event' placeholder='Event' onChange={ (e) => {
            let temp = e.target.value;
            setEvent(temp);
        }}/>
        <br/><br/>
        <input class="input-group input-group-lg p-2" type='text' value={detail} name='detail' placeholder='Description' required onChange={ (e) => {
            let temp = e.target.value;
            setDetail(temp);
        }}/>
        <br/><br/>
        <div className="form-check m-3">
        <input className ="form-check-input" type='checkbox' checked = {completed} required  onChange={ () => { setCompleted(!completed) }} />
        <label className ="form-check-label">Completed</label>
        </div>
        

        <button class="btn btn-success mb-5" onClick={handleSubmit} >Create Task</button>
        
        {
  data && isSubmit  ? (
    <ViewTodo data={data} />
  ) : (
    isSubmit && <ViewTodo />
  )
}

        
        
    </div>
    </div>
    </>
  )
}

export default Todo