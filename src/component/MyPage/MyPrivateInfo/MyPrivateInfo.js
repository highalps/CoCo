/* */
import React from 'react'
import { Link } from 'react-router-dom'
import {Button,Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap'
import autobind from 'core-decorators/lib/autobind'

/* */
import styles from './MyPrivateInfo.scss'
import client from '../../../redux/base.js'


class MyPrivateInfo  extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            modal:false,
            tutorInfo: {
                degree:'내용없음',
                github:'내용없음',
                intro:'내용없음',
                career:'내용없음',
            }
        }
    }

    @autobind
    _getTutorData(){
        client.get('api/user/TutorInfo/'+this.props.id).then(res => {
            this.setState({
                tutorInfo:res.data.tutor
            },()=>{
                this._toggle()
                console.log('tutorData', this.state.tutorInfo)
            })
        }).catch(error =>{console.log(error)
        })
    }
    @autobind
    _toggle(){
        this.setState({
            modal:!this.state.modal
        })
    }
    @autobind
    _ifTutorOrNot(){
        if (this.props.tutor === 0) {
            return (
                <Link to="RegisterTutor">
                    <span className={styles.name}>튜터 등록 하기</span>
                </Link>
            )
        }
        return (
            <div>
                <span className={styles.name} onClick={this._getTutorData}>내 튜터 정보</span>
            </div>
        )
    }
    render(){
        return(
            <div className = {styles.wrapper}>
                <div className = {styles.sec01}>
                    <div className={styles.box}>
                        <div className = {styles.left}></div>
                        <div className = {styles.right}>
                            <div className = {styles.right01}>
                                {this.props.nickname}
                            </div>
                        </div>
                    </div>
                </div>
                <div className = {styles.sec01}>
                    <div className={styles.box}>
                        <div className={styles.box1}>
                            <div className={styles.middle}>받은수업신청서</div>
                            <div className={styles.bottom}>{this.props.getWriter}</div>
                        </div>
                        <div className={styles.box1}>
                            <div className={styles.middle}>신청한수업</div>
                            <div className={styles.bottom}>{this.props.getApplicant}</div>
                        </div>
                    </div>
                </div>
                <div className = {styles.sec01}>
                    <div className = {styles.box2}>
                        <div className = {styles.box3}>
                            <div className={styles.smSize}>등록된 이메일:</div>
                            <div className={styles.lgSize}>{this.props.email}</div>
                        </div>
                        <div className = {styles.box3}>
                            <div className={styles.smSize}>튜터 등록 여부:</div>
                            <div className={styles.lgSize}>{this.props.tutor===0? '미등록':'등록'}</div>
                            <Modal isOpen={this.state.modal} toggle={this._toggle}>
                                <ModalHeader toggle={this._toggle} className = {styles.modalHeader}>튜터 소개</ModalHeader>
                                <ModalBody className={styles.modalBodyStyle}>
                                    <div className={styles.userBox}>
                                        <label>튜터 소개</label><br/>
                                        <div>{this.state.tutorInfo.intro}</div><hr/>
                                    </div>
                                    <div className={styles.userBox}>
                                        <label>학위 정보</label><br/>
                                        <div>{this.state.tutorInfo.degree}</div><hr/>
                                    </div>
                                    <div className={styles.userBox}>
                                        <label>Github주소</label><br/>
                                        <div>{this.state.tutorInfo.github}</div><hr/>
                                    </div>
                                    <div className={styles.userBox}>
                                        <label>경력</label><br/>
                                        <div>{this.state.tutorInfo.career}</div>
                                    </div>
                                </ModalBody>
                                <ModalFooter>
                                    <Button color="primary" onClick={this._toggle}>확인</Button>
                                </ModalFooter>
                            </Modal>
                        </div>
                        <div className = {styles.box3}>
                            {this._ifTutorOrNot()}
                        </div>

                    </div>
                </div>
            </div>
        )
    }
}


export default MyPrivateInfo
