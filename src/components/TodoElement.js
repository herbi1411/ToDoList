import React from "react";
import { deleteDoc, doc } from "firebase/firestore";
import { DBService } from "fbase";

const ToDoElement = ({data}) => {

    const onClick = async(event) => {
        try{
            deleteDoc(doc(DBService,"ToDoList",data.id));
        }catch(error){
            console.log(error.message);
        } 
    }
    return (
    <li>
        <div className="checkbox checkbox-off"></div>
        <span className="todo-data">{data.value}</span>
        <button onClick={onClick}>Delete</button>
    </li>
    );
}

export default ToDoElement;