import React, {useState, useEffect} from 'react'
import { Container } from 'react-bootstrap' 

//Above we brought in {useState} and {useEffect} (useEffect renders the data once the elemnt has been mounted to the virtual dom )
//Below we bring in axios after running 'npm install axios'
import axios from 'axios'
import { useAuth } from '../../contexts/AuthContexts';

import SingleCategory from './SingleCategory';
import CatCreate from './CatCreate';


//Steps to Read functionality
//1. add useState and useEffect to the react import
//2. install and import axios
//3. create the hook to store the data
//4. create the function that uses axios to get the categories
//5. create useEffect to automate retrieval of data in this component
//----- You should now have your data stored, and now on to the UI
//6. use .map to render each category to the screen (also add any supplemental UI (table and thead)...combo of Categories and SingleCategory)



export default function Categories() {
//hoook to store the data return by the API
const {currentUser} = useAuth()
const [categories, setCategories] = useState([]);
const [showCreate, setShowCreate] = useState(false);
const getCategories = () => {
    axios.get(`http://localhost:65057/api/Categories`).then(response => {
        console.log(response)
        setCategories(response.data)
    })
}

useEffect(() => {
    getCategories()
    
}, []);
    return (  
    <section className='categories'>
    <article className='bg-info p-5'>
        <h1 className='text-center'>
            Categories Dashboard
        </h1>
    </article>
    {/* CREATE UI */}
    {currentUser.email === process.env.REACT_APP_ADMIN_EMAIL &&
    <div className='bg-dark p-2 mb-3 text-center'>
        {showCreate ?
        <>
            <button onClick={() => setShowCreate(false)} className='btn btn-warning'>Cancel</button>
            <CatCreate
                getCategories={getCategories}
                setShowCreate={setShowCreate}
            />
        </>
        :
            <button onClick={() => setShowCreate(true)} className='btn btn-info'>Create Category</button>
        }
    </div>
    }
    {/* END CREATE UI */}
    <Container className='p-2'>
        <table className='table bg-info table-dark mt-3 mb-3'>
            <thead className='table-secondary text-uppercase'>
                <tr>
                    <th>Name</th>
                    <th>Description</th>  
                    {currentUser.email === process.env.REACT_APP_ADMIN_EMAIL &&
                    <th>Actions</th>
                    }  
                </tr>    
            </thead>
            <tbody>
                {categories.map(x =>
                        <SingleCategory 
                            key={x.CategoryId}
                            category={x}
                            getCategories={getCategories}
                            
                            />
                    )}
            </tbody>
        </table>
    </Container>
</section>
)
}