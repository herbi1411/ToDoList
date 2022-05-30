import React from "react";
import { AuthService } from "fbase";
import { useNavigate } from "react-router-dom";

const Profile = () => {
    const navigate = useNavigate();
    const onClick = () => {
        AuthService.signOut();
        navigate("/");
    }
    return (
        <div>
            <button onClick={onClick}>Log out</button>
        </div>
    );
}

export default Profile;