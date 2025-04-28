// import rootReducer from './reducers';
import { produce } from 'immer'
import { createStore } from 'redux';


const initialState = {
    currentUser: {},

}

const reducer = produce((state, action) => {
    switch (action.type) {
        case 'SET_CURRENT_USER':
            state.currentUser = action.payload
            break;
        default:
            break;
    }
}, initialState)

const myStore = createStore(reducer)
export default myStore