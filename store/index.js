import { applyMiddleware, combineReducers, compose, createStore } from "redux";
import ReduxThunk from 'redux-thunk'

import system from './reducer/system'
import folder from './reducer/folder'
import file from './reducer/file'
import auth from './reducer/auth'
import submit from './reducer/submit'
import share from './reducer/share'

const rootReducer = combineReducers({
    system,
    folder,
    file,
    auth,
    submit,
    share
})
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
    rootReducer,
    composeEnhancers(applyMiddleware(ReduxThunk))
);
export default store