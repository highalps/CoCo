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

    makeFileName(path, title) {
        if (path === '/') {
            return `/${title}`
        }
        return `${path}/${title}`
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
                const fileName = this.makeFileName(file.node.path, file.node.title)
                if (this.state.tabList.findIndex(tab => tab.fileName === fileName) === -1) {
                    this.setState({
                        tabList: this.state.tabList.push({
                            index: file.treeIndex, fileName,
                        }),
                        currentFileName: fileName
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
            const nextIndex = this.findIndex(index)
            this.setState({
                tabList: this.state.tabList.delete(index),
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
