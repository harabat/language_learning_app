import React from "react"
import { connect } from "react-redux"
import { Button, Form } from "semantic-ui-react"
import uuidv1 from "uuid"

import LibraryHeader from "../components/LibraryHeader"
import { addBook } from "../actions/actions"
import { languageCodes } from "../constants/languageCodes"

// import form
// TODO
// - Form.Select accepts empty value even when required
// - focus fields on mount through DOM refs
// - import function: gutenberg, cloud, local
// - replace "\s" by " " if titles can only be single string

// mapDispatchToProps connects Redux actions to React props to allow connected components to dispatch actions
function mapDispatchToProps(dispatch) {
    return {
        addBook: bookItem => dispatch(addBook(bookItem))
    }
}

class StorelessImport extends React.Component {
    constructor() {
        super()

        // state is necessary here to make form controlled (state serves as source of truth)
        this.state = {
            title: "",
            author: "",
            location: "",
            language: ""
        }

        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
        // this.fetchBookDetails = this.fetchBookDetails.bind(this)
    }

    // convert title and author to slug, removes all non-latin, non-number characters, and wrapping spaces, and converts spaces to hyphens
    // unnecessary to make real slugs in a SPA
    titleByAuthorToSlug(title, author, language) {
        const slugTitle = title
            .toLowerCase()
            // // convert combined graphemes into combinations of simple ones
            // .normalize("NFD")
            // // replace combined diacritical marks
            // .replace(/[\u0300-\u036f]/g, "")
            // .replace(/[^a-z0-9 ]/g, "")
            .replace(/\s+/g, "-")
            .replace(/^-|-$/g, "")
        const slugAuthor = author
            .toLowerCase()
            // .normalize("NFD")
            // .replace(/[\u0300-\u036f]/g, "")
            // .replace(/[^a-z0-9 ]/g, "")
            .replace(/\s+/g, "-")
            .replace(/^-|-$/g, "")
        const slug = [slugTitle, slugAuthor, language].join("_")

        return slug
    }

    // fetches cover for newly added book
    async fetchBookDetails(title, author) {
        try {
            console.warn("fetching book details")

            const bookDetailsCall = await fetch(`/api/bookdetails?title=${title}&author=${author}`)

            const bookDetails = await bookDetailsCall.json()
            console.warn("\n\n\nfetchBookDetails:", bookDetails)

            return bookDetails
        } catch (error) {
            console.error(error)
        }
    }

    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    // dispatch addBook based on submitted information
    async handleSubmit(event) {
        event.preventDefault()
        const { title, author, location, language } = this.state

        const id = uuidv1()
        const slug = this.titleByAuthorToSlug(title, author, language)
        const { cover, desc } = await this.fetchBookDetails(title, author)
        console.log("\n\n\n", cover, desc)
        const readingPosition = 0

        const book = {
            id,
            title,
            author,
            cover,
            desc,
            readingPosition,
            location,
            language,
            slug
        }
        this.props.addBook(book)

        // clean state
        this.setState({
            title: "",
            author: "",
            location: "",
            language: ""
        })

        alert(`Book imported: \n${book}`)
    }

    render() {
        console.warn("Import active")
        console.warn("State:", this.state, "\nProps:", this.props)

        const { title, author, location, language } = this.state

        return (
            <div>
                <LibraryHeader />
                <Form onSubmit={this.handleSubmit}>
                    <Form.Field
                        width={5}
                        name="title"
                        type="text"
                        label="Title"
                        placeholder="Moby Dick"
                        value={title}
                        onChange={this.handleChange}
                        required
                        control="input"
                    />
                    <Form.Field
                        width={5}
                        name="author"
                        type="text"
                        label="Author"
                        placeholder="Herman Melville"
                        value={author}
                        onChange={this.handleChange}
                        required
                        control="input"
                    />
                    <Form.Field
                        width={5}
                        name="location"
                        type="url"
                        label="Location"
                        placeholder="Share link from Google Drive, Project Gutenberg, etc."
                        value={location}
                        onChange={this.handleChange}
                        // required
                        control="input"
                    />
                    <Form.Select
                        width={5}
                        name="language"
                        label="Book's language"
                        placeholder="Ancient English"
                        options={
                            languageCodes.map(language => (
                                <option
                                    key={language.code}
                                    value={language.code}
                                    children={language.name}
                                />
                            )
                        )}
                        value={language}
                        onChange={this.handleChange}
                        required
                    />
                    <Form.Button
                        // type="submit"
                        content="SAVE"
                    />
                </Form>
            </div>
        )
    }
}

// connect React component Import with Redux store
// first argument for connect must be null when mapDispatchToProps is present without mapStateToProps
const Import = connect(null, mapDispatchToProps)(StorelessImport)

export default Import
