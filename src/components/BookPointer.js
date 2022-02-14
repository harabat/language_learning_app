import React from "react"
import { Link } from "react-router-dom"
import { connect } from "react-redux"
import { Accordion, Button, Card, Container, Icon, Image } from "semantic-ui-react"

import { defineBook, removeBook } from "../actions/actions"
import { languages } from "../constants/languageCodes"

// buttons that refer to books or book-pairs
// TODO
// - make book pointers pretty
// - maybe alternative to <Button as {Navlink} />, to not have "Warning: Function components cannot be given refs. Attempts to access this ref will fail."


function mapDispatchToProps(dispatch) {
    return {
        defineBook: bookItem => dispatch(defineBook(bookItem)),
        removeBook: bookSlug => dispatch(removeBook(bookSlug))
    }
}

function StorelessBookPointer(props) {
    console.warn("BookPointer active")

    // determine from slug the path the `BookPointer` should route to
    const { book, defineBook, removeBook, slug } = props
    const path = `/book/${slug}`
    const { title, author, cover, desc, language } = book

    // desc appears in accordion
    const descDropdown = [{
        key: "desc",
        title: "Description",
        content: desc
    }]

    return (
        <Card raised>
            <Card.Content>
                <Image
                    as={Link}
                    to={path}
                    onClick={() => defineBook(book)}
                    src={cover}
                    rounded
                    floated="right"
                    size="tiny"
                />
                <Card.Header
                    as={Link}
                    to={path}
                    onClick={() => defineBook(book)}
                >
                    {title}
                </Card.Header>
                <Card.Meta>
                    <p>
                        {author}
                    </p>
                        <Accordion panels={descDropdown} />
                    <p>
                        Language: {languages[language].nativeName}
                    </p>
                </Card.Meta>
            </Card.Content>
            <Card.Content extra >
                <Button
                    basic
                    color="green"
                    onClick={() => removeBook(slug)}
                >
                    <Icon name="info" />
                    Stats
                </Button>
                <Button
                    basic
                    color="red"
                    onClick={() => removeBook(slug)}
                >
                    <Icon name="close" />
                    Remove from Library
                </Button>
            </Card.Content>
        </Card>
    )
}

const BookPointer = connect(null, mapDispatchToProps)(StorelessBookPointer)

export default BookPointer
