import { useState } from "react";
import { initializeApp } from "firebase/app";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import "./App.css";

initializeApp(JSON.parse(process.env.REACT_APP_FIREBASE_CONFIG!)); // Collect config from "https://console.firebase.google.com/u/0/project/your-project/settings/general/""

const App = () => {
  const [user, setUser] = useState({
    displayName: "",
    email: "",
    photoURL: "",
  });
  const auth = getAuth();
  const provider = new GoogleAuthProvider();
  const handleSignin = () => {
    signInWithPopup(auth, provider)
      .then((result: any) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        //const credential = GoogleAuthProvider.credentialFromResult(result);
        //const token = credential.accessToken;
        // The signed-in user info.
        const guser = result.user;
        setUser(guser);
        //document.write(JSON.stringify(guser.photoURL))
        // ...
      })
      .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log({ errorCode, errorMessage });
        // The email of the user's account used.
        //const email = error.email;
        // The AuthCredential type that was used.
        //const credential = GoogleAuthProvider.credentialFromError(error);
        // ...
      });
  };
  return (
    <div className="App">
      <header className="App-header">
        Hi from FireBase
        <button onClick={handleSignin}>Sign In</button>
        <h3>{user.displayName}</h3>
        <h4>{user.email}</h4>
        <img src={user.photoURL} alt="user" />
      </header>
    </div>
  );
};

export default App;
