import React from "react"
import { GoogleLogin } from '@react-oauth/google'
import { jwtDecode } from "jwt-decode"
import axios from "axios"
import {Routes,Route, useNavigate} from "react-router-dom"
import Roompage from "./Components/Room.jsx"
import Meeting from "./Room/index.jsx"
import LuvToMeet from "./Components/Homepage.jsx"
import Signin from "./Components/Signin.jsx"

const App = () => {
  return(
    <>
    <Routes>
      <Route path = "/signin" element = {<Signin/>}/>
      <Route path = "/" element = {<LuvToMeet/>}/>
      <Route path = "/room" element = {<Roompage/>}/>
      <Route path = "/room/:roomcode" element = {<Meeting/>}/>
      </Routes>
    </>
  )
}
export default App 