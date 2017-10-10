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
    showChatButton: () => createAction(AT.SHOW_CAHT_BUTTON)(),

    showChatList: () => createAction(AT.SHOW_CAHT_LIST)(),

    showChatMessage: () => createAction(AT.SHOW_CAHT_MESSAGE)(),
}
