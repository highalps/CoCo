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
    closeChat: () => createAction(AT.CLOSE_CHAT)(),

    showChatList: () => createAction(AT.SHOW_CHAT_LIST)(),

    showChatMessage: () => createAction(AT.SHOW_CHAT_MESSAGE)(),
}

