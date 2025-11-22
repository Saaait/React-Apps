import React, { useState } from "react"

function ToDoLists() {

    const [tasks, setTasks] = useState([]);
    const [newtasks, setNewTasks] = useState("");

    function handleInputChange(event) {

        setNewTasks(event.target.value);
    }

    function addTask() {
        if (newtasks.trim() !== "") {
            setTasks(t => [...tasks, newtasks])
            setNewTasks("");
        }
    }

    function deleteTask(index) {
        const updatedTasks = tasks.filter((_, i) => i !== index); // _ stands for ignore(i.e ignoring the parameter)
        setTasks(updatedTasks);
    }

    function moveTaskup(index) {
        if (index > 0) {
            //swap 2 elements within an array
            const updatedTasks = [...tasks];
            [updatedTasks[index], updatedTasks[index - 1]] = [updatedTasks[index - 1], updatedTasks[index]];
            setTasks(updatedTasks);
        }
    }

    function moveTaskdown(index) {
        if (index < tasks.length - 1) {
            //swap 2 elements within an array
            const updatedTasks = [...tasks];
            [updatedTasks[index], updatedTasks[index + 1]] = [updatedTasks[index + 1], updatedTasks[index]];
            setTasks(updatedTasks);
        }
    }

    return (
        <div className="to-do-list">

            <h1>To-Do-List</h1>

            <div>
                <input
                    type="text"
                    placeholder="Enter a task...."
                    value={newtasks}
                    onChange={handleInputChange}
                />
                <button className="add-button" onClick={addTask}>
                    Add
                </button>
            </div>

            <ol>
                {tasks.map((task, index) =>
                    <li key={index}>
                        <span className="text">{task}</span>
                        <button className="delete-button" onClick={() => deleteTask(index)}>Delete</button>
                        <button className="move-button" onClick={() => moveTaskup(index)}>👆🏼</button>
                        <button className="move-button" onClick={() => moveTaskdown(index)}>👇🏼</button>
                    </li>
                )}
            </ol>
        </div>);
}
export default ToDoLists