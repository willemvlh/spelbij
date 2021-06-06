import {render} from '@testing-library/react';
import FoundsWords from "../components/FoundWords/FoundWords";

let component = <FoundsWords edgeLetters={Array.from("abcdefgh")} centerLetter={"i"} foundWords={["abc", "def"]} allWords={["abc", "def", "ghi"]}/>

test('shows the found words', () => {
    const result = render(component, {});
    const words = Array.from(result.baseElement.querySelectorAll(".foundWord"));
    expect(words.length).toEqual(2);
    expect(words[0].textContent).toEqual("abc");
    expect(words[1].textContent).toEqual("def");
});

test("shows a header for each letter", () => {
    expect(render(component).baseElement.querySelectorAll("h5").length).toEqual(9)
})
