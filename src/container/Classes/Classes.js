import React from 'react'
import styles from './Classes.scss'

import Search from 'component/Classes/Search'
import Class from 'component/Classes/Class'




/*
TODO  redux를 사용하여 데이터를 받아오기 (classData에 저장)
TODO  처음에 모든 데이터를 받고   그걸 parsing 하는 코드가 필요 (언어 /  Library)
TODO  form 으로 search 했을 때만 보냄

TODO ROW 를 만들고 그 안에  4개의 column을 만듦
TODO 이게 유동적으로 이루어져야 한다.

*/
const classData = [
    {
        id:1,
        title:"[C언어] 완전정복asdfasdfasdfsdafasfddsafsadfasdfsdaf",
        nickname:"동네아저씨",
        language:"C"
    },
    {
        id:2,
        title:"[JAVA] 완전정복 해봅시다",
        nickname:"동네아저씨",
        language:"JAVA"
    },
    {
        id:3,
        title:"[Python] 1주일 정복!",
        nickname:"동네아저씨",
        language:"Python"
    },
    {
        id:4,
        title:"[Python] 1주일 정복!fasddddddddddddddddasfd",
        nickname:"동네아저씨",
        language:"Python"
    },
    {
        id:5,
        title:"[Python] 1주일 정복!",
        nickname:"동네아저씨",
        language:"Python"
    },
    {
        id:6,
        title:"[JAVA] 완전정복 해봅시다",
        nickname:"동네아저씨",
        language:"JAVA"
    },
    {
        id:7,
        title:"[Python] 1주일 정복!",
        nickname:"동네아저씨",
        language:"Python"
    },
    {
        id:8,
        title:"[Python] 1주일 정복!",
        nickname:"동네아저씨",
        language:"Python"
    },
    {
        id:9,
        title:"[Python] 1주일 정복!",
        nickname:"동네아저씨",
        language:"Python"
    },
    {
        id:10,
        title:"[JAVA] 완전정복 해봅시다",
        nickname:"동네아저씨",
        language:"JAVA"
    },
    {
        id:11,
        title:"[Python] 1주일 정복!",
        nickname:"동네아저씨",
        language:"Python"
    },
    {
        id:12,
        title:"[Python] 1주일 정복!",
        nickname:"동네아저씨",
        language:"Python"
    },

];

const rows = [];

class Classes  extends React.Component {

    constructor(){
        super()
        this._rowDataParsing()
    }

    componentWillMount(){;
    }


    _renderClasses = () => {
        const classList = rows.map((row, index) => {
            return <Class
                data={row}
                key={index}
            />
        });
        return classList
    };
    _rowDataParsing = () => {
        let tmp1 = parseInt(classData.length / 5);
        let tmp2 = parseInt(classData.length % 5);
        let row = [];
        for(let i = 0; i < tmp1; i++){
            row = [];
            for(let j=i*5; j<i*5+5; j++){
                row.push(classData[j]);
            }
            rows.push(row);
        }
        if(tmp2 != 0){
            row = [];
            for(let k=(tmp1-1)*10; k < classData.length; k++){
                row.push(classData[k]);
            }
            rows.push(row);
        }
    };
    render(){
        return(
            <div className = {styles.wrapper}>
                <div className = {styles.head}>
                    CoCo 강의 검색
                </div>
                <Search />
                <div className = {styles.bgControl}>
                    <div className = "container-fluid">
                        {this._renderClasses()}
                    </div>
                </div>
            </div>
        )
    }
}
export default Classes;
