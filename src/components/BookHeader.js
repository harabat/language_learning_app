import React from "react"
import { connect } from "react-redux"
import { NavLink } from "react-router-dom"
import { Button, Dropdown, Icon, Menu } from "semantic-ui-react"

import { changeDictScope } from "../actions/actions"

// header to book object, allows to change reading settings and to go to library
// TODO
// - preferences floating window when Title by Author is selected
// - search function
// - move isMobile to store

// communicates to BookHeader what bookCurrent is
function mapStateToProps(state) {
    return {
        // to extract title and author
        bookCurrent: state.bookCurrent,
        // to determine color of dict button
        dictScope: state.dictScope
    }
}

function mapDispatchToProps(dispatch) {
    return {
        // to change scope of WordIdentifier, and activate or deactivate WordTranslator
        changeDictScope: scope => dispatch(changeDictScope(scope))
    }
}

function StorelessBookHeader(props) {
    console.warn("Book active\nProps:", props)

    // if app is accessed on mobile, header is made compact
    // const isMobile = (
    //     /Mobi|Android/i.test(navigator.userAgent)
    // )
    const isMobile = false

    return (
        <Menu
            attached="top"
            secondary
            // inverted
            // size="small"
        >

            <Menu.Item
                header
                as={NavLink}
                exact to="/library"
                activeClassName="active"
            >
                <Icon
                    name="angle left"
                />
                {!isMobile ? "Library" : ""}
            </Menu.Item>

            <Menu.Item
                as={NavLink}
                to="/preferences"
                activeClassName="active"
            >
                <Icon name="sliders" />
                {
                    !isMobile
                    ? <div>
                        <strong>
                            {props.bookCurrent.title}
                        </strong>
                        <em>&nbsp;by&nbsp;</em>
                        {props.bookCurrent.author}
                    </div>
                    : ""
                }
            </Menu.Item>

            <Menu.Menu position="right">
                <Dropdown
                    item
                    trigger={
                        <Icon
                            name="language"
                            size="big"
                            color={props.dictScope !== null ? "blue" : "grey"}
                        />
                    }
                >
                    <Dropdown.Menu>
                        <Dropdown.Item
                            icon="battery one"
                            content="Words"
                            onClick={() => props.changeDictScope("word")}
                            active={props.dictScope === "word"}
                            color={props.dictScope === "word" ? "blue" : "grey"}
                        />
                        <Dropdown.Item
                            icon="battery three"
                            content="Sentences"
                            onClick={() => props.changeDictScope("sentence")}
                            active={props.dictScope === "sentence"}
                            // color={props.dictScope === "sentence" ? "blue" : "grey"}
                        />
                        <Dropdown.Item
                            icon="battery full"
                            content="Paragraphs"
                            onClick={() => props.changeDictScope("paragraph")}
                            active={props.dictScope === "paragraph"}
                            // color={props.dictScope === "paragraph" ? "blue" : "grey"}
                        />
                        <Dropdown.Item
                            icon="volume up"
                            content="Pronunciation"
                            onClick={() => props.changeDictScope("pronunciation")}
                            active={props.dictScope === "pronunciation"}
                            // color={props.dictScope === "pronunciation" ? "blue" : "grey"}
                        />
                    </Dropdown.Menu>
                </Dropdown>
                <Menu.Item>
                    <Icon name="search" />
                    {!isMobile ? "Search" : ""}
                </Menu.Item>
            </Menu.Menu>
        </Menu>
    )
}

const BookHeader = connect(mapStateToProps, mapDispatchToProps)(StorelessBookHeader)

export default BookHeader
