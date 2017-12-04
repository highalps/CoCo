/* */
import React from 'react'
import { connect } from 'react-redux'
import Transition from 'react-transition-group/Transition';
import autobind from 'core-decorators/lib/autobind'

/* */
import styles from './ScreenCover.scss'
import { uiActions } from '../../redux/actions'

const mapStateToProps = (state) => ({
    isModalOpen: state.uiReducer.uiState.get('signModal')
})

@connect(mapStateToProps)
class ScreenCover extends React.Component {

    @autobind
    handleMaskClick(event) {
        if (event.target.classList[0].includes('ScreenCover')) {
            this.props.dispatch(uiActions.closeSignModal())
        }
    }

    render() {
        return (
            <Transition
                timeout={{ enter: 150, exit: 150 }}
                classNames={{ enter: styles.enter, leave: styles.leave }}>
                {
                    () => {
                        if (this.props.isModalOpen) {
                            return (<div className={styles.mask} onClick={this.handleMaskClick} />)
                        }
                        return null
                    }
                }
            </Transition>
        )
    }
}

export default ScreenCover