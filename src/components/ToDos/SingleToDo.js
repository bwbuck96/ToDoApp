import React, {useState} from 'react'

export default function SingleToDo(props) {
    return (
      <div className='singleToDo col-md-5 m-4'>
          <h3>{props.todo.Name}</h3>
          {props.todo.Description !== null ?
              <p>{props.todo.Description}</p> :
              <p>No Description Provided</p>
          }
          {/* below is probably unneccessary. Look at removing after */}
          <a href={props.todo.Url} target='_blank' rel='noreferrer' className='btn btn-info'>Visit {props.resource.LinkText}</a>
      </div>
    )
  }
  