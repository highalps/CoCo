import React from 'react';
import { Card, Button, CardTitle, CardText, Row, Col } from 'reactstrap';
import './MainScreen.scss'
class MainScreen extends React.Component {

  render() {
    return (
      <div>
        <div className="cardWrapper">
          <hr/>
          <h4 className="my-project text-center">프로젝트 목록</h4>
          <div className="cardAlign">
          <Row>
            <Col sm="1">
              <div className="arrow-left"/>
            </Col>
            <Col sm="3">
              <Card block>
                <CardTitle>프로젝트를 만들기</CardTitle>
                <CardText>With supporting text below as a natural lead-in to additional content.</CardText>
                <Button className="bg-faded">프로젝트 추가</Button>
              </Card>
            </Col>
            <Col sm="3">
              <Card block>
                <CardTitle>Special Title Treatment</CardTitle>
                <CardText>With supporting text below as a natural lead-in to additional content.</CardText>
                <Button className="bg-faded">Go somewhere</Button>
              </Card>
            </Col>
            <Col sm="3">
              <Card block>
                <CardTitle>Special Title Treatment</CardTitle>
                <CardText>With supporting text below as a natural lead-in to additional content.</CardText>
                <Button className="bg-faded">Go somewhere</Button>
              </Card>
            </Col>
            <Col sm="1">
              <div className="arrow-right"/>
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
