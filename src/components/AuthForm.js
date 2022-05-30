import React, { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { AuthService } from "../firebase";

const AuthForm = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState();
    const onChange = (event) => {
        const {target:{name, value}} = event;
        if (name === "email"){
            setEmail(value);
        }else if(name === "password"){
            setPassword(value);
        }
    }
    const onSubmit = async (event) => {
        event.preventDefault();
        console.log(email, password);
        const auth = AuthService;
        try{
            await createUserWithEmailAndPassword(auth, email, password);
        }catch(error){
            setError(error.message);
        }
    }
    return (
        <div>
            <form onSubmit={onSubmit}>
                <input type="email" name="email" value={email} onChange={onChange} placeholder="email" required/>
                <input type="password" name="password" value={password} onChange={onChange} placeholder="pasword" required minLength = "6" maxLength="15"/>
                <input type="submit" value="Submit"/>
            </form>
                {error? (
                    <span>{error}</span>
                ):("")}
        </div>
    );
}

export default AuthForm;