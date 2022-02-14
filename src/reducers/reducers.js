import { createReducer } from "redux-starter-kit"

// reducers are pure functions that produce application state
// take 2 arguments, state and action
// reducers calculate next state depending on action type and return new object to replace state
// TODO
// migrate all to createReducer
// - change if to switch

const initialState = {
    bookList: {},
    bookCurrent: {},
    translationCurrent: "",
    words: {},
    dict: {},
    dictScope: null,
    dictHidden: true,
    languageStats: {}
}

// adds a book item to store's bookList on import
// bookList in store will be synchronised with backend at logout
function addBook(state, action) {
    // Object.assign(object to change, objects to extract values from)
    const book = action.payload
    state.bookList[book.slug] = book
}

// removes book item from bookList
function removeBook(state, action) {
    const bookSlug = action.payload
    delete state.bookList[bookSlug]
}

// creates initial bookList when it's fetched from API in Library
// allows to not fetch bookList from backend at every mount
function createBookList(state, action) {
    state.bookList = action.payload
}

// defines current book in bookCurrent
function defineBook(state, action) {
    state.bookCurrent = action.payload
}

// on closing a book, updates reading position, updates book in bookList, clears bookCurrent and dict, and deactivates dict
function closeBook(state, action) {
    state.bookCurrent.readingPosition = action.payload
    state.bookList[state.bookCurrent.slug] = state.bookCurrent
    state.bookCurrent = {}
    state.dictScope = "word"
    state.dictHidden = true
    state.dict = {}
}

// fetches word, defines it in translationCurrent, and adds it to dict
// dict in store will be synchronised with backend at logout
function fetchWord(state, action) {
    // Array.prototype.concat() instead of Array.prototype.push() to keep original state immutable
    const word = action.payload[0]
    const translation = action.payload[1]
    state.translationCurrent = translation
    state.dict[word] = translation
}

// fetches dict
function fetchDict(state, action) {
    state.dict = action.payload
}

// toggles between different states of dictScope and makes dictHidden true
function changeDictScope(state, action) {
    state.dictScope = (action.payload !== state.dictScope ? action.payload : null)
    state.dictHidden = true
}

// toggles dictHidden
function hideDict(state, action) {
    state.dictHidden = action.payload
    state.translationCurrent = ""
}

// add word to words
function starWord(state, action) {
    state.languageStats[state.bookCurrent.language].words.concat(action.payload)
}

// remove word from words
function unstarWord(state, action) {
    state.languageStats[state.bookCurrent.language].words.splice(action.payload)
}

// fetch stats
function fetchStats(state, action) {
    state.languageStats = action.payload
}

const rootReducer = createReducer(
    initialState,
    {
        ADD_BOOK: addBook,
        REMOVE_BOOK: removeBook,
        CREATE_BOOKLIST: createBookList,
        DEFINE_BOOK: defineBook,
        CLOSE_BOOK: closeBook,
        FETCH_WORD: fetchWord,
        FETCH_DICT: fetchDict,
        CHANGE_DICT_SCOPE: changeDictScope,
        HIDE_DICT: hideDict,
        STAR_WORD: starWord,
        UNSTAR_WORD: unstarWord,
        FETCH_STATS: fetchStats
    }
)

export default rootReducer
