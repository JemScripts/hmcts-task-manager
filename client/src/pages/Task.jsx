import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import taskService from "../services/task.service";

const validStatuses = ["pending", "in_progress", "completed"];

export const Task = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [currentTask, setCurrentTask] = useState({
        id: null,
        title: "",
        description: "",
        status: "pending",
        dueDate: "",
    });
    const [message, setMessage] = useState("");

    const getTask = (id) => {
        taskService.get(id)
            .then((response) => {
                const task = response.data;

                if(task.dueDate) {
                    task.dueDate = new Date(task.dueDate).toISOString().slice(0, 16);
                }

                setCurrentTask(task);
                console.log(task);
            })
            .catch((e) => {
                console.log(e);
            });
    };

    useEffect(() => {
        if (id) getTask(id);
    }, [id]);

    const handleInputChange = (event) => {
        const { name , value } = event.target;
        setCurrentTask({ ...currentTask, [name]: value});
    };
    
    const updateTask = () => {

        const data = { ...currentTask };
        if (data.dueDate) {
            data.dueDate = new Date(data.dueDate).toISOString();
        } else {
            data.dueDate = null;
        }

        taskService.update(currentTask.id, data)
            .then((response) => {
                console.log(response.data);
                setMessage("The task was updated successfully!");
            })
            .catch((e) => {
                console.log(e);
            });
    };

    const deleteTask = () => {
        taskService.remove(currentTask.id)
            .then((response) => {
                console.log(response.data);
                navigate("/tasks");
            })
            .catch((e) => {
                console.log(e);
            })
    };

    return (
        <div>
            {currentTask ? (
                <div className="max-w-sm mx-auto p-4 bg-white rounded shadow">
                    <h4 className="font-bold text-xl mb-2">Edit Task</h4>
                    <div className="mb-2">
                        <label className="block font-medium" htmlFor="title">
                            Title
                        </label>
                        <input 
                            type="text"
                            className="border border-gray-300 rounded w-full px-2 py-1"
                            id="title"
                            name="title"
                            value={currentTask.title}
                            onChange={handleInputChange}
                        />
                    </div>

                    <div className="mb-2">
                        <label className="block font-medium" htmlFor="description">
                            Description
                        </label>
                        <input 
                            type="text"
                            className="border border-gray-300 rounded w-full px-2 py-1"
                            id="description"
                            name="description"
                            value={currentTask.description}
                            onChange={handleInputChange}
                        />
                    </div>
                    
                    <div className="mb-2">
                        <label className="block font-medium" htmlFor="dueDate">
                            Due Date
                        </label>
                        <input 
                            type="datetime-local"
                            className="border border-gray-300 rounded w-full px-2 py-1"
                            id="dueDate"
                            name="dueDate"
                            value={currentTask.dueDate}
                            onChange={handleInputChange}
                        />
                    </div>

                    <div className="mb-2">
                        <label className="block font-medium" htmlFor="status">
                            Status
                        </label>
                        <select 
                            className="border border-gray-300 rounded w-full px-2 py-1"
                            id="status"
                            name="status"
                            value={currentTask.status}
                            onChange={handleInputChange}
                        >
                            {validStatuses.map((status) => (
                                <option key={status} value={status}>
                                    {status.replace("_", " ")}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="space-x-2 mt-2">
                            <button
                                className="bg-red-500 text-white px-3 py-1 rounded"
                                onClick={deleteTask}
                            >
                                Delete
                            </button>

                            <button
                            className="bg-green-500 text-white px-3 py-1 rounded"
                            onClick={updateTask}
                            >
                                Update
                            </button>
                        </div>

                        {message && <p className="text-green-600 mt-2">{message}</p>}
                        </div>
            ) : (
                <div>
                    <p>Loading Task...</p>
                    </div>
            )}
        </div>
    );
}