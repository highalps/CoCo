import React, { Component} from 'react';
import './Login.css'
class Login extends React.Component {
  constructor(){
    super();
    this.state = {
      id : '',
      pwd: '',
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleIDChange = this.handleIDChange.bind(this);
    this.handlePWDChange = this.handlePWDChange.bind(this);

  }

  handleSubmit(e){
    alert("ID = " + this.state.id + "  PWD = " + this.state.pwd);
    e.preventDefault();
  }


  handleIDChange(e){
    this.setState({
      id: e.target.value
    });
  }

  handlePWDChange(e){
      this.setState({
        pwd: e.target.value
      });
  }

    render(){
        return (
          <div>
            <form onSubmit={this.handleSubmit}>
                <fieldset>
                  <legend>Do you want login?</legend><br/>
                  <input type = "text" name = "ID"  defaultValue ={this.state.id} onChange={this.handleIDChange}/><br/>
                  <input type = "PASSWORD" name = "PWD" defaultValue = {this.state.pwd} onChange={this.handlePWDChange}/><br/>
                  <input type = "submit" value = "login"/><br/>
                </fieldset>
              </form>
         </div>
        );
    }
}
export default Login;
