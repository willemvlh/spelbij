import {SubmitWordAction} from "./Types";

export const submitWord = (dispatch: (payload: { type: string; }) => void) => {

    dispatch({type: "submitWord"})
}