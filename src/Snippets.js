import React from "react"

// 1: for uploding books
class App extends React.Component {
    constructor() {
        super()
        this.state = {
            text: ""
        }
        this.handleUpload = this.handleUpload.bind(this)
    }

    handleUpload(newBook) {
        const reader = new FileReader()
        reader.onloadend = () => {
            this.setState(prevState => {
                return {
                    text: reader.result
                }
            }
        )}
        reader.readAsText(newBook)
    }

    render() {
        return (
            <div>
                <input type="file" onChange={event => this.handleUpload(event.target.files[0])} />
            </div>
        )
    }
}


// 2: for reading epubs
import { ReactReader } from "react-reader"

class App extends React.Component {
    constructor() {
        super()
    }

    render() {
        return (
            <div style={{
                position: "relative",
                height: "100%"
            }}>
                <ReactReader
                    url={"http://www.feedbooks.com/book/54.epub"}
                    title={title}
                    location={}
                    locationChanged={
                        epubcifi => console.log(epubcifi)
                    }
                    epubOptions={{
                        manager: "continuous",
                        flow: "scrolled-doc"
                    }}
                />
            </div>
        )
    }
}


// 3: re-rendering loop to do 2 things with 1 method
import { Redirect } from "react-router-dom"

<Redirect to={{
    pathname: "/login",
    state: {from: props.location}
}} />

class Login extends React.Component {
    constructor() {
        super()
        this.state = {
            redirectToPrevious: ""
        }
        this.login = this.login.bind(this)
        this.logout = this.logout.bind(this)
    }

    login(redirectToPrevious) {
        this.props.auth.login(() => {
            this.setState({redirectToPrevious: redirectToPrevious})
        })
    }

    logout() {
        this.props.auth.logout()
    }

    render() {
        console.warn("Login active")
        const isAuthenticated = this.props.auth.isAuthenticated()
        const { redirectToPrevious } = this.state
        const { from } = this.props.location.state || {from: {pathname: "/"}}

        if (isAuthenticated) {
            this.logout()
            return null
        } else {
            this.login()
            return null
        }

        if (redirectToPrevious) {
            return <Redirect to={from} />
        }

        if (this.props.location.state) {
            return (
                <div>
                    <p>
                        Log in to access "{from.pathname}"
                    </p>
                    <button onClick={() => this.login(true)}>
                        Log in
                    </button>
                </div>
            )
        } else {
             this.login(false)
             return null
        }
    }
}

// 4: object shorthand form for mapStateToProps and mapDispatchToProps
import { connect } from "react-redux"
import { addBook } from "./actions/actions"

class Import extends React.Component {
    // ...
}

const ReduxImport = connect(null, { addBook })(Import)

export default ReduxImport

// 5: semantic feed
import { Feed } from "semantic-ui-react"

const events = [
    {
        date: "1 hour ago",
        image: "",
        summary: "",
        extraText: "",
        meta: ""
    },
    {
        date: "1 hour ago",
        image: "",
        summary: "",
        extraText: "",
        meta: ""
    }
]

const Feeds = () => <Feed events={events} />

export default Feeds


// 7: attached buttons
import { Button, Segment } from 'semantic-ui-react'

const ButtonExampleVerticallyAttachedGroup = () => (
  <div>
    <Button.Group attached='top'>
      <Button>One</Button>
      <Button>Two</Button>
    </Button.Group>
    <Segment attached>
      <img src='https://react.semantic-ui.com/images/wireframe/paragraph.png' />
    </Segment>
    <Button.Group attached='bottom'>
      <Button>One</Button>
      <Button>Two</Button>
    </Button.Group>
  </div>
)

export default ButtonExampleVerticallyAttachedGroup


// 8: middleware
import { ADD_BOOK } from "../constants/action-types"

export function irrelevantMiddleware(store) {
    return function(next) {
        return function(action) {
            console.log("action:", action)
            // duplicate books are not added,
            if (action.type === ADD_BOOK) {
                for (let i=0; i < store.getState().booksList.length; i++) {
                    const title = store.getState().booksList[i].title
                    const author = store.getState().booksList[i].author

                    if (
                        action.payload.title === title &&
                        action.payload.author === author
                    ) {
                        console.log("DUPLICATE_BOOK")
                        return store.dispatch({type: "DUPLICATE_BOOK"})
                    }
                }
            }

            return next(action)
        }
    }
}

const middleware = { irrelevantMiddleware }

export default middleware


// 9: different reducers

function rootReducer(state=initialState, action) {
    if (action.type === FETCH_STATS) {
        // Object.assign(object to change, objects to extract values from)
        return (
            Object.assign(
                {},
                state,
                {
                    bookList: Object.assign({}, state.bookList, action.payload)
                }
            )
        )
    }

    if (action.type === CHANGE_HOURS) {
        // Object spread
        return (
            Object.assign(
                {
                    ...state,
                    languageStats: {
                        ...languageStats,
                        hours: action.payload
                    }
                }
            )
        )
    }

    if (action.type === REMOVE_BOOK) {
        return (
            Object.assign(
                {},
                state,
                {
                    bookList: Object.keys(state).reduce(
                        (bookList, keys) => {
                            if (key !== action.payload) {
                                bookList[key] = state.bookList[key]
                            }
                            return bookList
                        }
                    )
                }
            )
        )
    }

}

// 10: make store accessible in browser console

// in ReduxStore.js
import store from "./store/store"
import actions from "./actions/actions"

window.store = store
window.actions = actions

// in index.js
import ReduxStore from "./ReduxStore"
