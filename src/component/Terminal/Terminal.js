/* */
import React from 'react'
import Terminal from 'react-bash'

/* */
import styles from './Terminal.scss'

const history = [
    { value: 'Type `help` to begin' },
];
const structure = {
    public: {
        file1: { content: 'The is the content for file1 in the <public> directory.' },
        file2: { content: 'The is the content for file2 in the <public> directory.' },
        file3: { content: 'The is the content for file3 in the <public> directory.' },
    },
    'README.md': { content: 'Some readme' },
};

class TerminalComponent extends React.Component {

    render() {
        const extensions = {
            sudo: {
                exec: ({ structure, history, cwd }) => {
                    return { structure, cwd,
                        history: history.concat({ value: 'Nice try...' }),
                    };
                },
            },
        }
        return(
            <div className={styles.wrapper}>
                <div className="parentContainer">
                    <h4>Run docker administration commands here</h4>
                    <div style={{ flex:1 }}>
                        <Terminal history={history} structure={structure} extensions={extensions} prefix={"user@HOMEPC"} />
                    </div>
                </div>
            </div>
        )
    }
}

export default TerminalComponent
