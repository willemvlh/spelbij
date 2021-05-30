import {configureStore} from '@reduxjs/toolkit'
import thunk from "redux-thunk"
import logger from "redux-logger";
import {debounce} from "lodash"
import {reducer} from "./reducer";
import {getGameFromStorageOrServer} from "../Utils";


async function createStoreAsync(){
    const game = await getGameFromStorageOrServer();
    const store = configureStore({ reducer, middleware: [thunk, logger], preloadedState: game });
    const saveState = debounce(() => localStorage.setItem("gameState", JSON.stringify(store.getState())), 1000);
    store.subscribe(() => saveState());
    return store;
}

export default createStoreAsync;