import React from "react"
import styles from "./ProgressBar.module.css"

type Props = {
    score: number
    totalScore: number
}
const ProgressBar: React.FC<Props> = ({score, totalScore}) => {
    const weightedTotalScore = totalScore * 0.8; //assume nobody will ever reach 80%
    const calculateWidth = () => Math.min(100, (score / weightedTotalScore) * 100)
    return <div className={styles.progress} style={{width: calculateWidth() + "%"}}/>
}

export default ProgressBar