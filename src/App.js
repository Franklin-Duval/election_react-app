import React from 'react'
import './App.css'
import { Route, Switch, BrowserRouter } from 'react-router-dom'

import Navigation from './components/navigationbar'
import Login from './components/login'
import Registration from './components/registration'
import Candidature from './components/cadidature'
import Home from './components/homepage'

function App() {
	return (
		<BrowserRouter>
			<Navigation />
			
            <Switch>
                <Route exact path="/" component={Home} />
                <Route path="/login" component={Login} />
                <Route path="/registration" component={Registration} />
                <Route path="/candidature" component={Candidature} />
            </Switch>
        </BrowserRouter>
  );
}

export default App;
