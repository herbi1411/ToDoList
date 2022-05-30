import React, { useState } from "react";
import { deleteDoc, doc, updateDoc } from "firebase/firestore";
import { DBService } from "fbase";

const ToDoElement = ({data}) => {
    const onDeleteClick = async(event) => {
        try{
            deleteDoc(doc(DBService,"ToDoList",data.id));
        }catch(error){
            console.log(error.message);
        } 
    }
    const toggleCheckClick = async() => {
        try{
            updateDoc(doc(DBService, "ToDoList",data.id), {
                isDone : !data.isDone,
            });
        }catch(error)
        {
            console.log(error.message);
        }
    }
    return (
    <li>
        {data.isDone ? (
            <>
                <div className="checkbox checkbox-on" onClick = {toggleCheckClick}></div>
                <span className="to-do-children-checked todo-data">{data.value}</span>
                <button onClick={onDeleteClick}>Delete</button>
            </>
        ) : (
            <>
                <div className="checkbox checkbox-off" onClick = {toggleCheckClick}></div>
                <span className="to-do-children-unchecked todo-data">{data.value}</span>
                <button onClick={onDeleteClick}>Delete</button>
            </>
        )}
    </li>
    );
}

export default ToDoElement;