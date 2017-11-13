import React from 'react'
import styles from './MyClassInfo.scss'
import {Table, TabContent, TabPane, Nav, NavItem, NavLink, Button} from 'reactstrap'
import classnames from 'classnames'



class MyClassInfo  extends React.Component {

    constructor(props) {
        super(props)
        this._renderApplicantList = this._renderApplicantList.bind(this)
        this._renderWriterList = this._renderWriterList.bind(this)

        this.toggle = this.toggle.bind(this)
        this.state = {
            activeTab: '1'
        }
    }
    _renderApplicantList(data){
        return (
            <tr>
                <th>{data.title}</th>
                <td>{data.language}</td>
                <td>{data.writer}</td>
                <td><Button>확인</Button></td>
            </tr>
        )
    }
    _renderWriterList(data){
        return (
            <tr>
                <th>{data.title}</th>
                <td>{data.language}</td>
                <td>{data.applicant}</td>
                <td><Button>확인</Button></td>
            </tr>
        )
    }

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

                                신청한목록
                            </NavLink>
                        </NavItem>
                        <NavItem  className={styles.head}>
                            <NavLink
                                className={classnames({ active: this.state.activeTab === '2' })}
                                onClick={() => { this.toggle('2')}}
                            >
                                신청받은목록
                            </NavLink>
                        </NavItem>
                    </Nav>
                    <TabContent activeTab={this.state.activeTab}>
                        <TabPane tabId="1">
                            <div className={styles.tableWrapper}>
                                <div className={styles.subHead}>수업신청 현황</div>
                                <Table striped>
                                    <thead>
                                        <tr>
                                            <th>제목</th>
                                            <th>언어</th>
                                            <th>개설자</th>
                                            <th>확인하기</th>
                                        </tr>
                                    </thead>

                                    <tbody>
                                        {this.props.getApplicant.map((data)=>{return this._renderApplicantList(data)})}
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
                                            <th>신청자</th>
                                            <th>확인하기</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {this.props.getWriter.map((data)=>{return this._renderWriterList(data)})}
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
