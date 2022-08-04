import React from 'react'
import {Formik, Form, Field } from 'formik'
import catSchema from '../../utilities/validationSchema'
import axios from 'axios'

export default function CatForm(props) {
        const handleSubmit = (values) => {
            console.log(values)
            if(!props.category)
            {
                console.log('Create Mode')
                const catToCreate = values;

                axios.post(`http://localhost:65057/api/Categories`, catToCreate).then(() => {
                    //After the successful Post, we get a 200 which sends us here
                    props.setShowCreate(false)//closes the form
                    props.getCategories()//sends a GET request to the API 
                })
            }
            else 
            {
                console.log('Edit Mode')
                //Because we are in edit mode, the expected schema for this object is to include an ID.
                //So we add the ID below in our temporary object
                const catToEdit = {
                    CategoryId: props.category.CategoryId,
                    Name: values.Name, //Values are referring to the inputs (this is called Destructruring)
                    Description: values.Description
                }

                axios.put(`http://localhost:65057/api/Categories/${props.category.CategoryId}`, catToEdit).then(() => {
                    props.getCategories();
                    props.setShowEdit(false);
                })
            }
        }
 
    return (
    <div className='createCategory m-2 text-white text-center'>
        <Formik
            initialValues={{
                //Here we place a name for every input in the form, along with its initial values
                //Below we decide whether the inputs will have value or not, based on IF category is passed
                //into this component as a prop
                Name: props.category ? props.category.Name : '',
                Description: props.category ? props.category.Description : ''
            }}
            validationSchema={catSchema}
            onSubmit={(values) => handleSubmit(values)}
        >
            {({errors, touched}) => (
                <Form id='catForm' className='row text-center m-auto'>
                    <div className='form-group m-1 p-1'>
                        <Field name='Name' className='form-control' placeholder='Name' />
                        {errors.Name && touched.Name ? 
                        <div className='text-danger'>{errors.Name}</div>
                        : null}
                    </div>
                    <div className='form-group m-1 p-1'>
                        <Field name='Description' className='form-control' placeholder='Description' />
                        {errors.Description && touched.Description ? 
                        <div className='text-danger'>{errors.Description}</div>
                        : null}
                    </div>
                    <div className='form-group m-1 p-1'>
                        <button type='submit' className='btn btn-success'>Submit Category to API</button>
                    </div>
                </Form>
            )}
        </Formik>
    </div>
  )
}
