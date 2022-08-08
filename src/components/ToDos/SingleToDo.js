import React, {useState} from 'react'
import {AiFillEdit, AiFillDelete} from 'react-icons/ai' //For EDIT/DELETE icons
import { useAuth } from '../../contexts/AuthContexts'
import axios from 'axios'
import ToDoEdit from './ToDoEdit'


export default function SingleToDo(props) {
  const {currentUser} = useAuth()
  const deleteToDo = (id) => {
    if (window.confirm(`Are you sure you want to delete ${props.todoitem.Name}?`)) {
    axios.delete(`http://api.buckthedev.com/api/todoitems/${id}`).then(() => {
      props.getToDos();
    })
  }
}  
  const [showEdit, setShowEdit] = useState(false);
  return (
    <div className='singleToDo col-md-8'>
      {currentUser.email === process.env.REACT_APP_ADMIN_EMAIL &&
        <div>
          <button id='editLink' onClick={() => setShowEdit(true)}>
          <AiFillEdit />
          </button>
          <button id='deleteLink' onClick={() => deleteToDo(props.todoitem.ToDoId)}>
            <AiFillDelete />
          </button>
          {showEdit &&
            <ToDoEdit 
              todoitem={props.todoitem}
              setShowEdit={setShowEdit}
              getToDos={props.getToDos}
              showEdit={showEdit}/>
          }
        </div>
      }
        <h3>{props.todoitem.Name}</h3>
        {props.todoitem.Description !== null ?
            <p>{props.todoitem.Description}</p> :
            <p>No Description Provided</p>
        }
            <p>{props.todoitem.StatusName}</p>
    </div>
  )

}
