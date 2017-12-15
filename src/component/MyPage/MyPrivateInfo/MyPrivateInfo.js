/* */
import React from 'react'
import { Link } from 'react-router-dom'
import {Button,Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap'
import autobind from 'core-decorators/lib/autobind'
import { withRouter } from 'react-router'
import { connect } from 'react-redux'

/* */
import styles from './MyPrivateInfo.scss'
import client from '../../../redux/base.js'
import { userActions} from '../../../redux/actions'

const mapStateToProps = (state) => ({
})

@withRouter
@connect(mapStateToProps)
class MyPrivateInfo  extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            modalDelete:false,
            modal:false,
            tutorInfo: {
                degree:'내용없음',
                github:'내용없음',
                intro:'내용없음',
                career:'내용없음',
                language:'내용없음',
            }
        }
    }
    @autobind
    deleteUser(){
        client.delete('/auth').then(res => {
            window.alert('회원 탈퇴를 성공했습니다.')
            this.props.dispatch(userActions.logout())
            this.props.history.push('/')
        }).catch(error =>{console.log(error)
            window.alert('회원 탈퇴를 실패했습니다.')
        })
    }
    @autobind
    _getTutorData(){
        client.get('api/user/tutor/id/'+this.props.id).then(res => {
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
    toggleDelete(){
        this.setState({
            modalDelete:!this.state.modalDelete
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
                                        <label className={styles.labels}>튜터 소개</label><br/>
                                        <div className={styles.contents}>{this.state.tutorInfo.intro}</div><hr/>
                                    </div>
                                    <div className={styles.userBox}>
                                        <label className={styles.labels}>학위 정보</label><br/>
                                        <div className={styles.contents}>{this.state.tutorInfo.degree}</div><hr/>
                                    </div>
                                    <div className={styles.userBox}>
                                        <label className={styles.labels}>Github주소</label><br/>
                                        <div className={styles.contents}>{this.state.tutorInfo.github}</div><hr/>
                                    </div>
                                    <div className={styles.userBox}>
                                        <label className={styles.labels}>Github주소</label><br/>
                                        <div className={styles.contents}>{this.state.tutorInfo.career}</div><hr />
                                    </div>
                                    <div className={styles.userBox}>
                                        <label className={styles.labels}>선호 언어</label><br/>
                                        <div className={styles.languages}>{this.state.tutorInfo.language}</div>
                                    </div>
                                </ModalBody>
                                <ModalFooter>
                                    <Button color="primary" onClick={this._toggle}>확인</Button>
                                </ModalFooter>
                            </Modal>
                        </div>
                        <div className = {styles.box3}>
                            {this._ifTutorOrNot()}
                            <div className={styles.smSize2} onClick={this.toggleDelete}>회원 탈퇴</div>

                            <Modal isOpen={this.state.modalDelete} toggle={this.toggleDelete}>
                                <ModalHeader toggle={this.toggleDelete} className = {styles.modalHeader}>클래스 삭제</ModalHeader>
                                <ModalBody>
                                    <div className={styles.userBox}>
                                        회원 탈퇴를 진행하시겠습니까?
                                    </div>
                                </ModalBody>
                                <ModalFooter>
                                    <Button color="primary" onClick={this.deleteUser}>삭제</Button>
                                    <Button color="secondary" onClick={this.toggleDelete}>취소</Button>
                                </ModalFooter>
                            </Modal>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}


export default MyPrivateInfo
