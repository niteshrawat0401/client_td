import './App.css'
import Login from './component/auth/Login'
import Signup from './component/auth/Signup'
import { Route, Routes } from 'react-router-dom'
import Todos from './component/todoMain/Todos '

function App() {

  return (
    <>
    <Routes>
      <Route path='/' element={<Login/>}/>
      <Route path='/signup' element={<Signup/>}/>
      <Route path='/todos' element={<Todos/>}/>
    </Routes>
    </>
  )
}

export default App
