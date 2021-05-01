import './App.css';
import Bee from "../Grid/Grid"
import {Provider} from "react-redux"
import Shortcuts from "../Shortcuts"
import LoadingOverlay from "../LoadingOverlay/LoadingOverlay"
import store from "../../store/Store"
import {SocketProvider} from "./SocketContext";

function App() {
    return (
        <Provider store={store}>
            <SocketProvider>
                <LoadingOverlay>
                    <Shortcuts>
                        <Bee/>
                    </Shortcuts>
                </LoadingOverlay>
            </SocketProvider>
        </Provider>
    );
}

export default App;
