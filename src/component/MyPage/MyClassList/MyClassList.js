/* */
import React from 'react';
import styles from './MyClassList.scss';
import {Row, Col} from 'reactstrap'
class MyClassList extends React.Component {

    render() {
        return (
            <div className={styles.wrapper}>
                <Row>
                    <Col>
                        <div className={styles.cardWrapper}>
                            <div className={styles.classTitle}>제목</div>
                            <div className={styles.classNickName}>닉네임</div>
                            <div className={styles.classLanguage}>Language | 사용 언어</div>
                        </div>
                    </Col>
                    <Col>
                        <div className={styles.cardWrapper}>
                            <div className={styles.classTitle}>제목</div>
                            <div className={styles.classNickName}>닉네임</div>
                            <div className={styles.classLanguage}>Language | 사용 언어</div>
                        </div>
                    </Col>
                    <Col>
                        <div className={styles.cardWrapper}>
                            <div className={styles.classTitle}>제목</div>
                            <div className={styles.classNickName}>닉네임</div>
                            <div className={styles.classLanguage}>Language | 사용 언어</div>
                        </div>
                    </Col>
                    <Col>
                        <div className={styles.plusBtnWrapper}>
                            <img className={styles.plusBtn} src="https://cdn.pixabay.com/photo/2014/03/25/17/00/plus-297823_1280.png"/>
                        </div>
                    </Col>
                </Row>
            </div>
        )
    }
}

export default MyClassList
