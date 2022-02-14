import React from "react"

// authentication through Auth0, handles logout if user is already authenticated
// TODO
// - redirecting user to page he wanted to access (if user directly loads protected routes, like /library) requires changing Redux's store to booksListAPI, booksImported, and booksList that is a merge of the previous two lists

class Login extends React.Component {
    constructor() {
        super()
        this.login = this.login.bind(this)
        this.logout = this.logout.bind(this)
    }

    login() {
        this.props.auth.login()
    }

    logout() {
        this.props.auth.logout()
    }

    render() {
        console.warn("Login active")
        const isAuthenticated = this.props.auth.isAuthenticated()

        if (isAuthenticated) {
            this.logout()
        } else {
            this.login()
        }

        // components must return something, at least null
        return null
    }
}

export default Login
