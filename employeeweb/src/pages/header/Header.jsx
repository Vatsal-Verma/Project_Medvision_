import Navbar from "react-bootstrap/Navbar"
import Container from 'react-bootstrap/Container'
import Nav from "react-bootstrap/Nav"
import { Link } from "react-router-dom";
import "./Header.css"
import logo from './logo.png'
function Header(){
    return(
        <>
            {/* <Navbar>
                <Container>
                <Navbar.Brand to="/" ><strong>Employee Managment System</strong></Navbar.Brand>
                <Nav className="ml-auto">

                    <Nav.Link as={Link} to="/doctor" className="nav-link"> Doctor's Admin </Nav.Link>
                    <Nav.Link as={Link} to="/" className="nav-link"> Patients </Nav.Link>
                    <Nav.Link as={Link} to="/employee" className="nav-link">Post Detail</Nav.Link>

                </Nav>

                </Container>
            </Navbar> */}

                    {/* <Nav.Link as={Link} to="/doctor" className="nav-link"> Doctor's Admin </Nav.Link> */}
                    {/* <Nav.Link as={Link} to="/" className="nav-link"> Patients </Nav.Link>
                
                <Nav.Link as={Link} to="/employee" className="nav-link">Post Detail</Nav.Link>
 */}

 <nav className="navbar">
      <div className="navbar-logo">
        <img src={logo} alt="" />
      </div>
      <ul className="navbar-links">
        <li><Link to="/" className="nav-link">Patients</Link></li>
        
        {/* <li><Link to="/doctor" className="nav-link">Doctor Login</Link></li> */}
        <li><Link to="/employee" className="nav-link">Post Detail</Link></li>
        <li><Link to="/AskGemini" className="nav-link">Doctor Ai</Link></li>
      </ul>
    </nav>



        </>
    );
}

export default Header