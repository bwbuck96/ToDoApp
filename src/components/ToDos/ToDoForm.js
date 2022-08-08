import React, {useState, useEffect} from 'react'
import { Formik, Field, Form } from 'formik'
import toDoSchema from '../../utilities/validationSchema' //Update after build
import axios from 'axios'

export default function ResourceForm(props) {
    //Create a hook that will capture the categories and store them for our select list in the form
    const [categories, setCategories] = useState([]);
    const [statuses, setStatuses] = useState([]);
    
    const getCategories = () => {
        axios.get(`http://api.buckthedev.com/api/Categories`).then(response => setCategories(response.data))
    }

    const getStatuses = () => {
        axios.get(`http://api.buckthedev.com/api/Statuses`).then(response => setStatuses(response.data))
    }

    const handleSubmit = (values) => {
        console.log(values)
        if (!props.resource) {
            console.log('Create Mode')
            //Create a temporary object that will be used to send the data to the API
            const toDoToCreate = values;

            //Send the POST request to the API

            axios.post(`http://api.buckthedev.com/api/todoitems/`, toDoToCreate).then(() => {
                props.setShowCreate(false);//Close the form
                props.getToDos()//update the resources from the API (think like a refresh)
            })
        }
        else{
            console.log('Edit Mode')
            //Below is a spread operator. So we take the entire values object and add a new key called ResourceId
            //to that object. It's just a shorthand syntax so you don't have to create the entire resource again.
            const toDoToEdit = {...values, ToDoId: props.toDos.ToDoId};
            console.log(toDoToEdit)
            axios.put(`http://api.buckthedev.com/api/todoitems/`, toDoToEdit).then(() => {
                props.setShowEdit(false);
                props.getToDos()
            })
        }
    }

    useEffect(() => {
        getCategories()
    }, []);

    useEffect(() => {
        getStatuses()
    }, []);


    return (
    <Formik
        initialValues={{
            Name: props.toDo ? props.toDo.Name: '',
            StatusId: props.toDo ? props.toDo.StatusId : '',
            Description: props.toDo ? props.toDo.Description : '',
            CategoryId: props.toDo ? props.toDo.CategoryId : ''
        }}
        validationSchema={toDoSchema}
        onSubmit={(values) => handleSubmit(values)}
    >
        {({errors, touched}) => (
            <Form id='toDoForm'>
                <div className='form-group m-3'>
                    <Field name='Name' className='form-control' placeholder='Name' />
                    {errors.Name && touched.Name ? (
                        <div className='text-danger'>{errors.Name}</div>
                    ) : null}
                </div>
                <div className='form-group m-3'>
                    <Field name='Description' className='form-control' placeholder='Description' />
                    {errors.Description && touched.Description ? (
                        <div className='text-danger'>{errors.Description}</div>
                    ) : null}
                </div>
                <div className='form-group m-3'>
                    <Field as='select' name='StatusId' className='form-control'>
                        <option value='' disabled>[--- Please Choose ---]</option>
                    {statuses.map(stat =>
                            <option key={stat.StatusId} value={stat.StatusId}>
                                {stat.StatusName}
                            </option>
                            )}
                    {errors.StatusId && touched.StatusId ? (
                        <div className='text-danger'>{errors.StatusId}</div>
                    ) : null}
                    </Field>
                </div>
                <div className='form-group m-3'>
                    <Field as='select' name='CategoryId' className='form-control'>
                        <option value='' disabled>[--- Please Choose ---]</option>
                        {/* Below we will map each category to an option in list. */}
                    {categories.map(cat =>
                        <option key={cat.CategoryId} value={cat.CategoryId}>
                            {cat.Name}
                        </option>
                    )}
                    </Field>
                </div>
                <div className='form-group m-3'>
                    <button type='submit' className='btn btn-info m-3'>Submit Resource to API</button>
                </div>
            </Form>
        )}
    </Formik>
  )
}
