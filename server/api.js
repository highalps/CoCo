var express = require('express');
var router = express.Router();
var assert = require('assert');
var directoryUpdate = require('./modules/directory-update')

// REST API Reference: http://meetup.toast.com/posts/92

// 로그인 후 사용자의 프로젝트 리스트
router.get('/list', function (req, res, next) {
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

// 새로운 프로젝트 생성 시
router.post('/project', function(req, res, next) {

});

// TODO: react에서 받는 데이터가 어디로 오는지 찾기 (req.??), 주소로 받는 '/:_id'를 대체
// 프로젝트 리스트에서 선택한 프로젝트 내용 넘기기
router.get('/project/:_id', function (req, res, next) {
    console.log("project " + req.params._id + "요청");

    req.app.db.collection('projects').findOne({ _id: req.params._id }, function (err, result) {
        assert.equal(err, null);

        if(!result) { res.json(result) }
    });
});

// 프로젝트의 디렉토리 변경 시
// /api/updateDirectory/8001로 axios 보내면 테스트 가능
router.put('/directory/:_id', function (req, res, next) {
    console.log("_id", req.params._id, "디렉토리 업데이트");

    req.app.db.collection('projects').findOne({ _id: req.params._id }, function (err, result) {

    });

    // TODO: react에서 받는 데이터 넣기
    directoryUpdate.update(req.params._id, 'data');
});

// 프로젝트에 유저 목록 추가
router.post('/user', function (req, res, next) {

});

// 프로젝트에 현재 접속 중인 유저 목록 추가
router.put('/user', function (req, res, next) {

});

module.exports = router;