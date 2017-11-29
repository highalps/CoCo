export function createAction(actionType) {
    return (payload) => ({
        type: actionType,
        payload,
    })
}