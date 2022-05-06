import { Route, Routes } from 'react-router-dom'
import Config from '../pages/Config'
import Home from '../pages/Home'
import Login from '../pages/Login'

function App() {

  return (
    <>
      <Routes>
        <Route path='/login' element={<Login />}/>
        <Route path='/config' element={<Config />} />
        <Route path='/home' element={<Home />} />
      </Routes>
    </>
  )
}

export default App
