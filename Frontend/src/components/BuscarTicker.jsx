import React from 'react'

function BuscarTicker(props) {
  return (
    <div className='container'>
      <form onSubmit={props.handleSumbit}>
        <h1 className='home__title'>Buscar por No.Placa o No.Ticker</h1>
        <div className='row'>
          <div className='col-10'>
            <input name='id' type="text" className='input__custom rounded' onChange={props.handleChange} value={props.formValues}/>
          </div>
          <div className='col-2'>
            <button className='home__btn' type='subimt'>Buscar</button>
          </div>
        </div>
      </form>
    </div>
  )
}

export default BuscarTicker