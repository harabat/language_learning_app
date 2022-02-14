import React from "react"
import { connect } from "react-redux"

import BookHeader from "../components/BookHeader"
import BookHTML from "../components/BookHTML"
import LoadingError from "../components/LoadingError"
import WordIdentifier from "../components/WordIdentifier"
import WordTranslator from "../containers/WordTranslator"
import { defineBook, fetchDict, hideDict, closeBook } from "../actions/actions"
import { openBook } from "../components/Client"

// book object, contains all reading logic
// TODO
// - optionally open second book and flip with react-flip-toolkit
// - determine language from bookList or match.params.slug instead of bookCurrent?
// - simplify fetch or move to actions.js?

function mapStateToProps(state) {
    return {
        // to extract language for fetching dict and updating book
        bookCurrent: state.bookCurrent,
        // determine current book
        bookList: state.bookList,
        // to determine WordIdentifier's scope or whether WordTranslator is active
        dictScope: state.dictScope,
        // to determine whether WordTranslator is hidden
        dictHidden: state.dictHidden
    }
}

function mapDispatchToProps(dispatch) {
    return {
        // clear bookCurrent on mount and unmount
        defineBook: book => dispatch(defineBook(book)),
        // fetch dict based on book's language on mount
        fetchDict: language => dispatch(fetchDict(language)),
        // hide or show WordTranslator
        hideDict: hidden => dispatch(hideDict(hidden)),
        // closes book and updates relevant state
        closeBook: readingPosition => dispatch(closeBook(readingPosition))
    }
}

class StorelessBook extends React.Component {
    constructor() {
        super()
        this.state = {
            book: null,
            word: null,
            anchorEl: null,
            isLoading: false,
            error: null
        }

        // make translateWord an arrow function to avoid binding to class instance in constructor
        this.translateWord = this.translateWord.bind(this)
        this.closeDict = this.closeDict.bind(this)
        this.saveRef = this.saveRef.bind(this)
    }

    translateWord() {
        console.log("clientHeight:", window.scrollY)
        // do nothing if dictScope is null or WordTranslator is already open
        if (!this.props.dictScope || !this.props.dictHidden) {
            this.closeDict()
            return
        }

        const { word, getBoundingClientRect } = WordIdentifier(this.props.dictScope)

        if (!word) {
            this.closeDict()
            return
        }

        // alert(word)
        this.setState({
            word: word,
            anchorEl: {
                width: getBoundingClientRect().width,
                height: getBoundingClientRect().height,
                getBoundingClientRect
            }
        })
        this.props.hideDict(false)
    }

    closeDict() {
        // do nothing if dictHidden (implies do nothing if dictScope is null)
        if (this.props.dictHidden) {
            return
        }

        // otherwise hide WordTranslator
        this.props.hideDict(true)

        // deselect word
        const selection = window.getSelection()
        selection.removeAllRanges()
    }

    saveRef(ref) {
        this.containerNode = ref
    }

    // fetch book from backend after component is mounted
    // necessarily happens at every mount
    async componentDidMount() {
        console.warn("Book: componentDidMount")
        const { match, bookCurrent, fetchDict } = this.props

        // this.props.defineBook(this.props.bookList[this.props.match.params.slug])

        // callback for fetching book
        const callback = (loading=false, book=null, error=null) => {
            // console.log("openBook: callbackSuccess")
            this.setState({
                isLoading: loading,
                book: book,
                error: error
            })
        }

        // separate backend interaction logic from app logic
        await openBook(
            match.params.slug,
            callback
        )

        // scroll down to last readingPosition
        const readingPosition = bookCurrent.readingPosition * this.containerNode.clientHeight
        console.error(readingPosition)
        window.scroll(0, readingPosition)

        // determine book's language
        const language = bookCurrent.language
        // fetch dict
        fetchDict(language)
    }

    componentWillUnmount() {
        // close book and update relevant state
        const readingPosition = window.scrollY / this.containerNode.clientHeight
        this.props.closeBook(readingPosition)
    }

    render() {
        console.warn("Book active\nState:", this.state, "\nProps:", this.props)
        // console.log("match:", this.props)
        // const slug = this.props.match.params.slug
        // console.group("slug")
        // console.log("this.props = ", this.props)
        // console.log("this.props.match.params.slug = ", slug)
        // console.groupEnd()

        // // accessing DOM components
        // const self = this

        // check if loading or error
        if (this.state.error || this.state.isLoading) {
            return (
                <div>
                    <BookHeader />
                    <LoadingError
                        error={this.state.error}
                        isLoading={this.state.isLoading}
                    />
                </div>
            )
        }

        // console.log("Book: render started")
        return (
            <div>
                <BookHeader style={{position: "fixed"}} />
                <div onMouseLeave={this.closeDict}>
                    <div
                        onMouseUp={this.translateWord}
                        ref={this.saveRef}
                    >
                        <BookHTML
                            html={this.state.book}
                        />
                    </div>
                    {
                        !this.props.dictHidden
                        ? <WordTranslator
                            open={!this.props.dictHidden}
                            word={this.state.word}
                            anchorEl={this.state.anchorEl}
                        />
                        : null
                    }
                </div>
            </div>
        )
    }
}

const Book = connect(mapStateToProps, mapDispatchToProps)(StorelessBook)

export default Book
