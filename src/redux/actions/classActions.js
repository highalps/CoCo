/* */

/* */
import AT from '../actions/actionTypes'


function createAction(actionType) {
    return (payload) => ({
        type: actionType,
        payload,
    })
}
export default {
    setClassNum: (payload) => createAction(AT.SET_CLASS_NUM)(payload),

}
