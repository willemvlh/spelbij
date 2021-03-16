import './App.css';
import Bee from "../Grid/Grid"
import {Provider} from "react-redux"
import Shortcuts from "../Shortcuts"
import store from "../../store/store"


function App() {
  return (
    <Provider store={store}>
        <Shortcuts>
            <Bee/>
        </Shortcuts>
    </Provider>
  );
}

export default App;
