/* */
import React from 'react'
import axios from 'axios'
import { Button, ButtonGroup,InputGroup, Input } from 'reactstrap';
import autobind from 'core-decorators/lib/autobind'

/* */
import styles from './ClassesContainer.scss'
import Class from '../../component/Classes/Class'
import CreateClass from '../../component/Classes/CreateClass'
import NavBar from '../../component/NavBar'

class ClassesContainer extends React.Component {
    constructor(){
        super()
    }

    render(){
        return(
            <div className = {styles.wrapper}>
                <NavBar/>
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
    }

    componentWillMount(){
        let url = 'https://external.cocotutor.ml/api/board/'
        this._setClassData(url)
    }
    @autobind
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

    @autobind
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
    @autobind
    _onGroupBtnClick(group) {
        this.setState({ group:group },()=>{
            this._searchClass()
        })
    }
    @autobind
    _onLanguageBtnClick(language) {
        this.setState({ language:language },()=>{
            this._searchClass()
        })
    }

    @autobind
    _handleChange(e){
        this.setState({ search:e.target.value})
    }

    @autobind
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
                        <Button size= "lg" color="primary" onClick={() => this._onGroupBtnClick(2)} active={this.state.group === 2}>튜터</Button>
                        <Button size= "lg" color="primary" onClick={() => this._onGroupBtnClick(1)} active={this.state.group === 1}>학생</Button>
                    </ButtonGroup>
                    <ButtonGroup className = {styles.languageBtn}>
                        <Button size= "lg" color="primary" onClick={() => this._onLanguageBtnClick(0)} active={this.state.language === 0}>전체</Button>
                        <Button size= "lg" color="primary" onClick={() => this._onLanguageBtnClick(1)} active={this.state.language === 1}>C</Button>
                        <Button size= "lg" color="primary" onClick={() => this._onLanguageBtnClick(2)} active={this.state.language === 2}>C++</Button>
                        <Button size= "lg" color="primary" onClick={() => this._onLanguageBtnClick(3)} active={this.state.language === 3}>JAVA</Button>
                        <Button size= "lg" color="primary" onClick={() => this._onLanguageBtnClick(4)} active={this.state.language === 4}>PYTHON</Button>
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
export default ClassesContainer
