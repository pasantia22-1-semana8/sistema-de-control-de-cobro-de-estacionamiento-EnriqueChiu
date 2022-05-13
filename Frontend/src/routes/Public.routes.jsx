import React from 'react'
import { useNavigate } from 'react-router-dom'

function PublicRoutes(props) {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user'))

  return (
  
    user == null
    ?
      <props.component />
    :
    <div className='container'>
      <h1>USTED ESTA LOGEADO EN UNA CUENTA NO PUEDE ACCEDER A LA RUTA LOGIN</h1>
      <button className='btn btn-danger' onClick={() => navigate(-1)}>REGRESAR A LA PAG ANTERIOR</button>
    </div>
      
  )
}

export default PublicRoutes