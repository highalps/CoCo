/* */
import React from 'react'
import styles from './Class.scss'
import {Card, CardTitle, CardText, CardDeck} from 'reactstrap';

class Class extends React.Component {

    constructor() {
        super()
    }

    render() {
        const classData = this.props.data;
        return (
            <div className = {styles.classWrapper}>
                <CardDeck>
                    <div className={styles.cardWrapper}>
                        <Card>
                            <div className={styles.classTitle}>{classData.title}</div>
                            <div className = {styles.classNickName}>
                                {classData.nickName}
                            </div>
                            <div className={styles.classLanguage}>Language | {classData.language}</div>
                        </Card>
                    </div>
                    <div className={styles.cardWrapper}>
                        <Card>
                            <div className={styles.classTitle}>{classData.title}</div>
                            <div className = {styles.classNickName}>
                                {classData.nickName}
                            </div>
                            <div className={styles.classLanguage}>Language | {classData.language}</div>
                        </Card>
                    </div>
                    <div className={styles.cardWrapper}>
                        <Card>
                            <div className={styles.classTitle}>{classData.title}</div>
                            <div className = {styles.classNickName}>
                                {classData.nickName}
                            </div>
                            <div className={styles.classLanguage}>Language | {classData.language}</div>
                        </Card>
                    </div>
                    <div className={styles.cardWrapper}>
                        <Card>
                            <div className={styles.classTitle}>{classData.title}</div>
                            <div className = {styles.classNickName}>
                                {classData.nickName}
                            </div>
                            <div className={styles.classLanguage}>Language | {classData.language}</div>
                        </Card>
                    </div>
                    <div className={styles.cardWrapper}>
                        <Card>
                            <div className={styles.classTitle}>{classData.title}</div>
                            <div className = {styles.classNickName}>
                                {classData.nickName}
                            </div>
                            <div className={styles.classLanguage}>Language | {classData.language}</div>
                        </Card>
                    </div>
                </CardDeck>
            </div>
        )
    }
}

export default Class
