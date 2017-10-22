import React from 'react'
import styles from './MyPrivateInfo.scss'





class MyPrivateInfo  extends React.Component {

    constructor(){
        super()
    }

    render(){
        return(
            <div className = {styles.wrapper}>
                <div className = {styles.profile}>
                    <div className = {styles.userImgWrapper}>
                        <img src="https://pbs.twimg.com/profile_images/494464168225824768/SQmBbxIB_400x400.jpeg" className = {styles.userImg}/>
                        <br/>
                        <br/>
                        <h2>닉네임</h2>
                    </div>
                </div>
                <div className = {styles.profile}>
                    <div className = {styles.userInfoWrapper}>
                        <h3>Email:  test@naver.com</h3>
                        <br/>
                        <h3>튜터 등록: 미등록</h3>
                    </div>
                </div>

            </div>
        )
    }
}
export default MyPrivateInfo;
