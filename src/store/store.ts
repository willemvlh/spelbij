import { configureStore, Reducer } from '@reduxjs/toolkit'
import { WordAction, WordState } from './types';
import {shuffle, debounce} from "lodash"

const words = ["bede", "bedeesd", "berd", "berde", "beroepscode", "beroepseed", "beroepsorde", "beroerd", "beweerd", "bobbed", "bode", "bodes", "boede", "boerde", "bood", "boord", "bord", "border", "bordes", "bosbode", "breed", "breedspoor", "brod", "broed", "broeder", "broederorde", "broedproces", "broeds", "brood", "brooddoos", "broodoproer", "ceder", "code", "codec", "codeerder", "codewoord", "credo", "decoder", "decor", "deed", "derde", "dobbe", "dobber", "dode", "doder", "dodo", "does", "dood", "doodop", "doods", "doodsbed", "doop", "door", "doorboord", "doorreed", "doos", "dope", "doper", "dopers", "dopper", "dorp", "dorper", "dorps", "dors", "dorser", "dresscode", "droes", "droop", "drop", "drops", "dweper", "eerder", "eerredder", "erdoor", "erecode", "ereorde", "erewoord", "esdorp", "oord", "oordop", "opbod", "orde", "ordebroeder", "order", "orderproces", "ordewoord", "pede", "pedo", "peerdrops", "persbrood", "poeder", "poederdoos", "poepdoos", "poeperd", "porder", "procesorde", "record", "recorder", "recordscore", "redder", "rede", "reder", "redres", "reed", "reeds", "robbedoes", "rode", "rodeo", "roede", "roerder", "rood", "scorebord", "seder", "soepbord", "speed", "spoed", "wedde", "wedder", "wede", "weder", "wederdoop", "wederdoper", "wederdopers", "wederwoord", "weed", "weercode", "weerwoord", "werd", "woede", "woerd", "woord", "woordorde", "wordprocessor", "wreed"]

const getStateFromStorage : (() => WordState | null) = () => {
    let storeAsString = localStorage.getItem("state");
    return JSON.parse(storeAsString ?? "null")
}

const initialState: WordState = { 
    currentWord: "", 
    edgeLetters: ["p", "r", "o", "e", "s", "b", "w", "c"], 
    centerLetter: "d", 
    score: 0,
    words: words,
    foundWords: []
    };

const initialOrSavedState = getStateFromStorage() || initialState;

const reducer: Reducer<WordState, WordAction> = (state = initialOrSavedState, action) => {

    switch (action.type) {
        case "removeLetter":
            return { ...state, currentWord: state.currentWord.substring(0, state.currentWord.length - 1) }
        case "addLetter":
            if(!(state.centerLetter + state.edgeLetters).includes(action.payload)){
                return state;
            }
            if(state.currentWord.length === 10){
                return state;
            }
            return { ...state, currentWord: state.currentWord.concat(action.payload) }
        case "resetWord":
            return { ...state, currentWord: "" }
        case "submitWord": {
            const newState = {...state, currentWord: ""}
            const word = state.currentWord
            if(state.foundWords.includes(word)){
                return newState
            }
            if(state.words.includes(word)){
                return {...newState, score: state.score + word.length, foundWords: [...state.foundWords, word]}
            }
            return newState
        }
        case "updateScore":
            return {...state, score: state.score + action.payload.addPoints}
        case "shuffle":
            return {...state, edgeLetters: shuffle(state.edgeLetters)}
        default:
            return initialState
    }
}

const store = configureStore({ reducer: reducer,  });
const saveState = debounce(() => localStorage.setItem("state", JSON.stringify(store.getState())), 1000);
store.subscribe(() => saveState())
export default store;