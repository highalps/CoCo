import React from 'react'
import styles from './Classes.scss'
import { Button, ButtonGroup,InputGroup, Input } from 'reactstrap';

import Class from 'component/Classes/Class'
import CreateClass from 'component/Classes/CreateClass'
import axios from 'axios'


/*
TODO  redux를 사용하여 데이터를 받아오기 (classData에 저장)
TODO  처음에 모든 데이터를 받고   그걸 parsing 하는 코드가 필요 (언어 /  Library)
TODO  form 으로 search 했을 때만 보냄

TODO ROW 를 만들고 그 안에  4개의 column을 만듦
TODO 이게 유동적으로 이루어져야 한다.

*/
class Classes  extends React.Component {
    constructor(){
        super()
    }
    componentWillMount(){
    }

    render(){
        return(
            <div className = {styles.wrapper}>
                <CreateClass />
                <Search/>
            </div>
        )

    }
}


class Search  extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            group:0,
            language:0,
            search:'',
            classData:[],
            rows:[]
        }
        this._onGroupBtnClick = this._onGroupBtnClick.bind(this)
        this._onLanguageBtnClick = this._onLanguageBtnClick.bind(this)
        this._handleChange = this._handleChange.bind(this)
        this._searchClass = this._searchClass.bind(this)
    }

    componentWillMount(){
        let url = 'https://external.cocotutor.ml/api/board/'
        this._setClassData(url)
    }

    _setClassData(url) {
        axios.get(url)
            .then(res =>{
                this.setState({
                    classData:res.data.list
                }, () => {
                    this._rowDataParsing()
                })
            })
            .catch(error =>{
                console.log(error)
            })
    }

    _rowDataParsing(){
        let data = this.state.classData
        console.log("data", data)
        let tmp1 = parseInt(data.length / 5)
        let tmp2 = parseInt(data.length % 5)
        let row = []
        let rows = []
        for(let i = 0; i < tmp1; i++){
            row = []
            for(let j=i*5; j<i*5+5; j++){
                row.push(data[j])
            }
            rows.push(row)
        }
        if(tmp2 != 0){
            row = []
            for(let k=(tmp1)*5; k < data.length; k++){
                row.push(data[k])
            }
            rows.push(row)
        }
        this.setState({
            rows : rows
        })

    }
    _onGroupBtnClick(group) {
        this.setState({ group:group },()=>{
            this._searchClass()
        })
    }
    _onLanguageBtnClick(language) {
        this.setState({ language:language },()=>{
            this._searchClass()
        })
    }

    _handleChange(e){
        this.setState({ search:e.target.value})
    }

    _searchClass(){
        console.log(this.state)
        let url = 'https://external.cocotutor.ml/api/board/search?group='+this.state.group+'&language='+this.state.language+'&keyword='+this.state.search
        this._setClassData(url)
    }
    render() {
        return (
            <div className={styles.searchWrapper}>
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
                <div className = {styles.bgControl}>
                    <div className = "container-fluid">
                        {this.state.rows.map((row, index) => {
                            return <Class
                                data={row}
                                key={index}
                            />
                        })}
                    </div>

                </div>
            </div>
        )
    }
}
export default Classes
