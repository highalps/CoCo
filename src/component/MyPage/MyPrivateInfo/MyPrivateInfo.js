import React from 'react'
import styles from './MyPage.scss'





class MyPage  extends React.Component {

    constructor(){
        super()
    }

    render(){
        return(
            <div className = {styles.wrapper}>
                <MyPrivateInfo />
                <MyClassInfo />
            </div>
        )
    }
}
export default MyPage;
