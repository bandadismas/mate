import React from 'react';
import {
  Navbar,
  Nav,
  Button
} from 'react-bootstrap'
import { useSelector, useDispatch } from 'react-redux'

const TopNavbar = () => {
  const user = useSelector(state => state.currentUser.currentUser);
  console.log(user); 

  const handleClick = (e) => {

  }

  if (Object.keys(user).length!==0) {
    return (
      <Content>
        <Nav.Link className="button">
        <Button onClick={handleClick}>Sign Out</Button>
      </Nav.Link>
      </Content>
    );
  } else {
      return (
        <Content>
          <Nav.Link href="/signin" className="button">
              <Button>Sign In</Button>
            </Nav.Link>
            <Nav.Link href="/signup" className="button">
                <Button>Sign Up</Button>
            </Nav.Link>
        </Content>
      );
  }
}

const Content = (props) => {
  return (
    <Navbar bg="dark" variant="dark">
    <Navbar.Brand href="#home">Mate</Navbar.Brand>
    <Nav className="mr-5">
      <Nav.Link href="/">Home</Nav.Link>
    </Nav>
    <Nav className="ml-auto">
      {props.children}
    </Nav>
  </Navbar>
  )
}

export default TopNavbar