import React from "react";
import {useSelector} from "../../Utils";
import LoadingIcon from "../LoadingIcon/LoadingIcon";


const LoadingOverlay: React.FC = ({children}) => {
    let loaded = useSelector(state => state.loaded)
    return <>
        <div id="loadingOverlay" style={{opacity: loaded ? 1 : 0}}>
            {children}
        </div>
        {loaded || <div id={"loadingIcon"}
                              style={{position: "fixed", inset: "0px", display: "flex", placeContent: "center", marginTop: "20%"}}>
            <LoadingIcon />
        </div>}
    </>

}

export default LoadingOverlay