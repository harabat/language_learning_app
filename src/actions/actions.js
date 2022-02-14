import {
    ADD_BOOK,
    REMOVE_BOOK,
    CREATE_BOOKLIST,
    DEFINE_BOOK,
    CLOSE_BOOK,
    FETCH_WORD,
    FETCH_DICT,
    CHANGE_DICT_SCOPE,
    HIDE_DICT,
    STAR_WORD,
    UNSTAR_WORD,
    FETCH_STATS
} from "../constants/action-types"

// only way to change state is by dispatching action (signal) to store
// actions are objects with type property that describes how state should change and payload
// action creators are functions that hold action objects
// TODO
// - migrate client logic to thunks?
// - make Request object creation more general

// adds a book item to store's bookList on import
// bookList in store will be synchronised with backend at logout
export function addBook(payload) {
    return {
        type: ADD_BOOK,
        payload
    }
}

// removes book from bookList
export function removeBook(payload) {
    return {
        type: REMOVE_BOOK,
        payload
    }
}

// creates initial bookList when it's fetched from API in Library
// allows to not fetch bookList from backend at every mount
export function createBookList(callback) {
    callback(true)
    return async function(dispatch) {
        try {
            const bookListCall = await fetch("/api/library")
            const bookList = await bookListCall.json()
            dispatch({
                type: CREATE_BOOKLIST,
                payload: bookList
            })
        } catch (error) {
            callback(false, null, error)
        }
    }
}
// defines current book in bookCurrent
export function defineBook(payload) {
    return {
        type: DEFINE_BOOK,
        payload
    }
}

export function closeBook(payload) {
    return {
        type: CLOSE_BOOK,
        payload
    }
}

// fetch word, define it in woodCurrent, and add it to dict
// dict in store will be synchronised with backend at logout
export function fetchWord(word, language) {
    return async function(dispatch) {
        try {
            const wordCall = await fetch(`/api/translate?word=${word}&language=${language}`)
            const translation = await wordCall.text()
            dispatch({
                type: FETCH_WORD,
                payload: [word, translation]
            })
        } catch (error) {
            dispatch({
                type: "ERROR",
                payload: error
            })
        }
    }
}

// fetches dict
export function fetchDict(payload) {
    return async function(dispatch) {
        try {
            // both awaits are needed
            const dictCall = await fetch(`/api/dict?language=${payload}`)
            console.log("dict:", dictCall)
            const dict = await dictCall.json()
            dispatch({
                type: FETCH_DICT,
                payload: dict
            })
        } catch (error) {
            dispatch({
                type: "ERROR",
                payload: error
            })
        }
    }
}

// toggles dictScope and makes dictHidden true
export function changeDictScope(payload) {
    return {
        type: CHANGE_DICT_SCOPE,
        payload
    }
}

// toggles dictHidden
export function hideDict(payload) {
    return {
        type: HIDE_DICT,
        payload
    }
}

// adds word to store's words
export function starWord(payload) {
    return {
        type: STAR_WORD,
        payload
    }
}

// remove word from store's words
export function unstarWord(payload) {
    return {
        type: UNSTAR_WORD,
        payload
    }
}

// fetch stats
// thunks allow to call async functions from action creators in addition to plain objects
// dispatch is argument in outer function and is called explicitly
export function fetchStats() {
    return async function(dispatch, getState) {
        try {
            if (Object.keys(getState().languageStats).length) {
                console.warn("no need to fetch dict")
                return
            }

            const statsCall = await fetch("/api/stats")
            const languageStats = await statsCall.json()
            dispatch({
                type: FETCH_STATS,
                payload: languageStats
            })
        } catch (error) {
            dispatch({
                type: "ERROR",
                payload: error
            })
        }
    }
}

const actions = {
    addBook,
    createBookList,
    defineBook,
    closeBook,
    fetchWord,
    fetchDict,
    changeDictScope,
    hideDict,
    starWord,
    unstarWord,
    fetchStats
}

export default actions
