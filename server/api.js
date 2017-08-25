var express = require('express');
var router = express.Router();
var assert = require('assert');
var directoryUpdate = require('./modules/directory-update')

// 로그인 후 사용자의 프로젝트 리스트
router.post('/getList', function(req, res, next) {
    var projectsToSend = [];

    req.app.db.collection('users').findOne({ id: req.user.id }, function (err, user) {
        assert.equal(err, null);

        for(i in user.projectList){
            req.app.db.collection('projects').findOne({ _id: user.projectList[i] }, function (err, project) {
                assert.equal(err, null);

                projectsToSend[i] = project;
            });
        }
    });

    res.json(projectsToSend);
});

router.post('/createProject', function(req, res, next) {

});

// 프로젝트 리스트에서 선택한 프로젝트 내용 넘기기
router.post('/getProject/:_id', function(req, res, next) {
    console.log("project " + req.params._id + "요청");

    req.app.db.collection('projects').findOne({ _id: req.params._id }, function (err, result) {
        assert.equal(err, null);

        if(!result) { res.json(result) };
    });
});

// 프로젝트의 디렉토리 변경 시
// /api/updateDirectory/8001로 axios 보내면 테스트 가능
router.post('/updateDirectory/:_id', function(req, res, next) {
    console.log("_id", req.params._id, "디렉토리 업데이트");
    // TODO: react에서 받는 데이터가 어디로 오는지 찾기 (req.??)

    req.app.db.collection('projects').findOne({ _id: req.params._id }, function (err, result) {

    });

    // TODO: react에서 받는 데이터 넣기
    directoryUpdate.update(req.params._id, 'data');
});

module.exports = router;