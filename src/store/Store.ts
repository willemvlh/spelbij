import {configureStore} from '@reduxjs/toolkit'
import thunk from "redux-thunk"
import logger from "redux-logger";
import {debounce} from "lodash"
import {reducer} from "./reducer";


const store = configureStore({ reducer, middleware: [thunk, logger] });
const saveState = debounce(() => localStorage.setItem("gameState", JSON.stringify(store.getState())), 1000);

store.subscribe(() => saveState())

export default store;