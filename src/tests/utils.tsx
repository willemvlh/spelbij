import {render as rtlRender} from "@testing-library/react"
import React from "react";
import {EnhancedStore} from "@reduxjs/toolkit";
import {Provider} from "react-redux";
import {IGameState} from "../store/Types";


const render = function (component: React.ReactElement, store?: EnhancedStore) {
    const wrapper: (React.FC | undefined) = store && (({children}) => <Provider store={store}>{children}</Provider>)
    return rtlRender(component, {wrapper: wrapper})
}

type OptionalState = {
    currentWord?: string,
    words?: [],
    centerLetter?: string,
    edgeLetters?: string[],
    foundWords?: string[],
    inputError?: string,
    loaded?: boolean,
    previousScore?: number,
    score?: number,
    wasStopped?: false
}

export function mockStore(initial: OptionalState): IGameState {
    const initialState = {
        currentWord: "",
        words: [],
        centerLetter: "",
        edgeLetters: [],
        foundWords: [],
        inputError: "",
        loaded: false,
        previousScore: 0,
        score: 0,
        wasStopped: false

    }
    return {...initialState, ...initial}
}

// re-export everything
export * from '@testing-library/react'
// override render method
export {render}