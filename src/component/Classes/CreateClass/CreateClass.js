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
                <div>
                    <h1 className="display-3 text-white text-center">클래스 생성하기</h1>
                    <br/>
                    <p className="lead text-white text-center">튜터로 개설하고 싶으면 먼저 튜터 등록을, 배우고싶다면 바로 개설을!</p>
                    <br/>
                    <div className={styles.introBtnWrapper}>
                    <Button color="primary" size='lg' className={styles.introBtn}>튜터 등록</Button>
                    <Button color="primary" size='lg' className={styles.introBtn}>클래스 생성</Button>
                    </div>
                </div>
            </div>
        )
    }
}

export default CreateClass
