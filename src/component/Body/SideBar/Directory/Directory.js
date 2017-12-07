/* */
import React from 'react'
import SortableTree from 'react-sortable-tree';
import FileExplorerTheme from 'react-sortable-tree-theme-file-explorer'
import Immutable from 'immutable'
import autobind from 'core-decorators/lib/autobind'
import propTypes from 'prop-types'
import classNames from 'classnames'
import { withRouter } from 'react-router-dom'

/* */
import styles from './Directory.scss'
import Modal from '../../../../component/Modal'

@withRouter
class Directory extends React.Component {

    constructor(props) {
        super(props)
        this._refs = {}
        this.dirMap = Immutable.Map()
        this.state = {
            file: null,
            isMenuVisible: false,
            directory: props.directory.toJS(),
            dirStatus: Immutable.Map()
        }
    }

    componentDidMount() {
        document.addEventListener('click', this.handleClick)
    }

    componentWillUnmount() {
        document.removeEventListener('click', this.handleClick)
    }

    @autobind
    handleClick() {
        if (this.state.isMenuVisible) {
            this.setState({ isMenuVisible: false })
        }
    }

    @autobind
    onChangeDirectory(directory) {
        this.setState({ directory })
    }

    @autobind
    handleContextMenu(file) {
        return (event) => {
            event.preventDefault()
            this.setState({ isMenuVisible: true, file: file.node })

            const clickX = event.clientX
            const clickY = event.clientY
            const screenW = window.innerWidth
            const screenH = window.innerHeight
            const rootW = this._refs.menu.offsetWidth
            const rootH = this._refs.menu.offsetHeight

            const right = (screenW - clickX) > rootW
            const left = !right;
            const top = (screenH - clickY) > rootH
            const bottom = !top;

            if (right) {
                this._refs.menu.style.left = `${clickX + 5}px`
            }
            if (left) {
                this._refs.menu.style.left = `${clickX - rootW - 5}px`
            }
            if (top) {
                this._refs.menu.style.top = `${clickY + 5}px`
            }
            if (bottom) {
                this._refs.menu.style.top = `${clickY - rootH - 5}px`
            }
        }
    }

    @autobind
    handleNewClick() {
        const { type, title, path } = this.state.file
        const payload = {
            classNum: this.props.match.params.classId,
            fileName : title,
            type,
            path,
        }
    }

    handleDeleteClick() {

    }


    @autobind
    getNodeKey({ treeIndex, node }) {
        // this.setState({ dirStatus: this.state.dirStatus.set(treeIndex, node) })
        this.dirMap = this.dirMap.set(treeIndex, node)
    }

    directoryStyles(file) {
        return {
            borderLeft: 'solid 8px gray',
            borderBottom: 'solid 10px gray',
            marginRight: 10,
            width: 16,
            height: 12,
            filter: file.node.expanded
                ? 'drop-shadow(1px 0 0 gray) drop-shadow(0 1px 0 gray) drop-shadow(0 -1px 0 gray) drop-shadow(-1px 0 0 gray)'
                : 'none',
            borderColor: file.node.expanded ? 'white' : 'gray',
        }
    }

    fileStyles() {
        return {
            border: 'solid 1px black',
            fontSize: 8,
            textAlign: 'center',
            marginRight: 10,
            width: 12,
            height: 16,
        }
    }

    @autobind
    nodeRenderer(file) {
        if (file.node.type === 'directory') {
            return {
                icons:  [<div key={file.node.key} style={this.directoryStyles(file)} />],
                onDoubleClick: this.props.handleDoubleClick(file),
                onContextMenu: this.handleContextMenu(file),
            }
        }
        return {
            icons: [<div key={file.node.key} style={this.fileStyles()}>F</div>],
            onDoubleClick: this.props.handleDoubleClick(file),
            onContextMenu: this.handleContextMenu(file),
        }
    }

    renderMenu() {
        return (
            <div ref={e => this._refs.menu = e} className={classNames(styles.menu, { [styles.hidden]: !this.state.isMenuVisible })}>
                <div className={styles.option} onClick={this.handleNewClick}>New</div>
                <div className={styles.divider} />
                <div className={styles.option}>Cut</div>
                <div className={styles.option}>Copy</div>
                <div className={styles.option}>Paste</div>
                <div className={styles.divider} />
                <div className={styles.option}>Rename</div>
                <div className={styles.divider} />
                <div className={styles.option} onClick={this.handleDeleteClick}>Delete</div>
            </div>
        )
    }

    render() {
        console.log("A", this.state.directory)
        return (
            <div className={styles.wrapper}>
                <SortableTree
                    className={styles.directory}
                    theme={FileExplorerTheme}
                    onChange={this.onChangeDirectory}
                    treeData={this.state.directory}
                    canDrag={false}
                    getNodeKey={this.getNodeKey}
                    generateNodeProps={this.nodeRenderer} />
                {this.renderMenu()}
            </div>
        )
    }
}

Directory.propTypes = {
    handleDoubleClick: propTypes.func,
    currentFileName: propTypes.string,
}

Directory.defaultProps = {
    directory: Immutable.Map(),
    handleDoubleClick: () => {},
    currentFileName: '',
}

export default Directory
