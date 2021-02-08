import React from 'react'
import {BrowserRouter as Router , Route , Switch } from 'react-router-dom' ;
import Home from './components/Home' ;
import SingleCountry from './components/SingleCountry' ;
import './App.css' ;
import { Provider } from 'react-redux'
import { createStore } from 'redux' ;
import { reducer } from './reducer' ;
//import 'bootstrap/dist/css/bootstrap.min.css';
const store = createStore(reducer) 

function App() {
    return ( 
        <Provider store={store} > 
            <div className='app'  >
                <Router>
                    <Switch>
                        <Route exact path='/' component={Home} />
                        <Route exact path='/countries/:countryId'>
                            <SingleCountry />
                        </Route>
                    </Switch>
                </Router>
            </div>
        </Provider>
        
    )
} ;

export default App ;

