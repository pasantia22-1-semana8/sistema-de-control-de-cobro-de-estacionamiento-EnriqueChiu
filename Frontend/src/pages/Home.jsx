import React, { Component } from 'react'
import FormRegisterVehiculo from '../components/FormRegisterVehiculo'
import Nav from '../components/Nav'
import api from '../services/Api'
import './styles/Home.css'

export default class Home extends Component {
  state = {
    error: null,
    loading: false,
    form:{
      id: ''
    },
    dataFlag: false,
    data: [],
    modal:{
      show: false
    },
    modalData:{
      no_placa: '',
      tipo_residente: '',
      tipo_vehiculo: '',
      descripcion: '',
      tarifa: 0
    }
  }

  handleClose = () => {
    this.setState({
      modal: {
        show: false
      }
    })
  };

  handleShow = () => {
    this.setState({
      modal: {
        show: true
      }
    })
  };

  handleSumbit = async e =>{
    e.preventDefault();
    this.setState({loading: true, error: null, data:[], dataFlag:false});
    try {
      let response = await api.getData.ticker(this.state.form.id)
      console.log(reponse)
      this.setState({dataFlag: true, data: response})
      console.log(response)
    } catch (error) {
      this.setState({loading: false, error: error})
    }
  }

  handleChange = e => {
    this.setState({
      form:{
        ...this.state.form,
        [e.target.name]: e.target.value,
      }
    })
  }

  handleChangeModal = e => {
    this.setState({
      modalData:{
        ...this.state.modalData,
        [e.target.name]: e.target.value,
      }
    })
    
  }

  handleSumbitModal = async e =>{
    e.preventDefault();
    this.setState({loading: true, error: null, data:[], dataFlag:false});
    try {
      let response = await api.getData.ticker(this.state.form.id)
      this.setState({dataFlag: true, data: response})
      console.log(response)
    } catch (error) {
      this.setState({loading: false, error: error})
    }
  }


  render() {
    return (
      <div className='container__home'>
        <Nav />
        <div className='container'>
          <form onSubmit={this.handleSumbit}>
            <h1 className='home__title'>Buscar por No.Placa o No.Ticker</h1>
            <div className='row'>
              <div className='col-10'>
                <input name='id' type="text" className='input__custom rounded' onChange={this.handleChange} value={this.state.form.id}/>
              </div>
              <div className='col-2'>
                <button className='home__btn' type='subimt'>Buscar</button>
              </div>
            </div>
          </form>
        </div>
        <div className='container home__info'>
          
          {
            this.state.dataFlag
            ?
            <h1>hola</h1>
            :
            <>
            
              <h1 className='home-info--title'>No. de placa o ticker no encontrado.</h1>
              <div className='container mt-5'>
                <div className='row'>
                  <div className='col offset-4'>
                    <button className='home_register' onClick={this.handleShow}>Registrar Vehiculo</button>
                  </div>
                </div>
              </div>
              <FormRegisterVehiculo 
              onChange={this.handleChangeModal} 
              handleShow={this.handleShow} 
              handleClose={this.handleClose} 
              show={this.state.modal.show}
              formValues={this.state.modalData}
              />
            </>

          }
        </div>
      </div>
    )
  }
}
