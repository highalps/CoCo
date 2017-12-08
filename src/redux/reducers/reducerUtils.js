import _ from 'lodash'

// rename json key
export function changekey(obj) {
    let directory = JSON.stringify(obj)
    directory.replace('name', 'title')
    directory.replace('contents', 'children')
    return JSON.parse(directory)
}

export function insertPath(directory) {
    directory[0].expanded = true
    for (let i = 0; i< directory.length; i++) {
        _insert(directory[i], '', 0)
    }
}

export function createFile(directory, file) {
    for (let i = 0; i< directory.length; i++) {
        _create(directory[i], file)
    }
}

export function _create(obj, file) {
    _.forIn(obj, function (val, key) {
        console.log("path", obj.path, file.path)
        if (obj['path'] === file.path) {
            console.log('here!')
            const { type, path, title } = file
            const defaultOption = { type, path, title }
            if (type === 'directory') {
                console.log("testing", obj, file)
                obj['children'].push({ ... defaultOption, children: [] })
            } else if (type === 'file') {
                console.log("testing", obj, file)
                obj['children'].push({ ... defaultOption })
            }
        }
        if (_.isArray(val)) { // children
            val.forEach(function(el) {
                if (_.isObject(el)) {
                    createFile(el, file)
                }
            });
        }
        if (_.isObject(key)) {
            createFile(obj[key], file)
        }
    });
}

export const getMaxDepth = ({ children, depth }) => (children ? Math.max(...children.map(getMaxDepth)) : depth)


/** private **/
function _makeFileName(path, title) {
    if (path === '/') {
        return `/${title}`
    }
    return `${path}/${title}`
}

function _insert(obj, prevPath, depth) {
    _.forIn(obj, function (val, key) {
        obj['path'] = prevPath || '/'
        obj['depth'] = depth
        obj['key'] = _makeFileName(obj.path, obj.title)
        if (_.isArray(val)) { // children
            val.forEach(function(el) {
                if (_.isObject(el)) {
                    _insert(el, prevPath + '/' + obj['title'], depth + 1)
                }
            });
        }
        if (_.isObject(key)) {
            _insert(obj[key], prevPath || '/' + obj['title'], depth + 1)
        }
    })
}