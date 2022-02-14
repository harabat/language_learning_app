import React from "react"
import { connect } from "react-redux"
import { Card } from "semantic-ui-react"

import BookPointer from "../components/BookPointer"
// import { fillLibrary } from "../components/Client"
import LibraryHeader from "../components/LibraryHeader"
import LoadingError from "../components/LoadingError"
// import ReduxBookList from "./ReduxBookList"
// import ReduxImport from "./ReduxImport"
import { createBookList } from "../actions/actions"

// gathers all available books
// TODO
// - merge LoadingError and return through ternary
// - build some languageStats logic
// - simplify fetch
// - make it pretty

// connects copy of Redux state produced by a reducer to React props
const mapStateToProps = state => {
    return {
        bookList: state.bookList
    }
}

function mapDispatchToProps(dispatch) {
    return {
        createBookList: bookList => dispatch(createBookList(bookList))
    }
}

class StorelessLibrary extends React.Component {
    constructor() {
        super()
        this.state = {
            isLoading: false,
            error: null
        }
    }

    // fetch bookList and languageStats from backend after component is mounted for first time
    // only do if bookList or languageStats are not already in store
    componentDidMount() {
        console.warn("Library: componentDidMount")

        const { bookList, createBookList } = this.props

        // if this.props.bookList is not empty, no need to fetch bookList
        if (Object.keys(bookList).length) {
            console.warn("no need to fetch bookList")
            // fetch languageStats if not fetched yet
        } else {
            // fetch bookList
            const callback = (loading=false, bookList=null, error=null) => {
                // if (bookList) {
                //     createBookList(bookList)
                // }
                this.setState({
                    isLoading: loading,
                    error: error
                })
            }

            // separate backend interaction logic from app logic
            // await fillLibrary(
            //     callback
            // )
            createBookList(callback)
        }
    }

    render() {
        console.warn("Library active")
        console.warn("State:", this.state, "\nProps (", Object.keys(this.props.bookList).length, "books):", this.props)

        // check if loading or error
        if (this.state.error || this.props.isLoading) {
            // console.log("LoadingError called")
            return (
                <div>
                    <LibraryHeader />
                    <LoadingError
                        error={this.state.error}
                        isLoading={this.state.isLoading}
                    />
                </div>
            )
        }

        // map bookList information to BookPointers
        const { bookList } = this.props
        const bookPointers = Object.keys(bookList).map(
            (slug, index) => (
                    <BookPointer
                        key={bookList[slug].id}
                        slug={slug}
                        book={bookList[slug]}
                    />
            )
        )
        // console.log("Library: bookPointers created")

        // console.log("Library: render started")
        return (
            <div>
                <LibraryHeader />
                <Card.Group centered>
                    {bookPointers}
                </Card.Group>
            </div>
        )
    }
}

const Library = connect(mapStateToProps, mapDispatchToProps)(StorelessLibrary)

export default Library
