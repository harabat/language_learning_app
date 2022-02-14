import {
    ADD_BOOK,
    CREATE_BOOKLIST,
    DEFINE_BOOK,
    FETCH_WORD,
    CLEAR_DICT,
    FETCH_DICT,
    CHANGE_DICT_SCOPE,
    HIDE_DICT,
    FETCH_STATS
} from "../constants/action-types"

// functions that intercept and inspect dispatched actions before they reach reducer

// check if book has duplicate in store's bookList
export function irrelevantMiddleware(store) {
    return function(next) {
        return function(action) {
            console.log("action:", action)
            if (action.type === ADD_BOOK) {
                const bookListLength = Object.assign(store.getState().bookList).length + 1
                console.log("bookList.length:", bookListLength)
            }
            if (action.type === CREATE_BOOKLIST) {
                console.log("bookList:", action.payload)
            }
            if (action.type === DEFINE_BOOK) {
                console.log("bookCurrent:", action.payload)
            }
            if (action.type === FETCH_WORD) {
                console.log("fetchWord:", action.payload)
                // const dictLength = Object.assign(store.getState().dict).length + 1
                // console.log("Length of dict:", dictLength)
            }
            if (action.type === CLEAR_DICT) {
                console.log("dict cleared")
            }
            if (action.type === FETCH_DICT) {
                console.log("dict:", action.payload)
            }
            if (action.type === CHANGE_DICT_SCOPE) {
                const scope = (action.payload !== store.getState().dictScope ? action.payload : null)
                console.log("dict", scope)
            }
            if (action.type === HIDE_DICT) {
                const hidden = action.payload ? "hidden" : "unhidden"
                console.log("dict", hidden)
            }
            if (action.type === FETCH_STATS) {
                console.log("stats:", action.payload)
            }

            return next(action)
        }
    }
}

const middleware = { irrelevantMiddleware }

export default middleware
