  import React, { useState, useEffect } from 'react'
  import 'bootstrap/dist/css/bootstrap.css';  // Using bootstrap for styling
  import axios from "axios";

  // Todo function
  function Todo() {

  // Required State variables
  const [event,setEvent] = useState("");  // Input field
  const [detail,setDetail] = useState("");  // Input Field
  const [completed,setCompleted] = useState(false); // Input Field
  const [todoList, setTodoList] = useState(null); // To store List of data from API

  const [submitbutton, setSubmitButton] = useState("Submit")
  const [toedit, setToEdit] = useState(false);  // Toggle type for deciding
  const [editdata, setEditData] = useState(null); // To store editing data
  const [viewCompleted, setViewCompleted] = useState(false);  // Toggle type for deciding in navbars


  // To call fetch function whenever component mounts
  useEffect(() => {
    fetchList();
  }, []);

  //To get List of items from backend
  const fetchList = () => {
  axios
  .get("http://localhost:8000/api/todo/")
  .then((res) => {setTodoList(res.data)
  console.log("Fetched DATA :",res.data)})
  .catch((err) => console.log("Data Fetcing Error : ",err))
  }

  // Change navbartabs
  const displayCompleted = (status) => {
    setViewCompleted(status);
  };

  // Editing the existing items
  const handleEdit = (item) => {
    if(item){
      // To make the data available on editing field
      setEvent(item.event)
      setDetail(item.detail)
      setCompleted(item.completed)

      // Updating Submit button
      setSubmitButton("Update Task")

      // To pass data to Submitting form
      setEditData(item);
      setToEdit(!toedit);
    }
  }

  // Deleting the items
  const handleDelete = (item) => {
    if(item){
      axios
      .delete(`http://localhost:8000/api/todo/${item.id}/`)
      .then((res) => {
        console.log("Deleted Successfully : ",res)
        alert("Deleted Sucessfully...")
      })
      .catch((err) => console.log("Deletion Error : ",err))
    }

    // Refresh after Deleting 
    window.location.reload();
  }


  // Filtering the items based on Completed or InComplete
  const renderItems = () =>{
    if(todoList != null){
      const res = todoList.filter((item) => item.completed === viewCompleted);

      return res.map((item) => (
        <li className="list-group-item d-flex justify-content-between align-items-center" key={item.id}>
          <span title={item.detail}>{item.event}</span>
          <span>
          <button className="btn btn-warning mr-2" onClick={() => handleEdit(item)}>Edit</button>
          <button className="btn btn-danger mr-2" onClick={ () => handleDelete(item)}>Delete</button>
          </span>
        </li>
      ))
    }
  }

  // Function to handle submit
  const handleSubmit =  () => {
      // // New event => type - object
      const todoEvent = {event, detail, completed}
      console.log("ITEM : ",todoEvent);
      if(toedit){
        setEvent(event);
        setCompleted(completed);
        setDetail(detail);
        setToEdit(!toedit);
        axios
        .put(`http://localhost:8000/api/todo/${editdata.id}/`, todoEvent)
        .then((res) => console.log("Edit successful",res))
        .catch((err) => console.log("Error on PUT : ",err))
        alert("Updated...");
        setCompleted(false);
        setEvent("");
        setDetail("");
        setSubmitButton("Submit")
      window.location.reload();


        return;
      }

      const existingEvent = todoList.some((item) => {
        return (
          item.event === todoEvent.event &&
          item.detail === todoEvent.detail &&
          item.completed === todoEvent.completed
        );
      });
      console.log("Existing : ",existingEvent)

      if(existingEvent){
        alert("Event already exists !!!");
        console.log("Event already exists !!!");
      }
      else{
        if(event && detail){
          axios
          .post("http://localhost:8000/api/todo/",todoEvent)
          .then(() => fetchList())
          .catch((err) => console.log("Post Error  :",err));
          alert("Event Created...");
        }
        else{
          alert("Fields cannot be empty")
        }
        }
       
      // Resetting the inputfields
      setEvent(() => "");
      setDetail(() => "");
      setCompleted(() => false);       

      // Refreshing
      window.location.reload();
  }
  return (
      <>
        <div className="container" style ={ {"border" : "2px solid black"}}>
          <div className='todo-form'>
              
              <input required className="input-group input-group-lg p-2 mt-4" type='text' value={event} name='event' placeholder='Event' onChange={ (e) => {
                  let temp = e.target.value;
                  setEvent(temp);
              }}/>
              <br/><br/>

              <input required className="input-group input-group-lg p-2" type='text' value={detail} name='detail' placeholder='Description'  onChange={ (e) => {
                  let temp = e.target.value;
                  setDetail(temp);
              }}/>
              <br/><br/>

              <div className="form-check m-3">
                <input className ="form-check-input" type='checkbox' checked = {completed} required  onChange={ () => { setCompleted(!completed) }} />
                <label className ="form-check-label">Completed</label>
              </div>

              <button className="btn btn-success mb-5" onClick={() => handleSubmit()} >{submitbutton}</button>
          </div>
          </div>
        <h1>View Todo</h1>
        <div className="nav nav-tabs">
          <span className={viewCompleted ? "nav-link active" : "nav-link"} onClick={() => displayCompleted(true)}>Completed</span>
          <span className={viewCompleted ? "nav-link" : "nav-link active"} onClick={() => displayCompleted(false)}>To be Completed</span>
        </div>
        <ul className="list-group list-group-flush">
          {renderItems()}
        </ul>
      </>
    )
  }

  export default Todo