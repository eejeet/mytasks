import { useState, BrowserRouter } from "react";
import { Routes, Route } from "react-router-dom";
import Layout from "./Layout";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Tasks from "./pages/Tasks";
import TasksDragDrop from "./pages/TasksDragDrop";
import UpdateTask from "./pages/UpdateTask";
import Notification from "./pages/Notification";

function App() {
    const [count, setCount] = useState(0);

    return (
        <Layout>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                {/* <Route path="/tasks" element={<Tasks />} /> */}
                <Route path="/tasks" element={<TasksDragDrop />} />
                {/* Update Task LoginPage */}
                <Route path="/tasks/:id" element={<UpdateTask />} />
                <Route path="/tasks-drag-drop" element={<TasksDragDrop />} />
                <Route path="/notifications" element={<Notification />} />
            </Routes>
        </Layout>
    );
}

export default App;
