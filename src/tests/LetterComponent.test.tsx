import {screen} from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import {mockStore, render} from "./utils"
import LetterComponent from "../components/Letter/Letter";
import {createStore} from "@reduxjs/toolkit";
import {reducer} from "../store/reducer";

test("it shows a letter", () => {
    const store = createStore(reducer, mockStore({}))
    render(<LetterComponent letter={"x"}/>, store);
    expect(screen.getByText("x")).toBeInTheDocument()
    userEvent.click(screen.getByRole("gridcell"))
    expect(store.getState().currentWord).toEqual("x")
})