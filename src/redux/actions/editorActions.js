/* */

/* */
import AT from '../actions/actionTypes'
import client from '../base'
import { createAction } from './utils'

export default {
    getDirectory: (payload) => {
        return (dispatch) => {
            dispatch(createAction(AT.GET_DIRECTORY)(payload))
            const { classId } = payload
            return client.get(`/api/pad/${classId}`)
                .then(response => {
                    dispatch(createAction(AT.GET_DIRECTORY_SUCCESS)(({ directory: response.data })))
                })
                .catch(error => {
                    dispatch(createAction(AT.GET_DIRECTORY_ERROR)(error))
                    return Promise.reject(error.response)
                })
        }
    },
    saveDirectory: (payload) => {
        return (dispatch) => {
            dispatch(createAction(AT.SAVE_DIRECTORY)(payload))
            const { classId } = payload
            return client.put(`/api/pad/${classId}`)
                .then(response => {
                    dispatch(createAction(AT.SAVE_DIRECTORY_SUCCESS)(response.data))
                })
                .catch(error => {
                    dispatch(createAction(AT.SAVE_DIRECTORY_ERROR)(error))
                    return Promise.reject(error.response)
                })
        }
    },
    createFile: (payload) => {
        return (dispatch) => {
            dispatch(createAction(AT.CREATE_FILE)(payload))
            return client.post('/api/pad/directory', payload)
                .then(response => {
                    dispatch(createAction(AT.CREATE_FILE_SUCCESS)(payload))
                })
                .catch(error => {
                    dispatch(createAction(AT.CREATE_FILE_ERROR)(error))
                    return Promise.reject(error.response)
                })
        }
    },
    removeFile: (payload) => {
        return (dispatch) => {
            dispatch(createAction(AT.REMOVE_FILE)(payload))
            const { classNum, path, fileName, type } = payload
            return client.delete(`/api/pad/directory/?classNum=${classNum}&path=${path}&fileName=${fileName}&type=${type}`)
                .then(response => {
                    return dispatch(createAction(AT.REMOVE_FILE_SUCCESS)(payload))
                })
                .catch(error => {
                    dispatch(createAction(AT.REMOVE_FILE_ERROR)(error))
                    return Promise.reject(error.response)
                })
        }
    },
    renameFile: (payload) => {
        return (dispatch) => {
            dispatch(createAction(AT.RENAME_FILE)(payload))
            const { classNum } = payload
            return client.put(`/api/pad/directory/${classNum}`, payload)
                .then(response => {
                    dispatch(createAction(AT.RENAME_FILE_SUCCESS)(payload))
                })
                .catch(error => {
                    dispatch(createAction(AT.RENAME_FILE_ERROR)(error))
                    return Promise.reject(error.response)
                })
        }
    },
}

