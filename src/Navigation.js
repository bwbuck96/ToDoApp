import React from 'react'
import {Nav, Navbar} from 'react-bootstrap' 
import {Link} from 'react-router-dom' 
import { useAuth } from './contexts/AuthContexts'
import './App.css'
import { useNavigate } from 'react-router-dom'
import { AiFillGithub } from 'react-icons/ai'


export default function Navigation() {
    const {login} = useAuth()
    const navigate = useNavigate()

    const handleLogin = async () => {
        await login()
        //call navigate function from react-router-dom to navigate to the component that will render as the home.
        return navigate('/')

    }

    const {currentUser} = useAuth()
  return (
    <Navbar expand='md' className='customNav p-3'>
        <Navbar.Brand href='/' className='rounded p-2'>HoneyDew 
        {currentUser !== null && <img src={currentUser.photoURL} alt={currentUser.DisplayName} />}
        </Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse className='justify-content-end'>
            <Nav>

                {currentUser &&
                <>
                <Link to='/' className='customLink rounded p-2'>Home</Link>
                <Link to='/todos' className='customLink rounded p-2'>ToDos</Link>
                <Link to='/categories' className='customLink rounded p-2'>Categories</Link>
                </>
                }

                {!currentUser && 
                <>
                <Link to='/' className='nav-link'>
                    Home
                </Link>
                </>
                }
            </Nav>
        </Navbar.Collapse>
    </Navbar>
  )
}
