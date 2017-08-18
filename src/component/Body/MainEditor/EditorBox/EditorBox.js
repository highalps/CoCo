/* */
import React from 'react'

/* */
import styles from './EditorBox.scss'
import TextEditor from '../TextEditor'

class EditorBox extends React.Component {
    constructor() {
        super()
        this.state = {
            name: 'jane',
        }
        this._refs = {}
    }

    componentDidMount() {
    }

    renderTab() {
        return (
            <div className={styles.tab}>
                <div className={styles.item} onClick={() => this.setState({ name: 'jane' })}>jane.cpp</div>
                <div className={styles.item} onClick={() => this.setState({ name: 'chan' })}>chan.cpp</div>
            </div>
        )
    }
    render() {
        return (
            <div className={styles.wrapper}>
                {this.renderTab()}
                <TextEditor name={this.state.name} />
            </div>
        )
    }
}

export default EditorBox
