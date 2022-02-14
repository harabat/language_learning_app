import React from "react"
import { connect } from "react-redux"
import Popper from "@material-ui/core/Popper"
import { withStyles } from '@material-ui/core/styles'
import Typography from "@material-ui/core/Typography"
import Fade from "@material-ui/core/Fade"
import Paper from "@material-ui/core/Paper"
import { Button, Card, Container } from "semantic-ui-react"

import { fetchWord} from "../actions/actions"

// word translation object, shows translations from store's dict or from API calls
// TODO
// - make it scrollable
// - make it pretty
// - use Modal instead of Popper if faked reference objects are allowed

// passes dict to WordTranslation
function mapStateToProps(state) {
    return {
        bookCurrent: state.bookCurrent,
        // to check if word is already in dict
        dict: state.dict,
        // to check if word is starred
        languageStats: state.languageStats,
        // to get translation
        translationCurrent: state.translationCurrent
    }
}

// words can be added to dict
function mapDispatchToProps(dispatch) {
    return {
        fetchWord: (word, language) => dispatch(fetchWord(word, language))
    }
}

// styling of Popper
const styles = theme => ({
  typography: {
    padding: theme.spacing.unit * 2
  }
})

class StorelessWordTranslation extends React.Component {
    constructor() {
        super()
        this.state = {
            translation: ""
        }
    }

    async componentDidMount() {
        const { word, dict, bookCurrent } = this.props

        // if word is in dict, make {word: dict[word]} object in state.word
        if (Object.keys(dict).indexOf(word) !== -1) {
            console.log("word in dict, no need to fetch")

            const translation = dict[word]
            this.setState({
                translation: translation
            })
            return null
        }

        // if word is not in dict, call API and add word to dict
        console.log("fetching word")
        const language = bookCurrent.language
        this.props.fetchWord(word, language)
        console.log(this.props.translationCurrent)
        this.setState(prevState => {
            prevState.translation = this.props.translationCurrent
        })
    }

    render() {
        console.warn("WordTranslator active\nState:", this.state, "\nProps:", this.props)

        // const wordTranslator = JSON.stringify(this.state.word)
        const translation = this.state.translation


        const { bookCurrent, languageStats, translationCurrent, word } = this.props
        const language = bookCurrent.language
        // language in languageStats and word in languageStats[language].words
        const starred = (
            Object.keys(languageStats).indexOf(language) !== -1 &&
            languageStats[language].words.indexOf(word) !== -1
        )

        return (
            <Popper
                // determines whether Popper is open
                // already determined in Book for WordTranslation, but open is a mandatory option
                open={this.props.open}
                // DOM element for positioning Popper
                anchorEl={this.props.anchorEl}
                // Popper doesn't render without this argument and {({TransitionProps}) => <x {...TransitionProps}>...</x>}
                transition
                placement="top-start"
            >
                {({ TransitionProps }) => (
                    <Fade {...TransitionProps} timeout={350}>
                        <Paper>
                            <Card>
                                <Card.Content extra>
                                    <Button
                                        fluid
                                        icon="star"
                                        color={
                                            starred
                                            ? "green"
                                            : "grey"
                                        }
                                    />
                                </Card.Content>
                                <Card.Content extra>
                                    <Card.Header>
                                        <Container>
                                            {translation}
                                        </Container>
                                    </Card.Header>
                                    <Card.Description>
                                        <Typography className={this.props.classes.typography}>
                                            Oft sprach er aus einem Chandogya-Upanishad sich die Worte vor: "Fürwahr, der Name des Brahman ist Satyam—wahrlich, wer solches weiß, der geht täglich ein in die himmlische Welt." Oft schien sie nahe, die himmlische Welt, aber niemals hatte er sie ganz erreicht, nie den letzten Durst gelöscht. Und von allen Weisen und Weisesten, die er kannte und deren Belehrung er genoß, von ihnen allen war keiner, der sie ganz erreicht hatte, die himmlische Welt, der ihn ganz gelöscht hatte, den ewigen Durst.
                                        </Typography>
                                    </Card.Description>
                                </Card.Content>
                            </Card>
                        </Paper>
                    </Fade>
                )}
            </Popper>
        )
    }
}

const StylelessWordTranslation = connect(mapStateToProps, mapDispatchToProps)(StorelessWordTranslation)

const WordTranslation = withStyles(styles)(StylelessWordTranslation)

export default WordTranslation

