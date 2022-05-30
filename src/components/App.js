import AppRouter from "./Router";
import { useState, useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { AuthService } from "fbase";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userObj, setUserObj] = useState();
  const [init, setInit] = useState(false);

  useEffect(()=>{
    onAuthStateChanged(AuthService, (user) => {
      if(user){
        setIsLoggedIn(true);
        setUserObj({
          uid : user.uid,
          photoURL : user.photoURL,
          displayName : user.displayName,
          email : user.email,
          refreshUser : function(){
            const user = AuthService.currentUser;
            setUserObj((prev) => ({
              ...prev,  
              displayName : user.displayName,
            }));
          },
        });
      }else{
        setIsLoggedIn(false);
      }
      setInit(true);
    })
  },[]);
  return (
      <>
        {!init ? "initiallizing..." : (
          <>
            <AppRouter isLoggedIn = {isLoggedIn} userObj = {userObj}/>
            <footer>&copy;ToDoList {new Date().getFullYear()}</footer>
          </>
        )}
      </>
  );
}

export default App;
