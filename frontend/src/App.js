import Todo from "./Todo";
import {BrowserRouter, Routes, Route} from "react-router-dom"
import ViewTodo from "./ViewTodo";
function App() {
  return (

    <div className="App">
      <h1 style = {{textAlign : "center"}}>Welcome to Todo Site</h1>
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<Todo/>} />
        <Route path="/view" element={<ViewTodo/>} />
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
