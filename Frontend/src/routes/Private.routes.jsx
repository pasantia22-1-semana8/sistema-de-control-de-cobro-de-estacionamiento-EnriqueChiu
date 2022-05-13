import React from 'react'
import { Navigate, useNavigate } from 'react-router-dom'

function PrivateRoutes(props) {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user'))

  return (
  
    user == null
    ?
      <Navigate to='/login'/>
    :
    <>
      {
        user.rol==props.rol 
        ? 
          <props.component /> 
        : 
        <div className='container'>
          <h1>USTED NO TIENE PERMISO NECESARIO PARA ACCEDER A ESTA RUTA</h1>
          <button className='btn btn-danger' onClick={() => navigate(-1)}>REGRESAR A LA PAG ANTERIOR</button>
        </div>
      }
    </>
      
  )
}

export default PrivateRoutes