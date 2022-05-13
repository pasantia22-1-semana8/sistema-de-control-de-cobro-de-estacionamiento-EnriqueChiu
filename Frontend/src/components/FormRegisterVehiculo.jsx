import React, { useEffect, useState } from 'react'
import Modal from "react-bootstrap/Modal";
import api from '../services/Api';

import './styles/FormRegisterVehiculo.css';

function FormRegisterVehiculo(props) {

  const [show, setshow] = useState(false);

  const [tipoResidente, settipoResidente] = useState([]);
  const [tipoVehiculo, settipoVehiculo] = useState([]);

  useEffect(()=>{
    (async () => {
      const dataResidente = await api.getData.tipoResidente();
      const dataVehiculo = await api.getData.tipoVehiculo();
      settipoResidente(dataResidente);
      settipoVehiculo(dataVehiculo);
    })();
  }, [])


  const handleClose = () => {
    setshow(false)
  };

  const handleShow = () => {
    setshow(true)
  };

  return (
    <>
      <h1 className='home-info--title'>No. de placa o ticker no encontrado.</h1>
      <div className='container mt-5'>
        <div className='row'>
          <div className='col offset-4'>
            <button className='home_register' onClick={handleShow}>Registrar Vehiculo</button>
          </div>
        </div>
      </div>
      <Modal  size="xl" show={show} onHide={handleClose}>
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
          <Modal.Footer>
            <button className='btn btn-secondary' onClick={handleClose}>
              <h3>Cancelar</h3>
            </button>
            <button className='btn btn-primary ms-5' onClick={handleClose}>
              <h3>Registrar</h3>
            </button>
          </Modal.Footer>
          </form>
        </Modal.Body>
        </div>
      </Modal>
    </>
  )
}

export default FormRegisterVehiculo