/* */
import React from 'react'
import SortableTree from 'react-sortable-tree';
import FileExplorerTheme from 'react-sortable-tree-theme-file-explorer'
import Immutable from 'immutable'
import autobind from 'core-decorators/lib/autobind'
import propTypes from 'prop-types'

/* */
import styles from './Directory.scss'

class Directory extends React.Component {

    constructor(props) {
        super(props)
        this._refs = {}
        this.dirMap = Immutable.Map()
        this.state = {
            directory: props.directory.toJS(),
            dirStatus: Immutable.Map()
        }
    }

    @autobind
    onChangeDirectory(directory) {
        this.setState({ directory })
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
                icons:  [<div style={this.directoryStyles(file)} />],
                onDoubleClick: this.props.handleDoubleClick(file),
            }
        }
        return {
            icons: [<div style={this.fileStyles()}>{file.node.title.split('.')[1][0]}</div>],
            onDoubleClick: this.props.handleDoubleClick(file),
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
                    getNodeKey={this.getNodeKey}
                    generateNodeProps={this.nodeRenderer} />
            </div>
        )
    }
}

Directory.propTypes = {
    handleDoubleClick: propTypes.func
}

Directory.defaultProps = {
    directory: Immutable.Map(),
    handleDoubleClick: () => {},
}

export default Directory
