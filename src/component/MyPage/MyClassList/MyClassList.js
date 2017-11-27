/* */
import React from 'react'
import autobind from 'core-decorators/lib/autobind'
import styles from './MyClassList.scss'
import {Table,Modal, ModalHeader, ModalBody, ModalFooter, Button } from 'reactstrap'
import { connect } from 'react-redux'
import { classActions} from '../../../redux/actions'



class MyClassList extends React.Component {
    constructor(props){
        super(props)
        this._renderCol = this._renderCol.bind(this)
    }
    _renderCol(){
        let temp = this.props.getClass
        let plus = { num:4, title:'강의 전체 보기', language:''}
        if(temp.length >= 4) {
            temp = []
            temp.push(this.props.getClass[0],this.props.getClass[1],this.props.getClass[2], plus)
        }
        let cols = temp.map((colData, index) => {
            return <ColComponent colData={colData} key={index} index={index} entire={this.props.getClass}/>})
        return cols
    }


    render() {
        return (
            <div className={styles.wrapper}>
                <div className = {styles.head}>
                    클래스 정보
                </div>
                {this._renderCol()}
            </div>
        )
    }
}


const mapStateToProps = (state) => ({})
@connect(mapStateToProps)
class ColComponent extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            modalPlus: false,
            modalInfo: false,
        }
    }

    @autobind
    _participate(){
        console.log('classNum', this.props.colData.num)
        const payload = {
            classNum: this.props.colData.num
        }
        this.props.dispatch(classActions.setClassNum(payload))
    }

    @autobind
    _toggleInfo() {
        this.setState({
            modalInfo: !this.state.modalInfo
        })
    }

    @autobind
    _togglePlus(){
        this.setState({
            modalPlus: !this.state.modalPlus
        })
    }
    @autobind
    _renderEntireList(data, index){
        return (
            <tr key={index}>
                <th scope="row">{index+1}</th>
                <td>{data.title}</td>
                <td>{data.language}</td>
                <td><Button onClick={this._participate}>참여하기</Button></td>
            </tr>
        )
    }


    render(){
        const colData = this.props.colData
        return(
            <div className = {styles.colWrapper}>
                <div className={styles.colData} onClick={parseInt(this.props.index) === 3? this._togglePlus:this._toggleInfo}>
                    <div className={styles.cardWrapper}>
                        <div className={styles.classTitle}>{colData.title}</div>
                        <div className={styles.classLanguage}>{colData.language !== ''? 'Language | '+ colData.language:'더보기'}</div>
                    </div>
                </div>
                <Modal isOpen={this.state.modalInfo} toggle={this._toggleInfo}>
                    <ModalHeader toggle={this._toggleInfo} className = {styles.modalHeader}>{colData.title}</ModalHeader>
                    <ModalBody className={styles.modalBodyStyle}>
                        <div className={styles.box}>
                            <div className = {styles.labels}>수업 내용</div>
                            <br/>
                            <div className = {styles.modalContent}>{colData.content}</div>
                        </div>
                        <div className={styles.box}>
                            <span className = {styles.modalLanguageLabel}>언어: </span>
                            <span className = {styles.modalLanguage}>{colData.language}</span>
                        </div>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="primary" onClick={this._participate}>참여하기</Button>
                        <Button color="secondary" onClick={this._toggleInfo}>취소</Button>
                    </ModalFooter>
                </Modal>

                <Modal isOpen={this.state.modalPlus} toggle={this._togglePlus}>
                    <ModalHeader toggle={this._togglePlus} className = {styles.modalHeader}>전체 클래스 목록</ModalHeader>
                    <ModalBody className={styles.modalBodyStyle}>
                        <Table striped>
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>제목</th>
                                    <th>언어</th>
                                    <th>참여하기</th>
                                </tr>
                            </thead>

                            <tbody>
                                {this.props.entire.map((data, index)=>{return this._renderEntireList(data, index)})}
                            </tbody>
                        </Table>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="secondary" onClick={this._togglePlus}>취소</Button>
                    </ModalFooter>
                </Modal>
            </div>
            
            
        )
    }
}
export default MyClassList
