import React from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from 'react-router-dom'

import Navbar from './app/Navbar'
import SignIn from './app/components/SignIn'
import SignUp from './app/components/SignUp'
import { PostsList } from './features/posts/PostsList'


function App() {
  return (
    <Router>
      <Navbar />
      <div className="App">
        <Switch>
          <Route
            exact
            path="/"
            render={() => (
              <React.Fragment>
                <PostsList />
              </React.Fragment>
            )}
          />
          <Route exact path="/signin/" component={SignIn} />
          <Route exact path="/signup/" component={SignUp} />

          <Redirect to="/" />
        </Switch>
      </div>
    </Router>
  )
}

export default App