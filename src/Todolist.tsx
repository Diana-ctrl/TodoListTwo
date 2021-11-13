import React, { ChangeEvent, KeyboardEvent, useState } from 'react';
import { FilterValuesType } from './App';
import { Button } from './components/Button';


type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type PropsType = {
    title: string
    tasks: Array<TaskType>
    removeTask: (taskId: string) => void
    changeFilter: (value: FilterValuesType) => void
    addTask: (title: string) => void
    changeCheckbox: (id: string) => void
}

export function Todolist(props: PropsType) {

    let [title, setTitle] = useState("");
    let [error, setError] = useState(false);

    const addTask = () => {
        if (title.trim().length > 0) {
            props.addTask(title);
            setTitle("");
        } else {
            setError(true);
            setTitle("");
        }
    }

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setError(false);
        setTitle(e.currentTarget.value)
    }

    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            addTask();
        }
    }

    const handlerForFilter = (value: FilterValuesType) => {
        props.changeFilter(value);
    }
    const onClickHandler = (id: string) => props.removeTask(id);
    const changeCheckbox = (id: string) => props.changeCheckbox(id);


    let [filter, setFilter] = useState<FilterValuesType>("all");

    let tasksForTodolist = tasks;

    if (filter === "active") {
        tasksForTodolist = tasks.filter(t => t.isDone === false);
    }
    if (filter === "completed") {
        tasksForTodolist = tasks.filter(t => t.isDone === true);
    }

    function changeFilter(value: FilterValuesType) {
        setFilter(value);

    }

    return <div>
        <h3>{props.title}</h3>
        <div>
            <input value={title}
                onChange={onChangeHandler}
                onKeyPress={onKeyPressHandler}
            />
            <Button callback={() => addTask()} name='+' />

        </div>
        {error && <div>Error</div>}
        <ul>
            {
                props.tasks.map(t => {



                    return <li key={t.id}>
                        <input type="checkbox" checked={t.isDone} onChange={() => changeCheckbox(t.id)} />
                        <span>{t.title}</span>
                        <Button callback={() => onClickHandler(t.id)} name={'X'} />
                    </li>
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
