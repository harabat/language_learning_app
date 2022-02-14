// interface between app and backend to separate frontend from backend
// TODO
// - find out why Client's functions do not need props (bookSlug instead of props.bookSlug) or React lib
// - check error object in checkStatus()

export async function fillLibrary(callback) {
    console.warn("fillLibrary: Client started")
    // console.time("fillLibrary")
    callback(true)
    try {
        const res = await fetch("/api/library")
        // console.log("fillLibrary: Content fetched")
        const checked = await checkStatus(res)
        // console.log("fillLibrary: Content checked")
        const bookList = await checked.json()
        // console.log("fillLibrary: bookList created")
        callback(false, bookList)
        // console.log("fillLibrary: Client finished, state set to bookList")
        // console.timeEnd("fillLibrary")
    } catch (error) {
        // console.log("fillLibrary: Error caught")
        callback(false, null, error)
        // console.log("fillLibrary: ", error.toString())
        // console.log("fillLibrary: Client finished, state set to error")
        // console.timeEnd("fillLibrary")
    }

}

export async function openBook(bookSlug, callback) {
    console.warn("openBook: Client started")
    // console.time("fillLibrary")
    callback(true)
    try {
        // console.log(`openBook: Selected book = http://warehouse:8081/api/library/book/${bookSlug}.html`)
        const res = await fetch(`/api/book?slug=${bookSlug}`)
        // console.log("openBook: Content fetched")
        const checked = await checkStatus(res)
        // console.log("openBook: Content checked")
        const book = await checked.text()
        // console.log("openBook: book opened")
        callback(false, book)
        // console.log("openBook: Client finished, state set to book")
        // console.timeEnd("fillLibrary")
    } catch (error) {
        // console.log("openBook: Error caught")
        callback(false, null, error)
        // console.log("openBook: ", error.toString())
        // console.log("openBook: Client finished, state set to error")
        // console.timeEnd("fillLibrary")
    }
}

// check if request returned error
function checkStatus(res) {
    if (res.status >= 200 && res.status <= 300) {
        return res
    }

    const error = new Error(
        `HTTP Error: ${res.statusText}`
    )

    error.status = res.statusText
    error.res = res
    throw(error)
}

const Client = { fillLibrary, openBook }

export default Client
