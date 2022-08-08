import React from 'react'
import {useAuth} from '../../contexts/AuthContexts' 
import { useNavigate } from 'react-router-dom'
import Profile from './Profile' 


export default function Logout() {
    const {logout} = useAuth()
    const navigate = useNavigate()
    function handleAuth(){
        logout();
        //navigate the user to the homepage - need useNavigate object from the react-router-dom
        navigate ('/')
    }
    return (
        <div className='text-center p-3 customFooter'>
        <Profile />
        <button onClick={() => handleAuth()} className='customBtn'>Logout</button>
    </div>
  )
}
