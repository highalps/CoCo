/* */
import React from 'react'
import {Input, Button, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, ButtonGroup} from 'reactstrap'
import { connect } from 'react-redux'
import autobind from 'core-decorators/lib/autobind'

/* */
import styles from './ModifyClass.scss'
import client from '../../../redux/base.js'

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
                content : this.props.content,
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
            },
            alert: false
        }
    }

    @autobind
    _renderIfTutor(){
        if(this.props.tutor === 1){
            return <Button color="success" onClick={() => this._handleStatusChange(2)} active={this.state.body.status === 2}>튜터</Button>
        }
    }
    @autobind
    _returnTime(data , index){
        return(
            <Form inline key={index}>
                <label className={styles.day}>{data.day}:</label>
                <FormGroup className={styles.time}>
                    <Input type="number" onChange = {(e) => this._handleTimeChange(index,e,1)} placeholder={data.startTime}/>
                    <label>~</label>
                    <Input type="number" onChange = {(e) => this._handleTimeChange(index,e,2)} placeholder={data.endTime}/>
                </FormGroup>
            </Form>
        )
    }

    @autobind
    _renderTime(){
        let times = this.state.body.time.map((day, index)=>{
            return this._returnTime(day, index)
        })
        return times
    }

    @autobind
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
    @autobind
    _toggle(){
        this.props.onToggle()
    }
    @autobind
    _toggleAlert(){
        this.setState({
            alert: !this.state.alert
        })
    }

    @autobind
    _handleTitleChange(e){
        let _body = { ...this.state.body }
        _body.title = e.target.value
        this.setState({ body:_body})
    }
    @autobind
    _handleContentChange(e){
        let _body = { ...this.state.body }
        _body.content = e.target.value
        this.setState({ body:_body})
    }
    @autobind
    _handleLanguageChange(lang){
        let _body = { ...this.state.body }
        _body.language = lang
        this.setState({ body:_body})
    }
    @autobind
    _handleStatusChange(status){
        let _body = { ...this.state.body }
        _body.status = status
        this.setState({ body:_body})
    }

    @autobind
    _modify(){
        let temp = this.state.body
        if(temp.language === '' || temp.content === '' || temp.status === 0 || temp.title === ''){
            this._toggleAlert()
            return
        }
        let day = []
        let _body = { ...this.state.body }
        for(let i=0; i < 7; i++){
            if(_body.time[i].startTime !== 0 || _body.time[i].endTime !== 0){
                day.push(_body.time[i])
            }
        }
        _body.time = day
        this.setState({ body : _body },
            () => {
                client.put('api/board/'+this.props.classData.num,
                    this.state.body
                ).then(res =>{console.log(res.data)})
                    .catch(error =>{console.log(error)})
                this._toggle()
                window.location.reload()
            })
    }
    render() {
        const classData = this.props.classData
        return (
            <Modal size='lg' isOpen={this.props.isModalOpen} toggle={this._toggle} className={this.props.className}>
                <ModalHeader toggle={this._toggle} className={styles.modalTitle}>클래스 수정!</ModalHeader>
                <ModalBody>
                    <div className={styles.infoWrapper}>
                        <ButtonGroup className = {styles.statusBtn}>
                            <Button color="success" onClick={() => this._handleStatusChange(1)} active={this.state.body.status === 1}>학생</Button>
                            {this._renderIfTutor()}
                        </ButtonGroup>

                        <div className={styles.labelWrapper}>
                            <label className={styles.labelDisplay}>제목</label>
                        </div>

                        <div className={styles.labelWrapper}>
                            <label className={styles.labelDisplay}>수업 소개</label>
                            <Input className={styles.area} type="textarea" name = "job" onChange = {(e) => this._handleContentChange(e)} value = {this.state.body.content}/>
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
                <Modal isOpen={this.state.alert} toggle={this._toggleAlert} className={this.props.className}>
                    <ModalHeader toggle={this.toggleAlert}>경고</ModalHeader>
                    <ModalBody>
                        <div>
                            입력안된 사항이 있습니다. 확인하세요.  <Button onClick={this._toggleAlert}>확인</Button>
                        </div>
                    </ModalBody>
                </Modal>
            </Modal>
        )
    }
}

export default ModifyClass
