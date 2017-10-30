/* */
import React from 'react'
import styles from './Class.scss'
import {Button,Card, CardTitle, CardText, CardDeck, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';


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

    constructor(props){
        super(props)
        this.state = {
            modal: false
        };
        this._toggle = this._toggle.bind(this);
    }
    _toggle() {
        this.setState({
            modal: !this.state.modal
        });
    }
    render() {
        const colData = this.props.colData;
        console.log(this.props.colData);
        return (
            <div className={styles.cardWrapper} onClick={this._toggle}>
                <Card>
                    <div className={styles.classTitle}>{colData.title}</div>
                    <div className={styles.classNickName}>
                        {colData.nickname}
                    </div>
                    <div className={styles.classLanguage}>Language | {colData.language}</div>
                </Card>
                <Modal isOpen={this.state.modal} toggle={this._toggle}>
                    <ModalHeader toggle={this._toggle} className = {styles.modalHeader}>{colData.title}</ModalHeader>
                    <ModalBody>
                        <div>안녕하세요</div>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="primary" onClick={this._toggle}>수강신청</Button>
                        <Button color="secondary" onClick={this._toggle}>취소</Button>
                    </ModalFooter>
                </Modal>
            </div>
        )
    }
}

export default Class
