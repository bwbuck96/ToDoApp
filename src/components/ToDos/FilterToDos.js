import React, {useState, useEffect} from 'react'
import axios from 'axios' 




export default function FilterToDos(props) {
//Accessing and storing Categories, useState below
const [categories, setCategories] = useState([]);

//useEffect firing off API request (when the component is mounted to the virtual dom) below
useEffect(() => {
    axios.get(``).then(response => {
      console.log(response)
      setCategories(response.data)  
    })
}, []);

//TODO: Modify the below to align with ToDoAPI information
return (
    <div className='text-center mt-5'>
        <button className='btn btn-outline-info bg-dark m-1' onClick={() => props.setFilter(0)} >All</button>
        {/* Below, we map all of the categories to a button that will be used to filter resources on that Category */}
        {categories.map(cat => 
            <button key={cat.CategoryId} className='btn btn-outline-info bg-dark m-1' onClick={() => props.setFilter(Number(cat.CategoryId))}>
                {cat.CategoryName}
            </button>
            )}
    </div>
  )
}