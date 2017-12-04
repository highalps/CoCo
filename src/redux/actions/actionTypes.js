import keyMirror from 'keymirror'

export default keyMirror({
    /* user Action */
    INIT_USER: null,

    SIGN_IN: null,
    SIGN_IN_SUCCESS: null,
    SIGN_IN_ERROR: null,

    SIGN_UP: null,
    SIGN_UP_SUCCESS: null,
    SIGN_UP_ERROR: null,

    LOG_OUT: null,

    /* chat Action */
    GET_CHAT_LIST: null,
    GET_CHAT_LIST_SUCCESS: null,
    GET_CHAT_LIST_ERROR: null,

    GET_CHAT_MESSAGES: null,
    GET_CHAT_MESSAGES_SUCCESS: null,
    GET_CHAT_MESSAGES_ERROR: null,

    PUT_CHAT_MESSAGE: null,
    PUT_CHAT_MESSAGE_SUCCESS: null,
    PUT_CHAT_MESSAGE_ERROR: null,

    UPDATE_STATUS: null,

    CREATE_CHAT_MESSAGE: null,
    CREATE_CHAT_MESSAGE_SUCCESS: null,
    CREATE_CHAT_MESSAGE_ERROR: null,

    UPDATE_MESSAGE: null,


    /* editor Action */
    GET_DIRECTORY: null,
    GET_DIRECTORY_SUCCESS: null,
    GET_DIRECTORY_ERROR: null,

    SAVE_DIRECTORY: null,
    SAVE_DIRECTORY_SUCCESS: null,
    SAVE_DIRECTORY_ERROR: null,

    /* UI actions */
    CLOSE_CHAT: null,
    SHOW_CHAT_LIST: null,
    SHOW_CHAT_MESSAGE: null,
    SIGN_MODAL_OPEN: null,
    SIGN_MODAL_CLOSE: null,
})