/* */
import React from 'react'
import classNames from 'classnames'
import Immutable from 'immutable'

/* */
import styles from './EditorBox.scss'
import TextEditor from '../TextEditor'
import WebStreamWrapper from '../WebStreamWrapper'

const dummyTab = Immutable.List(['jane','chan'])

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

    handleTabClick(name) {
        this.setState({ name })
    }

    renderTab() {
        return (
            <div className={styles.tab}>
                {dummyTab.map(tap => (
                    <div
                        key={tap}
                        className={classNames({ [styles.selected]: tap === this.state.name }, styles.item)}
                        onClick={() => this.handleTabClick(tap)}>
                        {`${tap}.cpp`}
                    </div>
                ))}
            </div>
        )
    }
    render() {
        return (
            <div className={styles.wrapper}>
                {this.renderTab()}
                <WebStreamWrapper />
                <TextEditor name={this.state.name} />
            </div>
        )
    }
}

export default EditorBox
