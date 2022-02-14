import React from 'react'
import { Router, Route, Switch } from "react-router-dom"
// import { bindActionCreators } from "redux"
// import { connect } from "react-redux"

import './styles/App.css'

import About from "./components/About"
// import Auth from "./containers/Auth"
import Book from "./containers/Book"
import Callback from "./components/Callback"
import history from "./history"
import Import from "./containers/Import"
import LandingPage from "./components/LandingPage"
import Library from "./containers/Library"
import LoadingError from "./components/LoadingError"
import Login from "./containers/Login"
import ProtectedRoute from "./components/ProtectedRoute"
import Settings from "./containers/Settings"

// main logic in the app, regulates all activities
// TODO
// - migrate to TypeScript when done

class App extends React.Component {
    constructor() {
        super()
        this.state = {
            isLoading: false,
            error: null
        }
    }

    // App unmounts when manually changing urls (which logs user out), normal behaviour, close to behaviour in React Native
    render() {
        console.warn("App active")

        // check if loading or error
        if (this.state.error || this.state.isLoading) {
            return (
                <LoadingError
                    error={this.state.error}
                    isLoading={this.state.isLoading}
                />
            )
        }


        // authentication
        // const auth = new Auth()
        const isAuthenticated = () => true
        const logout = () => history.replace("/")
        const auth = {isAuthenticated: isAuthenticated, logout: logout}
        const handleAuthentication = ({location}) => {
            if (/access_token|id_token|error/.test(location.hash)) {
                auth.handleAuthentication();
            }
        }

        console.log("App: router started")
        // Router for router logic
        // history behaves more like prediction: on url change, history is updated,
        // Switch to iterate over routes until match is found
        // Route with no path always matches so is rendered when an error occurs
        return (
            <Router history={history}>
                <Switch>
                    <Route
                        exact path="/"
                        render={
                            (props) => {
                                return (
                                    <LandingPage
                                        auth={auth}
                                        {...props}
                                    />
                                )
                            }
                        }
                    >
                    </Route>

                    <Route
                        path="/login"
                        render={
                            (props) => {
                                return (
                                    <Login
                                        auth={auth}
                                        {...props}
                                    />
                                )
                            }
                        }
                    />

                    <Route
                        path="/about"
                        render={
                            (props) => {
                                return (
                                    <About
                                        auth={auth}
                                        {...props}
                                    />
                                )
                            }
                        }
                    />

                    <Route
                        path="/callback"
                        render={(props) => {
                            handleAuthentication(props)
                            return <Callback />
                        }}
                    />

                    <ProtectedRoute
                        path="/library"
                        auth={auth}
                        component={Library}
                        // render={
                        //     (props) => {
                        //         return (
                        //             <Library
                        //                 auth={auth}
                        //                 {...props}
                        //             />
                        //         )
                        //     }
                        // }
                    />

                    <ProtectedRoute
                        path="/import"
                        auth={auth}
                        component={Import}
                        // render={() => {
                        //     return (
                        //         <div>
                        //             <LibraryHeader />
                        //             <h1
                        //                 children="Import"
                        //             />
                        //         </div>
                        //     )
                        // }}
                    />

                    <ProtectedRoute
                        path="/settings"
                        auth={auth}
                        component={Settings}
                        // render={() => {
                        //     return (
                        //         <div>
                        //             <LibraryHeader />
                        //             <h1
                        //                 children="Settings"
                        //             />
                        //         </div>
                        //     )
                        // }}
                    />

                    <Route
                        path="/logout"
                        render={
                            (props) => {
                                return (
                                    <Login
                                        auth={auth}
                                        {...props}
                                    />
                                )
                            }
                        }
                    />

                    <ProtectedRoute
                        path="/book/:slug"
                        auth={auth}
                        component={Book}
                        // render={
                        //     (props) => {
                        //         return (
                        //             <Book
                        //                 {...props}
                        //             />
                        //         )
                        //     }
                        // }
                    />

                    <Route
                        render={() => {
                            return (
                                <LoadingError error="404: no content found" />
                            )
                        }}
                    />
                </Switch>
            </Router>
        )
    }
}

export default App
