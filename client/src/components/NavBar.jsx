import { Link } from "react-router-dom"

export const NavBar = () => {
    return(
        <div className="flex justify-between items-center w-[100%] bg-gradient-to-b from-blue-400 to-blue-600 mb-4">
            <div className="flex flex-row justify-start">
                <h2 className="font-semibold tracking-widest">Task Manager API</h2>
            </div>
            <div className="flex flex-row justify-end mr-10">
                <ul className="flex items-center gap-[4vw]">
                    <Link to="/tasks" className="font-bold">Tasks</Link>
                    <Link to="/add" className="font-bold">Add</Link>
                </ul>
            </div>
        </div>
    );
}