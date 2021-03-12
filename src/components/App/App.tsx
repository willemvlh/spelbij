import './App.css';
import Bee from "../Grid/Grid"
import {Provider} from "react-redux"
import store from "../../store/store"

function App() {
  return (
    <Provider store={store}>
        <Bee/>
    </Provider>
  );
}

export default App;
