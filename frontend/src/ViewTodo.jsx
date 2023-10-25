import { useState, useEffect } from "react";
import 'bootstrap/dist/css/bootstrap.css';
import axios from "axios";

function ViewTodo ()  {

  // Navbar tabs
  const [viewCompleted, setViewCompleted] = useState(false);
  const [todoList, setTodoList] = useState(null);

  useEffect(() => {
    fetchList();
  }, []);

  const fetchList = () => {
    axios
    .get("http://localhost:8000/api/todo/")
    .then((res) => {setTodoList(res.data)
    console.log("RES DATA :",res.data)})
    .catch((err) => console.log("Data Fetcing Error : ",err))
  }


  // Checking Data
  // console.log("View Data : ",data);

  // Change navbartabs
  const displayCompleted = (status) => {
    setViewCompleted(status);
  };

  const handleEdit = (item) => {
    console.log("Edit id : ",item.id)
    console.log("Edit event : ",item.event)

    console.log("Edit description : ",item.detail)

  }

  // Filtering the items
  const renderItems = () =>{
    if(todoList != null){
      const res = todoList.filter((item) => item.completed === viewCompleted);
    console.log("res : ",res);

    return res.map((item) => (
      <li className="list-group-item d-flex justify-content-between align-items-center" key={item.id}>
        <span title={item.detail}>{item.event}</span>
        <span>
        <button className="btn btn-warning mr-2" onClick={handleEdit(item)}>Edit</button>
        <button className="btn btn-danger mr-2">Delete</button>
        </span>
      </li>
    ))
    }
    

  }
  return (
    <>
    <div>ViewTodo</div>
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

export default ViewTodo;