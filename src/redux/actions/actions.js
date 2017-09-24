/* */
import axios from 'axios'

/* */
import AT from '../actions/actionTypes'

//TODO: nginx 설치 후 포트 번호 지우기
const client = axios.create({
    baseURL: 'http://external.cocotutor.ml:3000/api/',
    timeout: 5000,
})

function createAction(actionType) {
    return (payload) => ({
        type: actionType,
        payload,
    })
}

export default {

}

