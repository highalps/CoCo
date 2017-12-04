/* */
import React from 'react'
import {Button, Modal, ModalHeader, ModalBody, ModalFooter} from 'reactstrap'

/* */
import styles from './DeleteClass.scss'
import client from '../../../redux/base.js'
import autobind from 'core-decorators/lib/autobind'



class DeleteClass  extends React.Component {

    constructor(props) {
        super(props)
    }
    @autobind
    _toggle(){
        this.props.onToggle()
    }
    @autobind
    _delete(){
        client.delete('api/board/'+this.props.classData)
            .then(
                res =>{console.log('삭제 완료')
                    window.alert('삭제를 완료했습니다.')
                    window.location.reload()
                })
            .catch(error =>{
                console.log(error)
                window.alert('삭제 실패')
            })
    }
    render(){
        return(
            <Modal isOpen={this.props.isModalOpen} toggle={this._toggle}>
                <ModalHeader toggle={this._toggle} className = {styles.modalHeader}>클래스 삭제</ModalHeader>
                <ModalBody>
                    <div className={styles.userBox}>
                        클래스를 삭제 하시겠습니까??
                    </div>
                </ModalBody>
                <ModalFooter>
                    <Button color="primary" onClick={this._delete}>삭제</Button>
                    <Button color="secondary" onClick={this._toggle}>취소</Button>
                </ModalFooter>
            </Modal>
        )
    }
}
export default DeleteClass
