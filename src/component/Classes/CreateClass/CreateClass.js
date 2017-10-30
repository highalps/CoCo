/* */
import React from 'react'
import styles from './CreateClass.scss'
import {Button,Card, Modal, ModalHeader, ModalBody, ModalFooter ,Row, Col} from 'reactstrap';

class CreateClass extends React.Component {

    constructor() {
        super()
    }
    render() {
        return (
            <div className = {styles.wrapper}>
                <Row>
                    <Col sm="4">
                        <div className={styles.cardWrapper}>
                            <div className={styles.classTitle}>제목</div>
                            <div className={styles.classNickName}>
                                닉네임
                            </div>
                            <div className={styles.classLanguage}>Language | 사용 언어</div>
                        </div>
                    </Col>
                    <Col sm="7">
                        <br/>
                        <div className={styles.introWrapper}>
                            <h2 className={styles.introTitle}>원하는 클래스를 생성하세요!</h2>
                            <br/>
                            <h3 className={styles.introSubTitle}>튜터 등록 -> 클래스 생성</h3>
                            <br/>
                            <div className={styles.introBtnWrapper}>
                                <br/>
                                <Button color="primary" size='lg' className={styles.introBtn}>튜터 등록</Button>
                                <Button color="primary" size='lg' className={styles.introBtn}>클래스 생성</Button>
                            </div>
                        </div>
                    </Col>
                </Row>
            </div>
        )
    }
}

export default CreateClass
