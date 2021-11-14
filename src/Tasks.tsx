import React from 'react';
import { Button } from './components/Button';

type TasksType = {
    id: string
    title: string
    isDone: boolean
    onClickHandler: (id: string) => void
    changeCheckbox: (id: string) => void
}

export const Tasks = (props: TasksType) => {
    const checkboxHandler = () => {
        props.changeCheckbox(props.id)
    }
    const onClickHandler = () => {
        props.onClickHandler(props.id)
    }
    return (
        <li key={props.id}>
            <input type="checkbox" checked={props.isDone} onChange={checkboxHandler} />
            <span>{props.title}</span>
            <Button callback={onClickHandler} name={'X'} />
        </li>
    )

}