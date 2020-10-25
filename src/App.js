import React from 'react'
import './App.css'
import { Route, Switch, BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'

import Navigation from './components/navigationbar'
import Login from './components/login'
import Registration from './components/registration'
import Candidature from './components/cadidature'
import Home from './components/homepage'
import Candidates from './components/candidateList'
import Detail from './components/detailCandidate'
import Voting from './components/voting'
import Results from './components/result'
import rootReducer from './store/store'
import { createStore } from 'redux'

const store = createStore(
    rootReducer,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
)

function App() {
    
	return (
		<BrowserRouter>
            <Provider store={store} >
                <Navigation />
                
                <Switch>
                    <Route exact path="/" component={Home} />
                    <Route path="/login" component={Login} />
                    <Route path="/registration" component={Registration} />
                    <Route path="/candidature" component={Candidature} />
                    <Route exact path="/candidates" component={Candidates} />
                    <Route path="/detail" component={Detail} />
                    <Route path="/voting" component={Voting} />
                    <Route path="/results" component={Results} />
                </Switch>
            </Provider>
        </BrowserRouter>
  );
}

export default App;
