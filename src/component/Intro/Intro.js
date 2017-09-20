import React from 'react';
import { Jumbotron, Container } from 'reactstrap';
import './intro.scss';
class Intro extends React.Component{
  render(){
    return (
      <div>
        <Jumbotron fluid>
          <Container fluid>
            <h1 className="text-center display-2">코딩 교육</h1>
            <br/>
            <p className="text-center lead">프로젝트 공동작업, 컴파일 기능을 제공합니다.</p>
          </Container>
        </Jumbotron>
      </div>
    );
  };
}


export default Intro;
