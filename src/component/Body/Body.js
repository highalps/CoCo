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

    findIndex(index) {
        if (index === 0) {
            return this.state.tabList.size >= 2 ? index + 1 : -1;
        } else {
            return index - 1;
        }
    }

    @autobind
    handleDoubleClick(file) {
        return (event) => {
            if (file.node.type !== 'directory') {
                const fileName = file.node.key
                if (this.state.tabList.findIndex(tab => tab.fileName === fileName) === -1) {
                    this.setState({
                        tabList: this.state.tabList.push({
                            index: file.treeIndex, fileName: file.node.key,
                        }),
                        currentFileName: fileName,
                    })
                } else {
                    this.setState({ currentFileName: fileName })
                }
            }
            event.preventDefault()
        }
    }

    @autobind
    handleCancelClick(tab) {
        const index = this.state.tabList.findIndex(t => t.fileName === tab.fileName)
        if (index !== -1) {
            const curIndex = this.state.tabList.findIndex(t => t.fileName === this.state.currentFileName)
            const fIndex = this.findIndex(index)
            const nextIndex = fIndex === curIndex ? fIndex : curIndex
            this.setState({
                tabList: this.state.tabList.delete(index),
                currentFileName: fIndex === -1 ? '' : this.state.tabList.get(nextIndex).fileName,
            })
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
