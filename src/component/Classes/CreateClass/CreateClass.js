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
                    <h1 className={styles.head}>CoCo 강의 검색</h1>
                    <div className={styles.introBtnWrapper}>
                        <Button color="secondary" size='lg' className={styles.introBtn}>튜터 등록</Button>
                        <Button color="secondary" size='lg' className={styles.introBtn}>클래스 생성</Button>
                    </div>
                </div>
            </div>
        )
    }
}

export default CreateClass
