import React, { useState } from 'react'
import PrintComponent from './PrintComponent';


function ShowTicker(props) {

  const calcularTiempo = () =>{
    let ahora = new Date(Date.now()) 
    let input = new Date(props.data.hora_input)
    let difMinisegundos = Math.abs(ahora-input)
    let difMinutos = Math.trunc(difMinisegundos/60000)

    return difMinutos
  }
  
  const calcularMonto = () =>{
    let min =  calcularTiempo()
    let monto = (min*parseFloat(props.data.tarifa)).toFixed(2)

    return monto
  }

  return (
    <>
      <div className='row'>
        <div className='col-8'>
          <h1 className='home-info--title'>No. Ticker {props.data.no_ticker}</h1>
        </div>
        <div className='col-4'>
          <h1 className='home-info--title'>Monto {calcularMonto()}</h1>
        </div>
      </div>
      <h2 className='ms-5 mt-5'>Hora de entrada: {new Date(props.data.hora_input).toLocaleString()}</h2>
      <h2 className='ms-5 mt-5'>Hora de salida: {new Date(Date.now()).toLocaleString()}</h2>
      <h2 className='ms-5 mt-5'>Tiempo de estacionamineto {calcularTiempo()} min.</h2>
      <div className='d-grid gap-2 d-md-flex justify-content-md-end me-5'>
        {
          props.comprobante
          ?
          <PrintComponent 
            monto={calcularMonto()} 
            input={new Date(props.data.hora_input).toLocaleString()}
            output={new Date(Date.now()).toLocaleString()}
            min={calcularTiempo()}
            ticker={props.data.no_ticker}
          />
          :
          <button className='btn btn-warning btn-lg' onClick={() => props.pay(calcularMonto())}>Pagar Monto</button>  
        }
      </div>

      
    </>
  )
}

export default ShowTicker