/* */
import React from 'react'


/* */
import styles from './MyPrivateInfo.scss'


class MyPrivateInfo  extends React.Component {

    constructor(props){
        super(props)
    }


    render(){
        return(
            <div className = {styles.wrapper}>
                <div className = {styles.sec01}>
                    <div className={styles.box}>
                        <div className = {styles.left}></div>
                        <div className = {styles.right}>
                            <div className = {styles.right01}>
                                {this.props.nickname}
                            </div>
                        </div>
                    </div>
                </div>
                <div className = {styles.sec01}>
                    <div className={styles.box}>
                        <div className={styles.box1}>
                            <div className={styles.middle}>받은수업신청서</div>
                            <div className={styles.bottom}>{this.props.getWriter}</div>
                        </div>
                        <div className={styles.box1}>
                            <div className={styles.middle}>신청한수업</div>
                            <div className={styles.bottom}>{this.props.getApplicant}</div>
                        </div>
                    </div>
                </div>
                <div className = {styles.sec01}>
                    <div className = {styles.box2}>
                        <div className = {styles.box3}>
                            <div className={styles.smSize}>등록된 이메일:</div>
                            <div className={styles.lgSize}>{this.props.email}</div>
                        </div>
                        <div className = {styles.box3}>
                            <div className={styles.smSize}>튜터 등록 여부:</div>
                            <div className={styles.lgSize}>{this.props.tutor===0? '미등록':'등록'}</div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
export default MyPrivateInfo
