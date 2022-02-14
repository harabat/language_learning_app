import React from "react"
import { NavLink } from "react-router-dom"
import { Menu, Icon } from "semantic-ui-react"

// header for landing page
// TODO
// - either make "/login" always point to "/login" or make a NavLink to LandingPage in LibraryHeader
// - move isMobile to store

function LandingHeader(props) {
    console.warn("LandingHeader active")

    // if app is accessed on mobile, header is made compact
    // const isMobile = (
    //     /Mobi|Android/i.test(navigator.userAgent)
    // )
    const isMobile = false

    const isAuthenticated = props.auth.isAuthenticated()

    return (
        <Menu
            attached="top"
            secondary
        >
            <Menu.Item
                header
                as={NavLink}
                exact to="/"
                activeClassName="active"
            >
                <Icon name="warehouse" />
                {!isMobile ? "Home" : ""}
            </Menu.Item>

            <Menu.Item
                as={NavLink}
                to="/about"
                activeClassName="active"
                position="right"
            >
                <Icon name="info circle" />
                {!isMobile ? "About" : ""}
            </Menu.Item>

            <Menu.Item
                as={NavLink}
                to={
                    isAuthenticated
                    ? "/logout"
                    : "/login"
                }
                activeClassName="active"
                position="right"
            >
                <Icon name="user" />
                {
                    isAuthenticated
                    ? "Log out"
                    : "Log in"
                }
            </Menu.Item>
        </Menu>
    )
}

export default LandingHeader
