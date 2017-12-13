/* */
import React from 'react'
import SortableTree from 'react-sortable-tree';
import FileExplorerTheme from 'react-sortable-tree-theme-file-explorer'
import Immutable from 'immutable'
import autobind from 'core-decorators/lib/autobind'
import propTypes from 'prop-types'
import classNames from 'classnames'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import Button from '../../../Button'

/* */
import styles from './Directory.scss'
import Modal from '../../../../component/Modal'
import { editorActions } from '../../../../redux/actions'

@withRouter
@connect()
class Directory extends React.Component {

    constructor(props) {
        super(props)
        this._refs = {}
        this.state = {
            file: null,
            target: '',
            inputValue: '',
            createModalOpen: false,
            deleteModalOpen: false,
            renameModalOpen: false,
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

    componentDidUpdate(prevProps) {
        if (!prevProps.directory.equals(this.props.directory)) {
            this.setState({ directory: this.props.directory.toJS() })
        }
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
    onChangeInput(event) {
        this.setState({ inputValue: event.target.value })
    }

    @autobind
    onToggle(treeData) {
        this.setState({ directory: treeData.treeData})
    }


    @autobind
    handleContextMenu(file) {
        return (event) => {
            const isModalOpen = this.state.createModalOpen || this.state.renameModalOpen || this.state.deleteModalOpen
            if (!isModalOpen) {
                event.preventDefault()
                this.setState({isMenuVisible: true, file: file.node})

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
    }

    @autobind
    handleOptionClick(option, target) {
        const inputValue = this.state.file && option === 'rename' ? this.state.file.title : ''
        return () => {
            this.setState({ [`${option}ModalOpen`]: true, target, inputValue })
        }
    }

    @autobind
    handleCreateFile() {
        const { type, path, title } = this.state.file
        const payload = {
            classNum: this.props.match.params.classId,
            fileName : this.state.target === 'file' ? this.state.inputValue : this.state.inputValue.split('.')[0],
            type: this.state.target,
            path : type === 'directory' ? (path === '/' ? `/${title}` :`${path}/${title}`) : path
        }
        this.props.dispatch(editorActions.createFile(payload))
            .then(() => this.setState({ createModalOpen: false }))
    }

    @autobind
    handleDeleteFile() {
        const { type, path, title, key } = this.state.file
        this.setState({ deleteModalOpen: true })
        const payload = {
            classNum: this.props.match.params.classId,
            type,
            path,
            key,
            fileName : title,
        }
        this.props.dispatch(editorActions.removeFile(payload))
            .then(() => {
                this.props.handleDelete(key)
                this.setState({ deleteModalOpen: false })
            })
    }

    @autobind
    handleRenameFile() {
        const { type, path, title, key } = this.state.file
        const nextName = this.state.inputValue
        const newKey = path === '/' ? `/${nextName}` : `${path}/${nextName}`
        const payload = {
            classNum: this.props.match.params.classId,
            type,
            path,
            key,
            newKey,
            prevName: title,
            nextName,
        }
        this.props.dispatch(editorActions.renameFile(payload))
            .then(() => {
                this.setState({ renameModalOpen: false })
                this.props.handleRename(key, newKey)
            })
    }

    @autobind
    handleCancelClick() {
        this.setState({ createModalOpen: false, deleteModalOpen: false, renameModalOpen: false, inputValue: '' })
    }

    renderCreateModal() {
       return (
           <Modal isModalOpen={this.state.createModalOpen}>
               <div className={styles.modal}>
                   <div className={styles.head}>
                       <div className={styles.title}>{`New ${this.state.target}`}</div>
                       <div className={styles.cancel} onClick={this.handleCancelClick}>x</div>
                   </div>
                   <div className={styles.body}>
                       <div className={styles.description}>{`Enter a new ${this.state.target} name:`}</div>
                       <input
                           autoFocus
                           className={styles.input}
                           onChange={this.onChangeInput}
                           placeholder="main.cpp"
                           value={this.state.inputValue} />
                   </div>
                   <div className={styles.footer}>
                       <div className={styles.button} onClick={this.handleCreateFile}>OK</div>
                       <div className={styles.button} onClick={this.handleCancelClick}>Cancel</div>
                   </div>
               </div>
           </Modal>
       )
    }

    renderRenameModal() {
        return (
            <Modal isModalOpen={this.state.renameModalOpen}>
                <div className={styles.modal}>
                    <div className={styles.head}>
                        <div className={styles.title}>Rename</div>
                        <div className={styles.cancel} onClick={this.handleCancelClick}>x</div>
                    </div>
                    <div className={styles.body}>
                        <div className={styles.description}>
                            {
                                `
                                   Rename
                                   ${this.state.file ? this.state.file.type : ''}
                                   ${this.state.file ? this.state.file.title : ''} and its usages to:
                                `
                            }
                        </div>
                        <input
                            autoFocus
                            className={styles.input}
                            onChange={this.onChangeInput}
                            value={this.state.inputValue} />
                    </div>
                    <div className={styles.footer}>
                        <div className={styles.button} onClick={this.handleRenameFile}>OK</div>
                        <div className={styles.button} onClick={this.handleCancelClick}>Cancel</div>
                    </div>
                </div>
            </Modal>
        )
    }


    renderDeleteModal() {
        return (
            <Modal isModalOpen={this.state.deleteModalOpen}>
                <div className={styles.modal}>
                    <div className={styles.head}>
                        <div className={styles.title}>Delete</div>
                        <div className={styles.cancel} onClick={this.handleCancelClick}>x</div>
                    </div>
                    <div className={styles.body}>
                        <div className={styles.description}>
                            {
                                `Delete
                                 ${this.state.file ? this.state.file.type : ''}
                                 "${this.state.file ? this.state.file.title : ''}"?
                                 `
                            }
                        </div>
                    </div>
                    <div className={styles.footer}>
                        <div className={styles.button} onClick={this.handleDeleteFile}>OK</div>
                        <div className={styles.button} onClick={this.handleCancelClick}>Cancel</div>
                    </div>
                </div>
            </Modal>
        )
    }

    renderMenu() {
        return (
            <div ref={e => this._refs.menu = e} className={classNames(styles.menu, { [styles.hidden]: !this.state.isMenuVisible })}>
                <div className={styles.option} onClick={this.handleOptionClick('create', 'file')}>New File</div>
                <div className={styles.option} onClick={this.handleOptionClick('create', 'directory')}>New Directory</div>
                <div className={styles.divider} />
                <div className={styles.option} onClick={this.handleOptionClick('rename')}>Rename</div>
                <div className={styles.divider} />
                <div className={styles.option} onClick={this.handleOptionClick('delete')}>Delete</div>
            </div>
        )
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

    render() {
        return (
            <div className={styles.wrapper}>
                <SortableTree
                    className={styles.directory}
                    theme={FileExplorerTheme}
                    onChange={this.onChangeDirectory}
                    treeData={this.state.directory}
                    canDrag={false}
                    onVisibilityToggle={this.onToggle}
                    generateNodeProps={this.nodeRenderer} />
                {this.renderMenu()}
                {this.renderCreateModal()}
                {this.renderDeleteModal()}
                {this.renderRenameModal()}
            </div>
        )
    }
}

Directory.propTypes = {
    handleDoubleClick: propTypes.func,
    handleDelete: propTypes.func,
    currentFileName: propTypes.string,
}

Directory.defaultProps = {
    directory: Immutable.Map(),
    handleDelete: () => {},
    handleDoubleClick: () => {},
    currentFileName: '',
}

export default Directory
