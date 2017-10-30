/* */
import React from 'react'
import styles from './Search.scss'
import { Button, ButtonGroup,InputGroup, Input } from 'reactstrap';



class Search extends React.Component {

    constructor() {
        super();
        this.state = {
            group:0,
            language:0,
            search:"",
            classData:0
        };
        this._onGroupBtnClick = this._onGroupBtnClick.bind(this);
        this._onLanguageBtnClick = this._onLanguageBtnClick.bind(this);
        this._handleChange = this._handleChange.bind(this);
        this._searchClass = this._searchClass.bind(this);

    }

    _onGroupBtnClick(group) {
        this.setState({ group:group },()=>{
            this.searchClass();
        });
    }
    _onLanguageBtnClick(language) {
        this.setState({ language:language },()=>{
            this.searchClass();
        });
    }

    _handleChange(e){
        this.setState({ search:e.target.value})
    }

    _searchClass(){
        console.log(this.state);
        let url = "https://www.cocotutor.ml/api/board/search?group="+this.state.group+"&language="+this.state.language+"&keyword="+this.state.search;
        return fetch(url)
            .then(response => response.json())
            .then(json => json.data)
            .catch(err => console.log(err))
    }
    render() {
        return (
            <div className={styles.wrapper}>
                <div className = {styles.btnWrapper}>
                    <ButtonGroup className = {styles.groupBtn}>
                        <Button size= "lg" color="primary" onClick={() => this._onGroupBtnClick(0)} active={this.state.group === 0}>전체</Button>
                        <Button size= "lg" color="primary" onClick={() => this._onGroupBtnClick(1)} active={this.state.group === 1}>튜터</Button>
                        <Button size= "lg" color="primary" onClick={() => this._onGroupBtnClick(2)} active={this.state.group === 2}>학생</Button>
                    </ButtonGroup>
                    <ButtonGroup className = {styles.languageBtn}>
                        <Button size= "lg" color="primary" onClick={() => this._onLanguageBtnClick(0)} active={this.state.language === 0}>전체</Button>
                        <Button size= "lg" color="primary" onClick={() => this._onLanguageBtnClick(1)} active={this.state.language === 1}>C</Button>
                        <Button size= "lg" color="primary" onClick={() => this._onLanguageBtnClick(2)} active={this.state.language === 2}>JAVA</Button>
                        <Button size= "lg" color="primary" onClick={() => this._onLanguageBtnClick(3)} active={this.state.language === 3}>PYTHON</Button>
                    </ButtonGroup>
                </div>
                <InputGroup size='lg' className={styles.inputGroup}>
                    <Input type="text" name = "search" onChange = {(e) => this._handleChange(e)} placeholder = "원하는 수업을 검색 하세요!"/>
                    <Button size= "lg" color="primary" onClick={() => this._searchClass() }>검색</Button>
                </InputGroup>
            </div>
        )
    }
}

export default Search
