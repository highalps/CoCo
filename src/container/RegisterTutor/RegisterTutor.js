/* */
import React from 'react'
import { Button,Input, FormGroup, Label } from 'reactstrap'
import client from '../../redux/base.js'
import { connect } from 'react-redux'
import autobind from 'core-decorators/lib/autobind'

/* */
import styles from './RegisterTutor.scss'
import NavBar from '../../component/NavBar'

const mapStateToProps = (state) => ({
    nickname: state.userReducer.nickname,
    email: state.userReducer.email,
    tutor: state.userReducer.tutor,
    id : state.userReducer.id
})

@connect(mapStateToProps)
class RegisterTutor  extends React.Component {

    constructor(){
        super()
        this.state = {
            degree: '',
            intro: '',
            git: '',
            career: '',
            language: new Set()
        }
    }
    @autobind
    _initState(){
        this.setState({
            degree: '',
            intro: '',
            git: '',
            career: '',
            language: new Set()
        })
    }

    @autobind
    _handleDegreeChange(e){
        this.setState({ degree:e.target.value})
    }
    @autobind
    _handleIntroChange(e){
        this.setState({ intro:e.target.value})
    }
    @autobind
    _handleGitChange(e){
        this.setState({ git:e.target.value})
    }
    @autobind
    _handleCareerChange(e){
        this.setState({ career:e.target.value})
    }
    @autobind
    _handleLanguageChange(lang){
        let language = this.state.language
        if(language.has(lang)){
            language.delete(lang)
        }
        else{
            language.add(lang)
        }
        this.setState({ language:language})
    }
    @autobind
    _registerTutor(){
        let lang = Array.from(this.state.language)
        console.log('language', lang)
        let temp = ''
        for(let i = 0; i < lang.length-1; i++){
            temp += String(lang[i])+','
        }
        temp += String(lang[lang.length-1])
        client.post('api/user/tutor',{
                id : this.props.id,
                degree:this.state.degree,
                intro :this.state.intro,
                github: this.state.git,
                career:this.state.career,
                language:temp
            }
        ).then(res =>{console.log(res.data)
            window.alert("튜터 등록요청을 완료했습니다.")
        }).catch(error =>{
            window.alert("다시 요청해주세요.")
            console.log(error)
        })

    }


    render(){
        return(
            <div className = {styles.wrapper}>
                <NavBar/>
                <div className={styles.head}>
                    CoCo 튜터 등록
                </div>
                <h1 className={styles.subHead}>기본 정보 입력</h1>
                <div className = {styles.entireWrapper}>
                    <div className={styles.infoWrapper}>
                        <div className={styles.labelWrapper}>
                            <label className={styles.labelDisplay}>신분/학력</label>
                            <Input type="text" name = "degree" onChange = {(e) => this._handleDegreeChange(e)} placeholder = "소속 학교 또는 회사를 입력하세요"/>
                        </div>
                        <div className={styles.labelWrapper}>
                            <label className={styles.labelDisplay}>본인 소개</label>
                            <Input className={styles.area} type="textarea" name = "degree" onChange = {(e) => this._handleIntroChange(e)} placeholder = "자기 소개를 해주세요!"/>
                        </div>

                        <br/>
                        <div className={styles.labelWrapper}>
                            <label className={styles.labelDisplay}>Github</label>
                            <Input type="text" name = "git" onChange = {(e) => this._handleGitChange(e)} placeholder = "자신의 Github주소를 입력하세요!"/>
                        </div>
                        <br/>
                        <div className={styles.labelWrapper}>
                            <label className={styles.labelDisplay}>경력</label>
                            <Input className={styles.area} type="textarea" name = "career" onChange = {(e) => this._handleCareerChange(e)} placeholder = "경험 했던 프로젝트를 입력하세요!"/>
                        </div>
                        <br/>
                        <div className={styles.labelWrapper}>
                            <label className={styles.labelDisplay}>선호 언어</label>
                            <FormGroup check inline>
                                <Label check>
                                    <Input type="checkbox" onClick={()=>this._handleLanguageChange('c')}/> C
                                </Label>
                                <Label check className={styles.checkBox}>
                                    <Input type="checkbox"  onClick={()=>this._handleLanguageChange('c++')}/> C++
                                </Label>
                                <Label check className={styles.checkBox}>
                                    <Input type="checkbox"  onClick={()=>this._handleLanguageChange('java')}/> Java
                                </Label>
                                <Label check className={styles.checkBox}>
                                    <Input type="checkbox"  onClick={()=>this._handleLanguageChange('python')}/> Python
                                </Label>
                            </FormGroup>
                        </div>
                        <br/>
                        <Button size= "lg" color="primary" className= {styles.registerBtn} onClick={()=>this._registerTutor()}>등록하기</Button>
                    </div>
                </div>
            </div>
        )
    }
}
export default RegisterTutor
