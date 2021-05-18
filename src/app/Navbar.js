import React from 'react';
import {
  Navbar,
  Nav,
  Button
} from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

import {signOut} from '../features/currentUser/currentUserSlice';

const TopNavbar = () => {
  const dispatch = useDispatch();
  const user = useSelector(state => state.currentUser);

  const handleClick = (e) => {
    console.log('sign out clicked');
      dispatch(
        signOut()
      );
      
    console.log('results unwrapped');

    console.log('Clicked out');

  }

  if (user.loggedIn) {
    return (
      <Content>
        <Navbar.Text className="mt-2">
          Welcome, {user.currentUser.firstName}
        </Navbar.Text>
        <Nav.Link>
          <Button onClick={handleClick}>Sign Out</Button>
        </Nav.Link>
      </Content>
    );
  } else {
      return (
        <Content>
            <Nav.Link className="button">
              <Link to="/signin"><Button>Sign In</Button></Link>
            </Nav.Link>
            <Nav.Link className="button">
              <Link to="/signup" className="text-white"><Button>Sign Up</Button></Link>
            </Nav.Link>
        </Content>
      );
  }
}

const Content = (props) => {
  return (
    <Navbar bg="dark" variant="dark">
    <Navbar.Brand ><Link to="/">Mate</Link></Navbar.Brand>
    <Nav className="mr-5">
      <Nav.Link><Link to="/">Home</Link></Nav.Link>
    </Nav>
    <Nav className="ml-auto">
      {props.children}
    </Nav>
  </Navbar>
  );
}

export default TopNavbar;