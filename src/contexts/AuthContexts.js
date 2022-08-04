//We will create a React context in this file that will hosue all authentication info (current user, login, logout)
//Context allow us to store info and transport that info to the components that want to use it.
//We could store this in the App, but we would have to pass our current user as a prop
//throughout the entire application (multiple component levels): we call this prop drilling. We want to avoid this...
//Think of this much like the Session storage in the .NET environment.

import React, {useContext, useState, useEffect} from 'react'
import { auth } from '../base' //gives access to the auth object - intitializes authentication from Firebase.
import { GithubAuthProvider, signInWithPopup, signOut } from 'firebase/auth'
//Create a context (storage object)

const AuthContext = React.createContext()

//Below we create a function that will invoke the context. This is what we will import into each component that needs Auth info.
export function useAuth(){
    return useContext(AuthContext)
}

//children below refers to any child components (any components nested inside of the <AuthProvider></AuthProvider>)
export default function AuthProvider({children}) {
  //hook that will store the currentUser
  const [currentUser, setCurrentUser] = useState();
  //hook that will manage when the children load in the virtual dom
  const [loading, setLoading] = useState(true);

//   //The value object is the prop passed in a React context. This will house currentUser, login, and logout - the info we want to pass to components
// const value = {currentUser}

async function login(){
    //Use Firebase functions and objects to sign in thru the Firebase app, which collects info from GitHub
    const githubAuthProvider = new GithubAuthProvider();

    return (signInWithPopup(auth, githubAuthProvider).then(authData => {
        //This is where we store the user info...I could also handle other 
        //functionality in this place in the code (saving the user to a db)
        console.log(authData)

        setCurrentUser(authData.user)
    }))
}

async function logout(){
    signOut(auth).then(setCurrentUser(null))
}

const value = {currentUser, login, logout}

//automate this compoenent to listen for a change in the user and likewise store the information
useEffect(() => {
    //authChange will use Firebase functionality to get user info, set the currentUser hook to the value retrieved, and also allow components to load
    //after that info has been retrieved
    const authChange = auth.onAuthStateChanged(user => {
        setCurrentUser(user)
        setLoading(false)
    })
    
    return authChange;
}, []);
    return (
    <AuthContext.Provider value={value}>
        {/* The conditional rendering below waits for user info to load from the context, before loading the children.
        in the virtual DOM */}
        {!loading && children}
    </AuthContext.Provider>
    

  )
}
