import React from 'react'
import {Modal} from 'react-bootstrap'
import ToDoForm from './ToDoForm'

export default function ToDoEdit(props) {
  return (
    <Modal
        show={props.showEdit}
        onHide={() => props.setShowEdit(false)}
    >
        <Modal.Header className='modalHead' closeButton>
            <h3>Editing {props.todoitem.Name}</h3>
        </Modal.Header>
        <Modal.Body>
            <ToDoForm 
                setShowEdit={props.setShowEdit}
                getToDos={props.getToDos}
                todo={props.todo}

            />
        </Modal.Body>
    </Modal>
  )
}
