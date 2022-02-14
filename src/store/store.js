import { configureStore } from "redux-starter-kit"
import thunk from "redux-thunk"

import rootReducer from "../reducers/reducers"
import { irrelevantMiddleware } from "../middleware/middleware"

// store contains global application state, single source of truth, which is immutable and can't change in place (like with setState)

const store = configureStore({
    reducer: rootReducer,
    middleware: [irrelevantMiddleware, thunk]
})

export default store
