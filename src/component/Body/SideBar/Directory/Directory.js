/* */
import React from 'react'
import SortableTree from 'react-sortable-tree';
import FileExplorerTheme from 'react-sortable-tree-theme-file-explorer'
import Immutable from 'immutable'
import autobind from 'core-decorators/lib/autobind'
import classNames from 'classnames'

/* */
import styles from './Directory.scss'

class Directory extends React.Component {

    constructor(props) {
        super(props)
        this._refs = {}
        this.state = {
            directory: props.directory.toJS()
        }
    }

    @autobind
    onChangeDirectory(directory) {
        this.setState({ directory })
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
                icons:  [<div style={this.directoryStyles(file)} />]
            }
        }
        return {
            icons: [<div style={this.fileStyles()}>{file.node.title.split('.')[1][0]}</div>]
        }
    }

    render() {
        return (
            <div className={styles.wrapper}>
                <SortableTree
                    theme={FileExplorerTheme}
                    onChange={this.onChangeDirectory}
                    treeData={this.state.directory}
                    canDrag={false}
                    generateNodeProps={this.nodeRenderer} />
            </div>
        );
    }
}

Directory.defaultProps = {
    directory: Immutable.Map(),
}

export default Directory
