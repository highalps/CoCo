import React from 'react'
import styles from './RegisterTutor.scss'
import { Button,Input, FormGroup, Label } from 'reactstrap';

class RegisterTutor  extends React.Component {

    constructor(){
        super()
        this.state = {
            job:"",
            git:"",
            career:"",
            language:[]
        }
        this._handleJobChange = this._handleJobChange.bind(this);
        this._handleGitChange = this._handleGitChange.bind(this);
        this._handleCareerChange = this._handleCareerChange.bind(this);
        this._handleLanguageChange = this._handleLanguageChange.bind(this);
        this._registerTutor = this._registerTutor.bind(this);
    }

    _handleJobChange(e){
        this.setState({ job:e.target.value})
    }
    _handleGitChange(e){
        this.setState({ git:e.target.value})
    }
    _handleCareerChange(e){
        this.setState({ career:e.target.value})
    }
    // _handleLanguageChange(e){
    //     this.setState({ language:e.target.value})
    // }
    _registerTutor(){
        let url = "https://www.cocotutor.ml/api/board/search?group="+this.state.group+"&language="+this.state.language+"&keyword="+this.state.search;
        return fetch(url)
            .then(response => response.json())
            .then(json => json.data)
            .catch(err => console.log(err))
    }

    render(){
        return(
            <div className = {styles.wrapper}>
                <div className={styles.head}>
                    CoCo 튜터 등록
                </div>
                <div className={styles.infoWrapper}>
                    <div>
                        <label className={styles.labelDisplay}>신분/학력</label>
                        <Input type="text" name = "job" onChange = {(e) => this._handleJobChange(e)} placeholder = "소속 학교 또는 회사를 입력하세요"/>
                    </div>
                    <br/>
                    <div>
                        <label className={styles.labelDisplay}>Github</label>
                        <Input type="text" name = "git" onChange = {(e) => this._handleGitChange(e)} placeholder = "자신의 Github주소를 입력하세요!"/>
                    </div>
                    <br/>
                    <div>
                        <label className={styles.labelDisplay}>경력</label>
                        <Input type="text" name = "career" onChange = {(e) => this._handleCareerChange(e)} placeholder = "경험 했던 프로젝트를 입력하세요!"/>
                    </div>
                    <br/>
                    <div>
                        <label className={styles.labelDisplay}>선호 언어</label>
                        <FormGroup check inline>
                            <Label check>
                                <Input type="checkbox" /> C
                            </Label>
                            <Label check className={styles.checkBox}>
                                <Input type="checkbox" /> Java
                            </Label>
                            <Label check className={styles.checkBox}>
                                <Input type="checkbox" /> Python
                            </Label>
                            <Label check className={styles.checkBox}>
                                <Input type="checkbox" /> JavaScript
                            </Label>
                        </FormGroup>
                    </div>
                    <br/>
                    <br/>
                    <Button size= "lg" color="primary" onClick={()=>this._registerTutor()}>등록하기</Button>
                </div>
            </div>
        )
    }
}
export default RegisterTutor;
