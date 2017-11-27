
/* */
import AT from '../actions/actionTypes'

const initialState = {
    classNum : 0
}


const classReducer = (state = initialState, action) => {
    switch (action.type) {
        case AT.SET_CLASS_NUM:
            console.log('action. classNum', action.payload.classNum)
            return {
                classNum : action.payload.classNum
            }
        default:
            return state;
    }
}

export default classReducer
