import React from 'react'
import './styles/FormLogin.css'

function FormLogin(props) {
  return (
    <>
      <form onSubmit={props.onSubmit}>
        <div className='form__input'>
          <label><h1 className='text-white '>Username</h1></label>
          <input className='form-control' type='text' name='username' onChange={props.onChange} value={props.formValues.username}/>
        </div>
        <div className='form__input'>
          <label><h1 className='text-white '>Password</h1></label>
          <input className='form-control' type='password' name='password' onChange={props.onChange} value={props.formValues.password} />
        </div>

        {props.error && (
            <h2 className="text-danger mt-4 ms-5">{props.error}</h2>
        )}

        <div className='container__button'>
          <button className='form__button' type="submit"><h3><strong>Login</strong></h3></button>
        </div>
      </form>
    </>
  )
}

export default FormLogin