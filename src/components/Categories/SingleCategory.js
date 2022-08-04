import React, {useState} from 'react'
import { useAuth } from '../../contexts/AuthContexts'
import {AiFillEdit, AiFillDelete} from 'react-icons/ai'
import CatEdit from './CatEdit';
import axios from 'axios';

export default function SingleCategory(props) {
  const {currentUser} = useAuth()
  const [showEdit, setShowEdit] = useState(false);
  const deleteCat = (id) => {
    if (window.confirm(`Are you sure you want to delete ${props.category.Name}?`))
    axios.delete(`http://localhost:65057/api/Categories/${id}`).then(() => {props.getCategories()})
  }
  return (
    <tr>
        <td>{props.category.Name}</td>
        <td>{props.category.Description}</td>
        {currentUser.email === process.env.REACT_APP_ADMIN_EMAIL &&
        <td>
          <button className='m-1 rounded' id='editLink' onClick={() => setShowEdit(true)}>
            <AiFillEdit />
          </button>
          <button onClick={() => deleteCat(props.category.CategoryId)} id='deleteLink' className='m-1 rounded'>
              <AiFillDelete />
          </button>
          {showEdit &&
          <CatEdit 
            setShowEdit={setShowEdit}//This closes the modal
            showEdit={showEdit}//this OPENS the modal
            getCategories={props.getCategories}
            category={props.category} />
            }
        </td>}
    </tr>
  )
}
