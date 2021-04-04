import React, {useEffect} from "react";
import {connect, ConnectedProps} from "react-redux";
import styles from "./Input.module.css"
export type InputErrorComponentType = {
    error: string
}

const mapDispatchToProps = dispatch => {
    return {clearError: () => dispatch({type: "clearError"})}
}

const connector = connect(null, mapDispatchToProps)
type Props = ConnectedProps<typeof connector>

const Feedback: React.FC<Props & InputErrorComponentType> = ({error, clearError}) => {
    useEffect(() => {
        const timeout = setTimeout(() => clearError(), 3000);
        return function(){
            clearTimeout(timeout)
        }
    }, [clearError])
    return <div className={styles.toast}>{error}</div>;
}

export default connector(Feedback)