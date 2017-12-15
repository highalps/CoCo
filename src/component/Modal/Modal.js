/* */
import React from 'react'
import PropTypes from 'prop-types'
import Transition from 'react-transition-group/Transition';

/* */
import styles from './Modal.scss'

class Modal extends React.Component {

    constructor() {
        super()
    }

    componentDidUpdate(prevProps) {
        if (prevProps.isModalOpen && !this.props.isModalOpen) {
            this.props.onClose()
        }
    }

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

Modal.propTypes = {
    isModalOpen: PropTypes.bool,
    onClose: PropTypes.func,
}

Modal.defaultProps = {
    isModalOpen: false,
    onClose: () => {},
}

export default Modal
