import React, { useState } from "react";
import { deleteDoc, doc, updateDoc } from "firebase/firestore";
import { DBService } from "fbase";
import axios from "axios";

const ToDoElement = ({userObj, data}) => {
    const [editing, setEditing] = useState(false);
    const [newTodo, setNewTodo] = useState(data.value);
    const onDeleteClick = async(event) => {
        try{
            //Firebase
            // deleteDoc(doc(DBService,"ToDoList",data.id));
            //NodeJS
            axios.delete(`http://127.0.0.1:4500/todoid/${data.id}`,{
                data: {
                    uid : userObj.uid
                }
            })
                .then((response) => {/* */})
                .catch((error) => {console.log(error)});
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
    const onEditClick = () => setEditing(true);
    const onChange = (event) => {
        const {target:{value}} = event;
        setNewTodo(value);
    }
    const onAdmitClick = async() => {
        try{
            await updateDoc(doc(DBService, "ToDoList",data.id), {
                value: newTodo,
                updatedAt: Date.now(),
            });
            setEditing(false);
        }catch(error){
            console.log(error.message);
        }
    }
    const onCancelClick = () => {
        setNewTodo(data.value);
        setEditing(false);
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
                {!editing? (
                <>
                    <div className="checkbox checkbox-off" onClick = {toggleCheckClick}></div>
                    <span className="to-do-children-unchecked todo-data">{data.value}</span>
                    <button onClick={onEditClick}>Edit</button>
                    <button onClick={onDeleteClick}>Delete</button>
                </>) : (
                <>
                    <div className="checkbox checkbox-off" onClick = {toggleCheckClick}></div>
                    <input type="text" value={newTodo} placeholder="Edit toDo" onChange = {onChange} required/> 
                    <button onClick={onAdmitClick}>Admit</button>
                    <button onClick={onCancelClick}>Cancel</button>
                </>)}
            </>
        )}
    </li>
    );
}

export default ToDoElement;