import React from "react"

type ButtonType = {
    callback: () => void
    name: string
}

export const Button = (props: ButtonType ) => {
    const onClickHeandler = () => {
        props.callback();
    }
    return (
        <button onClick={onClickHeandler}>{props.name}</button>
    )
}