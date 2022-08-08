import React from 'react'
import {useAuth} from '../../contexts/AuthContexts' 
import { Container, Card } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import {AiFillGithub} from 'react-icons/ai'
import Profile from '../Auth/Profile'
import './HoneyDo.css'

export default function Welcome() {
    
    const {currentUser} = useAuth()
    const {login} = useAuth()
    const navigate = useNavigate()

    const handleLogin = async () => {
        await login()
        //call navigate function from react-router-dom to navigate to the component that will render as the home.
        return navigate('/')
    }
    
  return (
    <section className='welcome'>
        {currentUser !== null &&
        navigate('/todos')
        }
        {currentUser === null && 
        <>
        <div>
            <h2>Welcome to HoneyDew!</h2>
        </div>
        <Container >
            <Card className='m-2 border-dark text-center'>
                <Card.Header className='bg-dark text-white'>
                    <h2>Please sign in for full functionality</h2>
                </Card.Header>
                <Card.Body>
                    <button className='btn btn-success m-1 col-md-1' onClick={() => handleLogin()}><AiFillGithub /></button>
                    {/* <button className='btn btn-success m-1 col-md-1' onClick={() => handleLogin()}><AiFillGithub /></button>
                    <button className='btn btn-success m-1 col-md-1' onClick={() => handleLogin()}><AiFillGithub /></button> Alternative Login Options? */}
                </Card.Body>
            </Card>
    </Container>
            </>
        }
    </section>
  )
}
