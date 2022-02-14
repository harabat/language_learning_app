import React from 'react'
import ReactDOM from 'react-dom'
import "../node_modules/semantic-ui-css/semantic.min.css"
import './styles/index.css'
import { Provider } from "react-redux"
import * as serviceWorker from './serviceWorker'

import App from './App'
import ReduxStore from "./components/ReduxStore"
import store from "./store/store"

ReactDOM.render(
    // Provider is a higher-order component that makes app aware of Redux store
    <Provider store={store} >
        <App />
    </Provider>,
    document.getElementById('root')
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.register()
