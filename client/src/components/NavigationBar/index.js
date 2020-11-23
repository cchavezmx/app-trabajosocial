import React, { Fragment } from 'react';
import { Navbar, Container } from 'react-bootstrap'
import Login from '../Login';


const NavigationBar = ( props ) => {

  return (
    <Fragment>
        <Navbar bg="dark" variant="dark">
          <Container  className="d-flex bd-highlight">
          <Navbar.Brand>Trabajo Social</Navbar.Brand>
          </Container>
          <Login />
      </Navbar>      
    </Fragment>
  )
}

export default NavigationBar
