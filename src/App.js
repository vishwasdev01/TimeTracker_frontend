import axios from 'axios'
import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import CheckInComponent from './components/CheckInComponent'
import Create from './components/Create'
import Managment from './components/Mangament'
import Landing from './components/landing'
axios.defaults.baseURL = process.env.REACT_APP_BASE_URL;
const App = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<Landing/>}/>
                <Route path='/managment' element={<Managment/>}/>
                <Route path="/usercreate" element={<Create/>}/>
                <Route path='/checkin/:id' element={<CheckInComponent/>} />
            </Routes>
            <ToastContainer />
        </BrowserRouter>
    )
}

export default App