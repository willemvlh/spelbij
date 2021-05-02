import { render} from '@testing-library/react';
import FoundsWords from "../components/FoundWords/FoundWords";

test('renders learn react link', () => {
    render(<FoundsWords foundWords={["abc", "ghi", "def"]} />, document.body);
    let words = Array.from(document.body.firstElementChild.querySelectorAll(".foundWord"));
    expect(words[0].textContent).toEqual("abc")
    expect(words[1].textContent).toEqual("def")
    expect(words[2].textContent).toEqual("ghi")
});
