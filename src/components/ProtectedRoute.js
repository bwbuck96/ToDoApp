import React from 'react'
import {useAuth} from '../contexts/AuthContexts'
import { Navigate } from 'react-router-dom'

//Below we create a component that will serve as a redirect so we can lock down portions of our app.
export default function ProtectedRoute({children}) {
  const {currentUser} = useAuth()
  //Below we check to see that there's a user logged in...if so, render the child components. If not, redirect to the login page.
    return currentUser ? children : <Navigate to='/login' />
}
