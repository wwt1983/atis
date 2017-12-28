import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import configureStore from './store/configureStore'
import { Router, browserHistory, Route } from 'react-router'

import App from './containers/App'

const store = configureStore()

render(
    <Provider store={store}>
        <div className='app'>
            <Router history={browserHistory}>
                <Route path='/' component={App} />
                <Route path='/cabinet/:area' component={App} />
            </Router>
        </div>
    </Provider>,
    document.getElementById('root')
)
