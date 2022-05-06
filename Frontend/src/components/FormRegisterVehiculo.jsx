import React, { useEffect, useState } from 'react'
import Modal from "react-bootstrap/Modal";
import api from '../services/Api';

import './styles/FormRegisterVehiculo.css'

function FormRegisterVehiculo(props) {


  const [tipoResidente, settipoResidente] = useState([])
  const [tipoVehiculo, settipoVehiculo] = useState([])
  const [tarifa, settarifa] = useState([])
  


  useEffect(()=>{
    (async () => {
      const dataResidente = await api.getData.tipoResidente()
      const dataVehiculo = await api.getData.tipoVehiculo()
      const dataTarifa = await api.getData.tarifa()
      settipoResidente(dataResidente)
      settipoVehiculo(dataVehiculo)
      settarifa(dataTarifa)
    })();
  }, [])


  return (
    <Modal  size="xl" show={props.show} onHide={props.handleClose}>
      <div className='container__modal'>
      <Modal.Body>
        <form onSubmit={props.onSubmit}>
          <div className='form__input'>
            <label><h3 className='text-white'>No. de Placa</h3></label>
            <input className='form-control' type='text' name='no_placa' onChange={props.onChange} value={props.formValues.no_placa}/>
          </div>
          <div className='form__input'>
            <label><h3 className='text-white'>Descripcion</h3></label>
            <input className='form-control' type='text' name='descripcion' onChange={props.onChange} value={props.formValues.descripcion}/>
          </div>
          <div className='form__input'>
            <div className='row'>
              <div className='col-6'>
                <label><h3 className='text-white'>Tipo Vehiculo</h3></label>
                <select className='form-select' name='tipo_vehiculo' onChange={props.onChange}>
                  <option selected disabled >Seleccione el tipo</option>
                  {tipoVehiculo.map(tipo=>(
                    <option key={tipo.id} value={tipo.id}>{tipo.nombre}</option>
                  ))}
                </select>
              </div>
              <div className='col-6'>
                <label><h3 className='text-white'>Tipo Residente</h3></label>
                <select className='form-select' name='tipo_residente' onChange={props.onChange}>
                  <option selected disabled >Seleccione el tipo</option>
                  {tipoResidente.map(tipo=>(
                    <option key={tipo.id} value={tipo.id}>{tipo.nombre}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>
          <div className='form__input'>
            <label><h3 className='text-white'>Tarifa</h3></label>
            <select className='form-select' name='tarifa' onChange={props.onChange}>
              <option selected disabled >Seleccione el tipo</option>
              {tarifa.map(tipo=>(
                <option key={tipo.id} value={tipo.id}>{tipo.tarifa}</option>
              ))}
            </select>
          </div>
        </form>
      </Modal.Body>
      <Modal.Footer>
        <button className='btn btn-secondary' onClick={props.handleClose}>
          <h3>Cancelar</h3>
        </button>
        <button className='btn btn-primary ms-5' type="submit">
          <h3>Registrar</h3>
        </button>
      </Modal.Footer>
      </div>
    </Modal>
  )
}

export default FormRegisterVehiculo