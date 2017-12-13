/* */
import { toastr } from 'react-redux-toastr'

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
                    toastr.success('파일 저장', response.data.msg)
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
                    toastr.success('파일 생성', response.data.msg)
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
                    toastr.success('파일 삭제', response.data.msg)
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
                    toastr.success('이름 변경', response.data.msg)
                    dispatch(createAction(AT.RENAME_FILE_SUCCESS)(payload))
                })
                .catch(error => {
                    dispatch(createAction(AT.RENAME_FILE_ERROR)(error))
                    return Promise.reject(error.response)
                })
        }
    },

    onCreateFile: (payload) => {
        toastr.success('업데이트', '파일이 생성 되었습니다')
        return createAction(AT.ON_CREATE_FILE)(payload)
    },

    onRenameFile: (payload) => {
        toastr.success('업데이트', '파일이 이름이 변경 되었습니다')
        return createAction(AT.ON_RENAME_FILE)(payload)
    },

    onDeleteFile: (payload) => {
        toastr.success('업데이트', '파일이 삭제 되었습니다')
        return createAction(AT.ON_DELETE_FILE)(payload)
    },

}

