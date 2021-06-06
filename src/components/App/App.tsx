import './App.css';
import Bee from "../Grid/Grid"
import Shortcuts from "../Shortcuts"
import LoadingOverlay from "../LoadingOverlay/LoadingOverlay"


function App() {
    return (
        <LoadingOverlay>
            <Shortcuts>
                <Bee/>
            </Shortcuts>
        </LoadingOverlay>
    );
}

export default App;
