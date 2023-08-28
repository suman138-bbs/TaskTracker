import React from 'react'
import './style.css'
import { Route, Routes } from 'react-router-dom'
import Dashbord from './Dashbord'
import Profile from './Profile'
import Home from './Home'
import Start from './Start'
import SignUp from './SignUp'
import Tasks from './Tasks'
import EditTask from './EditTask'
import UserLogin from './UserLogin'
import CreateTask from './CreateTask'
const App = () => {
  return (
    <div className='main-container'>
      <Routes>
        <Route path='/' element={<Dashbord />}>
          <Route index element = {<Home/>}/>
          <Route path='tasks' element = {<Tasks/>}/>
          <Route path='profile' element={<Profile />} />
          <Route path='create' element={<CreateTask />} />
          <Route path='taskEdit/:id' element = {<EditTask/>}/>
        </Route>
        <Route path='/signup' element = {<SignUp/>}/>
        <Route path='/login' element={<UserLogin/>}/>
        <Route path='/start' element={<Start/>}/>
        <Route path='/userLogin' element={<UserLogin/>}/>
        
      </Routes>
      
    </div>
  )
}

export default App