import { NavLink } from "react-router-dom"
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

export const NavbarComponent = () => {
  return (
    <>
    <Navbar expand="lg" bg="dark" data-bs-theme="dark" className="fixed-top border-bottom">
        <Container>
            <NavLink to="/">
              <img
                src="logo.png"
                width="80"
                className="d-inline-block align-top"
                alt="React Bootstrap logo"
              />
            </NavLink>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse className="justify-content-end">
              <Nav className="fontTitle text-uppercase">
                  <NavLink to="/cartas" className={({isActive}) => isActive ? 'nav-link active ms-3' :  'nav-link ms-3'}>Cartas</NavLink>
                  <NavLink to="/banlist" className={({isActive}) => isActive ? 'nav-link active ms-3' :  'nav-link ms-3'}>Limitadas o Prohibidas</NavLink>
                  <NavLink to="/decklist" className={({isActive}) => isActive ? 'nav-link active ms-3' :  'nav-link ms-3'}>Crea tu Mazo</NavLink>
              </Nav>
            </Navbar.Collapse>
        </Container>
    </Navbar>
    <div style={{height: 50}}></div>
    </>
  )
}
