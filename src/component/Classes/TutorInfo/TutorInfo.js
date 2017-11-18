import React from 'react'
import styles from './TutorInfo.scss'
import {Button, Modal, ModalHeader, ModalBody, ModalFooter} from 'reactstrap'



class TutorInfo  extends React.Component {

    constructor(props) {
        super(props)
        this._toggleUser = this._toggleUser.bind(this)

    }
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
                        <div>{tutor.intro}</div><hr/>
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
                        <div>{tutor.career}</div>
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
