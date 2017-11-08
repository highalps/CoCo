/* */
import React from 'react'
import styles from './Class.scss'
import {Button,Card, CardDeck, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';


class Class extends React.Component {

    constructor() {
        super()
    }

    _renderRow = () => {
        const row = this.props.data.map((colData) => {
            console.log("colData", colData)
            return <ColComponent colData = {colData} key = {colData.num}/>
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
            modalProject: false,
            modalUser: false,
        };
        this._toggleProject = this._toggleProject.bind(this);
        this._toggleUser = this._toggleUser.bind(this);

    }
    _toggleProject() {
        this.setState({
            modalProject: !this.state.modalProject
        });
    }
    _toggleUser() {
        this.setState({
            modalUser: !this.state.modalUser
        });
    }
    render() {
        const colData = this.props.colData;
        return (
            <div className={styles.cardWrapper}>
                <Card>
                    <div className={styles.classTitle} onClick={this._toggleProject}>{colData.title}</div>
                    <div className={styles.classNickName} onClick={this._toggleUser}>
                        {colData.nickname}
                    </div>
                    <div className={styles.classLanguage}>Language | {colData.language}</div>
                </Card>

                <Modal isOpen={this.state.modalProject} toggle={this._toggleProject}>
                    <ModalHeader toggle={this._toggleProject} className = {styles.modalHeader}>{colData.title}</ModalHeader>
                    <ModalBody className={styles.modalBodyStyle}>
                        <h3>강의 개설자</h3>
                        <div>{colData.status === 1? "학생":"튜터"}</div>
                        <h3>수업 내용</h3>
                        <div>{colData.content}</div>
                        <h3>언어</h3>
                        <div>{colData.language}</div>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="primary" onClick={this._toggleProject}>수강신청</Button>
                        <Button color="secondary" onClick={this._toggleProject}>취소</Button>
                    </ModalFooter>
                </Modal>

                <Modal isOpen={this.state.modalUser} toggle={this._toggleUser}>
                    <ModalHeader toggle={this._toggleUser} className = {styles.modalHeader}>튜터 소개</ModalHeader>
                    <ModalBody className={styles.modalBodyStyle}>
                        <label>Contents</label>
                        <div>Contents</div>
                        <label>언어</label>
                        <div>Contents</div>
                        <label>닉네임</label>
                        <div>Contents</div>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="primary" onClick={this._toggleUser}>수강신청</Button>
                        <Button color="secondary" onClick={this._toggleUser}>취소</Button>
                    </ModalFooter>
                </Modal>
            </div>
        )
    }
}

export default Class
