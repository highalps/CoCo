/* */
import React from 'react'
import autobind from 'core-decorators/lib/autobind'
import immutable from 'immutable'

/* */
import styles from './Body.scss'
import SideBar from './SideBar'
import MainEditor from './MainEditor'

class Body extends React.Component {

    constructor() {
        super()
        this._refs = {}
        this.state = {
            tabList: immutable.List(),
            currentFileName: '',
        }
    }

    @autobind
    handleDoubleClick(file) {
        return (event) => {
            if (file.node.type !== 'directory') {
                if (this.state.tabList.findIndex(tab => tab.title === file.node.title) === -1) {
                    this.setState({
                        tabList: this.state.tabList.push({ index: file.treeIndex, title: file.node.title }),
                        currentFileName: file.node.title
                    })
                } else {
                    this.setState({ currentFileName: file.node.title })
                }
            }
            event.preventDefault()
        }
    }

    @autobind
    handleCancelClick(tab) {
        const index = this.state.tabList.findIndex(t => t.title === tab.title)
        if (index !== -1) {
            this.setState({ tabList: this.state.tabList.delete(index) })
        }
    }

    @autobind
    handleTabClick(currentFileName) {
        this.setState({ currentFileName })
    }

    render() {
        return (
            <div className={styles.wrapper}>
              <SideBar
                  directory={this.props.directory}
                  handleDoubleClick={this.handleDoubleClick} />
              <MainEditor
                  tabList={this.state.tabList}
                  currentFileName={this.state.currentFileName}
                  handleCancelClick={this.handleCancelClick}
                  handleTabClick={this.handleTabClick} />
            </div>
        )
    }
}

export default Body
