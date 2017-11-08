/* */
import React from 'react'
import styles from './CreateClass.scss'
import {ButtonGroup, Button, Modal, ModalHeader, ModalBody, ModalFooter ,Input,FormGroup, Label, Form } from 'reactstrap'


/*
body = {
		nickname: 작성자
		title:
		content:
		language:
		status: 1 - 학생, 2 - 튜터
		time: [
			{ day: ‘월’, startTime: 8, endTime:17 }
			……..
		]
}
*/
class CreateClass extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            body:{
                nickname:'',
                title : '',
                content : '',
                language : '',
                status : 0,
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
            modal: false
        }

        this._toggle = this._toggle.bind(this)
        this._create = this._create.bind(this)
        this._handleTitleChange = this._handleTitleChange.bind(this)
        this._handleContentChange = this._handleContentChange.bind(this)
        this._handleLanguageChange = this._handleLanguageChange.bind(this)
        this._handleStatusChange = this._handleStatusChange.bind(this)
        this._handleTimeChange = this._handleTimeChange.bind(this)
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
        this.setState({
            modal: !this.state.modal
        })
    }
    _create(){
        console.log('create ', this.state.body)
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


    render() {
        return (
            <div className = {styles.wrapper}>
                <div>
                    <h1 className={styles.head}>CoCo 강의 검색</h1>
                    <div className={styles.introBtnWrapper}>
                        <Button color="secondary" size='lg' className={styles.introBtn} onClick = {()=>window.location.href = 'http://localhost:4001/#/RegisterTutor'}>튜터 등록</Button>
                        <Button color="secondary" size='lg' className={styles.introBtn} onClick = {this._toggle}>클래스 생성</Button>
                    </div>
                </div>
                <Modal size='lg' isOpen={this.state.modal} toggle={this._toggle} className={this.props.className}>
                    <ModalHeader toggle={this.toggle} className={styles.modalTitle}>클래스를 생성하세요!</ModalHeader>
                    <ModalBody>
                        <div className={styles.infoWrapper}>
                            <ButtonGroup className = {styles.statusBtn}>
                                <Button color="success" onClick={() => this._handleStatusChange(1)} active={this.state.body.status === 1}>학생</Button>
                                <Button color="success" onClick={() => this._handleStatusChange(2)} active={this.state.body.status === 2}>튜터</Button>
                            </ButtonGroup>

                            <div className={styles.labelWrapper}>
                                <label className={styles.labelDisplay}>제목</label>
                                <Input type="text" name = "job" onChange = {(e) => this._handleTitleChange(e)} placeholder = "클래스 제목"/>
                            </div>

                            <div className={styles.labelWrapper}>
                                <label className={styles.labelDisplay}>수업 소개</label>
                                <Input className={styles.area} type="textarea" name = "job" onChange = {(e) => this._handleContentChange(e)} placeholder = "수업 소개"/>
                            </div>
                            <div className={styles.labelWrapper}>
                                <label className={styles.labelDisplay}>수업 가능 시간</label><label className={styles.subLabel}>시작시간 ~ 종료시간</label>

                                <div className = {styles.dayWrapper}>
                                    <Form inline>
                                        <label className={styles.day}>월:</label>
                                        <FormGroup className={styles.time}>
                                            <Input type="number"  onChange = {(e) => this._handleTimeChange(0,e,1)} placeholder="1 ~ 24" />
                                            <label>~</label>
                                            <Input type="number"  onChange = {(e) => this._handleTimeChange(0,e,2)} placeholder="1 ~ 24" />
                                        </FormGroup>
                                    </Form>
                                    <Form inline>
                                        <label className={styles.day}>화:</label>
                                        <FormGroup className={styles.time}>
                                            <Input type="number" onChange = {(e) => this._handleTimeChange(1,e,1)} placeholder="1 ~ 24" />
                                            <label>~</label>
                                            <Input type="number" onChange = {(e) => this._handleTimeChange(1,e,2)} placeholder="1 ~ 24" />
                                        </FormGroup>
                                    </Form>
                                    <Form inline>
                                        <label className={styles.day}>수:</label>
                                        <FormGroup className={styles.time}>
                                            <Input type="number" onChange = {(e) => this._handleTimeChange(2,e,1)} placeholder="1 ~ 24" />
                                            <label>~</label>
                                            <Input type="number" onChange = {(e) => this._handleTimeChange(2,e,2)} placeholder="1 ~ 24" />
                                        </FormGroup>
                                    </Form>
                                    <Form inline>
                                        <label className={styles.day}>목:</label>
                                        <FormGroup className={styles.time}>
                                            <Input type="number" onChange = {(e) => this._handleTimeChange(3,e,1)} placeholder="1 ~ 24" />
                                            <label>~</label>
                                            <Input type="number" onChange = {(e) => this._handleTimeChange(3,e,2)} placeholder="1 ~ 24" />
                                        </FormGroup>
                                    </Form>
                                    <Form inline>
                                        <label className={styles.day}>금:</label>
                                        <FormGroup className={styles.time}>
                                            <Input type="number" onChange = {(e) => this._handleTimeChange(4,e,1)} placeholder="1 ~ 24" />
                                            <label>~</label>
                                            <Input type="number" onChange = {(e) => this._handleTimeChange(4,e,2)} placeholder="1 ~ 24" />
                                        </FormGroup>
                                    </Form>
                                    <Form inline>
                                        <label className={styles.day}>토:</label>
                                        <FormGroup className={styles.time}>
                                            <Input type="number" onChange = {(e) => this._handleTimeChange(5,e,1)} placeholder="1 ~ 24" />
                                            <label>~</label>
                                            <Input type="number" onChange = {(e) => this._handleTimeChange(5,e,2)} placeholder="1 ~ 24" />
                                        </FormGroup>
                                    </Form>

                                    <Form inline>
                                        <label className={styles.day}>일:</label>
                                        <FormGroup className={styles.time}>
                                            <Input type="number" onChange = {(e) => this._handleTimeChange(6,e,1)} placeholder="1 ~ 24" />
                                            <label>~</label>
                                            <Input type="number" onChange = {(e) => this._handleTimeChange(6,e,2)} placeholder="1 ~ 24" />
                                        </FormGroup>

                                    </Form>
                                </div>
                            </div>

                            <br/>
                            <div className={styles.labelWrapper}>
                                <div className={styles.labelDisplay}>사용 언어</div>
                                <div className = {styles.langBtnWrapper}>
                                    <ButtonGroup>
                                        <Button color="danger" onClick={() => this._handleLanguageChange('c')} active={this.state.body.language === 'c'}>C</Button>
                                        <Button color="danger" onClick={() => this._handleLanguageChange('java')} active={this.state.body.language === 'java'}>JAVA</Button>
                                        <Button color="danger" onClick={() => this._handleLanguageChange('python')} active={this.state.body.language === 'python'}>PYTHON</Button>
                                        <Button color="danger" onClick={() => this._handleLanguageChange('javascript')} active={this.state.body.language === 'javascript'}>JAVASCRIPT</Button>
                                    </ButtonGroup>
                                </div>
                            </div>
                            <br/>
                        </div>
                    </ModalBody>

                    <ModalFooter>
                        <Button color="primary" onClick={this._create}>생성하기</Button>{' '}
                        <Button color="secondary" onClick={this._toggle}>취소</Button>
                    </ModalFooter>
                </Modal>
            </div>
        )
    }
}

export default CreateClass
