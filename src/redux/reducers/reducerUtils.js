import _ from 'lodash'

// rename json key
export function changekey(obj) {
    let directory = JSON.stringify(obj)
    directory.replace('name', 'title')
    directory.replace('contents', 'children')
    return JSON.parse(directory)
}

export function insertPath(directory) {
    // directory[0].expanded = true
    for (let i = 0; i< directory.length; i++) {
        _insert(directory[i], '', 0)
    }
}

export function createFile(directory, file) {
    for (let i = 0; i< directory.length; i++) {
        _create(directory[i], file)
    }
}

export function deleteFile(directory, file) {
    for (let i = 0; i< directory.length; i++) {
        _delete(directory[i], file)
    }
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
        if (obj['type'] === 'directory') {
            obj['expanded'] = true
        }
        if (_.isArray(val)) { // children
            val.forEach(function(el) {
                if (_.isObject(el)) {
                    _insert(el, prevPath + '/' + obj['title'], depth + 1)
                }
            })
        }
        if (_.isObject(key)) {
            _insert(obj[key], prevPath || '/' + obj['title'], depth + 1)
        }
    })
}

function _create(obj, file) {
    _.forIn(obj, function (val, key) {
        if (obj['key'] === file.path) {
            const { type, path, title } = file
            const defaultOption = { type, path, title, key: `${path}/${title}` }
            const lastChild = obj['children'][obj['children'].length -1]
            if (!lastChild || (lastChild.key !== defaultOption.key)) {
                if (type === 'directory') {
                    obj['children'].push({...defaultOption, children: []})
                } else if (type === 'file') {
                    obj['children'].push({...defaultOption})
                }
            }
        }
        if (_.isArray(val)) { // children
            val.forEach(function(el) {
                if (_.isObject(el)) {
                    _create(el, file)
                }
            });
        }
        if (_.isObject(key)) {
            _create(obj[key], file)
        }
    })
}

function _delete(obj, file) {
    _.forIn(obj, function (val, key) {
        if (_.isArray(val)) { // children
            val.forEach(function (el, idx) {
                if(el.key === file.key) {
                    val.splice(idx, 1)
                } else {
                    if (_.isObject(el)) {
                        _delete(el, file)
                    }
                }
            })
        }
        if (_.isObject(key)) {
            _delete(obj[key], file)
        }
    })
}