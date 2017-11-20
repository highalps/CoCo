/* */
import React from 'react'
import styles from './MyClassList.scss'
import {Table,Modal, ModalHeader, ModalBody, ModalFooter, Button } from 'reactstrap'
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
        const col =temp.map((colData, index) => {
            return <ColComponent colData={colData} key={index} index={index} entire={this.props.getClass}/>})
        return col
    }


    render() {
        return (
            <div className={styles.wrapper}>
                {this._renderCol()}
            </div>
        )
    }
}

/*
TODO 전체 리스트 목록 가져오기
TODO 클래스 정보 보여주기
*/
class ColComponent extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            modalPlus: false,
            modalInfo: false,
        }
        this._toggleInfo = this._toggleInfo.bind(this)
        this._togglePlus = this._togglePlus.bind(this)
        this._renderEntireList = this._renderEntireList.bind(this)
        
    }

    _toggleInfo() {
        this.setState({
            modalInfo: !this.state.modalInfo
        })
    }
    _togglePlus(){
        this.setState({
            modalPlus: !this.state.modalPlus
        })
    }
    _renderEntireList(data, index){
        return (
            <tr key={index}>
                <th scope="row">{data.num}</th>
                <td>{data.title}</td>
                <td>{data.language}</td>
                <td><Button>참여하기</Button></td>
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
                        <h3>수업 내용</h3>
                        <hr/>
                        <div className = {styles.modalContent}>{colData.content}</div>
                        <hr/>
                        <span className = {styles.modalLanguageLabel}>언어: </span>
                        <span className = {styles.modalLanguage}>{colData.language}</span>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="primary" onClick={this._toggleInfo}>참여하기</Button>
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
