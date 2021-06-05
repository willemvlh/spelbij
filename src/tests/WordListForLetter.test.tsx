import { render, within } from '@testing-library/react';

import WordListForLetter from "../components/WordListForLetter/WordListForLetter";

test("displays missed words", () => {
    const result = render(<WordListForLetter letter={"a"} foundWords={["abc"]} allWords={["abc", "acb"]} displayMissedWords={true}/>);
    within(result.baseElement.querySelector("h5")!).getByText("a");
    within(result.baseElement.querySelector("h5")!).getByText("(1 / 2)");
    result.getByText("abc")
    result.getByText("acb")
})

test("does not display missed words", () => {
    const result = render(<WordListForLetter letter={"a"} foundWords={["abc"]} allWords={["abc", "acb"]} displayMissedWords={false}/>);
    expect(result.queryByText("acb")).toBeNull()
})