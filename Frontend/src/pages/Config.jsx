import React, { Component } from 'react'
import FormRegister from '../components/FormRegister'
import FormCreate1 from '../components/FormCreate1'
import FormTarifa from '../components/FormTarifa'
import Nav from '../components/Nav'
import api from '../services/Api'
import './styles/Config.css'
import PageLoading from '../components/PageLoading'

export default class Config extends Component {

  state = {
    no_component: 0,
    error: null,
    loading: false,
    form1:{
      nombre: '',
      descripcion: ''
    },
    formTarifa:{
      tarifa: 0,
      descripcion: '',
      tipo_vehiculo: '',
      tipo_residente: ''
    },
    formUser:{
      username: '',
      email: '',
      rol:0
    }
  }

  comprobateForm1 = (id) =>{
    let isRol = id == 2
    let isTipoResidente = id == 3
    let isTipoVehiculo = id == 4
    return (isRol || isTipoResidente || isTipoVehiculo)
  }

  handleChange = e => {
    let id = this.state.no_component
    if (this.comprobateForm1(id)){
      this.setState({
        form1:{
          ...this.state.form1,
          [e.target.name]: e.target.value,
        }
      })
    }else if (id == 5){
      this.setState({
        formTarifa:{
          ...this.state.formTarifa,
          [e.target.name]: e.target.value,
        }
      })
    }else if (id == 1){
      this.setState({
        formUser:{
          ...this.state.formUser,
          [e.target.name]: e.target.value
        }
      })
    }
  }
  
  postChoose = async (id) =>{
    let response = {}
    if (id == 1){
      console.log(this.state.formUser)
      response = await api.user.register(this.state.formUser)
    }else if(id == 2){
      response = await api.create.rol(this.state.form1)
    }else if(id == 3){
      response = await api.create.tipoResidente(this.state.form1)
    }else if(id == 4){
      response = await api.create.tipoVehiculo(this.state.form1)
    }else if(id == 5){
      response = await api.create.tarifa(this.state.formTarifa)
    }

    return response
  }

  handleSubmit = async e =>{
    e.preventDefault();
    this.setState({loading: true, error: null})
    try{
      let response = await this.postChoose(this.state.no_component)
      if(response.created){
        this.setState({
          loading:false, 
          form1:{nombre: '', descripcion: ''}, 
          formTarifa:{tarifa: 0, descripcion: '', tipo_vehiculo: '', tipo_residente: ''},
          formUser:{username: '', email: '', password: '', passwordConfi: '', rol:0}
        })
        alert(response.message)
      }else{
        this.setState({loading:false, error: response.error})
      }

    }catch (error){
      this.setState({loading: false, error: error})
    }
  }

  showComponent = e =>{
    this.setState({no_component: e.target.value})
  }

  render() {
    if (this.state.loading){
      <PageLoading />
    }

    return (
      <div className='container__config'>
        <Nav show={this.showComponent}/> 
        <div className='row'>
          <div className='col offset-4'>
            {this.state.no_component==0 
              ? <h1 className='title__home'>Bievenido 👋 <br />que deseas hacer hoy?</h1>
              :<div className='container__form'>
                {this.state.no_component==1 ? <FormRegister  onChange={this.handleChange} onSubmit={this.handleSubmit} formValues={this.state.formUser} error={this.state.error}/>:<></>} 
                {this.state.no_component==2 ? <FormCreate1 onChange={this.handleChange} onSubmit={this.handleSubmit} formValues={this.state.form1} error={this.state.error} title='Rol'/>:<></>} 
                {this.state.no_component==3 ? <FormCreate1 onChange={this.handleChange} onSubmit={this.handleSubmit} formValues={this.state.form1} error={this.state.error} title='Tipo Residente'/>:<></>} 
                {this.state.no_component==4 ? <FormCreate1 onChange={this.handleChange} onSubmit={this.handleSubmit} formValues={this.state.form1} error={this.state.error} title='Tipo Vehiculo'/>:<></>} 
                {this.state.no_component==5 ? <FormTarifa onChange={this.handleChange} onSubmit={this.handleSubmit} formValues={this.state.formTarifa} error={this.state.error}/>:<></>} 
               </div>
            } 
          </div>
        </div>
      </div>
    )
  }
}

