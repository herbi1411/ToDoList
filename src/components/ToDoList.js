import React, { useState, useEffect } from "react"
import ToDoForm from "./ToDoForm"
import { onSnapshot, doc, query, collection, where, orderBy } from "firebase/firestore";
import { DBService } from "fbase";
import ToDoElement from "./ToDoElement";

const ToDoList = ({userObj}) => {
    const [toDos, settoDos] = useState([]);

    useEffect(()=>{
        const q = query(collection(DBService, "ToDoList"),where("uid","==",userObj.uid),orderBy("createdAt","desc"));
        onSnapshot(q, (querySnapshot) => {
            const tempTodos = querySnapshot.docs.map(doc => ({id: doc.id, ...doc.data()}));
            settoDos(tempTodos);
        });
    },[]);
    return (
    <>
        <ToDoForm userObj = {userObj}/>
        {toDos ? (
        <div style={{overflow:"hidden"}}>
            {toDos.map((value, index) => (<ul key={index} className="to-do-list"><ToDoElement data={value}/></ul>))}
        </div>
        ): ""}
    </>
    );
}


export default ToDoList