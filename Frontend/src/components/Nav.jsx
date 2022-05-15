import React from 'react'
import './styles/Nav.css'
import iconLogout from './imgs/logout.svg'
import { Link } from 'react-router-dom'
import ChangePass from './ChangePass'


function Nav(props) {
  const user = JSON.parse(localStorage.getItem('user'))

  const logout = e =>{
    localStorage.removeItem('user')
  }
  


  return (
    <nav className="navbar navbar-expand-lg navbar-dark nav__back rounded-bottom">
      <div className="container-fluid">
        <button onClick={props.show} value='0' className='nav__title bg-transparent border-0 '>
          ParkingSys
        </button>
        {
          user != null
          ?
          <>
            {
              user.rol == 'admin'
              ?
              <div className="navbar-collapse" >
                <div className='navbar-nav'>
                  <button onClick={props.show} value='1' className='nav-link bg-transparent border-0'>Crear Usuario</button>
                  <button onClick={props.show} value='2' className='nav-link bg-transparent border-0'>Crear Rol</button>
                  <button onClick={props.show} value='3' className='nav-link bg-transparent border-0'>Crear Tipo Residente</button>
                  <button onClick={props.show} value='4' className='nav-link bg-transparent border-0'>Crear Tipo vehiculo</button>
                  <button onClick={props.show} value='5' className='nav-link bg-transparent border-0'>Crear Tarifa</button>
                </div>
              </div>
              :
              <ChangePass user={user}/>
            }
            <div className="navbar-nav mr-auto">
              <button onClick={logout} type='submit' className='nav__logout bg-transparent border-0'>
                <Link className='nav-link' to='/login'>
                  Logout <img src={iconLogout} alt='icon'/>
                </Link>
              </button>
            </div>
          </>
          :<></>
        }
        
      </div>
    </nav>
  )
  
}

export default Nav