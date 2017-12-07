import _ from 'lodash'

// rename json key
export function changekey(obj) {
    let directory = JSON.stringify(obj)
    directory.replace('name', 'title')
    directory.replace('contents', 'children')
    return JSON.parse(directory)
}

export function insertPath(directory) {
    for (let i = 0; i< directory.length; i++) {
        _insert(directory[i], '', 0)
    }
}

export const getMaxDepth = ({ children, depth }) => (children ? Math.max(...children.map(getMaxDepth)) : depth)

function makeFileName(path, title) {
    if (path === '/') {
        return `/${title}`
    }
    return `${path}/${title}`
}

function _insert(obj, prevPath, depth) {
    _.forIn(obj, function (val, key) {
        obj['path'] = prevPath || '/'
        obj['depth'] = depth
        obj['key'] = makeFileName(obj.path, obj.title)
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
    });
}