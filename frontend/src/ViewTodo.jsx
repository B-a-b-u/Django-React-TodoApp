import { useState } from "react";
import 'bootstrap/dist/css/bootstrap.css';

const todoItems = [
  {
    id: 1,
    title: "Go to Market",
    description: "Buy ingredients to prepare dinner",
    completed: true,
  },
  {
    id: 2,
    title: "Study",
    description: "Read Algebra and History textbook for the upcoming test",
    completed: false,
  },
  {
    id: 3,
    title: "Sammy's books",
    description: "Go to the library to return Sammy's books",
    completed: true,
  },
  {
    id: 4,
    title: "Article",
    description: "Write an article on how to use Django with React",
    completed: false,
  },
];
function ViewTodo ({data})  {

  // Navbar tabs
  const [viewCompleted, setViewCompleted] = useState(false);

  // Checking Data
  console.log("View Data : ",data);

  // Change navbartabs
  const displayCompleted = (status) => {
    setViewCompleted(status);
  };

  // Filtering the items
  const renderItems = () =>{
    if(data != null){
      const res = data.filter((item) => item.completed === viewCompleted);
    console.log("res : ",res);

    return res.map((item) => (
      <li className="list-group-item d-flex justify-content-between align-items-center" key={item.id}>
        <span title={item.detail}>{item.event}</span>
        <span>
        <button className="btn btn-warning mr-2">Edit</button>
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