import React from 'react'
import { useAuth } from '../contexts/AuthContexts'
import Logout from './Auth/Logout' 
import '../App.css'

export default function Footer() {
  const {currentUser} = useAuth()
    return (
        <>
        {currentUser &&
        //If there is a currentUser, this will render the component to logout with.
        <Logout />
        }
        <footer className='text-center customFooter p-4'>
            <strong>&copy; {new Date().getFullYear()} All Rights Reserved</strong>
        </footer>
        </>

  )
}
