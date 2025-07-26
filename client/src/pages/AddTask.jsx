import { useState } from "react";
import taskService from "../services/task.service";

const validStatuses = ["pending", "in_progress", "completed"];

export const AddTask = () => {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [status, setStatus] = useState("pending");
    const [dueDate, setDueDate] = useState("");
    const [submitted, setSubmitted] = useState(false);
    const [error, setError] = useState("");

    const saveTask = () => {
        if (dueDate && isNaN(Date.parse(dueDate))) {
            setError("Please enter a valid date/time ISO format.");
            return;
        }

        if (!validStatuses.includes(status)) {
            setError("Invalid status selected.");
            return;
        }

        const data = { title, description, status, dueDate: dueDate || null };
        taskService.create(data)
            .then((response) => {
                console.log(response.data);
                setSubmitted(true);
                setError("");
            })
            .catch((e) => {
                console.log(e);
                setError("An error occurred while saving the task.")
            })
    };

    const newTask = () => {
        setTitle("");
        setDescription("");
        setStatus("pending");
        setDueDate("");
        setSubmitted(false);
        setError("");
    };

    return (
        <div className="max-w-sm mx-auto p-4 bg-white rounded shadow">
            {submitted ? (
                <div>
                    <h4 className="font-bold text-green-600 mb-4">
                        Task submitted successfully!
                    </h4>
                    <button className="bg-blue-500 text-white px-3 py-1 rounded" onClick={newTask}>
                        Add Another Task
                    </button>
                </div>
            ) : ( 
                <div>
                    <h4 className="font-bold text-xl mb-2">Add Task</h4>

                    {error && <p className="text-red-600 mb-2">{error}</p>}

                    <div className="mb-2">
                        <label className="block mb-1 font-medium">
                            Title
                        </label>

                        <input 
                            type="text"
                            className="border border-gray-300 rounded w-full px-2 py-1"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                        />
                    </div>

                    <div className="mb-2">
                        <label className="block mb-1 font-medium">Description</label>
                        <input 
                            type="text"
                            className="border border-gray-300 rounded w-full px-2 py-1"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        />
                    </div>
                    
                    <div className="mb-2">
                        <label className="block mb-1 font-medium">Due Date</label>
                        <input 
                            type="datetime-local"
                            className="border border-gray-300 rounded w-full px-2 py-1"
                            value={dueDate}
                            onChange={(e) => setDueDate(e.target.value)}
                        />
                    </div>                    
                    
                    <div className="mb-2">
                        <label className="block mb-1 font-medium">Status</label>
                        <select 
                            className="border border-gray-300 rounded w-full px-2 py-1"
                            value={status}
                            onChange={(e) => setStatus(e.target.value)}
                        >
                            {validStatuses.map((stat) => (
                                <option key={stat} value={stat}>
                                    {stat.replace("_", " ")}
                                </option>
                            ))}
                        </select>
                    </div>

                    <button 
                        className="bg-green-500 text-white px-3 py-1 rounded mt-2"
                        onClick={saveTask}
                    >
                        Submit
                    </button>
                </div>
            )}
        </div>
    );
}