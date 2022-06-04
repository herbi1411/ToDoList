import React, { useState, useEffect } from "react"
import ToDoForm from "./ToDoForm"
import { onSnapshot, doc, query, collection, where, orderBy } from "firebase/firestore";
import { DBService } from "fbase";
import ToDoElement from "./ToDoElement";
import axios from "axios";

const ToDoList = ({userObj}) => {
    const [toDos, settoDos] = useState([]);

    const getAxiosTodos = async() => {
        await axios.get("http://localhost:4500")
            .then((response) => {
                const tempTodos = response.data.map((doc) => ({id:doc._id, ...doc}));
                settoDos(tempTodos);
            })
            .catch((err) => console.error(err));
    }
    useEffect(()=>{
        //Firebase
        // const q = query(collection(DBService, "ToDoList"),where("uid","==",userObj.uid),orderBy("createdAt","desc"));
        // onSnapshot(q, (querySnapshot) => {
        //     const tempTodos = querySnapshot.docs.map(doc => ({id: doc.id, ...doc.data()}));
        //     settoDos(tempTodos);
        // });
        //NodeJS
        getAxiosTodos();
        const socket = new WebSocket("ws://127.0.0.1:4500");
        socket.addEventListener("open", () => {
            socket.send(userObj.uid);
        })
        socket.addEventListener("message",(message) => {
            getAxiosTodos();
        });
    },[]);
    return (
    <>
        <ToDoForm userObj = {userObj}/>
        {toDos ? (
        <div style={{overflow:"hidden"}}>
            {toDos.map((value, index) => (<ul key={index} className="to-do-list"><ToDoElement userObj = {userObj} data={value}/></ul>))}
        </div>
        ): ""}
    </>
    );
}


export default ToDoList