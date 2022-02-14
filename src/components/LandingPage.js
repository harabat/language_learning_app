import React from "react"

import LandingHeader from "./LandingHeader"

// landing page for the app, shows how it works, contains About and Login page things
// TODO
// - make it pretty

function LandingPage(props) {
    console.warn("LandingPage active")
    const auth = props.auth

    return (
        <div>
            <LandingHeader auth={auth} />
            <h1>
                Language learning app's landing page
            </h1>
        </div>
    )
}

export default LandingPage
