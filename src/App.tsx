import React, { useState } from 'react';
import './App.css';
import { Todolist } from './Todolist';
import { v1 } from 'uuid';

type ToDoListType = {
    id: string
    title: string
    filter: FilterValuesType
}

export type FilterValuesType = "all" | "active" | "completed";

function App() {

    let todolistID1 = v1();
    let todolistID2 = v1();

    let [todolists, setTodolists] = useState<Array<ToDoListType>>([
        { id: todolistID1, title: 'What to learn', filter: 'all' },
        { id: todolistID2, title: 'What to buy', filter: 'all' },
    ])

    let [tasks, setTasks] = useState({
        [todolistID1]: [
            { id: v1(), title: "HTML&CSS", isDone: true },
            { id: v1(), title: "JS", isDone: true },
            { id: v1(), title: "ReactJS", isDone: false },
            { id: v1(), title: "Rest API", isDone: false },
            { id: v1(), title: "GraphQL", isDone: false },
        ],
        [todolistID2]: [
            { id: v1(), title: "HTML&CSS2", isDone: true },
            { id: v1(), title: "JS2", isDone: true },
            { id: v1(), title: "ReactJS2", isDone: false },
            { id: v1(), title: "Rest API2", isDone: false },
            { id: v1(), title: "GraphQL2", isDone: false },
        ]
    });
    function removeTask(id: string, toDoListID: string) {
        setTasks({ ...tasks, [toDoListID]: tasks[toDoListID].filter(t => t.id !== id) });
    }

    function addTask(title: string, toDoListID: string) {
        setTasks({ ...tasks, [toDoListID]: [...tasks[toDoListID], { id: v1(), title: title, isDone: false }]});
    }

    const changeCheckbox = (id: string, toDoListID: string) => {
        let changingTask = tasks[toDoListID].map(t => t.id === id ? { ...t, isDone: !t.isDone } : t);
        setTasks({ ...tasks, [toDoListID]: changingTask });
    }

    return (
        <div className="App">
            {todolists.map(t => {
                return (
                    <Todolist
                        key={t.id}
                        title={t.title}
                        toDoListID={t.id}
                        tasks={tasks[t.id]}
                        removeTask={removeTask}
                        addTask={addTask}
                        changeCheckbox={changeCheckbox} />
                )
            })};

        </div>
    );
}

export default App;
