import React from 'react'
import { useAuth } from '../../contexts/AuthContexts'
import './Auth.css' 


export default function Profile() {
  const {currentUser} = useAuth()
    return (
        <span className='profile p-2'>
        {/* Hello {currentUser.displayName.split(' ')[0]}! */}
        <img src={currentUser.photoURL} alt={currentUser.displayName} />
        {currentUser.displayName.split(' ')[0]}
          
    </span>
  )
}
