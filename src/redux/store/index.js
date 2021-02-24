import { createStore } from 'redux'
import { menuReducer } from '../reducer'

const storeCreator = () => createStore(menuReducer)
export default storeCreator