import React from "react"
import ToDoForm from "./ToDoForm"

const ToDoList = ({userObj}) => {
    return (
    <>
        <ToDoForm userObj = {userObj}/>
        ToDoList
    </>
    );
}


export default ToDoList