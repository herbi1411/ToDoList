import React, { useState } from "react";
import { DBService } from "fbase";
import { addDoc, collection } from "firebase/firestore";

const ToDoForm = ({userObj}) => {
    const [toDo, setToDo] = useState("");

    const onChange = (event) => {
        const {target: {value}} = event;
        setToDo(value);
    }
    const onSubmit = async(event) => {
        event.preventDefault();
        try{
            await addDoc(collection(DBService, "ToDoList"),{
                uid : userObj.uid,
                isDone : false,
                createdAt: Date.now(),
                value: toDo,
            });
        }catch(error){
            console.log(error.message);
        }
        setToDo("");
    }
    return (
    <div>
        <form onSubmit={onSubmit}>
            <input type="text" placeholder="Write To Do" value={toDo} onChange={onChange} required/>
            <input type="submit" value="Submit"/> 
        </form>
    </div>
    );
}

export default ToDoForm;