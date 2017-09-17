/* */
import axios from 'axios'

/* */
import AT from '../actions/actionTypes'

//TODO: nginx 설치 후 포트 번호 지우기
const client = axios.create({
    baseURL: 'http://external.sopad.ml:3000/api/',
    timeout: 5000,
})

function createAction(actionType) {
    return (payload) => ({
        type: actionType,
        payload,
    })
}

export default {
    getList: (payload) => { // 로그인 직후 유저의 프로젝트 리스트 받기
        return (dispatch) => {
            dispatch(createAction(AT.GET_LIST)(payload))
            return client.get('/list')
                .then(response => {
                     dispatch(createAction(AT.GET_LIST_SUCCESS)(response))
                })
                .catch(error => {
                    dispatch(createAction(AT.GET_LIST_ERROR)(error))
                })
        }
    },
    addProject: (payload) => { // 프로젝트 리스트화면에서 새로운 프로젝트 생성
        return (dispatch) => {
            dispatch(createAction(AT.ADD_PROJECT)(payload))
            return client.post('/project')
                .then(response => {
                    dispatch(createAction(AT.ADD_PROJECT_SUCCESS)(response))
                })
                .catch(error => {
                    dispatch(createAction(AT.ADD_PROJECT_ERROR)(error))
                })
        }
    },
    getProject: (payload) => { // 리스트에서 선택한 프로젝트에 대한 정보 전송
        return (dispatch) => {
            dispatch(createAction(AT.GET_PROJECT)(payload))
            return client.get('/project')
                .then(response => {
                    dispatch(createAction(AT.GET_PROJECT_SUCCESS)(response))
                })
                .catch(error => {
                    dispatch(createAction(AT.GET_PROJECT_ERROR)(error))
                })
        }
    },
    updateDirectory: (payload) => { // /sopad에서 디렉토리 업데이트 요청
        return (dispatch) => {
            dispatch(createAction(AT.UPDATE_DIRECTORY)(payload))
            return client.put('/directory')
                .then(response => {
                    dispatch(createAction(AT.UPDATE_DIRECTORY_SUCCESS)(response))
                })
                .catch(error => {
                    dispatch(createAction(AT.UPDATE_DIRECTORY_ERROR)(error))
                })
        }
    },
    addUser: (payload) => { // /sopad에서 접근 가능한 사용자 추가
        return (dispatch) => {
            dispatch(createAction(AT.ADD_USER)(payload))
            return client.post('/user')
                .then(response => {
                    dispatch(createAction(AT.ADD_USER_SUCCESS)(response))
                })
                .catch(error => {
                    dispatch(createAction(AT.ADD_USER_ERROR)(error))
                })
        }
    }
}

