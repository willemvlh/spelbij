import './App.css';
import Bee from "../Grid/Grid"
import {Provider} from "react-redux"
import Shortcuts from "../Shortcuts"
import LoadingOverlay from "../LoadingOverlay/LoadingOverlay"
import store from "../../store/Store"



function App() {
  return (
    <Provider store={store}>
        <LoadingOverlay>
            <Shortcuts>
                <Bee/>
            </Shortcuts>
        </LoadingOverlay>
    </Provider>
  );
}

export default App;
