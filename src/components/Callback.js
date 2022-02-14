import React from "react"

import LoadingError from "./LoadingError"

// loading page while awaiting token from auth0
// TODO
// - replace by LoadingError directly?

function Callback() {
    console.warn("Callback active")
    return (
        <div>
            <LoadingError isLoading={true} error={null} />
        </div>
    )
}

export default Callback
