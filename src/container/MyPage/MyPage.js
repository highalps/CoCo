import React from 'react'
import styles from './MyPage.scss'


import MyPrivateInfo from 'component/MyPage/MyPrivateInfo'
import MyClassInfo from 'component/MyPage/MyClassInfo'



class MyPage  extends React.Component {

    constructor(){
        super()
    }
    _searchUserInfo(){
        console.log(this.state);
        let url = "https://www.cocotutor.ml/api/user/getUser/:id";
        return fetch(url)
            .then(response => response.json())
            .then(json => json.data)
            .catch(err => console.log(err))
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
