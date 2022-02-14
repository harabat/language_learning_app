import React from "react"
import LandingHeader from "./LandingHeader"

function About(props) {
    console.warn("About active")
    const auth = props.auth

    return (
        <div>
            <LandingHeader auth={auth} />
            <h1
                children="About"
            />
        </div>
    )
}

export default About
