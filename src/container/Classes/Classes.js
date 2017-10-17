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
        title:"[C언어] 완전정복",
        nickName:"동네아저씨",
        language:"C"
    },
    {
        id:2,
        title:"[JAVA] 완전정복 해봅시다",
        nickName:"동네아저씨",
        language:"JAVA"
    },
    {
        id:3,
        title:"[Python] 1주일 정복!",
        nickName:"동네아저씨",
        language:"Python"
    },
    {
        id:4,
        title:"[Python] 1주일 정복!",
        nickName:"동네아저씨",
        language:"Python"
    },
    {
        id:5,
        title:"[Python] 1주일 정복!",
        nickName:"동네아저씨",
        language:"Python"
    }
];
class Classes  extends React.Component {

    constructor(){
        super()
    }

    _renderClasses = () => {
        const classList = classData.map(data => {
            return <Class
                data={data}
                key={data.id}
            />
        });
        return classList
    };
    render(){
        return(
            <div className = {styles.wrapper}>
                <Search />
                <div className = "container-fluid">
                    {this._renderClasses()}
                </div>
            </div>
        )
    }
}
export default Classes;
