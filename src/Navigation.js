import React from 'react'
import {Nav, Navbar} from 'react-bootstrap' 
import {Link} from 'react-router-dom' 
import { useAuth } from './contexts/AuthContexts'


export default function Navigation() {

    const {currentUser} = useAuth()
  return (
    <Navbar expand='md' variant='dark' bg='dark' className='p-3'>
        <Navbar.Brand href='/'>ToDo App</Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse className='justify-content-end'>
            <Nav>
                {currentUser &&
                <>
                <Link to='/resources' className='nav-link'>Resources</Link>
                <Link to='/categories' className='nav-link'>Categories</Link>
                </>
                }
                <Link to='/' className='nav-link'>Home</Link>
                {!currentUser && 
                <>
                <Link to='/login' className='nav-link'>
                    Login
                </Link>
                <Link to='/todos' className='nav-link'>
                    ToDos
                </Link>
                </>
                }
            </Nav>
        </Navbar.Collapse>
    </Navbar>
  )
}
