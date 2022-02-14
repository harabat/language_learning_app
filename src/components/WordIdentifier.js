// identify words selected by user with selection API

function WordIdentifier(props) {
    console.warn("WordIdentifier active")

    // Selection API represents range of text selected or current position of the caret
    const selection = window.getSelection()
    const range = selection.getRangeAt(0)
    const node = selection.anchorNode

    // pattern of latin word characters
    const patternWordLatin = /[a-zA-Z\u00C0-\u017E-]/
    const patternSentenceLatin = /[^\.!?]/

    // if dictScope is not "paragraph", select word or sentence, otherwise select paragraph
    if (props !== "paragraph") {
        const pattern = props === "word" || props === "pronunciation" ? patternWordLatin : patternSentenceLatin

        // while range is not at start of container, offset to the left
        while (range.startOffset !== 0) {
            range.setStart(node, range.startOffset - 1)
            // if range doesn't match pattern, offset to the right and break
            if (range.toString().search(pattern) !== 0) {
                range.setStart(node, range.startOffset + 1)
                break
            }
        }

        // while range is not end of container, offset to the right
        while (range.endOffset < node.length) {
            range.setEnd(node, range.endOffset + 1)
            // if last character of range doesn't match pattern, offset to the left and break
            if (range.toString().slice(-1).search(pattern) === -1) {
                range.setEnd(node, range.endOffset - 1)
                break
            }
        }
    } else {
        console.log("paragraph")
        range.setStart(node, 0)
        range.setEnd(node, node.length)
    }

    // trim "-" characters
    const word = range.toString().trim().replace(/^-+|-+$/g, "")
    const getBoundingClientRect = () => range.getBoundingClientRect()

    return {
        word: word,
        getBoundingClientRect: getBoundingClientRect
    }
}

export default WordIdentifier
