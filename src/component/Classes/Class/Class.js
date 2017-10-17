/* */
import React from 'react'
import styles from './Class.scss'
import {Card, CardTitle, CardText, CardDeck} from 'reactstrap';

class Class extends React.Component {

    constructor() {
        super()
    }

    _renderRow = () => {
        const row = this.props.data.map((colData) => {
            return <ColComponent colData = {colData} key = {colData.id}/>
        });
        return row;
    }
    render() {
        return (
            <div className = {styles.classWrapper}>
                <CardDeck>
                    {this._renderRow()}
                </CardDeck>
            </div>
        )
    }
}
class  ColComponent extends React.Component {

    render() {
        const colData = this.props.colData;
        console.log(this.props.colData)
        return (
            <div className={styles.cardWrapper}>
                <Card>
                    <div className={styles.classTitle}>{colData.title}</div>
                    <div className={styles.classNickName}>
                        {colData.nickName}
                    </div>
                    <div className={styles.classLanguage}>Language | {colData.language}</div>
                </Card>
            </div>
        )
    }
}

export default Class
