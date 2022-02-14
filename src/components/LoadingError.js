import React from "react"
import { Icon, Segment, Dimmer, Loader } from "semantic-ui-react"

// Loading and error logic
// TODO
// - split loading and error
// - make Loading pretty with spanner from UI lib

function LoadingError(props) {
    console.warn("LoadingError active")
    if (props.error) {
        const error = props.error.toString()
        console.error("LoadingError: Error = ", error)
        return (
            <div>
                <Icon
                    loading
                    name="exclamation"
                    size="massive"
                />
                <h1>
                    {error}
                </h1>
            </div>
        )
    } else if (props.isLoading) {
        // console.log("LoadingError: loading")
        return (
                // <Icon loading name="spinner" size="massive" />
            <div className="loadingIcon">
                <Segment
                    placeholder
                >
                    <Dimmer active inverted>
                        <Loader size="massive">
                            Loading...
                        </Loader>
                    </Dimmer>
                </Segment>
            </div>
        )
    }
}

export default LoadingError
