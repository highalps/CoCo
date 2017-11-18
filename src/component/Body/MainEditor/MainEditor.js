/* */
import React from 'react'
import {Resize, ResizeVertical} from 'react-resize-layout'
/* */
import styles from './MainEditor.scss'
import EditorBox from './EditorBox'
import Terminal from './Terminal'
import WebStreamWrapper from './WebStreamWrapper'


class MainEditor extends React.Component {

    constructor() {
        super()
        this._refs = {}
    }

    render() {
        return (
            <div className={styles.wrapper}>
                <Resize handleWidth='5px' handleColor='#777'>
                    <ResizeVertical height='600px' minHeight='100px'>
                        <EditorBox />
                    </ResizeVertical>
                    <ResizeVertical height='300px'>
                        <Terminal />
                    </ResizeVertical>
                </Resize>
                <WebStreamWrapper />
            </div>
        )
    }
}

export default MainEditor
