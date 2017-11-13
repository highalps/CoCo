/* */
import React from 'react'
import styles from './Class.scss'
import {Button,Card, CardDeck, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap'
import client from '../../../redux/base.js'



class Class extends React.Component {

    constructor() {
        super()
    }

    _renderRow() {
        const row = this.props.data.map((colData) => {
            return <ColComponent colData = {colData} key = {colData.num}/>
        })
        return row
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
            tutorInfo: {
                degree:'내용없음',
                github:'내용없음',
                intro:'내용없음',
                career:'내용없음',
            },
            classInfo: {
                content:'내용이 없습니다.',
                time:[]
            }
        }
        this._toggleClass = this._toggleClass.bind(this)
        this._toggleUser = this._toggleUser.bind(this)
        this._getClassData = this._getClassData.bind(this)
        this._getTutorData = this._getTutorData.bind(this)
    }
    _getClassData(){
        client.get('api/board/class/'+ this.props.colData.num).then(res =>{
            this.setState({
                classInfo:res.data.list
            },()=>{
                console.log('classInfo', this.state.classInfo)
                this._toggleClass()
            })
        }).catch(error =>{console.log(error)
            this._toggleClass()
        })
    }
    _getTutorData(){
        client.get('api/user/getTutor/'+this.props.colData.nickname).then(res => {
            this.setState({
                tutorInfo:res.data.tutor
            },()=>{
                console.log('tutorData', this.state.tutorInfo)
                this._toggleUser()
            })
        }).catch(error =>{console.log(error)
            this._toggleUser()
        })
    }

    _toggleClass() {
        this.setState({
            modalProject: !this.state.modalProject
        })
    }
    _toggleUser() {
        this.setState({
            modalUser: !this.state.modalUser
        })
    }
    render() {
        const colData = this.props.colData
        return (
            <div className={styles.cardWrapper}>
                <Card>
                    <div className={styles.classTitle} onClick={this._getClassData}>{colData.title}</div>
                    <div className={styles.classNickName} onClick={this._getTutorData}>
                        {colData.nickname}
                    </div>
                    <div className={styles.classLanguage}>Language | {colData.language}</div>
                </Card>

                <Modal isOpen={this.state.modalProject} toggle={this._toggleClass}>
                    <ModalHeader toggle={this._toggleClass} className = {styles.modalHeader}>{colData.title}</ModalHeader>
                    <ModalBody className={styles.modalBodyStyle}>
                        <div className={styles.classBox}>
                            <span>강의 개설자 :</span><span className={styles.status}>{colData.status === 1? '학생':'튜터'}</span>
                        </div><hr/>

                        <div className={styles.classBox}>
                            <h4>수업 내용</h4><br/>
                            <div className={styles.content}>{this.state.classInfo.content}</div><hr/>
                        </div>
                        <div className={styles.classBox}>
                            <h4>수업 가능 시간</h4><br/><br/>
                            <div className={styles.timeHeaderWrapper}>
                                <div className={styles.timeHeader}>시작시간</div>
                                <div className={styles.timeHeader}>종료시간</div>
                            </div>
                            {this.state.classInfo.time.map((data) => {
                                return <Time time = {data} />
                            })}<hr/>
                        </div>

                        <div className={styles.classBox}>
                            <span>언어 :</span><span>{colData.language}</span>
                        </div>

                    </ModalBody>
                    <ModalFooter>
                        <Button color="primary" onClick={this._toggleClass}>수강신청</Button>
                        <Button color="secondary" onClick={this._toggleClass}>취소</Button>
                    </ModalFooter>
                </Modal>


                <Modal isOpen={this.state.modalUser} toggle={this._toggleUser}>
                    <ModalHeader toggle={this._toggleUser} className = {styles.modalHeader}>튜터 소개</ModalHeader>
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
                        <Button color="primary" onClick={this._toggleUser}>수강신청</Button>
                        <Button color="secondary" onClick={this._toggleUser}>취소</Button>
                    </ModalFooter>
                </Modal>
            </div>
        )
    }
}
class  Time extends React.Component {
    constructor(props){
        super(props)
    }
    render(){
        return(
            <div className={styles.timeWrapper}>
                <hr/>
                <div className={styles.time}>{this.props.time.day}</div>
                <div className={styles.time}>{this.props.time.startTime}</div>
                <div className={styles.time}>{this.props.time.endTime}</div>
            </div>
        )
    }
}

export default Class
