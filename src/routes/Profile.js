import React, { useState } from "react";
import { AuthService } from "fbase";
import { useNavigate } from "react-router-dom";
import { updateProfile } from "firebase/auth";

const Profile = ({userObj}) => {
    const [newName, setNewName] = useState(userObj.displayName);
    const navigate = useNavigate();
    const onClick = () => {
        AuthService.signOut();
        navigate("/");
    }
    const onChange = (event) => {
        const {target: {value}} = event;
        setNewName(value);
    }
    const onSubmit = async(event) => {
        event.preventDefault();
        try{
            await updateProfile(AuthService.currentUser, {
                displayName: newName,
            });
        }catch(error){
            console.log(error.message);
        }
        userObj.refreshUser();
    }
    return (
        <div>
            <form onSubmit={onSubmit}>
                <input type="text" value = {newName} onChange={onChange}/>
                <input type="submit" value = "Change Name"/>
            </form>
            <button onClick={onClick}>Log out</button>
        </div>
    );
}

export default Profile;