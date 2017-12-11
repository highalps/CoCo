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
                const fileName = file.node.key
                if (this.state.tabList.findIndex(tab => tab.fileName === fileName) === -1) {
                    this.setState({
                        tabList: this.state.tabList.push({
                            index: file.treeIndex, fileName: fileName,
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
        const targetIndex = this.state.tabList.findIndex(t => t.fileName === tab.fileName) // x를 누른 파일 위치
        if (targetIndex !== -1) {
            const curIndex = this.state.tabList.findIndex(t => t.fileName === this.state.currentFileName) // 보고 있는 위치
            const fIndex = targetIndex === curIndex ? curIndex -1 : curIndex
            const nextIndex = (() => {
                if (fIndex === -1) {
                    if (this.state.tabList.size >= 2)return 1
                    return -1
                }
                return fIndex
            })()
            this.setState({
                tabList: this.state.tabList.delete(targetIndex),
                currentFileName: nextIndex === -1 ? '' : this.state.tabList.get(nextIndex).fileName,
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
                  currentFileName={this.state.currentFileName}
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
