import React from "react"
import styles from "./ProgressBar.module.css"

type Props = {
    score: number
    maxScore: number
}
const ProgressBar: React.FC<Props> = ({score, maxScore}) => {
    const calculateWidth = () => Math.min(100, (score / maxScore) * 100)
    return <div className={styles.progress} style={{width: calculateWidth() + "%"}}/>
}

export default ProgressBar