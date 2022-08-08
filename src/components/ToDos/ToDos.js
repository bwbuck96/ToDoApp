import React, {useState, useEffect} from 'react'
import './ToDos.css' //TODO: Need to create the styling
import axios from 'axios' 
import {Container} from 'react-bootstrap' 
import SingleToDo from  './SingleToDo'
import FilterCat from './FilterCategory'
import { useAuth } from '../../contexts/AuthContexts'
import ToDoCreate from './ToDoCreate'


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


  const [filter, setFilter] = useState(0);



  const getToDos = () => {
    axios.get(`http://api.buckthedev.com/api/todoitems/`).then(response => {
    console.log(response)
    setToDos(response.data)
  })
  }
  useEffect(() => {
    getToDos()
  }, []);


const {currentUser} = useAuth()
const [showCreate, setShowCreate] = useState(false);

  return (
    <section className='todos'>
      <article className='dashboard p-5'>
        <h1 className='text-center'>ToDos Dashboard</h1>
      </article>
     
        <FilterCat setFilter={setFilter} />
        <Container >
          <article className='toDoGallery row justify-content-center'>
            {filter === 0 ? ToDos.map(x => 
              <SingleToDo
                key={x.ToDoId}
                todoitem={x}
                getToDos={getToDos}
                />
              ) :
              ToDos.filter(x => x.ToDoId === filter).map(x =>
                <SingleToDo
                  key={x.ToDoId}
                  todoitem={x}
                  getToDos={getToDos}
                  />
                )
              }
              {filter !== 0 && ToDos.filter(x => x.CategoryId === filter).length === 0 &&
                <h2 className='alert alert-warning text-dark'>
                  There are no results for this category
                  </h2>
                  }
                   {/* Call the CREATE UI below */}
      {currentUser.email === process.env.REACT_APP_ADMIN_EMAIL &&
      <div className='p-2 mb-3 text-center'>
        <button className={!showCreate ? 'btn btn-success' : 'btn btn-danger'} onClick={() => setShowCreate(!showCreate)}>
        {!showCreate ? 'Create New ToDo Item' : 'Close Form'}
        </button>
        <div className='createContainer'>
          {showCreate &&
          <ToDoCreate 
              setShowCreate={setShowCreate}
              getToDos={getToDos} />
            }
          </div>
        </div>
        }
        {/* End of Create UI */}
          </article>
        </Container>
    </section>
  )
}
