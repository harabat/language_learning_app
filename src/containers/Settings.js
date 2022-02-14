import React from "react"
import { connect } from "react-redux"

import LibraryHeader from "../components/LibraryHeader"
import { fetchStats, unstarWord } from "../actions/actions"
import { languages } from "../constants/languages"

// settings for app
// TODO
// - nested routes for different components
// - Stats component
// - design options (night mode, some styles for Book component)
// - include profile here?

function mapStateToProps(state) {
    return {
        bookList: state.bookList,
        languageStats: state.languageStats
    }
}

function mapDispatchToProps(dispatch) {
    return {
        fetchStats: () => dispatch(fetchStats()),
        unstarWord: word => dispatch(unstarWord(word))
    }
}

class StorelessSettings extends React.Component {
    constructor() {
        super()
        this.state = {
        }
    }

    componentDidMount() {
        // if languageStats is empty, fetch languageStats
        fetchStats()
    }

    render() {
        console.warn("Settings\nState:", this.state, "\nProps:", this.props)

        const languageStats = Object.keys(this.props.languageStats).map(
            (key, index) => {
                const hoursTotal = this.props.languageStats[key].hours
                const startDate = new Date(this.props.languageStats[key].startDate)
                const currentDate = new Date()
                const days = Math.floor((currentDate - startDate) / (1000 * 60 * 60 * 24))
                const hoursAverage = hoursTotal / days
                return (
                    <div key={key}>
                        <h2>
                            {languages[key].name.replace(/;.*/g, "")}
                        </h2>
                        <p>
                            Hours total: {hoursTotal}
                        <br />
                            Days total: {days}
                        <br />
                            Hours average: {hoursAverage}
                        </p>
                        <br />
                    </div>
                )
            }
        )
        const { bookList } = this.props
        const bookStats = Object.keys(bookList).map(
            (key, index) => {
                if (!bookList[key].readingPosition) {
                    return null
                }
                const { title, author, language, readingPosition } = bookList[key]
                return (
                    <p key={key}>
                        {title} by {author} (language: {language}): {readingPosition * 100}% read
                    </p>
                )
            }
        )

        return (
            <div>
                <LibraryHeader />
                <h1
                    children="Settings"
                />
                {languageStats}
                {bookStats}
            </div>
        )
    }
}

const Settings = connect(mapStateToProps, mapDispatchToProps)(StorelessSettings)

export default Settings
