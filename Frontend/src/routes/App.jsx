import { Route, Routes } from 'react-router-dom'
import NotFound from '../components/NotFound'
import Config from '../pages/Config'
import Home from '../pages/Home'
import Login from '../pages/Login'
import PrivateRoutes from './Private.routes'
import PublicRoutes from './Public.routes'

function App() {
  const user = JSON.parse(localStorage.getItem('user'))

  return (
    <>
      <Routes>
        <Route path='/login' element={<PublicRoutes component={Login} rol={null} />} />
        <Route path='/config' element={<PrivateRoutes component={Config} rol='admin' />} />
        <Route path='/home' element={<PrivateRoutes component={Home} rol='empleado' />} />
        <Route path='*' element={<NotFound />} />
      </Routes>
    </>
  )
}

/**
 * 
 * <Route path='/login' element={<Login />}/>
        <Route path='/config' element={<Config />} />
        <Route path='/home' element={<Home />} />
 */

export default App
