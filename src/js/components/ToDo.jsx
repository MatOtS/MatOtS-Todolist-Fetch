import React, { useEffect, useState } from "react";

const ToDo = () => {

    const [inputValue, setInputValue] = useState("")
    const [tasksList, setTasksList] = useState([])

    const handleInput = e => {
        e.preventDefault();
        setInputValue(e.target.value)
    }

    function handleSubmit(e) {
        e.preventDefault();
        setInputValue("")
        fetch('https://playground.4geeks.com/todo/todos/MatOtS', {
            method: "POST",
            body: JSON.stringify({
                "label": inputValue,
                "id": false
            }),
            headers: {
                "Content-Type": "application/json"
            }
        })
            .then(resp => {
                console.log(resp.ok);
                console.log(resp.status);
                getUserTasks()
                return resp.json();
            })
            .catch(error => {
                console.log(error);
            })
    }

    const deleteTask = (e) => {
        const name = e.target.parentNode.getAttribute("name")
        console.log(tasksList);
        console.log(name);
        for (let i = 0; i < tasksList.length; i++) {
            if (tasksList[i].label === name) {
                console.log("task Id ", tasksList[i].id)
                fetch(`https://playground.4geeks.com/todo/todos/${tasksList[i].id}`, {
                    method: "DELETE",
                    headers: {
                        "Content-Type": "application/json"
                    }
                })
                    .then(resp => {
                        console.log(resp.ok);
                        console.log(resp.status);
                        getUserTasks()
                        return resp.json();
                    })
                    .catch(error => {
                        console.log(error);
                    })
            }
        }

    }

    function getUserTasks() {
        fetch('https://playground.4geeks.com/todo/users/MatOtS', {
            headers: {
                "Content-Type": "application/json"
            }
        })
            .then(resp => {
                console.log(resp.ok);
                console.log(resp.status);
                return resp.json();
            })
            .then(data => {
                setTasksList(data.todos)
            })
            .catch(error => {
                console.log(error);
            })
    }

    const deleteAllTask = (e) => {
        const name = e.target.parentNode.getAttribute("name")
        console.log(tasksList);
        console.log(name);
        for (let i = 0; i < tasksList.length; i++) {
            console.log("task Id ", tasksList[i].id)
            fetch(`https://playground.4geeks.com/todo/todos/${tasksList[i].id}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json"
                }
            })
                .then(resp => {
                    console.log(resp.ok);
                    console.log(resp.status);
                    getUserTasks()
                    return resp.json();
                })
                .catch(error => {
                    console.log(error);
                })
        }

    }


    useEffect(() => {
        getUserTasks()
    }, [])


    return (

        <div className="container mx-auto">
            <div>
                <h1 className="mt-2 text-center" style={{ color: "darksalmon" }}>ToDo's</h1>
                <div className="paper position-relative"> 
                    <ul className="list-group">
                        <input value={inputValue} onChange={handleInput} onKeyDown={(e) => { e.key === "Enter" ? handleSubmit(e) : "" }} type="text" className="form-control" id="task" aria-describedby="task" />
                        {tasksList.map((task) => {
                            return (
                                <li className="list-group-item" key={task.id} name={task.label}>
                                    {task.label}
                                    <button onClick={deleteTask} type="button" className="btn-close float-end" aria-label="Close"></button>
                                </li>
                            )
                        })}
                    </ul>
                    <small className="position-absolute" style={{"bottom": "3px","left": "10px", "color": "grey" }}>{tasksList.length} tasks lefts</small>
                </div>
            </div>
            <div className="mt-3">
                <button onClick={deleteAllTask} type="button" className="btn btn-danger
                " aria-label="Delete">Delete all tasks</button>
            </div>
        </div>
    )
}

export default ToDo;