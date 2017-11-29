import React from 'react'
import {Button, Modal, ModalHeader, ModalBody, ModalFooter} from 'reactstrap'
import autobind from 'core-decorators/lib/autobind'

/* */
import styles from './TutorInfo.scss'


class TutorInfo  extends React.Component {

    constructor(props) {
        super(props)
    }
    @autobind
    _toggleUser(){
        this.props.onToggle()
    }
    render(){
        const tutor = this.props.tutorData
        return(
            <Modal isOpen={this.props.isModalOpen} toggle={this._toggleUser}>
                <ModalHeader toggle={this._toggleUser} className = {styles.modalHeader}>튜터 소개</ModalHeader>
                <ModalBody className={styles.modalBodyStyle}>
                    <div className={styles.userBox}>
                        <label className={styles.labels}>튜터 소개</label><br/>
                        <div className={styles.intro}>{tutor.intro}</div><hr/>
                    </div>
                    <div className={styles.userBox}>
                        <label className={styles.labels}>학위 정보</label><br/>
                        <div>{tutor.degree}</div><hr/>
                    </div>
                    <div className={styles.userBox}>
                        <label className={styles.labels}>Github주소</label><br/>
                        <div>{tutor.github}</div><hr/>
                    </div>
                    <div className={styles.userBox}>
                        <label className={styles.labels}>경력</label><br/>
                        <div className={styles.career}>{tutor.career}</div><hr/>
                    </div>
                    <div className={styles.userBox}>
                        <label className={styles.labels}>선호 언어</label><br/>
                        <div className={styles.career}>{tutor.language}</div>
                    </div>
                </ModalBody>
                <ModalFooter>
                    <Button color="primary" onClick={this._toggleUser}>확인</Button>
                </ModalFooter>
            </Modal>
        )
    }
}
export default TutorInfo
