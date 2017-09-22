import React from 'react';
import './Library.scss';
import { Card, Button, CardTitle, CardText, Row, Col } from 'reactstrap';

class Library extends React.Component {
  render() {
    return (
       <div className="library-wrapper">
          <h5 className="library-h5 text-center">지원 라이브러리</h5>
          <Row>
               <Col sm="2">
                 <Card block>
                   <CardTitle>C언어</CardTitle>
                   <Button>Go somewhere</Button>
                 </Card>
               </Col>
               <Col sm="2">
                 <Card block>
                   <CardTitle>C++</CardTitle>
                   <Button>Go somewhere</Button>
                 </Card>
               </Col>
               <Col sm="2">
                 <Card block>
                   <CardTitle>JAVA</CardTitle>
                   <Button>Go somewhere</Button>
                 </Card>
               </Col>
               <Col sm="2">
                 <Card block>
                   <CardTitle>Python</CardTitle>
                   <Button>Go somewhere</Button>
                 </Card>
               </Col>
               <Col sm="2">
                 <Card block>
                   <CardTitle>JavaScript</CardTitle>
                   <Button>Go somewhere</Button>
                 </Card>
               </Col>
               <Col sm="2">
                 <Card block>
                   <CardTitle>NodeJs</CardTitle>
                   <Button>Go somewhere</Button>
                 </Card>
               </Col>
             </Row>
       </div>
     );
   };
}
export default Library;
