import React from 'react'

function FormRol(props) {
  return (
    <>
      <form onSubmit={props.onSubmit}>
        <div className='form__input input-group-sm'>
          <label><h5 className='text-white '>Nombre</h5></label>
          <input className='form-control' type='text' name='nombre' onChange={props.onChange} value={props.formValues.nombre}/>
        </div>
        <div className='form__input input-group-sm'>
          <label><h5 className='text-white '>Descripcion</h5></label>
          <input className='form-control' type='text' name='descripcion' onChange={props.onChange} value={props.formValues.descripcion}/>
        </div>
        {props.error && (
            <h4 className="text-danger  mt-4 ms-5 mb-4">{props.error}</h4>
        )}

        <div className='container__button'>
          <button className='form__button' type="submit"><h5><strong>Crear {props.title}</strong></h5></button>
        </div>
      </form>
    </>
  )
}

export default FormRol