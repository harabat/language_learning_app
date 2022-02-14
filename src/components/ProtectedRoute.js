import React from "react"
import { Route, Redirect } from "react-router-dom"

// wrapper for routes that are only accessible after authentication

function ProtectedRoute(props) {
    const Component = props.component
    const isAuthenticated = props.auth.isAuthenticated()

    return (
        <Route
            path={props.path}
            auth={props.auth}
            render={(props) => (
                isAuthenticated === true
                ? <Component {...props} />
                : <Redirect to="/" />
            )}
        />
    )
}

export default ProtectedRoute
