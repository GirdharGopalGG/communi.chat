import {Routes, Route} from 'react-router'

import ChatPage from "./pages/ChatPage"
import LoginPage from "./pages/loginPage.jsx"
import SignupPage from "./pages/signUpPage.jsx"


function App(){
  return (
    <Routes>
      <Route path= '/' element= { <ChatPage/> } />
      <Route path= '/signup' element = {<SignupPage/>} />
      <Route path= '/login' element = {<LoginPage/>} />
    </Routes>
  )
}   

export default App