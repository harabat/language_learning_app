import React from "react"
import { NavLink } from "react-router-dom"
import { Menu, Dropdown, Icon } from "semantic-ui-react"

// header for non-landing, non-book pages
// TODO:
// - move isMobile to store

function LibraryHeader() {
    console.warn("LibraryHeader active")

    // if app is accessed on mobile, header is made compact
    // const isMobile = (
    //     /Mobi|Android/i.test(navigator.userAgent)
    // )
    const isMobile = false
    // console.warn("isMobile:", isMobile)

    return (
        <Menu
            attached="top"
            secondary
        >
            <Menu.Item
                header
                as={NavLink}
                to="/library"
                activeClassName="active"
            >
                <Icon name="warehouse" />
                {!isMobile ? "Library" : ""}
            </Menu.Item>

            <Dropdown
                item
                trigger={
                    <span>
                        <Icon
                            // circular
                            name='download'
                        />
                        {!isMobile ? "Import" : ""}
                    </span>
                }
            >
                <Dropdown.Menu>
                    <Dropdown.Item
                        as={NavLink}
                        to="/import"
                        activeClassName="active"
                    >
                        <Icon
                            // circular
                            // inverted
                            name="cloud"
                        />
                        {!isMobile ? "From the cloud" : ""}
                    </Dropdown.Item>
                    <Dropdown.Item
                        as={NavLink}
                        to="/import"
                        activeClassName="active"
                    >
                        <Icon name="angle left" />
                        {!isMobile ? "From Gutenberg" : ""}
                    </Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown>

            <Menu.Item
                as={NavLink}
                to="/settings"
                activeClassName="active"
            >
                <Icon name="cog" />
                {!isMobile ? "Settings" : ""}
            </Menu.Item>

            <Menu.Item
                as={NavLink}
                to="/logout"
                activeClassName="active"
                position="right"
            >
                <Icon name="user circle" />
                {!isMobile ? "Logout" : ""}
            </Menu.Item>
        </Menu>
    )
}

export default LibraryHeader
