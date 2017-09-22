import React from 'react';
import { Card, Button, CardTitle, CardText, Row, Col } from 'reactstrap';
import styles from './MainScreen.scss'
class MainScreen extends React.Component {

	constructor() {
		super();
		this._refs = {};
		this.state = {p_name: '', language:'C'};

		this.selectChange = this.selectChange.bind(this);
		this.textChange = this.textChange.bind(this);
		this.projectCancel = this.projectCancel.bind(this);
		this.project = this.project.bind(this);
		this.projectCreate = this.projectCreate.bind(this);
	}
	textChange(event){
		this.setState({p_name: event.target.value});
	}
	selectChange(event){
		this.setState({language: event.target.value});
	}

	project = () => {
		document.getElementById('create').style.display='block'
	};
	projectCancel = () => {
		document.getElementById('create').style.display='none'
	};

	// TODO: 프로젝트 생성시 전달 데이터, db갱신
	projectCreate = () => {

	};

  render() {
    return (
      <div>
        <div className={styles.cardWrapper}>
          <hr/>
          <h4 className={styles.cardAlign}>프로젝트 목록</h4>
          <div className={styles.cardAlign}>
          <Row>
            <Col sm="1">
              <div/>
            </Col>
            <Col sm="3">
              <Card block>
                <CardTitle>프로젝트를 생성</CardTitle>
                <CardText>With supporting text below as a natural lead-in to additional content.</CardText>
                <button onClick={this.project}>프로젝트 생성</button>
                <div id = "create" className={styles.modal}>
                  <form className={styles.content}>
                    <div className ={styles.container}>
                      <div>
                        <label>프로젝트이름</label>
                        <input
                            type = "text"
                            placeholder= "Enter project Name"
                            value = {this.state.p_name}
                            onChange = {this.textChange}/>
                        <label>사용할 언어  </label>
                        <select value={this.state.language} onChange ={this.selectChange}>
                          <option value = "c">C</option>
                          <option value = "c++">C++</option>
                          <option value = "java">JAVA</option>
                        </select>
                      </div>
                      <div className={styles.fix}>
                        <button type="submit" onClick={this.projectCreate} className={styles.p_create}>생성</button>
                        <button type="button" onClick={this.projectCancel} className={styles.cancel}>취소</button>
                      </div>
                    </div>
                  </form>
                </div>
              </Card>
            </Col>
            <Col sm="3">
              <Card block>
                <CardTitle>Special Title Treatment</CardTitle>
                <CardText>With supporting text below as a natural lead-in to additional content.</CardText>
                <Button >Go somewhere</Button>
              </Card>
            </Col>
            <Col sm="3">
              <Card block>
                <CardTitle>Special Title Treatment</CardTitle>
                <CardText>With supporting text below as a natural lead-in to additional content.</CardText>
                <Button  >Go somewhere</Button>
              </Card>
            </Col>
            <Col sm="1">
              <div />
            </Col>
          </Row>
          </div>
          <hr/>
        </div>
      </div>
    );
  }
}
export default MainScreen;
