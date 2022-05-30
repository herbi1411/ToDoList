import React from "react";
import { Link } from "react-router-dom";


const Navigation = ({userObj}) => {
    return (
    <nav>
        <ul>
            <li>
                <Link to="/">
                    <span>Home</span>
                </Link>
            </li>
            <li>
                <Link to="/profile">
                    {userObj.displayName ? 
                    (<span>{userObj.displayName}'s 프로필</span>):
                    (<span>Profile</span>)
                    }
                </Link>
            </li>
        </ul>
    </nav>
    );
}

export default Navigation;