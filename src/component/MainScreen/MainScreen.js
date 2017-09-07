/* */
import React from 'react'
import autobind from 'core-decorators/lib/autobind'
/* */
import styles from './MainScreen.scss'
import List from '../../container/List'
class MainScreen extends React.Component {

    constructor() {
        super()
        this._refs = {}
    }

    render() {
        return (
            <div className={styles.wrapper}>
              <div className={styles.wrapperTitle}>
                <div className={styles.sopadTitle}>
                  이제는 웹에서 프로젝트를 진행하세요!!
                </div>
              </div>
              <div>
                <img className ={styles.coddingImg} src="http://cfile10.uf.tistory.com/image/2105C64D570F2621101068"/>
              </div>
            </div>
        )
    }
}

export default MainScreen
