import React from "react";
import {IGameState} from "../../store/Types";
import {connect} from "react-redux";
import LoadingIcon from "../LoadingIcon/LoadingIcon";


const mapStateToProps = (state: IGameState) => ({loaded: state.loaded})
const connector = connect(mapStateToProps)

const LoadingOverlay = (props) => {
    return <>
        <div id="loadingOverlay" style={{opacity: props.loaded ? 1 : 0}}>

            {props.children}</div>

        {props.loaded || <div id={"loadingIcon"}
                              style={{position: "fixed", inset: "0px", display: "flex", placeContent: "center", marginTop: "20%"}}>
            <LoadingIcon />
        </div>}
    </>

}

export default connector(LoadingOverlay)