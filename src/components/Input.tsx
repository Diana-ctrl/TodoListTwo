import React from "react";
import {ChangeEvent, KeyboardEvent} from 'react';
type InputType = {
    value: string
    callback: () => void
    setTitle: (title: string) => void
}

export const Input = (props: InputType) => {

    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            props.callback();
        }
    }

    const inputHandler = (e: ChangeEvent<HTMLInputElement>) => {
        props.setTitle(e.currentTarget.value);
    }

    return (

            <input onChange={inputHandler} value={props.value} onKeyPress={onKeyPressHandler}/>
    )
}