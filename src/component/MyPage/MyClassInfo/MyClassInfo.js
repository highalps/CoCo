import React from 'react'
import styles from './MyClassInfo.scss'
import {Row, Col} from 'reactstrap'




class MyClassInfo  extends React.Component {

    constructor(){
        super()
    }

    render(){
        return(
            <div className = {styles.wrapper}>
                <div className = {styles.headWrapper}>
                    <div className={styles.head}>
                       <button className={styles.headBtn}>수강 신청 목록</button>
                    </div>
                    <div className={styles.head}>
                        <button className={styles.headBtn}>신청 받은 목록</button>
                    </div>
                </div>
            </div>
        )
    }
}
export default MyClassInfo;
