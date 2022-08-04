import React, {useState, useEffect} from 'react'
import './ToDos.css' //TODO: Need to create the styling
import axios from 'axios' 
import {Container} from 'react-bootstrap' 
import SingleToDo from  './SingleToDo'
import FilterCat from './FilterToDos'

//Steps to Read functionality
//1. add useState and useEffect to the react import
//2. install and import axios
//3. create the hook to store the data
//4. create the function that uses axios to get the resources
//5. create useEffect to automate retrieval of data in this component
//----- You should now have your data stored, and now on to the UI
//6. use .map to render each category to the screen (also add any supplemental UI (container for the gallery)...combo of Resources/SingleResource)

export default function ToDos() {
  const [ToDos, setToDos] = useState([]);



  const getToDos = () => {
    axios.get(`http://localhost:65057/api/TodoItems`).then(response => {
    console.log(response)
    setToDos(response.data)
  })
  }
  useEffect(() => {
    getToDos()
  }, []);
  return (
    <h1>ToDos</h1>
  )
}
