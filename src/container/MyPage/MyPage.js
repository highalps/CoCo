import React from 'react'
import styles from './MyPage.scss'


import MyPrivateInfo from 'component/MyPage/MyPrivateInfo'
import MyClassInfo from 'component/MyPage/MyClassInfo'



class MyPage  extends React.Component {

    constructor(){
        super()
    }

    render(){
        return(
            <div className = {styles.wrapper}>
                <MyPrivateInfo />
                <div className = {styles.classHead}>
                    클래스 정보
                </div>
                <MyClassInfo />
            </div>
        )
    }
}
export default MyPage;
