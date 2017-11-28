/* */
import React from 'react'
import SortableTree, { toggleExpandedForAll } from 'react-sortable-tree';
import FileExplorerTheme from 'react-sortable-tree-theme-file-explorer'
import Immutable from 'immutable'
import autobind from 'core-decorators/lib/autobind'

/* */
import styles from './Directory.scss'

class Directory extends React.Component {

    constructor() {
        super()
        this._refs = {}
        this.state = {
            treeData: [
                {
                    title: 'soPad',
                    isDirectory: true,
                    expanded: true,
                    children: [
                        {
                            title: 'src',
                            isDirectory: true,
                            children: [
                                { title: 'component', isDirectory: true },
                                { title: 'redux', isDirectory: true },
                            ],
                        },
                    ],
                },
                {
                    title: 'build',
                    isDirectory: true,
                    children: [{ title: 'react-sortable-tree.js' }],
                },
                {
                    title: 'node_modules',
                    isDirectory: true,
                },
                { title: '.gitignore' },
                { title: 'package.json' },
            ],
        }
    }

    @autobind
    updateTreeData(treeData) {
        this.setState({ treeData });
    }

    @autobind
    expand(expanded) {
        this.setState({
            treeData: toggleExpandedForAll({
                treeData: this.state.treeData,
                expanded,
            }),
        });
    }

    @autobind
    expandAll() {
        this.expand(true);
    }

    collapseAll() {
        this.expand(false);
    }

    render() {
        return (
            <div className={styles.wrapper}>
                    <SortableTree
                        theme={FileExplorerTheme}
                        treeData={this.state.treeData}
                        onChange={this.updateTreeData}
                        canDrag={false}
                        canDrop={({ nextParent }) => !nextParent || nextParent.isDirectory}
                        generateNodeProps={rowInfo => ({
                            icons: rowInfo.node.isDirectory
                                ? [
                                    <div
                                        style={{
                                            borderLeft: 'solid 8px gray',
                                            borderBottom: 'solid 10px gray',
                                            marginRight: 10,
                                            width: 16,
                                            height: 12,
                                            filter: rowInfo.node.expanded
                                                ? 'drop-shadow(1px 0 0 gray) drop-shadow(0 1px 0 gray) drop-shadow(0 -1px 0 gray) drop-shadow(-1px 0 0 gray)'
                                                : 'none',
                                            borderColor: rowInfo.node.expanded ? 'white' : 'gray',
                                        }}
                                    />,
                                ]
                                : [
                                    <div
                                        style={{
                                            border: 'solid 1px black',
                                            fontSize: 8,
                                            textAlign: 'center',
                                            marginRight: 10,
                                            width: 12,
                                            height: 16,
                                        }}
                                    >
                                        F
                                    </div>,
                                ],
                        })}
                    />
            </div>
        );
    }
}

Directory.defaultProps = {
    directory: Immutable.Map(),
}

export default Directory
