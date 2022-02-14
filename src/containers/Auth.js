import auth0 from "auth0-js"

import history from "../history"

// auth settings

export default class Auth {
    constructor() {
        this.login = this.login.bind(this)
        this.logout = this.logout.bind(this)
        this.handleAuthentication = this.handleAuthentication.bind(this)
        this.isAuthenticated = this.isAuthenticated.bind(this)
        this.getAccessToken = this.getAccessToken.bind(this)
        this.getIdToken = this.getIdToken.bind(this)
        this.renewSession = this.renewSession.bind(this)
    }

    auth0 = new auth0.WebAuth({
        domain: 'languagelearningapp.eu.auth0.com',
        clientID: 'wcWTABml0--YNoIzobr8bVgkxll3C1EZ',
        redirectUri: 'http://localhost:3000/callback',
        responseType: 'token id_token',
        scope: 'openid'
    })

    accessToken
    idToken
    expiresAt

    login() {
        console.warn("Auth: login active")
        this.auth0.authorize()
    }

    logout() {
        console.warn("Auth: logout active")
        // Remove tokens and expiry time
        this.accessToken = null
        this.idToken = null
        this.expiresAt = 0

        // Remove isLoggedIn flag from localStorage
        localStorage.removeItem('isLoggedIn')

        // navigate to the home route
        history.replace('/')
    }

    handleAuthentication() {
        console.warn("Auth: handleAuthentication active")
        this.auth0.parseHash((err, authResult) => {
            if (authResult && authResult.accessToken && authResult.idToken) {
                this.setSession(authResult)
            } else if (err) {
                history.replace('/')
                console.log(err)
                alert(`Error: ${err.error}. Check the console for further details.`)
            }
        })
    }

    isAuthenticated() {
        console.warn("Auth: isAuthenticated active")
        // Check whether the current time is past the
        // access token's expiry time
        let expiresAt = this.expiresAt
        return new Date().getTime() < expiresAt
    }

    getAccessToken() {
        console.warn("Auth: getAccessToken active")
        return this.accessToken
    }

    getIdToken() {
        console.warn("Auth: getIdToken active")
        return this.idToken
    }

    setSession(authResult) {
        console.warn("Auth: setSession active")
        // Set isLoggedIn flag in localStorage
        localStorage.setItem('isLoggedIn', 'true')

        // Set the time that the access token will expire at
        let expiresAt = (authResult.expiresIn * 1000) + new Date().getTime()
        this.accessToken = authResult.accessToken
        this.idToken = authResult.idToken
        this.expiresAt = expiresAt

        // navigate to the home route
        history.replace('/library')
    }

    renewSession() {
        console.warn("Auth: renewSession active")
        this.auth0.checkSession({}, (err, authResult) => {
            if (authResult && authResult.accessToken && authResult.idToken) {
                this.setSession(authResult)
            } else if (err) {
                this.logout()
                console.log(err)
                alert(`Could not get a new token (${err.error}: ${err.error_description}).`)
            }
        })
    }
}
