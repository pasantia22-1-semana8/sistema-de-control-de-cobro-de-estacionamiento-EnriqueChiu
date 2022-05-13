import React, { Component } from 'react'
import BuscarTicker from '../components/BuscarTicker'
import FormRegisterVehiculo from '../components/FormRegisterVehiculo'
import Nav from '../components/Nav'
import ShowRegistroCaja from '../components/ShowRegistroCaja'
import ShowTicker from '../components/ShowTicker'
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
    dataFlag2: false,
    dataFlag3: false,
    data: [],
    modalData:{
      no_placa: '',
      tipo_residente: '',
      tipo_vehiculo: '',
      descripcion: '',
      tarifa: 0
    },
    caja: {
      id: 0,
      estado: false,
      monto: 0
    }
  }


  componentDidMount(){
    this.fecthCaja();
  }

  fecthCaja = async () =>{
    this.setState({loading: true, error: null, data:[], dataFlag:false, dataFlag2:false, dataFlag3:false});
    try {
      let response = await api.getData.caja(true)
      if (response.length != 0){
        this.setState({loading: false, caja: response[0]})
      }
    } catch (error) {
      alert(error)
    }
  }
  
  createCaja = async e =>{
    this.setState({loading: true, error: null});
    try {
      let response = await api.create.caja();
      console.log(response)
      alert(response.message)
      this.setState({loading:false, caja: response.caja})
    } catch (error) {
      alert(error)
    }
  }
  
  closeCaja = async e =>{
    this.setState({loading: true, error: null});
    try {
      this.state.caja.estado = false
      await api.putData.caja(this.state.caja.id, this.state.caja)
      this.setState({loading: false, caja:{id:0, estado:false, monto: 0}})
      alert('Caja cerrado')
    } catch (error) {
      alert(error)
    }
  }


  handleSumbit = async e =>{
    e.preventDefault();
    this.setState({loading: true, error: null, data:[], dataFlag:false, dataFlag2:false, dataFlag3:false});
    try {
      let response = await api.getData.ticker(this.state.form.id)
      if (response.length !=0){
        if (response[0].isParking == true){
          this.setState({dataFlag: true, dataFlag2: true, dataFlag3: true, data: response})
        }else{
          this.setState({dataFlag: true, dataFlag2: true, data: response})
        }
      }else{
        this.setState({dataFlag2: true, data: response})  
      }
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
      let response = await api.create.vehiculo(this.state.modalData);
      alert(response.message)
      let response2 = await api.create.ticker(this.state.modalData);
      alert(response2.message)
      //AGREGAR NORIFICACION
      this.setState({loading: false, data: response2, 
        modalData: {
          no_placa: '',
          tipo_residente: '',
          tipo_vehiculo: '',
          descripcion: '',
          tarifa: 0
      }})
    } catch (error) {
      this.setState({loading: false, error: error})
    }
  }

  pay = async (monto) =>{
    this.setState({loading: true, error: null});
    try {

      let no_ticker = await api.getData.tarifa2(this.state.data[0].tarifa)
      this.state.data[0].isParking = false
      this.state.data[0].tarifa = no_ticker[0].id
      await api.putData.ticker(this.state.data[0].id, this.state.data[0])

      this.state.caja.monto = monto;
      await api.putData.caja(this.state.caja.id, this.state.caja)
      this.state.caja.monto = 0;
      
      alert('Se realizo el pago')
    } catch (error) {
      alert(error)
    }
  }

  GenerarTicker = async () =>{
    this.setState({loading: true, error: null});
    try {
      let response = await api.create.ticker(this.state.data);
      alert(response.message)
    } catch (error) {
      
    }
  }

  render() {
    if(!this.state.caja.id){
      return (
        <>
          <Nav />
          <div className='container-fluid container__home'>
            <div className='row mt-5 pt-5'>
              <div className='col-4 offset-2'>
                <h1 className='text-white'>NO TIENE UNA CAJA CREADO PRIMERO DEBE CREAR UNA CAJA PARA SEGUIR.</h1>
              </div>
              <div className='col-6 mt-5'>
                <button className='btn btn-warning btn-lg' onClick={this.createCaja}>CREAR CAJA</button>
              </div>
            </div>
          </div>
        </>
      )
    }

    return (
      <div className='container__home'>
        <Nav />
        <button className='btn btn-danger ms-2 mt-2' onClick={this.closeCaja}>CERRAR CAJA</button>
        <ShowRegistroCaja />
        <BuscarTicker 
          handleSumbit={this.handleSumbit}
          handleChange={this.handleChange}
          formValues={this.state.form.id}
        />
        <div className='container home__info'>
          {
            this.state.dataFlag2
            ?<>
                {
              this.state.dataFlag
              ?
              <>
                {
                  this.state.dataFlag3
                  ?
                  <ShowTicker  pay={this.pay} data={this.state.data[0]}/>
                  :
                  <>
                    <h1 className='home-info--title'>GENERAR TICKER.</h1>
                    <div className='container mt-5'>
                      <div className='row'>
                        <div className='col offset-4'>
                          <button className='home_register' onClick={this.GenerarTicker}>Generar Ticker</button>
                        </div>
                      </div>
                    </div>
                  </>
                }
              </>
              :
              <>
                <FormRegisterVehiculo 
                  onChange={this.handleChangeModal} 
                  onSubmit={this.handleSumbitModal}
                  formValues={this.state.modalData}
                />
              </>
            }  
            </>
            :<></>
          }
        </div>
      </div>
    )
  }
}
