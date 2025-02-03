
import 'bootstrap/dist/css/bootstrap.min.css'
import Header from "./pages/header/Header"
import Dashboard from './pages/dashboard/Dashboard';
// import NoMatch from './pages/noMatch/NoMatch';
import { Route, Routes } from 'react-router-dom';
import NoMatch from './pages/noMatch/noMatch';
import PostUser from './pages/employee/PostUser';
import UpdateUser from './pages/employee/UpdateUser';

function App() {
 return(
  <>
    <Header></Header>
    <Routes>

      <Route path='/' element={<Dashboard/>}></Route>
      <Route path='/employee' element={<PostUser/>}></Route>
      <Route path='/employee/:id' element={<UpdateUser/>}></Route>
      <Route path='*' element={<NoMatch></NoMatch>}></Route>

    </Routes>
  </>
 );
  
}

export default App
