import React from 'react'
import styles from './MyPage.scss'
import client from '../../redux/base.js'
import { connect } from 'react-redux'

import MyPrivateInfo from 'component/MyPage/MyPrivateInfo'
import MyClassInfo from 'component/MyPage/MyClassInfo'
import MyClassList from 'component/MyPage/MyClassList'



/*
getWriter 신청 받은거
getApplicant 신청 한거
getClass 내 클래스 목록
api/user/
*/
const mapStateToProps = (state) => ({
    nickname: state.userReducer.nickname,
    email: state.userReducer.email,
    tutor: state.userReducer.tutor,
    id : state.userReducer.id
})

@connect(mapStateToProps)
class MyPage  extends React.Component {

    constructor(){
        super()
        this.state = {
            getApplicant : [],
            getWriter : [],
            getClass : []
        }
    }

    componentWillMount(){
        client.get('api/user/getWriter/'+this.props.nickname
        ).then(res =>{
            console.log('getWriter', res.data.list)
            this.setState({
                getWriter:res.data.list
            }, ()=>{
                console.log('getWriter!!!', this.state.getWriter.length)
            })
        }).catch(error =>{
            console.log(error)
        })

        client.get('api/user/getApplicant/'+this.props.nickname
        ).then(res =>{
            console.log('getApplicant', res.data.list)
            this.setState({
                getApplicant:res.data
            })
        }).catch(error =>{
            console.log(error)
        })

        client.get('api/user/getClass/'+this.props.nickname
        ).then(res =>{
            console.log('getClass', res.data.list)
            this.setState({
                getClass:res.data.list
            })
        }).catch(error =>{
            console.log(error)
        })
    }

    render(){
        return(
            <div className = {styles.wrapper}>
                <MyPrivateInfo nickname={this.props.nickname} tutor={this.props.tutor}
                               getWriter={this.state.getWriter.length} getApplicant={this.state.getApplicant.length}
                               email={this.props.email} id={this.props.id}/>
                <div className = {styles.head}>
                    클래스 정보
                </div>
                <MyClassList getClass={this.state.getClass}/>
                <MyClassInfo getWriter={this.state.getWriter} getApplicant={this.state.getApplicant}/>
            </div>
        )
    }
}
export default MyPage;
