import React from "react";
import {GameState} from "../../store/Types";
import {connect} from "react-redux";

const mapStateToProps = (state: GameState) => ({loaded: state.loaded})
const connector = connect(mapStateToProps)

const LoadingOverlay = (props) => {
    return <div id="loadingOverlay" hidden={!props.loaded}>{props.children}</div>
}

export default connector(LoadingOverlay)