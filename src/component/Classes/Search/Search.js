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
            search:""
        };
        this.onGroupBtnClick = this.onGroupBtnClick.bind(this);
        this.onLanguageBtnClick = this.onLanguageBtnClick.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.searchClass = this.searchClass.bind(this);

    }

    onGroupBtnClick(group) {
        this.setState({ group:group });
    }
    onLanguageBtnClick(language) {
        this.setState({ language:language });
    }

    handleChange(e){
        this.setState({ search:e.target.value})
    }

    searchClass(){
        console.log(this.state);
    }
    render() {
        return (
            <div className={styles.wrapper}>
                <div className = {styles.btnWrapper}>
                    <ButtonGroup className = {styles.groupBtn}>
                        <Button size= "lg" color="primary" onClick={() => this.onGroupBtnClick(0)} active={this.state.group === 0}>전체</Button>
                        <Button size= "lg" color="primary" onClick={() => this.onGroupBtnClick(1)} active={this.state.group === 1}>튜터</Button>
                        <Button size= "lg" color="primary" onClick={() => this.onGroupBtnClick(2)} active={this.state.group === 2}>학생</Button>
                    </ButtonGroup>
                    <ButtonGroup className = {styles.languageBtn}>
                        <Button size= "lg" color="primary" onClick={() => this.onLanguageBtnClick(0)} active={this.state.language === 0}>전체</Button>
                        <Button size= "lg" color="primary" onClick={() => this.onLanguageBtnClick(1)} active={this.state.language === 1}>C</Button>
                        <Button size= "lg" color="primary" onClick={() => this.onLanguageBtnClick(2)} active={this.state.language === 2}>JAVA</Button>
                        <Button size= "lg" color="primary" onClick={() => this.onLanguageBtnClick(3)} active={this.state.language === 3}>PYTHON</Button>
                    </ButtonGroup>
                </div>
                <InputGroup size='lg' className={styles.inputGroup}>
                    <Input type="text" name = "search" onChange = {(e) => this.handleChange(e)} placeholder = "원하는 수업을 검색 하세요!"/>
                    <Button size= "lg" color="primary" onClick={() => this.searchClass() }>검색</Button>
                </InputGroup>
            </div>
        )
    }
}

export default Search
