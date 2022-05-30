import React from "react";
import AuthForm from "components/AuthForm";

const Auth = () => {
    return (
        <>
            <div>
                <AuthForm/>
            </div>
            <div>
                <button name = "LogInWithGoogle">LogInWithGoogle</button>
                <button name = "LogInWithGitHub">LogInWithGitHub</button>
            </div>
        </>
    );
}

export default Auth;