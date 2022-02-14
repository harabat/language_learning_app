import React from "react"
import { connect } from "react-redux"
import sanitizeHtml from "sanitize-html-react"

function mapStateToProps(state) {
    return {
        dictHidden: state.dictHidden,
    }
}

function mapDispatchToProps(dispatch) {
    return {
    }
}

function StorelessBookHTML(props) {
    console.warn("BookHTML active")

    // default options of HTML rendering
    // allowed tags determined after listing tags used in a selection of books
    // no allowed attributes, as these are not necessary for rendering of minimally formatted HTML
    const html_options = {
        allowedTags: [
            "b", "blockquote", "br",
            "caption", "code", "div", "em",
            "h1", "h2", "h3", "h4", "h5",
            "h6", "hr", "i", "li", "nl",
            "ol", "p", "pre", "quote",
            "section", "strike", "strong",
            "sup", "table", "tbody", "td",
            "th", "thead", "tr", "ul"
        ],
        allowedAttributes: []
    }

    // sanitizeHtml sanitises HTML (encoding some characters, rendering only allowed elements)
    // React also sanitises HTML (encoding of some dangerous characters, like chevrons)
    const sanitize = (html, options=html_options) => ({
        __html: sanitizeHtml(
            html,
            html_options
        )
    })

    // dangerouslySetInnerHTML named so to show that HTML rendering is risky
    return (
        <div>
            <div dangerouslySetInnerHTML={
                sanitize(props.html, props.options)
                }
            />
        </div>
    )
}

const BookHTML = connect(mapStateToProps, mapDispatchToProps)(StorelessBookHTML)

export default BookHTML

// import React from 'react';
// import { withStyles } from '@material-ui/core/styles';
// import Popper from '@material-ui/core/Popper';
// import Typography from '@material-ui/core/Typography';
// import Fade from '@material-ui/core/Fade';
// import Paper from '@material-ui/core/Paper';

// class FakedReferencePopper extends React.Component {
//   state = {
//     anchorEl: null,
//     open: false,
//     word: null
//   };

//   handleMouseUp = () => {
//     const selection = window.getSelection();


//     const range = selection.getRangeAt(0)
//     const node = selection.anchorNode

//     // pattern of latin word characters
//     const patternLatin = /[a-zA-Z\u00C0-\u017E-]/

//     // while range is not at start of container, offset to the left
//     while (range.startOffset !== 0) {
//         range.setStart(node, range.startOffset - 1)
//         // if range doesn't match pattern, offset to the right and break
//         if (range.toString().search(patternLatin) !== 0) {
//             range.setStart(node, range.startOffset + 1)
//             break
//         }
//     }

//     // while range is not end of container, offset to the right
//     while (range.endOffset < node.length) {
//         range.setEnd(node, range.endOffset + 1)
//         // if last character of range doesn't match pattern, offset to the left and break
//         if (range.toString().slice(-1).search(patternLatin) === -1) {
//             range.setEnd(node, range.endOffset - 1)
//             break
//         }
//     }

//     // trim "-" characters
//     const word = range.toString().trim().replace(/^-+|-+$/g, "")
//     // Resets when the selection has a length of 0
//     if (!word) {
//       this.handleClose();
//       return;
//     }
//     const getBoundingClientRect = () => range.getBoundingClientRect();

//     this.setState({
//       open: true,
//       anchorEl: {
//         width: getBoundingClientRect().width,
//         height: getBoundingClientRect().height,
//         getBoundingClientRect,
//       },
//       word: word
//     });
//   };

//   handleClose = () => {
//     if (!this.state.open) {
//       return;
//     }

//     this.setState({ open: false });
//   };

//   render() {
//     const { anchorEl, open } = this.state;
//     const area = open ? 'faked-reference-popper' : null;

//     return (
//       <div onMouseLeave={this.handleClose}>
//         <Typography aria-describedby={area} onMouseUp={this.handleMouseUp}>
//           Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam ipsum purus, bibendum sit
//           amet vulputate eget, porta semper ligula. Donec bibendum vulputate erat, ac fringilla mi
//           finibus nec. Donec ac dolor sed dolor porttitor blandit vel vel purus. Fusce vel malesuada
//           ligula. Nam quis vehicula ante, eu finibus est. Proin ullamcorper fermentum orci, quis
//           finibus massa. Nunc lobortis, massa ut rutrum ultrices, metus metus finibus ex, sit amet
//           facilisis neque enim sed neque. Quisque accumsan metus vel maximus consequat. Suspendisse
//           lacinia tellus a libero volutpat maximus.
//         </Typography>
//         <Popper id={area} open={open} anchorEl={anchorEl} transition placement="top-start">
//           {({ TransitionProps }) => (
//             <Fade {...TransitionProps} timeout={350}>
//                 <Paper>
//                     <Typography>
//                         {this.state.word}
//                     </Typography>
//                 </Paper>
//             </Fade>
//           )}
//         </Popper>
//       </div>
//     );
//   }
// }

// const BookHTML = FakedReferencePopper

// export default BookHTML
