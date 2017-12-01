/* */

/* */
import AT from '../actions/actionTypes'
import { createAction } from './utils'

export default {
    closeChat: () => createAction(AT.CLOSE_CHAT)(),

    showChatList: () => createAction(AT.SHOW_CHAT_LIST)(),

    showChatMessage: (payload) => createAction(AT.SHOW_CHAT_MESSAGE)(payload),

    openSignModal: () =>  createAction(AT.SIGN_MODAL_OPEN)(),

    closeSignModal: () =>  createAction(AT.SIGN_MODAL_CLOSE)(),
}

