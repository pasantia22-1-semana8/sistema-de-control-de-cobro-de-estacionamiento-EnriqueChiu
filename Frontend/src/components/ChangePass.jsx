import React, { useState } from 'react'
import Modal from "react-bootstrap/Modal";
import api from '../services/Api';

function ChangePass(props) {
  const [show, setshow] = useState(false);
  const [Data, setData] = useState(props.user)

  const handleClose = () => {
    setshow(false)
  };

  const handleShow = () => {
    setshow(true)
  };




  const handleChange = e => {
    setData({
      ...Data,
      [e.target.name]: e.target.value,
    })
  }

  const handleSumbit = async e =>{
    e.preventDefault();
    try {
      let response = await api.user.update(Data.id, Data)
      alert(response.message)
    } catch (error) {
      alert(error)
    }
  }


  return (
    <div className="navbar-nav">
      <button  onClick={handleShow} type='submit' className='nav__logout bg-transparent border-0'>
        Username: {props.user.username}
        
      </button> 
      <Modal  size="xl" show={show} onHide={handleClose}>
        <div className='container__modal'>
        <Modal.Body>
          <h1 className='text-white'>Cambiar Password</h1>
          <form onSubmit={handleSumbit}>
            <div className='form__input'>
              <label><h3 className='text-white'>Password actual</h3></label>
              <input className='form-control' type='password' name='pass_old' onChange={handleChange}/>
            </div>
            <div className='form__input'>
              <label><h3 className='text-white'>Password nuevo</h3></label>
              <input className='form-control' type='password' name='pass_new' onChange={handleChange}/>
            </div>
            <div className='form__input'>
              <label><h3 className='text-white'>Confirmar password nuevo</h3></label>
              <input className='form-control' type='password' name='conf_pass_new' onChange={handleChange}/>
            </div>
          <Modal.Footer>
            <button className='btn btn-secondary' onClick={handleClose}>
              <h3>Cancelar</h3>
            </button>
                  
            <button className='btn btn-primary ms-5' onClick={handleClose}>
              <h3>Cambiar</h3>
            </button>
          </Modal.Footer>
          </form>
        </Modal.Body>
        </div>
      </Modal> 
    </div>
  )
}

export default ChangePass