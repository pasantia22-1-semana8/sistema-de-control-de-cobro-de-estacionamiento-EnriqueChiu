import React, { Component } from 'react'
import {Navigate} from 'react-router-dom'
import FormLogin from '../components/FormLogin';
import Nav from '../components/Nav';
import PageLoading from '../components/PageLoading';
import api from '../services/Api';
import './styles/Login.css'


export default class Login extends Component {
  
  state={
    loading: false,
    error: null,
    auth: false,
    form: {
      username: '',
      password: ''
    }
  }
  
  handleSubmit = async e =>{
    e.preventDefault();
    this.setState({loading: true, error: null})
    try{
      let response = await api.user.login(this.state.form)
      if (response.auth !== true){
        this.setState({loading: false, error: response.error})
      }else if (response.user.is_staff){
        response.user.rol = 'admin'
        
        this.setState({loading:false, auth: true})
        localStorage.setItem('user', JSON.stringify(response.user))
      }else{
        this.setState({loading:false, auth: true})
        localStorage.setItem('user', JSON.stringify(response.user))      
      }

    }catch (error){
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

  render() {
    
    if (this.state.auth){
      let user = localStorage.getItem('user')
      let userJson = JSON.parse(user)
      console.log(userJson)
      if (userJson.rol == 'admin'){
        return <Navigate to="/config" />
      }else if (userJson.rol == 'empleado') {
        return <Navigate to='/home' />
      }
    }

    if (this.state.loading){
      return <PageLoading />
    }

    return (
      <>
        <Nav />
        <div className='container__all'>
          <div className='row'>
            <div className='col offset-4'>  
              <div className='container__formLogin'>
                <FormLogin 
                    onChange={this.handleChange}
                    onSubmit={this.handleSubmit}
                    formValues={this.state.form}
                    error={this.state.error}
                    />
                </div>
            </div>
          </div>
        </div>
      </>
    )
  }
}
