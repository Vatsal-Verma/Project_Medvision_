
import 'bootstrap/dist/css/bootstrap.min.css'
import Header from "./pages/header/Header"
import Dashboard from './pages/dashboard/Dashboard';
// import NoMatch from './pages/noMatch/NoMatch';
import { Route, Routes } from 'react-router-dom';
import NoMatch from './pages/noMatch/noMatch';
import PostUser from './pages/employee/PostUser';
import UpdateUser from './pages/employee/UpdateUser';
import AdminDashboard from './pages/dashboard/AdminDashboard'
import Login from './pages/dashboard/Login';
import Ask from './pages/dashboard/AskGemini'

function App() {
 return(
  <>
    <Header></Header>
    <Routes>

      <Route path='/' element={<Dashboard/>}></Route>
      <Route path='/employee' element={<PostUser/>}></Route>
      <Route path='/doctor' element={<AdminDashboard/>}></Route>
      <Route path='/employee/:id' element={<UpdateUser/>}></Route>
      <Route path="/login" element={<Login />} />
      <Route path="/AskGemini" element={<Ask/>}/>
    </Routes>
  </>
 );
  
}

export default App
