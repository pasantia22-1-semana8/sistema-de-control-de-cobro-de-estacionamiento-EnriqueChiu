import React, { useEffect, useState } from 'react'
import api from '../services/Api'
import './styles/FormRegister.css'

function FormRegister(props) {

  const [listRol, setlistRol] = useState([])

  useEffect(()=>{
    (async () => {
      const data = await api.getData.rol()
      setlistRol(data)
    })();
  }, [])

  return (
    <>
      <form onSubmit={props.onSubmit}>
        <div className='form__input input-group-sm'>
          <label><h5 className='text-white '>Username</h5></label>
          <input className='form-control' type='text' name='username' onChange={props.onChange} value={props.formValues.username}/>
        </div>
        <div className='form__input input-group-sm'>
          <label><h5 className='text-white '>Email</h5></label>
          <input className='form-control' type='email' name='email' onChange={props.onChange} value={props.formValues.email}/>
        </div>
        <div className='form__input input-group-sm'>
          <label><h5 className='text-white '>Rol</h5></label>
          <select className='form-select' name='rol' onChange={props.onChange}>
            <option selected disabled >Seleccione el Rol</option>
            {listRol.map(rol=>(
              <option value={rol.id}>{rol.nombre}</option>
            ))}
          </select>
        </div>



        {props.error && (
            <h5 className="text-danger mt-4 ms-5">{props.error}</h5>
        )}

        <div className='container__button'>
          <button className='form__button' type="submit"><h5><strong>Crear Usuario</strong></h5></button>
        </div>
      </form>
    </>
  )
}

export default FormRegister