import React from 'react'
import styles from './MyClassInfo.scss'
import { TabContent, TabPane, Nav, NavItem, NavLink, Card, Button, CardTitle, CardText, Row, Col } from 'reactstrap';
import classnames from 'classnames';



class MyClassInfo  extends React.Component {

    constructor(props) {
        super(props);

        this.toggle = this.toggle.bind(this);
        this.state = {
            activeTab: '1'
        };
    }

    toggle(tab) {
        if (this.state.activeTab !== tab) {
            this.setState({
                activeTab: tab
            });
        }
    }
    render(){
        return(
            <div className = {styles.wrapper}>
                <div className = {styles.headWrapper}>
                    <Nav tabs>
                        <NavItem className={styles.head}>
                            <NavLink
                                className={classnames({ active: this.state.activeTab === '1' })}
                                onClick={() => { this.toggle('1'); }}
                            >

                                수강 신청 목록
                            </NavLink>
                        </NavItem>
                        <NavItem  className={styles.head}>
                            <NavLink
                                className={classnames({ active: this.state.activeTab === '2' })}
                                onClick={() => { this.toggle('2'); }}
                            >
                                수강 신청 받은 목록
                            </NavLink>
                        </NavItem>
                    </Nav>
                    <TabContent activeTab={this.state.activeTab}>
                        <TabPane tabId="1">
                        </TabPane>
                        <TabPane tabId="2">
                        </TabPane>
                    </TabContent>
                </div>
            </div>
        )
    }
}
export default MyClassInfo;
