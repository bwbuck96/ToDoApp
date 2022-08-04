import React from 'react'
import {useAuth} from '../../contexts/AuthContexts' 
import { Link } from 'react-router-dom'

export default function Welcome() {
    const {currentUser} = useAuth()
  return (
    <section>
        {currentUser !== null &&
        <div>
            <h2>Welcome {currentUser.Name}</h2>
        </div>
        }
        {currentUser === null && 
        <>
        <div>
            <h2>Welcome to HoneyDew!</h2>
        </div>
        <div>
            <p>Please use the button below to sign in</p>
        </div>
        <Link to='../../App.js'>
        <button 
            type='button'
            className='btn btn-info'>
                Sign In
            </button>
            </Link>
            </>
        }
    </section>
  )
}
