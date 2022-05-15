import React, { useEffect, useState } from 'react'
import api from '../services/Api'
import PageLoading from './PageLoading'

function FormTarifa(props) {
  const [tipoResidente, settipoResidente] = useState([])
  const [tipoVehiculo, settipoVehiculo] = useState([])

  useEffect(()=>{
    (async () => {
      const dataResidente = await api.getData.tipoResidente()
      const dataVehiculo = await api.getData.tipoVehiculo()
      
      settipoResidente(dataResidente)
      settipoVehiculo(dataVehiculo)
    })();

  }, [])

 

  return (
    <>
      <form onSubmit={props.onSubmit}>
        <div className='form__input input-group-sm'>
          <label><h5 className='text-white '>Tipo Vehiculo</h5></label>
          <select className='form-select' name='tipo_vehiculo' onChange={props.onChange} >
            <option selected disabled >Seleccione el tipo</option>
            {tipoVehiculo.map(tipo=>(
              <option value={tipo.id}>{tipo.nombre}</option>
            ))}
            
          </select>
        </div>
        <div className='form__input input-group-sm'>
          <label><h5 className='text-white '>Tipo Residente</h5></label>
          <select className='form-select' name='tipo_residente' onChange={props.onChange}>
            <option selected disabled >Seleccione el tipo</option>
            {tipoResidente.map(tipo=>(
              <option value={tipo.id}>{tipo.nombre}</option>
            ))}
          </select>
        </div>
        <div className='form__input input-group-sm'>
          <label><h5 className='text-white'>Tarifa</h5></label>
          <input className='form-control' type='number' name='tarifa' onChange={props.onChange} value={props.formValues.tarifa}/>
        </div>
        <div className='form__input input-group-sm'>
          <label><h5 className='text-white '>Descripcion</h5></label>
          <input className='form-control' type='text' name='descripcion' onChange={props.onChange} value={props.formValues.descripcion}/>
        </div>
        {props.error && (
            <h4 className="text-danger mt-3 ms-5 mb-3">{props.error}</h4>
        )}

        <div className='container__button'>
          <button className='form__button' type="submit"><h5><strong>Crear Tarifa</strong></h5></button>
        </div>
      </form>
    </>
  )
}

export default FormTarifa