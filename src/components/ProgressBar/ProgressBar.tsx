import React from "react"
import styles from "./ProgressBar.module.css"

type Props = {
    score: number
    totalScore: number
}
const ProgressBar: React.FC<Props> = ({score, totalScore}) => {
    const calculateWidth = () => (score / totalScore) * 100
    return <div className={styles.progress} style={{width: calculateWidth() + "%"}}/>
}

export default ProgressBar