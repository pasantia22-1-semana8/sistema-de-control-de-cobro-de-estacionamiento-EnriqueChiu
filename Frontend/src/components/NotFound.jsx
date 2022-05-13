import React from 'react'
import { Link } from 'react-router-dom'

import './styles/NotFound.css'

function NotFound(props) {

  const user = JSON.parse(localStorage.getItem('user'))

  return (
    <>
      <div className='container'>
        <h1>ERROR 404 NOT FOUND</h1>
        {
          user== null
          ?
          <Link to='/login' className='link'><button className='btn btn-warning'>IR A LA PAGINA DE LOGIN</button></Link> 
          :
          user.rol == 'admin'
          ?
            <Link to='/config' className='link'><button className='btn btn-warning'>IR A LA PAGINA DE CONFIGURACIONES</button></Link>
          :
            <Link to='/home' className='link'><button className='btn btn-warning'>IR A LA PAGINA DE HOME</button></Link>
        }
        
      </div>

    </>
  )
}

export default NotFound