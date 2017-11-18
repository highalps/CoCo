/* */
import React from 'react'
/* */
import styles from './ModifyClass.scss'
import {Input, Button, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, ButtonGroup} from 'reactstrap'
import client from '../../../redux/base.js'
import { connect } from 'react-redux'

const mapStateToProps = (state) => ({
    nickname: state.userReducer.nickname,
    email: state.userReducer.email,
    tutor: state.userReducer.tutor,
    id : state.userReducer.id
})

@connect(mapStateToProps)
class ModifyClass extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            body:{
                title : this.props.classData.title,
                content : this.props.classData.content,
                language : this.props.classData.language,
                status : this.props.classData.status,
                time : [
                    {day:'월', startTime:0, endTime:0},
                    {day:'화', startTime:0, endTime:0},
                    {day:'수', startTime:0, endTime:0},
                    {day:'목', startTime:0, endTime:0},
                    {day:'금', startTime:0, endTime:0},
                    {day:'토', startTime:0, endTime:0},
                    {day:'일', startTime:0, endTime:0}
                ]
            }
        }
        this._toggle = this._toggle.bind(this)
        this._modify = this._modify.bind(this)
        this._handleTitleChange = this._handleTitleChange.bind(this)
        this._handleContentChange = this._handleContentChange.bind(this)
        this._handleLanguageChange = this._handleLanguageChange.bind(this)
        this._handleStatusChange = this._handleStatusChange.bind(this)
        this._handleTimeChange = this._handleTimeChange.bind(this)
        this._renderTime = this._renderTime.bind(this)
        this._returnTime = this._returnTime.bind(this)
        this._renderIfTutor = this._renderIfTutor.bind(this)
    }
    _renderIfTutor(){
        if(this.props.tutor === 1){
            return <Button color="success" onClick={() => this._handleStatusChange(2)} active={this.state.body.status === 2}>튜터</Button>
        }
    }
    _returnTime(day , index){
        return(
            <Form inline key={index}>
                <label className={styles.day}>{day}:</label>
                <FormGroup className={styles.time}>
                    <Input type="number" onChange = {(e) => this._handleTimeChange(index,e,1)} placeholder="1 ~ 24" />
                    <label>~</label>
                    <Input type="number" onChange = {(e) => this._handleTimeChange(index,e,2)} placeholder="1 ~ 24" />
                </FormGroup>
            </Form>
        )
    }
    _renderTime(){
        let days = ['월', '화', '수', '목', '금', '토', '일']
        let times = days.map((day, index)=>{
            return this._returnTime(day, index)
        })
        return times
    }

    _handleTimeChange(day, e, time){
        if(e.target.value >= 1 && e.target.value <= 24){
            if(time === 1){
                let _body = { ...this.state.body }
                _body.time[day].startTime = e.target.value
                this.setState({ body : _body })
            }
            if(time === 2){
                let _body = { ...this.state.body }
                _body.time[day].endTime = e.target.value
                this.setState({ body : _body })
            }
        }

    }
    _toggle(){
        this.props.onToggle()
    }

    _handleTitleChange(e){
        let _body = { ...this.state.body }
        _body.title = e.target.value
        this.setState({ body:_body})
    }
    _handleContentChange(e){
        let _body = { ...this.state.body }
        _body.content = e.target.value
        this.setState({ body:_body})
    }
    _handleLanguageChange(lang){
        let _body = { ...this.state.body }
        _body.language = lang
        this.setState({ body:_body})
    }
    _handleStatusChange(status){
        let _body = { ...this.state.body }
        _body.status = status
        this.setState({ body:_body})
    }

    _modify(){
        let temp = this.state.body
        if(temp.language === '' || temp.content === '' || temp.status === 0 || temp.title === ''){
            return (
                <Alert color="primary">
                    입력안된 사항이 있습니다.
                </Alert>
            )
        }
        let day = []
        let _body = { ...this.state.body }
        for(let i=0; i < 7; i++){
            if(_body.time[i].startTime != 0 || _body.time[i].endTime != 0){
                day.push(_body.time[i])
            }
        }
        _body.time = day
        this.setState({ body : _body },
            () => {
                client.post('api/board',
                    this.state.body
                ).then(res =>{console.log(res.data)})
                    .catch(error =>{console.log(error)})
                this._toggle()
            })
    }
    render() {
        const classData = this.props.classData
        return (
            <Modal size='lg' isOpen={this.props.isModalOpen} toggle={this._toggle} className={this.props.className}>
                <ModalHeader toggle={this._toggle} className={styles.modalTitle}>클래스를 생성하세요!</ModalHeader>
                <ModalBody>
                    <div className={styles.infoWrapper}>
                        <ButtonGroup className = {styles.statusBtn}>
                            <Button color="success" onClick={() => this._handleStatusChange(1)} active={this.state.body.status === 1}>학생</Button>
                            {this._renderIfTutor()}
                        </ButtonGroup>

                        <div className={styles.labelWrapper}>
                            <label className={styles.labelDisplay}>제목</label>
                            <Input type="text" name = "job" onChange = {(e) => this._handleTitleChange(e)} placeholder = {classData.title}/>
                        </div>

                        <div className={styles.labelWrapper}>
                            <label className={styles.labelDisplay}>수업 소개</label>
                            <Input className={styles.area} type="textarea" name = "job" onChange = {(e) => this._handleContentChange(e)} placeholder = {classData.content}/>
                        </div>
                        <div className={styles.labelWrapper}>
                            <label className={styles.labelDisplay}>수업 가능 시간</label>
                            <br/>
                            <label className={styles.subLabel}>시작시간 ~ 종료시간</label>
                            <div className = {styles.dayWrapper}>
                                {this._renderTime()}
                            </div>
                        </div>
                        <br/>
                        <div className={styles.labelWrapper}>
                            <div className={styles.labelDisplay}>사용 언어</div>
                            <div className = {styles.langBtnWrapper}>
                                <ButtonGroup>
                                    <Button color="danger" onClick={() => this._handleLanguageChange('c')} active={this.state.body.language === 'c'}>C</Button>
                                    <Button color="danger" onClick={() => this._handleLanguageChange('c++')} active={this.state.body.language === 'c++'}>C++</Button>
                                    <Button color="danger" onClick={() => this._handleLanguageChange('java')} active={this.state.body.language === 'java'}>JAVA</Button>
                                    <Button color="danger" onClick={() => this._handleLanguageChange('python')} active={this.state.body.language === 'python'}>PYTHON</Button>
                                </ButtonGroup>
                            </div>
                        </div>
                        <br/>
                    </div>
                </ModalBody>
                <ModalFooter>
                    <Button color="primary" onClick={this._modify}>수정하기</Button>
                    <Button color="secondary" onClick={this._toggle}>취소</Button>
                </ModalFooter>
            </Modal>
        )
    }
}

export default ModifyClass
