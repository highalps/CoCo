/* */
import React from 'react'
import SortableTree from 'react-sortable-tree'
import FileExplorerTheme from 'react-sortable-tree-theme-file-explorer'
import Immutable from 'immutable'

/* */
import styles from './Directory.scss'

class Directory extends React.Component {

    constructor() {
        super()
        this._refs = {}
        this.state = {
            treeData: [{ title: 'src/', children: [ { title: 'index.js' } ] }],
        };
    }

    render() {
        console.log("DD", this.props.directory.toJS())
        return (
            <div className={styles.wrapper}>
                <div style={{ height: 400 }}>
                    <SortableTree
                        treeData={this.state.treeData}
                        onChange={treeData => this.setState({ treeData })}
                        theme={FileExplorerTheme}
                    />
                </div>
            </div>
        )
    }
}

Directory.defaultProps = {
    directory: Immutable.Map(),
}

export default Directory
