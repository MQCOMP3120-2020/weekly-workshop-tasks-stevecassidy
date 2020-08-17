import React, { useState } from "react";

const UnitForm = ({updateFn}) => {

    const initialState = {code: '', title: '', offerings: ['S1']}

    const [formInfo, setFormInfo] = useState(initialState)

    const updateCode = (event) => {
        console.log("Update code", event.target.value)
        setFormInfo({...formInfo, code: event.target.value})
    }

    const updateTitle = (event) => {
        console.log("Update title", event.target.value)
        setFormInfo({...formInfo, title: event.target.value})
    }

    const formHandler = (event) => {
        event.preventDefault()
        console.log("Form submitted: ", formInfo)
        updateFn(formInfo)
        setFormInfo(initialState)
    }
    
    return (
        <form onSubmit={formHandler}>
            <label htmlFor="code">Unit Code</label>
            <input name="code" onChange={updateCode}></input>

            <label htmlFor="title">Unit Title</label>
            <input name="title" onChange={updateTitle}></input>

            <input type="submit"></input>
        </form>
    )
}

export default UnitForm