/* */
import React from 'react'
import { connect } from 'react-redux'
import autobind from 'core-decorators/lib/autobind'
import { Input, Button, Card, CardDeck, Modal, ModalHeader, ModalBody, ModalFooter,
    ButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem, Form, FormGroup } from 'reactstrap'

/* */
import styles from './Class.scss'
import ModifyClass from '../ModifyClass'
import DeleteClass from '../DeleteClass'
import TutorInfo from '../TutorInfo'
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

const mapStateToProps = (state) => ({
    userNickname: state.userReducer.nickname,
    email: state.userReducer.email,
    tutor: state.userReducer.tutor,
    id : state.userReducer.id
})

const userImg = {
    student:'http://kr.seaicons.com/wp-content/uploads/2015/11/student-icon.png',
    tutor:"https://lh3.googleusercontent.com/ZKnXr2EsaS94RngP88WCdGhDgM2rITbMkKm-U2mgD15R_fnmbyg6tY8Bu1IjdhZdqsIS=w300-rw"
}
const classImg = {
    c:"http://cfile21.uf.tistory.com/image/996BDB3359D3170C07DCA4",
    java:"https://fossbytes.com/wp-content/uploads/2017/09/Why-is-Java-the-best-programming-Language.png",
    python:"http://dashh.in/wp-content/uploads/2017/03/the-python-programming-language-explained.gif",
    cpp:"https://lh3.googleusercontent.com/9OdC-OwwFX1l0fmbSCDm_WIvBxxhtEYRkU1ZbS6rO4TNMiZJDwub5AB0wKSIAMtCzTU=w300-rw"
}

@connect(mapStateToProps)
class  ColComponent extends React.Component {


    constructor(props){
        super(props)
        this.state = {
            classImg:'',
            userImg:'',
            dropdownOpen:false,
            modalModify: false,
            modalClass: false,
            modalUser: false,
            modalMatch: false,
            modalDelete: false,
            tutorInfo: {
                degree:'내용없음',
                github:'내용없음',
                intro:'내용없음',
                career:'내용없음',
            },
            classInfo: {
                content:'내용이 없습니다.',
                time:[]
            },
            body:{
                writer:this.props.colData.nickname,
                classNum:this.props.colData.num,
                day:'월',
                time:1
            }
        }
    }
    componentWillMount(){
        switch(this.props.colData.language){
            case 'c':this.setState({classImg:classImg.c});break
            case 'java':this.setState({classImg:classImg.java});break
            case 'python':this.setState({classImg:classImg.python});break
            case 'c++':this.setState({classImg:classImg.cpp});break
        }
        switch(this.props.colData.status){
            case 1:this.setState({userImg:userImg.student});break
            case 2:this.setState({userImg:userImg.tutor});break
        }

    }
    @autobind
    _initBody(){
        let _body = {
            writer:this.props.colData.nickname,
            classNum:this.props.colData.num,
            day:'월',
            time:1
        }
        this.setState({
            body:_body
        })
    }
    @autobind
    _ifUserNickEqualClassNick(){
        if(this.props.colData.nickname === this.props.userNickname){
            return(
                <span>
                    <Button onClick={this._toggleDelete} color="danger">삭제</Button>
                    <span> </span>
                    <Button onClick={this._toggleModify} color="success">정보수정</Button>
                </span>
            )
        }
        if(this.props.tutor === 0){
            if(this.props.colData.status === 1){
                return
            }
            return(
                <Button color="primary" onClick={this._toggleMatch}>{this.props.colData.status === 1? '튜터신청':'수강신청'}</Button>
            )
        }
        if(this.props.tutor === 1){
            return(
                <Button color="primary" onClick={this._toggleMatch}>{this.props.colData.status === 1? '튜터신청':'수강신청'}</Button>
            )
        }

    }
    @autobind
    _handleDay(day){
        let _body = this.state.body
        _body.day = day
        this.setState({
            body:_body
        })
    }
    @autobind
    _handleTime(e) {
        let _body = this.state.body
        _body.time = e.target.value
        this.setState({
            body: _body
        })
    }
    @autobind
    _matching(){

        let _body = {...this.state.body}
        _body.time = _body.day + '' + _body.time
        delete _body.day
        console.log('_body', _body)
        console.log('body',this.state.body)
        client.post('api/board/request',_body).then(res => {
            console.log('완료')
            this._toggleMatch()
            this._toggleClass()
            this._initBody()
        }).then(error => {
            console.log(error)
        })
    }
    @autobind
    _renderTime(data, index){
        return(
            <div key={index} className={styles.timeWrapper}>
                <hr/>
                <div className={styles.time}>{data.day}</div>
                <div className={styles.time}>{data.startTime}</div>
                <div className={styles.time}>{data.endTime}</div>
            </div>
        )
    }
    @autobind
    _getClassData(){
        client.get('api/board/class/'+ this.props.colData.num).then(res =>{
            this.setState({
                classInfo:res.data.list
            },()=>{
                console.log('classInfo', this.state.classInfo)
                this._toggleClass()
            })
        }).catch(error =>{console.log(error)
        })
    }
    @autobind
    _getTutorData(){
        client.get('api/user/getTutor/'+this.props.colData.nickname).then(res => {
            console.log('tutorinfo', res.data.tutor)
            this.setState({
                tutorInfo:res.data.tutor
            },()=>{
                this._toggleUser()
            })
        }).catch(error =>{console.log(error)
        })
    }
    @autobind
    _toggleDelete(){
        this.setState({
            modalDelete:!this.state.modalDelete
        })
    }
    @autobind
    _toggleClass() {
        this.setState({
            modalClass: !this.state.modalClass
        })
    }
    @autobind
    _toggleUser() {
        this.setState({
            modalUser: !this.state.modalUser
        })
    }
    @autobind
    _toggleMatch() {
        this.setState({
            modalMatch: !this.state.modalMatch
        })
    }
    @autobind
    _toggleDrop() {
        this.setState({
            dropdownOpen: !this.state.dropdownOpen
        })
    }
    @autobind
    _toggleModify() {
        this.setState({ modalModify: !this.state.modalModify })
    }


    render() {
        const colData = this.props.colData
        return (
            <div className={styles.cardWrapper}>
                <Card>
                    <img className={styles.classImg}  onClick={this._getClassData} src={this.state.classImg}/>
                    <img className={styles.userImg}  onClick={this._getClassData} src={this.state.userImg}/>
                    <div className={styles.classTitle} onClick={this._getClassData}>{colData.title}</div>
                    <div className={styles.classNickName} onClick={this._getTutorData}>
                        {colData.nickname}
                    </div>
                    <div className={styles.classLanguage}>Language | {colData.language}</div>
                </Card>
                <Modal isOpen={this.state.modalClass} toggle={this._toggleClass}>
                    <ModalHeader toggle={this._toggleClass} className = {styles.modalHeader}>{colData.title}</ModalHeader>
                    <ModalBody className={styles.modalBodyStyle}>
                        <div className={styles.classBox}>
                            <span className={styles.labels}>강의 개설자 :</span><span className={styles.status}>{colData.status === 1? '학생':'튜터'}</span>
                        </div><hr/>
                        <div className={styles.classBox}>
                            <h4 className={styles.labels}>수업 내용</h4><br/>
                            <div className={styles.content}>{this.state.classInfo.content}</div><hr/>
                        </div>
                        <div className={styles.classBox}>
                            <h4 className={styles.labels}>수업 가능 시간</h4><br/><br/>
                            <div className={styles.timeHeaderWrapper}>
                                <div className={styles.timeHeader}>요일</div>
                                <div className={styles.timeHeader}>시작</div>
                                <div className={styles.timeHeader}>종료</div>
                            </div>
                            {this.state.classInfo.time.map((data, index) => {
                                return this._renderTime(data, index)
                            })}<hr/>
                        </div>
                        <div className={styles.classBox}>
                            <span className={styles.labels}>언어 :</span><span className={styles.language}>{colData.language}</span>
                        </div>
                    </ModalBody>
                    <Modal isOpen={this.state.modalMatch} toggle={this._toggleMatch}>
                        <ModalHeader toggle={this._toggleMatch} className={styles.nestedModalHeader}>매칭 신청 하기</ModalHeader>
                        <ModalBody className={styles.nestedModalBody}>
                            <div>
                                <div>시작 시간을 설정하세요</div><br/>
                                <Form inline>
                                    <FormGroup>
                                        <ButtonDropdown isOpen={this.state.dropdownOpen} toggle={this._toggleDrop}>
                                            <DropdownToggle caret>
                                                {this.state.body.day}
                                            </DropdownToggle>
                                            <DropdownMenu>
                                                <DropdownItem className={styles.drop} onClick={()=>this._handleDay('월')}>월</DropdownItem>
                                                <DropdownItem divider />
                                                <DropdownItem className={styles.drop} onClick={()=>this._handleDay('화')}>화</DropdownItem>
                                                <DropdownItem divider />
                                                <DropdownItem className={styles.drop} onClick={()=>this._handleDay('수')}>수</DropdownItem>
                                                <DropdownItem divider />
                                                <DropdownItem className={styles.drop} onClick={()=>this._handleDay('목')}>목</DropdownItem>
                                                <DropdownItem divider />
                                                <DropdownItem className={styles.drop} onClick={()=>this._handleDay('금')}>금</DropdownItem>
                                                <DropdownItem divider />
                                                <DropdownItem className={styles.drop} onClick={()=>this._handleDay('토')}>토</DropdownItem>
                                                <DropdownItem divider />
                                                <DropdownItem className={styles.drop} onClick={()=>this._handleDay('일')}>일</DropdownItem>
                                            </DropdownMenu>
                                        </ButtonDropdown>
                                        <span>시간:</span>
                                        <Input type="number" onChange = {(e) => this._handleTime(e)} placeholder="1 ~ 24" />
                                    </FormGroup>
                                </Form>
                            </div>
                        </ModalBody>
                        <ModalFooter>
                            <Button color="primary" onClick={this._matching}>매칭신청</Button>
                        </ModalFooter>
                    </Modal>

                    <ModalFooter>
                        {this._ifUserNickEqualClassNick()}
                        <Button color="secondary" onClick={this._toggleClass}>취소</Button>
                    </ModalFooter>
                </Modal>

                <TutorInfo
                    isModalOpen={this.state.modalUser}
                    tutorData={this.state.tutorInfo}
                    onToggle={this._toggleUser}/>
                <ModifyClass
                    isModalOpen={this.state.modalModify}
                    classData={colData}
                    onToggle={this._toggleModify}
                    time = {this.state.classInfo.time}
                    content = {this.state.classInfo.content}
                />
                <DeleteClass
                    isModalOpen={this.state.modalDelete}
                    classData={colData.num}
                    onToggle={this._toggleDelete} />
            </div>
        )
    }
}

export default Class
