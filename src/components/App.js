import AppRouter from "./Router";
import { useState } from "react";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  return (
      <>
        <AppRouter/>
        <footer>&copy;ToDoList {new Date().getFullYear()}</footer>
      </>
  );
}

export default App;
