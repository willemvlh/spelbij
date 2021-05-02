export const submitWord = (dispatch: (payload: { type: string; }) => void) => {

    dispatch({type: "submitWord"})
}