/* */
import React from 'react'
import { connect } from 'react-redux'

/* */
import styles from './List.scss'
import Action from '../../redux/actions/actions'

const mapStateToProps = (state) => ({
    list: state.listReducer.project,
})

@connect(mapStateToProps)
class Home extends React.Component {

    constructor() {
        super()
        this.state = {
            loading: true,
        }
    }

    componentWillMount() {
        const payload = {
            id: '111',
            username: 'hihi',
        }
        this.props.dispatch(Action.getList(payload))
            .then(() => this.setState({ loading: false }))
    }

    renderProjectList() {
        if (!this.state.loading) {
            return (
                <div>
                    <div>{this.props.list.get('name')}</div>
                </div>
            )
        } else {
            return <div>로딩 중.....</div>
        }
    }

    render() {
        return (
            <div className={styles.wrapper}>
                {this.renderProjectList()}
            </div>
        )
    }
}

export default Home
