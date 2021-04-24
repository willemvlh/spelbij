import styles from "./LoadingIcon.module.css";
import LoopIcon from "@material-ui/icons/Loop";
import React from "react";
import {SvgIconTypeMap} from "@material-ui/core";
import {OverridableComponent} from "@material-ui/core/OverridableComponent";

const LoadingIcon: OverridableComponent<SvgIconTypeMap> = (props?) => <LoopIcon className={styles.spin} {...props}/>
export default LoadingIcon