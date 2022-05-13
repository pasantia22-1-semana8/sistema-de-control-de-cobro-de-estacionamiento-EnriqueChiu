import React, { useEffect, useState } from 'react'
import Modal from "react-bootstrap/Modal";
import api from '../services/Api';

import './styles/FormRegisterVehiculo.css';

function ShowRegistroCaja(props) {

  const [show, setshow] = useState(false);
  const [caja, setcaja] = useState([]);
  const [key, setkey] = useState([]);
  useEffect(()=>{
    (async () => {
      const dataCaja = await api.getData.cajaAll()
      setcaja(dataCaja);
      setkey(Object.keys(dataCaja[0]));
    })();
  }, [])


  const handleClose = () => {
    setshow(false)
  };

  const handleShow = () => {
    updateData()
    setshow(true)
  };

  const updateData = async () =>{
    const dataCaja = await api.getData.cajaAll()
    setcaja(dataCaja);
  }

  return (
    <>
      <button className='btn btn-warning ms-5 mt-2' onClick={handleShow}>VER REGISTRO</button>
          
      <Modal  size="xl" show={show} onHide={handleClose}>
        <div className='container__modal'>
        <Modal.Body>
          <table className='table table-dark table-hover'>
          <thead>
            <tr>
              {key.map((item, index)=>(
                <th scope="col" key={index}>{item}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {caja.map((items, index)=>(
              <tr key={index+items['id']}>
                {Object.values(items).map(item=>(
                  <td>{item.toString()}</td>
                ))}
              </tr>
            ))}
          </tbody>
          </table>
        </Modal.Body>
        </div>
      </Modal>
    </>
  )
}

export default ShowRegistroCaja