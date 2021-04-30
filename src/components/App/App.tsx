import './App.css';
import Bee from "../Grid/Grid"
import {Provider} from "react-redux"
import Shortcuts from "../Shortcuts"
import LoadingOverlay from "../LoadingOverlay/LoadingOverlay"
import store from "../../store/Store"
import {io} from "socket.io-client"
import {createContext} from "react";

const socket = io("wss://localhost:8080", {autoConnect: false})
export const SocketContext = createContext(socket);

function SocketProvider(props) {
    return <SocketContext.Provider value={socket}>{props.children}</SocketContext.Provider>
}

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
