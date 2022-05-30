import React from "react";
import AuthForm from "components/AuthForm";
import { AuthService } from "fbase";
import { GoogleAuthProvider, GithubAuthProvider, signInWithPopup } from "firebase/auth";
const Auth = () => {
    const onClick = async(event) => {
        const {target:{name}} = event;
        let provider;
        if(name === "LogInWithGoogle")
        { 
            provider = new GoogleAuthProvider();
        }else if(name === "LogInWithGitHub")
        {
            provider = new GithubAuthProvider();
        }
        try{
            await signInWithPopup(AuthService, provider);
        }catch(error){
            console.log(error.message);
        }
    }
    return (
        <>
            <div>
                <AuthForm/>
            </div>
            <div>
                <button name = "LogInWithGoogle" onClick={onClick}>LogInWithGoogle</button>
                <button name = "LogInWithGitHub" onClick={onClick}>LogInWithGitHub</button>
            </div>
        </>
    );
}

export default Auth;