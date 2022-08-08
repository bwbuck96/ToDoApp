//This component will house a button for each category,
//as well as an All button, to remove filtering in Resources.js

import React, {useState, useEffect} from 'react'
import axios from 'axios' 




export default function FilterCat(props) {
  //We need to access and store categories from the API
  const [categories, setCategories] = useState([])

  //use useEffect to fire off our API request each time the component mounts
  useEffect(() => {
    axios.get(`http://api.buckthedev.com/api/Categories`).then(response => {
        console.log(response)
        setCategories(response.data)
    })
}, [])

    return (
    <div className='text-center mt-5'>
        <button className='btn btn-outline-success bg-dark m-1' onClick={() => props.setFilter(0)} >All</button>
        {/* Below, we map all of the categories to a button that will be used to filter resources on that Category */}
        {categories.map(cat => 
            <button key={cat.CategoryId} className='btn btn-outline-success bg-dark m-1' onClick={() => props.setFilter(Number(cat.CategoryId))}>
                {cat.Name}
            </button>
            )}
    </div>
  )
}
