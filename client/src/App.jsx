import { Routes, Route } from "react-router-dom";
import { NavBar } from "./components/NavBar";
import { AddTask } from "./pages/AddTask";
import { TasksList } from "./pages/TasksList";
import { Task } from "./pages/Task";

function App() {

  return (
    <>
    <NavBar />
    <main className="max-w-3xl mx-auto px-4">
     <Routes>
        <Route path="/" element={<TasksList />} />
        <Route path="/tasks" element={<TasksList />} />
        <Route path="/add" element={<AddTask />} />
        <Route path="/tasks/:id" element={<Task />} />
      </Routes>
    </main>
    </>
  )
}

export default App
