import React from 'react'

export default function Header(props) {
    const current = new Date();
    const date = `${current.getDate()}/${current.getMonth()+1}/${current.getFullYear()}`;
  return (
    <section>
        <div className='header'>
    <h1>Hello {props.user}</h1>
    <h3>Always more for you ToDo</h3>
    <p>{date}</p>
    </div>
    </section>
  )
}
