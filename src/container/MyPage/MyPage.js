import React from 'react'
import styles from './MyPage.scss'
import client from '../../redux/base.js'
import { connect } from 'react-redux'

import MyPrivateInfo from 'component/MyPage/MyPrivateInfo'
import MyClassInfo from 'component/MyPage/MyClassInfo'
import MyClassList from 'component/MyPage/MyClassList'
import NavBar from '../../component/GlobalNavbar'



/*
getWriter 신청 받은거
getApplicant 신청 한거
getClass 내 클래스 목록
api/user/
*/
const mapStateToProps = (state) => ({
    isLogged:state.userReducer.isLogged,
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
            getClass : [],
            getMyList: []
        }
    }

    componentWillMount(){
        console.log(this.props.isLogged)
        if(!this.props.isLogged){
            window.location.href = 'https://www.cocotutor.ml/#/signIn'
        }
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
                getApplicant:res.data.list
            })
        }).catch(error =>{
            console.log(error)
        })

        client.get('api/user/getClass/'+this.props.nickname
        ).then(res =>{
            console.log('match', res.data.matchList)
            console.log('myList', res.data.myList)
            this.setState({
                getClass:res.data.matchList,
                getMyList: res.data.myList
            })
        }).catch(error =>{
            console.log(error)
        })
    }

    render(){
        return(
            <div className = {styles.wrapper}>
                <NavBar/>
                <MyPrivateInfo nickname={this.props.nickname} tutor={this.props.tutor}
                               getWriter={this.state.getWriter.length} getApplicant={this.state.getApplicant.length}
                               email={this.props.email} id={this.props.id}/>
                <MyClassList getClass={this.state.getClass}/>
                <MyClassInfo getMyList={this.state.getMyList} getWriter={this.state.getWriter} getApplicant={this.state.getApplicant}/>
            </div>
        )
    }
}
export default MyPage;
