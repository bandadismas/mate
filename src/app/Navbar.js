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
  const user = useSelector(state => state.currentUser.currentUser);

  console.log(user); 

  const handleClick = (e) => {
    console.log('sign out clicked');
    const currentUser = {};
    const token = '';
    const error = null;
      dispatch(
        signOut({currentUser, token, error})
      );
      
    console.log('results unwrapped');

    console.log('Clicked out');

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
          <Nav.Link className="button">
              <Button><Link to="/signin" className="text-white">Sign In</Link></Button>
            </Nav.Link>
            <Nav.Link className="button">
                <Button><Link to="/signup" className="text-white">Sign Up</Link></Button>
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