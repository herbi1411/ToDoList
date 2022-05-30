import React from "react";
import ToDoList from "components/ToDoList";

const Home = ({userObj}) => {
    return (
        <div>
            <ToDoList userObj = {userObj}/>
        </div>
    );
}

export default Home;