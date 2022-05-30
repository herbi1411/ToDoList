import React, { useState } from "react";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { AuthService } from "fbase";

const AuthForm = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState();
    const [signUp, isSignUp] = useState(false);
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
        const auth = AuthService;
        try{
            if (signUp){
                await createUserWithEmailAndPassword(auth, email, password);
            }else{
                await signInWithEmailAndPassword(auth, email, password);
            }
        }catch(error){
            setError(error.message);
        }
    }
    const toggleAccount = () => isSignUp(prev => !prev);
    return (
        <div>
            <form onSubmit={onSubmit}>
                <input type="email" name="email" value={email} onChange={onChange} placeholder="email" required/>
                <input type="password" name="password" value={password} onChange={onChange} placeholder="password" required minLength = "6" maxLength="15"/>
                <input type="submit" value={signUp?"SignUp":"SignIn"}/>
            </form>
                {error? (
                    <div>
                        <span>{error}</span>
                    </div>
                ):("")}
            <span onClick={toggleAccount}>{!signUp?"SignUp":"SignIn"}</span>
        </div>
    );
}

export default AuthForm;