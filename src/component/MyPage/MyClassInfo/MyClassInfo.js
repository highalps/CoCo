/* */
import React from 'react'
import {Table, TabContent, TabPane, Nav, NavItem, NavLink, Button} from 'reactstrap'
import classnames from 'classnames'
import client from '../../../redux/base.js'
import autobind from 'core-decorators/lib/autobind'

/* */
import styles from './MyClassInfo.scss'



class MyClassInfo  extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            activeTab: '1'
        }
    }

    @autobind
    _accept(num){
        return () => {
            client.put('api/chat/request/'+num)
            .then(res =>{
                console.log(res)
                window.alert('수락을 완료했습니다.')
                window.location.reload()

            }).catch(error =>{
                console.log(error)
                window.alert('수락 실패')
            })
        }
    }

    @autobind
    _renderApplicantList(data, index){
        return (
            <tr key={index}>
                <th>{data.title}</th>
                <td>{data.language}</td>
                <td>{data.writer}</td>
                <td><Button onClick={this._cancel(data.num)}>취소</Button></td>
            </tr>
        )
    }
    @autobind
    _renderWriterList(data, index){
        return (
            <tr key={index}>
                <th>{data.title}</th>
                <td>{data.language}</td>
                <td>{data.applicant}</td>
                <td><Button onClick={this._accept(data.num)}>수락</Button></td>
                <td><Button onClick={this._cancel(data.num)}>거절</Button></td>
            </tr>
        )
    }
    @autobind
    _renderMyClassList(data, index){
        return (
            <tr key={index}>
                <th>{data.title}</th>
                <td>{data.language}</td>
                <td>{data.date.substring(0, 10)}</td>
                <td><Button onClick={this._delete(data.num)}>삭제</Button></td>
            </tr>
        )
    }

    @autobind
    _cancel(chatNum){
        return () => {
            client.delete('api/chat/'+chatNum)
                .then(res =>{
                    console.log(res)
                    window.alert('신청을 거절했습니다.')
                    window.location.reload()
                }).catch(error =>{
                    console.log(error)
                    window.alert('거절 실패')
                })
        }
    }
    @autobind
    _delete(num){
        return () => {
            client.delete('api/board/'+num)
                .then(res =>{
                    console.log(res)
                    window.alert('클래스를 삭제 했습니다.')
                    window.location.reload()
                }).catch(error =>{
                    console.log(error)
                    window.alert('클래스 삭제 실패')
                })
        }
    }
    @autobind
    toggle(tab) {
        if (this.state.activeTab !== tab) {
            this.setState({
                activeTab: tab
            })
        }
    }
    render(){
        return(
            <div className = {styles.wrapper}>
                <div className = {styles.headWrapper}>
                    <Nav tabs>
                        <NavItem className={styles.head}>
                            <NavLink
                                className={classnames({ active: this.state.activeTab === '1' })}
                                onClick={() => { this.toggle('1') }}
                            >
                                내클래스
                            </NavLink>
                        </NavItem>
                        <NavItem className={styles.head}>
                            <NavLink
                                className={classnames({ active: this.state.activeTab === '2' })}
                                onClick={() => { this.toggle('2') }}
                            >
                                신청한목록
                            </NavLink>
                        </NavItem>
                        <NavItem  className={styles.head}>
                            <NavLink
                                className={classnames({ active: this.state.activeTab === '3' })}
                                onClick={() => { this.toggle('3')}}
                            >
                                신청받은목록
                            </NavLink>
                        </NavItem>
                    </Nav>
                    <TabContent activeTab={this.state.activeTab}>
                        <TabPane tabId="1">
                            <div className={styles.tableWrapper}>
                                <div className={styles.subHead}>내 클래스 목록</div>
                                <Table striped>
                                    <thead>
                                    <tr>
                                        <th>제목</th>
                                        <th>언어</th>
                                        <th>생성날짜</th>
                                        <th>삭제</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {this.props.getMyList.map((data, index)=>{return this._renderMyClassList(data, index)})}
                                    </tbody>
                                </Table>
                            </div>
                        </TabPane>
                        <TabPane tabId="2">
                            <div className={styles.tableWrapper}>
                                <div className={styles.subHead}>수업신청 현황</div>
                                <Table striped>
                                    <thead>
                                    <tr>
                                        <th>제목</th>
                                        <th>언어</th>
                                        <th>개설자</th>
                                        <th>취소</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {this.props.getApplicant.map((data, index)=>{return this._renderApplicantList(data, index)})}
                                    </tbody>
                                </Table>
                            </div>
                        </TabPane>

                        <TabPane tabId="3">
                            <div className={styles.tableWrapper}>
                                <div className={styles.subHead}>수업신청 현황</div>
                                <Table striped>
                                    <thead>
                                        <tr>
                                            <th>제목</th>
                                            <th>언어</th>
                                            <th>신청자</th>
                                            <th>수락하기</th>
                                            <th>거절하기</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {this.props.getWriter.map((data, index)=>{return this._renderWriterList(data, index)})}
                                    </tbody>
                                </Table>
                            </div>
                        </TabPane>
                    </TabContent>
                </div>
            </div>
        )
    }

}
export default MyClassInfo
