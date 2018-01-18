import React from 'react';
import ReactDOM from 'react-dom';
import { createStore,applyMiddleware,compose } from 'redux'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk'
import { BrowserRouter,Route,Switch} from 'react-router-dom'

import './config'
import reducer from './Reducer/reducer'
import './index.css'
import registerServiceWorker from './registerServiceWorker'

import Login from './Container/Login/login'
import Register from './Container/Register/register'
import AuthRoute from './Component/authroute/authroute'
import GeniusInfo from './Container/GeniusInfo/geniusInfo'
import BossInfo from './Container/BossInfo/bossInfo'

const store = createStore(reducer,compose(
    applyMiddleware(thunk),
    window.devToolsExtension?window.devToolsExtension() : f => f))

function Boss(){
    return <h2>BOSS页面</h2>
}

ReactDOM.render(
    <Provider store={store}>
        <BrowserRouter>
            <div>
                <AuthRoute></AuthRoute>
                <Switch>
                    <Route path="/geniusinfo" component={GeniusInfo}></Route>
                    <Route path="/bossinfo" component={BossInfo}></Route>
                    <Route path="/login" component={Login}></Route>
                    <Route path="/boss" component={Boss}></Route>
                    <Route path="/register" component={Register}></Route>
                </Switch>
            </div>
        </BrowserRouter>
    </Provider>
    , document.getElementById('root'));
registerServiceWorker();
