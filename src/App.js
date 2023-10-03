import React, { useState } from "react";

import Header from "./Component/Header";

import Sidebar from "./Component/Sidebar";
import Data from "./Component/Data";
import { auth, provider } from "./firebase";
function App() {
  const [user, setUser] = useState(null);
  const signIn = () => {
    auth
      .signInWithPopup(provider)
      .then(({ user }) => {
        setUser(user);
      })
      .catch(error => {
        alert(error.message);
      })
  };
  return (
    <>
      {user ? (
        <>
          <Header photoURL={user.photoURL} />
          <div className="App">
            <Sidebar />
            <Data />
          </div>
        </>
      ) : (
        <div className="loginWrap">
          <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/d/da/Google_Drive_logo.png/768px-Google_Drive_logo.png" />
          <button onClick={signIn}>Login to Google Drive Clone</button>
        </div>
      )}
    </>
  );
}

export default App;
