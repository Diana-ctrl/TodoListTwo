import React, { useState } from 'react';
import { FilterValuesType } from './App';
import { Button } from './components/Button';
import { Input } from './components/Input';
import { Tasks } from './Tasks';


type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type PropsType = {
    title: string
    toDoListID: string
    tasks: Array<TaskType>
    removeTask: (taskId: string, toDoListID: string) => void
    addTask: (title: string, toDoListID: string) => void
    changeCheckbox: (id: string, toDoListID: string) => void
}

export function Todolist(props: PropsType) {

    let [title, setTitle] = useState("");
    let [error, setError] = useState(false);

    const addTask = () => {
        if (title.trim().length > 0) {
            props.addTask(title, props.toDoListID);
            setTitle("");
        } else {
            setError(true);
            setTitle("");
        }
    }

    const onClickHandler = (id: string) => props.removeTask(id, props.toDoListID);
    const changeCheckbox = (id: string) => props.changeCheckbox(id, props.toDoListID);


    let [filter, setFilter] = useState<FilterValuesType>("all");

    const handlerForFilter = (value: FilterValuesType) => {
        setFilter(value);
    }
    let tasksForTodolist = props.tasks;

    if (filter === "active") {
        tasksForTodolist = props.tasks.filter(t => t.isDone === false);
    }
    if (filter === "completed") {
        tasksForTodolist = props.tasks.filter(t => t.isDone === true);
    }

    return <div>
        <h3>{props.title}</h3>
        <div>
            <Input value={title} setTitle={setTitle} callback={addTask} />
            <Button callback={() => addTask()} name='+' />

        </div>
        {error && <div>Error</div>}
        <ul>
            {
                tasksForTodolist.map(t => {
                    return (
                        <Tasks id={t.id} title={t.title} isDone={t.isDone} onClickHandler={onClickHandler} changeCheckbox={changeCheckbox} />
                    )
                })
            }
        </ul>
        <div>
            <Button callback={() => handlerForFilter('all')} name={'all'} />
            <Button callback={() => handlerForFilter('active')} name={'active'} />
            <Button callback={() => handlerForFilter('completed')} name={'completed'} />
        </div>
    </div>
}
