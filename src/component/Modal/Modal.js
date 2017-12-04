/* */
import React from 'react'
import Transition from 'react-transition-group/Transition';

/* */
import styles from './Modal.scss'

class Modal extends React.Component {

    renderContent() {
        const { isModalOpen, children } = this.props
        if (isModalOpen) {
            return (
                <div className={styles.modal}>
                    {children}
                </div>
            )
        }
        return null
    }

    render() {
        return (
            <div className={styles.wrapper}>
                <Transition
                    timeout={{ enter: 150, exit: 150 }}
                    classNames={{enter: styles.enter, leave: styles.leave}}>
                    {() => (this.renderContent())}
                </Transition>
            </div>
        )
    }
}

export default Modal
