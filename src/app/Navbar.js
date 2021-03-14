import React from 'react';
import {
  Navbar,
  Nav,
  Button
} from 'react-bootstrap'

const TopNavbar = () => {
return (
<Navbar bg="dark" variant="dark">
    <Navbar.Brand href="#home">Mate</Navbar.Brand>
    <Nav className="mr-5">
      <Nav.Link href="/">Home</Nav.Link>
    </Nav>
    <Nav className="ml-auto">
      <Nav.Link href="/signin" className="button">
        <Button>Sign In</Button>
      </Nav.Link>
      <Nav.Link href="/signup" className="button">
        <Button>Sign Up</Button>
      </Nav.Link>
    </Nav>
  </Navbar>
);}

export default TopNavbar